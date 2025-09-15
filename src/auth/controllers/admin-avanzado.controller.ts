/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermisosGuard } from '../guards/permisos.guard';
import { MontoLimiteGuard } from '../guards/monto-limite.guard';
import { RolMinimoGuard } from '../guards/rol-minimo.guard';
import { RequierePermiso } from '../decorators/requiere-permiso.decorator';
import { ValidarMontoLimite } from '../decorators/validar-monto-limite.decorator';
import { RolMinimo } from '../decorators/rol-minimo.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuditoriaPermisosInterceptor } from '../interceptors/auditoria-permisos.interceptor';
import { PerformancePermisosInterceptor } from '../interceptors/performance-permisos.interceptor';
import { PermisosService } from '../services/permisos.service';
import { NivelRol } from '../decorators/rol-minimo.decorator';
import { ActualizarUsuarioDto, CrearUsuarioDto } from '../dto/index';

/**
 * Controlador avanzado que demuestra el uso completo del sistema de permisos
 * con decoradores, guards e interceptors
 */
@ApiTags('Sistema de Administración Avanzado')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard)
@UseInterceptors(AuditoriaPermisosInterceptor, PerformancePermisosInterceptor)
export class AdminAvanzadoController {
  private readonly logger = new Logger(AdminAvanzadoController.name);

  constructor(private readonly permisosService: PermisosService) {}

  // ============================================================================
  // OPERACIONES ADMINISTRATIVAS CON VALIDACIÓN DE PERMISOS
  // ============================================================================

