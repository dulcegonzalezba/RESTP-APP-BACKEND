/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermisosService } from '../services/permisos.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import {
  PermisosUsuarioResponseDto,
  ValidacionAccionDto,
  ValidacionRutaDto,
  NavegacionItemDto,
} from '../dto/permisos.dto';

@Controller('auth/permisos')
@UseGuards(JwtAuthGuard)
export class PermisosController {
  private readonly logger = new Logger(PermisosController.name);

  constructor(private readonly permisosService: PermisosService) {}

  /**
   * GET /auth/permisos - Obtiene todos los permisos del usuario actual
   */
  @Get()
  async getPermisos(
    @CurrentUser() user: any,
    @Query('rolActivoId') rolActivoId?: string,
  ): Promise<PermisosUsuarioResponseDto> {
    this.logger.debug(`Obteniendo permisos para usuario: ${user.sub}`);

    return this.permisosService.getPermisosUsuario(
      user.sub,
      user.idEmpresa,
      rolActivoId,
    );
  }

  /**
   * POST /auth/permisos/validar-accion - Valida si el usuario puede ejecutar una acción
   */
  @Post('validar-accion')
  async validarAccion(
    @CurrentUser() user: any,
    @Body()
    body: {
      codigoAccion: string;
      montoTransaccion?: number;
      rolActivoId?: string;
    },
  ): Promise<ValidacionAccionDto> {
    this.logger.debug(
      `Validando acción: ${body.codigoAccion} para usuario: ${user.sub}`,
    );

    return this.permisosService.validarAccion(
      user.sub,
      user.idEmpresa,
      body.codigoAccion,
      body.montoTransaccion,
      body.rolActivoId,
    );
  }

  /**
   * POST /auth/permisos/validar-ruta - Valida si el usuario puede acceder a una ruta
   */
  @Post('validar-ruta')
  async validarRuta(
    @CurrentUser() user: any,
    @Body()
    body: {
      ruta: string;
      rolActivoId?: string;
    },
  ): Promise<ValidacionRutaDto> {
    this.logger.debug(`Validando ruta: ${body.ruta} para usuario: ${user.sub}`);

    return this.permisosService.validarRuta(
      user.sub,
      user.idEmpresa,
      body.ruta,
      body.rolActivoId,
    );
  }

  /**
   * GET /auth/permisos/navegacion - Obtiene la navegación permitida para el usuario
   */
  @Get('navegacion')
  async getNavegacion(
    @CurrentUser() user: any,
    @Query('rolActivoId') rolActivoId?: string,
  ): Promise<NavegacionItemDto[]> {
    this.logger.debug(`Obteniendo navegación para usuario: ${user.sub}`);

    return this.permisosService.obtenerNavegacion(
      user.sub,
      user.idEmpresa,
      rolActivoId,
    );
  }
}
