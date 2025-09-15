import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReservacionesService } from './reservaciones.service';
import { CreateReservacionDto } from './dto/create-reservacione.dto';
import { UpdateReservacionDto } from './dto/update-reservacione.dto';

@ApiTags('Reservaciones')
@Controller('reservaciones')
export class ReservacionesController {
  constructor(private readonly reservacionesService: ReservacionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reservación' })
  @ApiResponse({ status: 201, description: 'Reservación creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createReservacioneDto: CreateReservacionDto) {
    return this.reservacionesService.create(createReservacioneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reservaciones obtenida exitosamente',
  })
  findAll() {
    return this.reservacionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reservación por ID' })
  @ApiParam({ name: 'id', description: 'ID único de la reservación' })
  @ApiResponse({ status: 200, description: 'Reservación encontrada' })
  @ApiResponse({ status: 404, description: 'Reservación no encontrada' })
  findOne(@Param('id') id: string) {
    return this.reservacionesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reservación' })
  @ApiParam({ name: 'id', description: 'ID único de la reservación' })
  @ApiResponse({
    status: 200,
    description: 'Reservación actualizada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Reservación no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateReservacioneDto: UpdateReservacionDto,
  ) {
    return this.reservacionesService.update(id, updateReservacioneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reservación' })
  @ApiParam({ name: 'id', description: 'ID único de la reservación' })
  @ApiResponse({
    status: 200,
    description: 'Reservación eliminada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Reservación no encontrada' })
  remove(@Param('id') id: string) {
    return this.reservacionesService.remove(id);
  }
}
