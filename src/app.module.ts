import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductosModule } from './productos/productos.module';
import { MesasModule } from './mesas/mesas.module';
import { ReservacionesModule } from './reservaciones/reservaciones.module';
import { ReportesModule } from './reportes/reportes.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    }),
    //MODULOS DE CADA ENTIDAD A PARTIR DE AQUÍ
    AuthModule,
    UsersModule,
    ProductosModule,
    MesasModule,
    ReservacionesModule,
    ReportesModule,
    ClientesModule
  ],
})
export class AppModule {}