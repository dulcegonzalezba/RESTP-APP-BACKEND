/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermisosService } from '../services/permisos.service';
import {
  VALIDAR_MONTO_LIMITE_KEY,
  ValidarMontoLimiteMetadata,
} from '../decorators/validar-monto-limite.decorator';
import {
  REQUIERE_PERMISO_KEY,
  RequierePermisoMetadata,
} from '../decorators/requiere-permiso.decorator';

/**
 * Guard que valida límites monetarios basado en el decorator @ValidarMontoLimite
 */
@Injectable()
export class MontoLimiteGuard implements CanActivate {
  private readonly logger = new Logger(MontoLimiteGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly permisosService: PermisosService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtener metadatos del decorator @ValidarMontoLimite
    const montoLimiteMetadata = this.reflector.get<ValidarMontoLimiteMetadata>(
      VALIDAR_MONTO_LIMITE_KEY,
      context.getHandler(),
    );

    // Si no hay decorator @ValidarMontoLimite, permitir acceso
    if (!montoLimiteMetadata) {
      return true;
    }

    // También necesitamos el decorator @RequierePermiso para obtener la acción
    const requierePermisoMetadata = this.reflector.get<RequierePermisoMetadata>(
      REQUIERE_PERMISO_KEY,
      context.getHandler(),
    );

    if (!requierePermisoMetadata) {
      this.logger.warn(
        'MontoLimiteGuard: @ValidarMontoLimite requiere @RequierePermiso',
      );
      return true; // No podemos validar sin la acción base
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body || {};

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    try {
      // Extraer el monto del campo especificado
      const monto = body[montoLimiteMetadata.campo];

      if (monto === undefined || monto === null) {
        if (!montoLimiteMetadata.permitirCero) {
          throw new ForbiddenException(
            `Campo '${montoLimiteMetadata.campo}' es requerido para validación de monto`,
          );
        }
        return true; // No hay monto que validar
      }

      if (typeof monto !== 'number' || isNaN(monto)) {
        throw new ForbiddenException(
          `Campo '${montoLimiteMetadata.campo}' debe ser un número válido`,
        );
      }

      if (monto === 0 && montoLimiteMetadata.permitirCero) {
        return true; // Monto cero permitido
      }

      // Extraer datos del usuario
      const idUsuario = user.sub || user.id;
      const idEmpresa = user.idEmpresa;
      const rolActivoId = user.rolActivoId || request.headers['x-rol-activo'];

      // Validar el permiso con el monto específico
      const validacion = await this.permisosService.validarAccion(
        idUsuario,
        idEmpresa,
        requierePermisoMetadata.codigoAccion,
        monto,
        rolActivoId,
      );

      if (!validacion.permitido) {
        // Si hay acción alternativa, intentar con esa
        if (montoLimiteMetadata.accionAlternativa) {
          const validacionAlternativa =
            await this.permisosService.validarAccion(
              idUsuario,
              idEmpresa,
              montoLimiteMetadata.accionAlternativa,
              monto,
              rolActivoId,
            );

          if (validacionAlternativa.permitido) {
            this.logger.debug(
              `MontoLimiteGuard: Autorizado con acción alternativa`,
              {
                usuario: idUsuario,
                monto,
                accionAlternativa: montoLimiteMetadata.accionAlternativa,
              },
            );

            // Marcar que se usó acción alternativa
            request.accionAlternativaUsada =
              montoLimiteMetadata.accionAlternativa;
            return true;
          }
        }

        this.logger.warn(`MontoLimiteGuard: Monto excede límite`, {
          usuario: idUsuario,
          monto,
          accion: requierePermisoMetadata.codigoAccion,
          limite: validacion.limitacionMonetaria,
        });

        throw new ForbiddenException(montoLimiteMetadata.mensaje);
      }

      this.logger.debug(`MontoLimiteGuard: Monto dentro del límite`, {
        usuario: idUsuario,
        monto,
        limite: validacion.limitacionMonetaria,
      });

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      this.logger.error(
        'MontoLimiteGuard: Error validando límite monetario',
        error,
      );
      throw new ForbiddenException('Error validando límite monetario');
    }
  }
}
