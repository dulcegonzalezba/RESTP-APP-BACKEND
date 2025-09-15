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
  REQUIERE_PERMISO_KEY,
  RequierePermisoMetadata,
} from '../decorators/requiere-permiso.decorator';

/**
 * Guard que valida automáticamente permisos basado en el decorator @RequierePermiso
 */
@Injectable()
export class PermisosGuard implements CanActivate {
  private readonly logger = new Logger(PermisosGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly permisosService: PermisosService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtener metadatos del decorator @RequierePermiso
    const requierePermisoMetadata = this.reflector.get<RequierePermisoMetadata>(
      REQUIERE_PERMISO_KEY,
      context.getHandler(),
    );

    // Si no hay decorator @RequierePermiso, permitir acceso
    if (!requierePermisoMetadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      this.logger.warn('PermisosGuard: Usuario no autenticado');
      throw new ForbiddenException('Usuario no autenticado');
    }

    try {
      // Extraer datos del usuario
      const idUsuario = user.sub || user.id;
      const idEmpresa = user.idEmpresa;
      const rolActivoId = user.rolActivoId || request.headers['x-rol-activo'];

      if (!idUsuario || !idEmpresa) {
        this.logger.warn('PermisosGuard: Datos de usuario incompletos', {
          idUsuario,
          idEmpresa,
        });
        throw new ForbiddenException('Datos de usuario incompletos');
      }

      // Validar el permiso específico
      const validacion = await this.permisosService.validarAccion(
        idUsuario,
        idEmpresa,
        requierePermisoMetadata.codigoAccion,
        undefined, // El monto se validará en MontoLimiteGuard si aplica
        rolActivoId,
      );

      if (!validacion.permitido) {
        this.logger.warn(`PermisosGuard: Permiso denegado`, {
          usuario: idUsuario,
          accion: requierePermisoMetadata.codigoAccion,
          razon: validacion.razon,
        });

        throw new ForbiddenException(
          requierePermisoMetadata.mensaje || validacion.razon,
        );
      }

      // Si requiere autorización, marcar en el request para posterior validación
      if (validacion.requiereAutorizacion) {
        request.requiereAutorizacion = true;
        request.accionPermiso = requierePermisoMetadata.codigoAccion;
      }

      this.logger.debug(`PermisosGuard: Permiso concedido`, {
        usuario: idUsuario,
        accion: requierePermisoMetadata.codigoAccion,
      });

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      this.logger.error('PermisosGuard: Error validando permisos', error);
      throw new ForbiddenException('Error validando permisos');
    }
  }
}
