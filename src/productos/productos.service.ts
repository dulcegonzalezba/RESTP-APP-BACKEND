// productos.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/productos.entity';
import { CreateProductoDto } from './dto/productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // Obtener todos los productos
  findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  // Obtener producto por ID
  findOne(id: string): Promise<Producto | null> {
    return this.productoRepository.findOneBy({ productoulid: id });
  }

  // Crear producto
  create(dto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(dto);
    return this.productoRepository.save(producto);
  }

  // Eliminar producto
  async remove(id: string): Promise<void> {
    await this.productoRepository.delete(id);
  }
}
