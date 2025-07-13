// productos/dto/create-producto.dto.ts

export class CreateProductoDto {
  ProductoULID: string
  GrupoProductoULID?: string
  SubgrupoProductoULID?: string
  ClaveProducto: string
  TipoProducto: "Platillo" | "Producto" | "Botella"
  Nombredelproducto: string
  Favorito: boolean
  Descripcion: string
  ExentoImpuesto: boolean
  PrecioAbierto: boolean
  UnidadesULID?: string
  AreaProduccionULID?: string
  AlmacenULID?: string
  ControlStock: boolean
  PrecioxUtilidadad: boolean
  Facturable: boolean
  ClaveTributaria?: string
  Suspendido: boolean
  Comedor: boolean
  ADomicilio: boolean
  Mostrador: boolean
  Enlinea: boolean
  EnAPP: boolean
  EnMenuQR: boolean
  ClasificacionQRULID?: string
  DatosDinamicos?: Record<string, any>
  Fecha_UltimoCambio: string
  Fecha_Sync: string
  UsuarioULID: string
  EmpresaULID: string
}