  /**
   * Ver dashboard administrativo - Requiere rol mínimo GERENTE
   */
  @Get('dashboard')
  @ApiOperation({ summary: 'Dashboard administrativo con métricas' })
  @ApiResponse({ status: 200, description: 'Dashboard obtenido exitosamente' })
  @RolMinimo(NivelRol.GERENTE)
  @UseGuards(RolMinimoGuard)
  async verDashboard(@CurrentUser() usuario: any) {
    return {
      mensaje: 'Dashboard administrativo',
      usuario: usuario.sub,
      metricas: {
        ventasHoy: 15000,
        clientesActivos: 245,
        reservacionesHoy: 12,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Crear usuario - Requiere permiso específico
   */
  @Post('usuarios')
  @ApiOperation({ summary: 'Crear nuevo usuario del sistema' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @RequierePermiso('CREAR_USUARIOS')
  @UseGuards(PermisosGuard)
  async crearUsuario(
    @Body() datosUsuario: CrearUsuarioDto,
    @CurrentUser() usuario: any,
  ) {
    this.logger.log(`Creando usuario por: ${usuario.sub}`);

    return {
      mensaje: 'Usuario creado exitosamente',
      id: 'nuevo-usuario-id',
      datosUsuario,
      creadoPor: usuario.sub,
    };
  }

  /**
   * Actualizar usuario - Requiere permiso específico
   */
  @Put('usuarios/:id')
  @ApiOperation({ summary: 'Actualizar usuario existente' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @RequierePermiso('EDITAR_USUARIOS')
  @UseGuards(PermisosGuard)
  async actualizarUsuario(
    @Param('id') idUsuario: string,
    @Body() datosActualizacion: ActualizarUsuarioDto,
    @CurrentUser() usuario: any,
  ) {
    return {
      mensaje: 'Usuario actualizado exitosamente',
      idUsuario,
      datosActualizacion,
      actualizadoPor: usuario.sub,
    };
  }

  /**
   * Eliminar usuario - Requiere rol ADMINISTRADOR y permiso específico
   */
  @Delete('usuarios/:id')
  @ApiOperation({ summary: 'Eliminar usuario del sistema' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @RolMinimo(NivelRol.ADMINISTRADOR)
  @RequierePermiso('ELIMINAR_USUARIOS')
  @UseGuards(RolMinimoGuard, PermisosGuard)
  async eliminarUsuario(
    @Param('id') idUsuario: string,
    @CurrentUser() usuario: any,
  ) {
    return {
      mensaje: 'Usuario eliminado exitosamente',
      idUsuario,
      eliminadoPor: usuario.sub,
      timestamp: new Date().toISOString(),
    };
  }

  // ============================================================================
  // OPERACIONES FINANCIERAS CON VALIDACIÓN DE MONTOS
  // ============================================================================

  /**
   * Procesar transacción con validación de monto límite
   */
  @Post('transacciones')
  @ApiOperation({ summary: 'Procesar transacción financiera' })
  @ApiResponse({
    status: 201,
    description: 'Transacción procesada exitosamente',
  })
  @RequierePermiso('PROCESAR_TRANSACCIONES')
  @ValidarMontoLimite('LIMITE_TRANSACCIONES')
  @UseGuards(PermisosGuard, MontoLimiteGuard)
  async procesarTransaccion(
    @Body() transaccion: { monto: number; concepto: string; cliente: string },
    @CurrentUser() usuario: any,
  ) {
    return {
      mensaje: 'Transacción procesada exitosamente',
      transaccion,
      procesadaPor: usuario.sub,
      id: `TXN-${Date.now()}`,
    };
  }

  /**
   * Aprobar reembolso con validación de monto y rol
   */
  @Post('reembolsos/:id/aprobar')
  @ApiOperation({ summary: 'Aprobar reembolso con validaciones múltiples' })
  @ApiResponse({ status: 200, description: 'Reembolso aprobado exitosamente' })
  @RolMinimo(NivelRol.SUPERVISOR)
  @RequierePermiso('APROBAR_REEMBOLSOS')
  @ValidarMontoLimite('LIMITE_REEMBOLSOS')
  @UseGuards(RolMinimoGuard, PermisosGuard, MontoLimiteGuard)
  async aprobarReembolso(
    @Param('id') idReembolso: string,
    @Body() datos: { monto: number; motivo: string },
    @CurrentUser() usuario: any,
  ) {
    return {
      mensaje: 'Reembolso aprobado exitosamente',
      idReembolso,
      monto: datos.monto,
      aprobadoPor: usuario.sub,
      timestamp: new Date().toISOString(),
    };
  }

  // ============================================================================
  // CONFIGURACIÓN DEL SISTEMA
  // ============================================================================

  /**
   * Actualizar configuración crítica - Solo ADMINISTRADOR
   */
  @Put('configuracion/critica')
  @ApiOperation({ summary: 'Actualizar configuración crítica del sistema' })
  @ApiResponse({
    status: 200,
    description: 'Configuración actualizada exitosamente',
  })
  @RolMinimo(NivelRol.ADMINISTRADOR)
  @RequierePermiso('CONFIGURAR_SISTEMA')
  @UseGuards(RolMinimoGuard, PermisosGuard)
  async actualizarConfiguracionCritica(
    @Body() configuracion: Record<string, any>,
    @CurrentUser() usuario: any,
  ) {
    return {
      mensaje: 'Configuración crítica actualizada',
      configuracion,
      actualizadaPor: usuario.sub,
      requiereReinicio: true,
    };
  }

  /**
   * Ver logs del sistema - Requiere permiso específico
   */
  @Get('logs')
  @ApiOperation({ summary: 'Consultar logs del sistema' })
  @ApiResponse({ status: 200, description: 'Logs obtenidos exitosamente' })
  @RequierePermiso('VER_LOGS_SISTEMA')
  @UseGuards(PermisosGuard)
  async verLogsSistema(
    @Query('nivel') nivel: string = 'info',
    @Query('limite') limite: number = 100,
    @CurrentUser() usuario: any,
  ) {
    return {
      logs: [
        {
          timestamp: new Date().toISOString(),
          nivel: 'info',
          mensaje: 'Sistema funcionando correctamente',
        },
        {
          timestamp: new Date(Date.now() - 60000).toISOString(),
          nivel: 'warn',
          mensaje: 'Cache de permisos próximo a llenarse',
        },
      ],
      filtros: { nivel, limite },
      consultadoPor: usuario.sub,
    };
  }

  // ============================================================================
  // ENDPOINTS DE DIAGNÓSTICO
  // ============================================================================

  /**
   * Estado del sistema de permisos
   */
  @Get('sistema/permisos/estado')
  @ApiOperation({ summary: 'Estado del sistema de permisos' })
  @ApiResponse({ status: 200, description: 'Estado obtenido exitosamente' })
  @RolMinimo(NivelRol.SUPERVISOR)
  @UseGuards(RolMinimoGuard)
  async estadoSistemaPermisos(@CurrentUser() usuario: any) {
    // En una implementación real, esto consultaría estadísticas reales
    return {
      estado: 'operativo',
      version: '1.0.0',
      estadisticasCache: {
        entradas: 156,
        hitRate: '94.2%',
        memoryUsage: '2.3 MB',
      },
      ultimaActualizacion: new Date().toISOString(),
      consultadoPor: usuario.sub,
    };
  }

  /**
   * Invalidar cache de permisos - Solo ADMINISTRADOR
   */
  @Post('sistema/cache/invalidar')
  @ApiOperation({ summary: 'Invalidar cache completo de permisos' })
  @ApiResponse({ status: 200, description: 'Cache invalidado exitosamente' })
  @RolMinimo(NivelRol.ADMINISTRADOR)
  @RequierePermiso('ADMINISTRAR_CACHE')
  @UseGuards(RolMinimoGuard, PermisosGuard)
  async invalidarCache(@CurrentUser() usuario: any) {
    return {
      mensaje: 'Cache de permisos invalidado completamente',
      ejecutadoPor: usuario.sub,
      timestamp: new Date().toISOString(),
    };
  }
}
