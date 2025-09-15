/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor para monitorear performance de validaciones de permisos
 */
@Injectable()
export class PerformancePermisosInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PerformancePermisosInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const startTime = process.hrtime.bigint();

    const endpoint = `${request.method} ${request.url}`;
    const usuario = request.user?.sub || request.user?.id || 'anonimo';

    return next.handle().pipe(
      tap(() => {
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1_000_000; // Convertir a millisegundos

        // Log performance si es lento
        if (duration > 100) {
          // Más de 100ms
          this.logger.warn(`🐌 Endpoint lento detectado`, {
            endpoint,
            usuario,
            duracion: `${duration.toFixed(2)}ms`,
          });
        } else if (duration > 50) {
          // Más de 50ms
          this.logger.debug(`⚡ Performance moderada`, {
            endpoint,
            usuario,
            duracion: `${duration.toFixed(2)}ms`,
          });
        }

        // Métricas que se podrían enviar a sistema de monitoreo
        this.registrarMetrica({
          tipo: 'endpoint_performance',
          endpoint,
          usuario,
          duracion: duration,
          timestamp: new Date().toISOString(),
        });
      }),
    );
  }

  /**
   * Método para registrar métricas de performance
   * En producción, esto podría enviar a Prometheus, DataDog, etc.
   */
  private registrarMetrica(metrica: any): void {
    // TODO: Implementar envío a sistema de métricas
    // Ejemplos:
    // - Prometheus metrics
    // - DataDog StatsD
    // - New Relic
    // - CloudWatch

    if (metrica.duracion > 100) {
      this.logger.debug('📊 Métrica de performance registrada', metrica);
    }
  }
}
