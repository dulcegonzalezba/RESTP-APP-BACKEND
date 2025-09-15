import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SystemAuthController } from './controllers/system-auth.controller';
import { AdminAvanzadoController } from './controllers/admin-avanzado.controller';
import { SystemAuthService } from './services/system-auth.service';
import { MockDataService } from './services/mock-data.service';
import { PermisosCache } from './services/permisos-cache.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { PermisosGuard } from './guards/permisos.guard';
import { MontoLimiteGuard } from './guards/monto-limite.guard';
import { RolMinimoGuard } from './guards/rol-minimo.guard';
import { AuditoriaPermisosInterceptor } from './interceptors/auditoria-permisos.interceptor';
import { PerformancePermisosInterceptor } from './interceptors/performance-permisos.interceptor';
import { PermisosModule } from './permisos.module';
import { ClientesModule } from 'src/clientes/clientes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    ClientesModule,
    PermisosModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
    }),
  ],
  controllers: [AuthController, SystemAuthController, AdminAvanzadoController],
  providers: [
    AuthService,
    SystemAuthService,
    MockDataService,
    PermisosCache,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    PermisosGuard,
    MontoLimiteGuard,
    RolMinimoGuard,
    AuditoriaPermisosInterceptor,
    PerformancePermisosInterceptor,
  ],
  exports: [
    AuthService,
    SystemAuthService,
    MockDataService,
    PermisosCache,
    JwtAuthGuard,
    PermisosGuard,
    MontoLimiteGuard,
    RolMinimoGuard,
    AuditoriaPermisosInterceptor,
    PerformancePermisosInterceptor,
    PermisosModule,
  ],
})
export class AuthModule {}
