import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Producto } from './entities/productos.entity';
import { CreateProductoDto } from './dto/create-productos.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  public async findAll(): Promise<Producto[]> {
    //RETORNAMOS COMO PRUEBA
    return [
      {
        productoulid: 'abc123',
        nombredelproducto: 'Producto simulado',
        claveproducto: 'P001',
        tipoproducto: 'normal',
        favorito: false,
        descripcion: 'Este es un producto de prueba',
        exentoimpuesto: false,
        precioabierto: false,
        unidadesulid: 'u1',
        areaproduccionulid: 'area1',
        almacenulid: 'alm1',
        controlstock: true,
        precioxutilidad: false,
        facturable: true,
        clavetributaria: '01010101',
        suspendido: false,
        comedor: true,
        adomicilio: true,
        mostrador: true,
        enlinea: true,
        enapp: true,
        canalesventa: true,
        enmenuqr: false,
        clasificacionqrulid: 'cl1',
        datosdinamicos: { extra: 'info' },
        fecha_ultimocambio: new Date(),
        fecha_sync: new Date(),
        usuarioulid: 'user1',
        empresaulid: 'emp1',
        grupoproductoulid: 'g1',
        subgrupoproductoulid: 'sg1',
      },
    ];
    return this.productosService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Producto | null> {
    return this.productosService.findOne(id);
  }

  @Post()
  public async create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productosService.create(createProductoDto);
  }
}
