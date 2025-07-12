import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-productos.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
