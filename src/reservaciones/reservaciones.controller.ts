import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { CreateReservacionDto } from './dto/create-reservacione.dto';
import { UpdateReservacionDto } from './dto/update-reservacione.dto';

@Controller('reservaciones')
export class ReservacionesController {
  constructor(private readonly reservacionesService: ReservacionesService) {}

  @Post()
  create(@Body() createReservacioneDto: CreateReservacionDto) {
    return this.reservacionesService.create(createReservacioneDto);
  }

  @Get()
  findAll() {
    return this.reservacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservacionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservacioneDto: UpdateReservacionDto) {
    return this.reservacionesService.update(id, updateReservacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservacionesService.remove(id);
  }
}
