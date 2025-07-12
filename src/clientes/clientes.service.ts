import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente) 
    private readonly clienteRepository: Repository<Cliente>
  ) {}

  public create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  public findAll() {
    return this.clienteRepository.find();
  }

  public findOne(id: string) {
    return this.clienteRepository.findOneBy({ clienteulid: id });
  }

  public async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente | null> {
    await this.clienteRepository.update(id, updateClienteDto);
    return this.clienteRepository.findOneBy({ clienteulid: id });
  }

  public async remove(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
