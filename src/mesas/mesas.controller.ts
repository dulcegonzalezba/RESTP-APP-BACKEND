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
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@ApiTags('Mesas')
@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva mesa' })
  @ApiResponse({ status: 201, description: 'Mesa creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createMesaDto: CreateMesaDto) {
    return this.mesasService.create(createMesaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mesas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de mesas obtenida exitosamente',
  })
  findAll() {
    return this.mesasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una mesa por ID' })
  @ApiParam({ name: 'id', description: 'ID único de la mesa' })
  @ApiResponse({ status: 200, description: 'Mesa encontrada' })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
  findOne(@Param('id') id: string) {
    return this.mesasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una mesa' })
  @ApiParam({ name: 'id', description: 'ID único de la mesa' })
  @ApiResponse({ status: 200, description: 'Mesa actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
  update(@Param('id') id: string, @Body() updateMesaDto: UpdateMesaDto) {
    return this.mesasService.update(id, updateMesaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una mesa' })
  @ApiParam({ name: 'id', description: 'ID único de la mesa' })
  @ApiResponse({ status: 200, description: 'Mesa eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
  remove(@Param('id') id: string) {
    return this.mesasService.remove(id);
  }
}
