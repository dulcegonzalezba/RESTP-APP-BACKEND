import { Injectable } from '@nestjs/common';
import { CreateReservacionDto } from './dto/create-reservacione.dto';
import { UpdateReservacionDto } from './dto/update-reservacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservacionesService {
  constructor(
    @InjectRepository(Reservacion)
    private readonly reservacionRepository: Repository<Reservacion>,
  ) {}
  
  public create(createReservacionDto: CreateReservacionDto) {
    const reservacion = this.reservacionRepository.create(createReservacionDto);
    return this.reservacionRepository.save(reservacion);
  }

  public findAll() {
    return this.reservacionRepository.find();
  }

  public findOne(id: string) {
    return this.reservacionRepository.findOneBy({ reservacionulid: id });
  }

  public async update(id: string, updateReservacionDto: UpdateReservacionDto): Promise<Reservacion | null> {
    await this.reservacionRepository.update(id, updateReservacionDto);
    return this.reservacionRepository.findOneBy({ reservacionulid: id });
  }

  public async remove(id: string): Promise<void> {
    await this.reservacionRepository.delete(id);
  }
}
