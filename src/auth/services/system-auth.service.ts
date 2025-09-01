import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SystemLoginDto } from '../dto/system-login.dto';
import { MockDataService } from './mock-data.service';
import { Usuario } from '../entities/user.entity';
import { Role } from '../enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SystemAuthService {
  constructor(
    private readonly mockDataService: MockDataService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: SystemLoginDto) {
    const user = await this.mockDataService.findUserByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new BadRequestException('Credenciales inválidas');
    }

    if (!user.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Obtener información adicional del restaurante y sucursal
    let restaurante: any = null;
    let sucursal: any = null;

    if (user.restauranteId) {
      restaurante = this.mockDataService.findRestauranteById(user.restauranteId) || null;
    }

    if (user.sucursalId) {
      sucursal = this.mockDataService.findSucursalById(user.sucursalId) || null;
    }

    const payload = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
      restauranteId: user.restauranteId,
      sucursalId: user.sucursalId,
      permissions: this.getPermissions(user)
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '8h'
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d'
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        restaurante,
        sucursal,
        permissions: this.getPermissions(user)
      }
    };
  }

  async validateUser(userId: string): Promise<Usuario | null> {
    const user = await this.mockDataService.findUserById(userId);
    return user || null;
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.mockDataService.findUserById(payload.sub);
      
      if (!user || !user.activo) {
        throw new UnauthorizedException('Usuario no válido');
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
        restauranteId: user.restauranteId,
        sucursalId: user.sucursalId,
        permissions: this.getPermissions(user)
      };

      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '8h'
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  private getPermissions(user: Usuario): string[] {
    const permissions: string[] = [];

    switch (user.rol) {
      case Role.SUPER_ADMIN:
        permissions.push(
          'read:all',
          'write:all',
          'delete:all',
          'manage:usuarios',
          'manage:restaurantes',
          'manage:sucursales'
        );
        break;

      case Role.RESTAURANTE_ADMIN:
        permissions.push(
          'read:restaurante',
          'write:restaurante',
          'manage:sucursales',
          'manage:usuarios_sucursal',
          'read:reportes_restaurante'
        );
        break;

      case Role.SUCURSAL_ADMIN:
        permissions.push(
          'read:sucursal',
          'write:sucursal',
          'manage:mesas',
          'manage:reservaciones',
          'read:reportes_sucursal'
        );
        break;

      case Role.MESERO:
        permissions.push(
          'read:mesas',
          'write:pedidos',
          'read:productos',
          'write:reservaciones'
        );
        break;

      case Role.COCINERO:
        permissions.push(
          'read:pedidos',
          'write:pedidos_estado',
          'read:productos'
        );
        break;

      case Role.CAJERO:
        permissions.push(
          'read:pedidos',
          'write:facturacion',
          'read:productos',
          'write:pagos'
        );
        break;
    }

    return permissions;
  }

  // Métodos de utilidad para verificar permisos
  hasPermission(user: any, permission: string): boolean {
    return user.permissions?.includes(permission) || user.permissions?.includes('read:all');
  }

  canAccessRestaurante(user: any, restauranteId: string): boolean {
    if (user.rol === Role.SUPER_ADMIN) return true;
    return user.restauranteId === restauranteId;
  }

  canAccessSucursal(user: any, sucursalId: string): boolean {
    if (user.rol === Role.SUPER_ADMIN) return true;
    
    // Si es admin de restaurante, verificar que la sucursal pertenezca a su restaurante
    if (user.rol === Role.RESTAURANTE_ADMIN) {
      const sucursal = this.mockDataService.findSucursalById(sucursalId);
      return sucursal?.restauranteId === user.restauranteId;
    }

    // Para otros roles, debe estar asignado específicamente a la sucursal
    return user.sucursalId === sucursalId;
  }
}
