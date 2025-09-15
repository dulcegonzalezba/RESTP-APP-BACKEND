/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable, Logger } from '@nestjs/common';
import { PermisosUsuarioResponseDto } from '../dto/permisos.dto';

/**
 * Interfaz para entradas de cache de permisos
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live en millisegundos
}

/**
 * Servicio de cache en memoria para permisos
 * En producción, esto podría usar Redis o Memcached
 */
@Injectable()
export class PermisosCache {
  private readonly logger = new Logger(PermisosCache.name);
  private readonly cache = new Map<string, CacheEntry<any>>();

  // TTL por defecto: 5 minutos
  private readonly DEFAULT_TTL = 5 * 60 * 1000;

  // TTL para permisos de usuario: 10 minutos
  private readonly PERMISOS_USUARIO_TTL = 10 * 60 * 1000;

  // TTL para validaciones de acción: 2 minutos
  private readonly VALIDACION_ACCION_TTL = 2 * 60 * 1000;

  constructor() {
    // Limpiar cache cada 5 minutos
    setInterval(() => this.limpiarCacheExpirado(), 5 * 60 * 1000);
  }

  /**
   * Obtiene permisos de usuario desde cache
   */
  getPermisosUsuario(
    idUsuario: string,
    idEmpresa: string,
    rolActivoId?: string,
  ): PermisosUsuarioResponseDto | null {
    const key = this.generatePermisosUsuarioKey(
      idUsuario,
      idEmpresa,
      rolActivoId,
    );
    return this.get<PermisosUsuarioResponseDto>(key);
  }

  /**
   * Guarda permisos de usuario en cache
   */
  setPermisosUsuario(
    idUsuario: string,
    idEmpresa: string,
    permisos: PermisosUsuarioResponseDto,
    rolActivoId?: string,
  ): void {
    const key = this.generatePermisosUsuarioKey(
      idUsuario,
      idEmpresa,
      rolActivoId,
    );
    this.set(key, permisos, this.PERMISOS_USUARIO_TTL);

    this.logger.debug(`Cache: Permisos guardados para usuario ${idUsuario}`);
  }

  /**
   * Obtiene resultado de validación de acción desde cache
   */
  getValidacionAccion(
    idUsuario: string,
    idEmpresa: string,
    codigoAccion: string,
    monto?: number,
    rolActivoId?: string,
  ): any | null {
    const key = this.generateValidacionAccionKey(
      idUsuario,
      idEmpresa,
      codigoAccion,
      monto,
      rolActivoId,
    );
    return this.get(key);
  }

  /**
   * Guarda resultado de validación de acción en cache
   */
  setValidacionAccion(
    idUsuario: string,
    idEmpresa: string,
    codigoAccion: string,
    resultado: any,
    monto?: number,
    rolActivoId?: string,
  ): void {
    const key = this.generateValidacionAccionKey(
      idUsuario,
      idEmpresa,
      codigoAccion,
      monto,
      rolActivoId,
    );
    this.set(key, resultado, this.VALIDACION_ACCION_TTL);
  }

  /**
   * Invalida cache de un usuario específico
   */
  invalidarUsuario(idUsuario: string): void {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (key.includes(`user:${idUsuario}`)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.cache.delete(key));

    this.logger.debug(
      `Cache: Invalidado cache para usuario ${idUsuario} (${keysToDelete.length} entradas)`,
    );
  }

  /**
   * Invalida cache de una empresa específica
   */
  invalidarEmpresa(idEmpresa: string): void {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (key.includes(`emp:${idEmpresa}`)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.cache.delete(key));

    this.logger.debug(
      `Cache: Invalidado cache para empresa ${idEmpresa} (${keysToDelete.length} entradas)`,
    );
  }

  /**
   * Invalida todo el cache
   */
  invalidarTodo(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.logger.debug(`Cache: Cache completo invalidado (${size} entradas)`);
  }

  /**
   * Obtiene estadísticas del cache
   */
  getEstadisticas(): {
    totalEntradas: number;
    entradasExpiradas: number;
    tamanoMemoria: string;
  } {
    const total = this.cache.size;
    let expiradas = 0;
    const now = Date.now();

    for (const entry of this.cache.values()) {
      if (now > entry.timestamp + entry.ttl) {
        expiradas++;
      }
    }

    // Estimación aproximada del tamaño en memoria
    const tamanoBytes = JSON.stringify([...this.cache.entries()]).length;
    const tamanoKB = Math.round(tamanoBytes / 1024);

    return {
      totalEntradas: total,
      entradasExpiradas: expiradas,
      tamanoMemoria: `${tamanoKB} KB`,
    };
  }

  // Métodos privados

  private get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  private set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private generatePermisosUsuarioKey(
    idUsuario: string,
    idEmpresa: string,
    rolActivoId?: string,
  ): string {
    return `permisos:user:${idUsuario}:emp:${idEmpresa}:rol:${rolActivoId || 'default'}`;
  }

  private generateValidacionAccionKey(
    idUsuario: string,
    idEmpresa: string,
    codigoAccion: string,
    monto?: number,
    rolActivoId?: string,
  ): string {
    const montoStr = monto !== undefined ? `:monto:${monto}` : '';
    return `validacion:user:${idUsuario}:emp:${idEmpresa}:accion:${codigoAccion}:rol:${rolActivoId || 'default'}${montoStr}`;
  }

  private limpiarCacheExpirado(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.cache.delete(key));

    if (keysToDelete.length > 0) {
      this.logger.debug(
        `Cache: Limpieza automática - ${keysToDelete.length} entradas expiradas eliminadas`,
      );
    }
  }
}
