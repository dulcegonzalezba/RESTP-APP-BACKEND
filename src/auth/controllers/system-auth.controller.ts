import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { SystemAuthService } from '../services/system-auth.service';
import { MockDataService } from '../services/mock-data.service';
import { SystemLoginDto } from '../dto/system-login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Role } from '../enums/role.enum';

@Controller('system-auth')
export class SystemAuthController {
  constructor(
    private readonly systemAuthService: SystemAuthService,
    private readonly mockDataService: MockDataService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: SystemLoginDto) {
    return this.systemAuthService.login(loginDto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    if (!token) {
      throw new BadRequestException('Refresh token requerido');
    }
    return this.systemAuthService.refreshToken(token);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    const userEntity = await this.mockDataService.findUserById(user.sub);
    if (!userEntity) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    let restaurante: any = null;
    let sucursal: any = null;

    if (userEntity.restauranteId) {
      restaurante =
        this.mockDataService.findRestauranteById(userEntity.restauranteId) ||
        null;
    }

    if (userEntity.sucursalId) {
      sucursal =
        this.mockDataService.findSucursalById(userEntity.sucursalId) || null;
    }

    return {
      id: userEntity.id,
      nombre: userEntity.nombre,
      email: userEntity.email,
      rol: userEntity.rol,
      restaurante,
      sucursal,
      permissions: user.permissions,
    };
  }

  @Get('usuarios')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.RESTAURANTE_ADMIN)
  async getUsuarios(@CurrentUser() user: any) {
    if (user.rol === Role.SUPER_ADMIN) {
      // Super admin puede ver todos los usuarios
      return this.mockDataService.getAllUsers().map((u) => ({
        id: u.id,
        nombre: u.nombre,
        email: u.email,
        rol: u.rol,
        restauranteId: u.restauranteId,
        sucursalId: u.sucursalId,
        activo: u.activo,
        fechaCreacion: u.fechaCreacion,
      }));
    } else if (user.rol === Role.RESTAURANTE_ADMIN && user.restauranteId) {
      // Admin de restaurante solo puede ver usuarios de su restaurante
      return this.mockDataService
        .getUsersByRestaurante(user.restauranteId)
        .map((u) => ({
          id: u.id,
          nombre: u.nombre,
          email: u.email,
          rol: u.rol,
          sucursalId: u.sucursalId,
          activo: u.activo,
          fechaCreacion: u.fechaCreacion,
        }));
    }

    return [];
  }

  @Get('restaurantes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  async getRestaurantes() {
    return this.mockDataService.getAllRestaurantes();
  }

  @Get('sucursales')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.RESTAURANTE_ADMIN)
  async getSucursales(@CurrentUser() user: any) {
    if (user.rol === Role.SUPER_ADMIN) {
      return this.mockDataService.getAllSucursales();
    } else if (user.rol === Role.RESTAURANTE_ADMIN && user.restauranteId) {
      return this.mockDataService.getSucursalesByRestaurante(
        user.restauranteId,
      );
    }

    return [];
  }

  @Get('mi-restaurante')
  @UseGuards(JwtAuthGuard)
  async getMiRestaurante(@CurrentUser() user: any) {
    if (!user.restauranteId) {
      throw new BadRequestException('Usuario no asignado a un restaurante');
    }

    const restaurante = this.mockDataService.findRestauranteById(
      user.restauranteId,
    );
    if (!restaurante) {
      throw new BadRequestException('Restaurante no encontrado');
    }

    return restaurante;
  }

  @Get('mi-sucursal')
  @UseGuards(JwtAuthGuard)
  async getMiSucursal(@CurrentUser() user: any) {
    if (!user.sucursalId) {
      throw new BadRequestException('Usuario no asignado a una sucursal');
    }

    const sucursal = this.mockDataService.findSucursalById(user.sucursalId);
    if (!sucursal) {
      throw new BadRequestException('Sucursal no encontrada');
    }

    return sucursal;
  }
}
