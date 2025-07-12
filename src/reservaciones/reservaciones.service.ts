import { Injectable } from '@nestjs/common';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';

@Injectable()
export class ReservacionesService {
  create(createReservacioneDto: CreateReservacioneDto) {
    return 'This action adds a new reservacione';
  }

  findAll() {
    return `This action returns all reservaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservacione`;
  }

  update(id: number, updateReservacioneDto: UpdateReservacioneDto) {
    return `This action updates a #${id} reservacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservacione`;
  }
}
