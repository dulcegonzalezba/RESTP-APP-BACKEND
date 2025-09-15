import { Module } from '@nestjs/common';
import { PermisosService } from './services/permisos.service';
import { PermisosController } from './controllers/permisos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PermisosController],
  providers: [PermisosService],
  exports: [PermisosService],
})
export class PermisosModule {}
