import { UpdateClienteDto } from './../clientes/dto/update-cliente.dto';
// productos.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/productos.entity';
import { CreateProductoDto } from './dto/create-productos.dto';
import { UpdateProductoDto } from './dto/update-productos.dto';

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
    return this.productoRepository.findOneBy({ ProductoULID: id });
  }

  // Crear producto
  create(dto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(dto);
    return this.productoRepository.save(producto);
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto | null> {
    await this.productoRepository.update(id, updateProductoDto);
    return this.productoRepository.findOneBy({ ProductoULID: id });
  }

  // Eliminar producto
  async remove(id: string): Promise<void> {
    await this.productoRepository.delete(id);
  }
}
