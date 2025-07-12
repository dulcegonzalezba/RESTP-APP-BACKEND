import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';

@Controller('reservaciones')
export class ReservacionesController {
  constructor(private readonly reservacionesService: ReservacionesService) {}

  @Post()
  create(@Body() createReservacioneDto: CreateReservacioneDto) {
    return this.reservacionesService.create(createReservacioneDto);
  }

  @Get()
  findAll() {
    return this.reservacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservacioneDto: UpdateReservacioneDto) {
    return this.reservacionesService.update(+id, updateReservacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservacionesService.remove(+id);
  }
}
