import { Module } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { ReservacionesController } from './reservaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacione.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservacion])
  ],
  controllers: [ReservacionesController],
  providers: [ReservacionesService],
})

export class ReservacionesModule {}
