import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Mesa } from './entities/mesa.entity';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private mesaRepository: Repository<Mesa>,
  ) {}

  create(createMesaDto: CreateMesaDto) {
    return this.mesaRepository.save(createMesaDto);
  }

  findAll() {
    return this.mesaRepository.find();
  }

  findOne(id: string) {
    return this.mesaRepository.findOne({ where: { mesaulid: id } });
  }

  update(id: string, updateMesaDto: UpdateMesaDto) {
    return this.mesaRepository.update(id, updateMesaDto);
  }

  remove(id: string) {
    return this.mesaRepository.delete(id);
  }
}
