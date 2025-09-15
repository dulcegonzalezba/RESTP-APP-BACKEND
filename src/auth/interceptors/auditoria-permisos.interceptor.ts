/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  REQUIERE_PERMISO_KEY,
  RequierePermisoMetadata,
} from '../decorators/requiere-permiso.decorator';
import {
  VALIDAR_MONTO_LIMITE_KEY,
  ValidarMontoLimiteMetadata,
} from '../decorators/validar-monto-limite.decorator';

/**
 * Interceptor para logging y auditoría de acciones con permisos
 */
@Injectable()
export class AuditoriaPermisosInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditoriaPermisosInterceptor.name);

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    // Obtener metadatos de los decorators
    const requierePermisoMetadata = this.reflector.get<RequierePermisoMetadata>(
      REQUIERE_PERMISO_KEY,
      context.getHandler(),
    );

    const montoLimiteMetadata = this.reflector.get<ValidarMontoLimiteMetadata>(
      VALIDAR_MONTO_LIMITE_KEY,
      context.getHandler(),
    );

    // Si no hay decorators de permisos, no auditar
    if (!requierePermisoMetadata) {
      return next.handle();
    }

    const startTime = Date.now();
    const auditInfo = {
      timestamp: new Date().toISOString(),
      usuario: user?.sub || user?.id || 'anonimo',
      empresa: user?.idEmpresa || 'no-especificada',
      rolActivo:
        user?.rolActivoId ||
        request.headers['x-rol-activo'] ||
        'no-especificado',
      accion: requierePermisoMetadata.codigoAccion,
      endpoint: `${request.method} ${request.url}`,
      ip: request.ip || request.connection?.remoteAddress,
      userAgent: request.headers['user-agent'],
      accionAlternativaUsada: request.accionAlternativaUsada || null,
      requiereAutorizacion: request.requiereAutorizacion || false,
    };

    // Si hay validación de monto, incluir información del monto
    if (montoLimiteMetadata && request.body) {
      const monto = request.body[montoLimiteMetadata.campo];
      auditInfo['monto'] = monto;
      auditInfo['campoMonto'] = montoLimiteMetadata.campo;
    }

    this.logger.log(`🔐 Acción iniciada: ${auditInfo.accion}`, {
      usuario: auditInfo.usuario,
      empresa: auditInfo.empresa,
      endpoint: auditInfo.endpoint,
      monto: auditInfo['monto'],
    });

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime;

        this.logger.log(`✅ Acción completada: ${auditInfo.accion}`, {
          ...auditInfo,
          duracion: `${duration}ms`,
          statusCode: response.statusCode,
          exitoso: true,
        });

        // Aquí se podría enviar a un sistema de auditoría externo
        // await this.enviarAuditoria({ ...auditInfo, exitoso: true, duracion });
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;

        this.logger.error(`❌ Acción fallida: ${auditInfo.accion}`, {
          ...auditInfo,
          duracion: `${duration}ms`,
          error: error.message,
          statusCode: error.status || 500,
          exitoso: false,
        });

        // Aquí se podría enviar a un sistema de auditoría externo
        // await this.enviarAuditoria({ ...auditInfo, exitoso: false, error: error.message, duracion });

        throw error;
      }),
    );
  }

  /**
   * Método para enviar auditoría a sistema externo (placeholder)
   * En producción, esto podría enviar a una cola, base de datos de auditoría, etc.
   */
  //   private async enviarAuditoria(auditData: any): Promise<void> {
  //     // TODO: Implementar envío a sistema de auditoría
  //     // Ejemplos:
  //     // - Base de datos de auditoría
  //     // - Cola de mensajes (RabbitMQ, Redis)
  //     // - Servicio de logging externo (ELK, Splunk)
  //     // - Webhooks de auditoría

  //     this.logger.debug('📋 Auditoría registrada', auditData);
  //   }
}
