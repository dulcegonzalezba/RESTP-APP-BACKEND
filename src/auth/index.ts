/**
 * Exportaciones del sistema de seguridad avanzado
 * Índice centralizado para todos los componentes del sistema de permisos
 */

import { NivelRol } from './decorators/rol-minimo.decorator';

// Decoradores
export { RequierePermiso } from './decorators/requiere-permiso.decorator';
export { ValidarMontoLimite } from './decorators/validar-monto-limite.decorator';
export { RolMinimo, NivelRol } from './decorators/rol-minimo.decorator';
export { CurrentUser } from './decorators/current-user.decorator';
export { Roles } from './decorators/roles.decorator';

// Guards
export { JwtAuthGuard } from './guards/jwt-auth.guard';
export { RolesGuard } from './guards/roles.guard';
export { PermisosGuard } from './guards/permisos.guard';
export { MontoLimiteGuard } from './guards/monto-limite.guard';
export { RolMinimoGuard } from './guards/rol-minimo.guard';

// Interceptors
export { AuditoriaPermisosInterceptor } from './interceptors/auditoria-permisos.interceptor';
export { PerformancePermisosInterceptor } from './interceptors/performance-permisos.interceptor';

// Services
export { AuthService } from './auth.service';
export { SystemAuthService } from './services/system-auth.service';
export { PermisosService } from './services/permisos.service';
export { PermisosCache } from './services/permisos-cache.service';
export { MockDataService } from './services/mock-data.service';

// DTOs
export { LoginDto } from './dto/login.dto';
export { RegisterDto } from './dto/register.dto';
export { CrearUsuarioDto, ActualizarUsuarioDto } from './dto/admin.dto';
export { SystemLoginDto } from './dto/system-login.dto';
export {
  PermisoUsuarioDto,
  NavegacionItemDto,
  PermisosUsuarioResponseDto,
  ValidacionAccionDto,
  ValidacionRutaDto,
} from './dto/permisos.dto';

// Enums
export * from './enums';

// Strategies
export { JwtStrategy } from './strategies/jwt.strategy';

// Controllers
export { AuthController } from './auth.controller';
export { SystemAuthController } from './controllers/system-auth.controller';
export { AdminAvanzadoController } from './controllers/admin-avanzado.controller';

// Modules
export { AuthModule } from './auth.module';
export { PermisosModule } from './permisos.module';

/**
 * Constantes para uso en decoradores
 */
export const PERMISOS_METADATA_KEY = 'permisos';
export const MONTO_LIMITE_METADATA_KEY = 'montoLimite';
export const ROL_MINIMO_METADATA_KEY = 'rolMinimo';

/**
 * Tipos de utilidad
 */
export interface UsuarioAutenticado {
  sub: string;
  email: string;
  idEmpresa: string;
  rolActivo?: {
    id: string;
    nivel: NivelRol;
    nombre: string;
  };
  permisos?: string[];
}

export interface ValidacionPermiso {
  tienePermiso: boolean;
  motivo?: string;
  detalles?: any;
}

export interface ValidacionMontoLimite {
  puedeEjecutar: boolean;
  limiteMaximo?: number;
  montoSolicitado?: number;
  motivo?: string;
}

/**
 * Configuración por defecto del sistema
 */
export const CONFIGURACION_SEGURIDAD = {
  cache: {
    ttlPermisos: 10 * 60 * 1000, // 10 minutos
    ttlValidaciones: 2 * 60 * 1000, // 2 minutos
    limpiezaIntervalo: 5 * 60 * 1000, // 5 minutos
  },
  auditoria: {
    incluirRequestBody: true,
    incluirResponseBody: false,
    incluirHeaders: false,
  },
  performance: {
    umbralAlerta: 100, // ms
    habilitarMetricas: true,
  },
} as const;
