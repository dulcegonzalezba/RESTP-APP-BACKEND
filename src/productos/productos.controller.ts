import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { Producto } from './entities/productos.entity';
import { CreateProductoDto } from './dto/create-productos.dto';
import { ProductosService } from './productos.service';
import { UpdateProductoDto } from './dto/update-productos.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  public async findAll(): Promise<Producto[]> {
    //RETORNAMOS COMO PRUEBA
    return [
      {
        ProductoULID: 'abc123',
        Nombredelproducto: 'Producto simulado',
        ClaveProducto: 'P001',
        TipoProducto: 'normal',
        Favorito: false,
        Descripcion: 'Este es un producto de prueba',
        ExentoImpuesto: false,
        PrecioAbierto: false,
        UnidadesULID: 'u1',
        AreaProduccionULID  : 'area1',
        AlmacenULID: 'alm1',
        ControlStock: true,
        PrecioxUtilidadad: false,
        Facturable: true,
        ClaveTributaria: '01010101',
        Suspendido: false,
        Comedor: true,
        ADomicilio: true,
        Mostrador: true,
        Enlinea: true,
        EnAPP: true,
        EnMenuQR: false,
        ClasificacionQRULID: 'cl1',
        DatosDinamicos: { extra: 'info' },
        Fecha_UltimoCambio: new Date(),
        Fecha_Sync: new Date(),
        UsuarioULID: 'user1',
        EmpresaULID: 'emp1',
        GrupoProductoULID: 'g1',
        SubgrupoProductoULID: 'sg1',
        CanalesVenta: true,
      }
    ];
    return this.productosService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Producto | null> {
    return {
        ProductoULID: 'abc123',
        Nombredelproducto: 'Producto simulado',
        ClaveProducto: 'P001',
        TipoProducto: 'normal',
        Favorito: false,
        Descripcion: 'Este es un producto de prueba',
        ExentoImpuesto: false,
        PrecioAbierto: false,
        UnidadesULID: 'u1',
        AreaProduccionULID  : 'area1',
        AlmacenULID: 'alm1',
        ControlStock: true,
        PrecioxUtilidadad: false,
        Facturable: true,
        ClaveTributaria: '01010101',
        Suspendido: false,
        Comedor: true,
        ADomicilio: true,
        Mostrador: true,
        Enlinea: true,
        EnAPP: true,
        EnMenuQR: false,
        ClasificacionQRULID: 'cl1',
        DatosDinamicos: { extra: 'info' },
        Fecha_UltimoCambio: new Date(),
        Fecha_Sync: new Date(),
        UsuarioULID: 'user1',
        EmpresaULID: 'emp1',
        GrupoProductoULID: 'g1',
        SubgrupoProductoULID: 'sg1',
        CanalesVenta: true,
      }
    return this.productosService.findOne(id);
  }

  @Post()
  public async create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productosService.create(createProductoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }
  
}
