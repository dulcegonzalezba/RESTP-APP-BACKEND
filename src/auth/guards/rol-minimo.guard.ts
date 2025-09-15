/* eslint-disable @typescript-eslint/no-unused-vars */

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
import {
  ROL_MINIMO_KEY,
  RolMinimoMetadata,
  MAPA_NIVELES_ROL,
  NivelRol,
} from '../decorators/rol-minimo.decorator';

/**
 * Guard que valida nivel mínimo de rol basado en el decorator @RolMinimo
 */
@Injectable()
export class RolMinimoGuard implements CanActivate {
  private readonly logger = new Logger(RolMinimoGuard.name);

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtener metadatos del decorator @RolMinimo
    const rolMinimoMetadata = this.reflector.get<RolMinimoMetadata>(
      ROL_MINIMO_KEY,
      context.getHandler(),
    );

    // Si no hay decorator @RolMinimo, permitir acceso
    if (!rolMinimoMetadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    try {
      // Obtener el rol activo del usuario
      let rolActivo = user.rolActivo;
      if (!rolActivo) {
        // Intentar obtenerlo del header
        const rolActivoId = user.rolActivoId || request.headers['x-rol-activo'];
        // En una implementación real, aquí consultaríamos la BD para obtener el rol
        // Por ahora usamos un rol por defecto
        rolActivo = user.rol || 'USUARIO';
      }

      // Convertir el rol a código estándar
      const codigoRol = rolActivo.toUpperCase();

      // Obtener el nivel del rol actual
      const nivelActual = MAPA_NIVELES_ROL[codigoRol];

      if (nivelActual === undefined) {
        this.logger.warn(`RolMinimoGuard: Rol no reconocido: ${codigoRol}`, {
          usuario: user.sub || user.id,
          rolActivo: codigoRol,
        });
        throw new ForbiddenException('Rol de usuario no válido');
      }

      // Validar si el nivel es suficiente
      const nivelRequerido = rolMinimoMetadata.nivelMinimo;
      const tieneAcceso = rolMinimoMetadata.permitirMismoNivel
        ? nivelActual >= nivelRequerido
        : nivelActual > nivelRequerido;

      if (!tieneAcceso) {
        this.logger.warn(`RolMinimoGuard: Nivel de rol insuficiente`, {
          usuario: user.sub || user.id,
          nivelActual,
          nivelRequerido,
          rolActual: codigoRol,
        });

        throw new ForbiddenException(rolMinimoMetadata.mensaje);
      }

      this.logger.debug(`RolMinimoGuard: Acceso autorizado`, {
        usuario: user.sub || user.id,
        nivelActual,
        nivelRequerido,
        rolActual: codigoRol,
      });

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      this.logger.error('RolMinimoGuard: Error validando nivel de rol', error);
      throw new ForbiddenException('Error validando nivel de rol');
    }
  }
}
