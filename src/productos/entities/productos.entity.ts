import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryColumn({ name: 'productoulid' })
  ProductoULID: string;

  @Column({ name: 'grupoproductoulid', nullable: true })
  GrupoProductoULID?: string;

  @Column({ name: 'subgrupoproductoulid', nullable: true })
  SubgrupoProductoULID?: string;

  @Column({ name: 'claveproducto' })
  ClaveProducto: string;

  @Column({ name: 'tipoproducto' })
  TipoProducto: string;

  @Column({ name: 'nombredelproducto' })
  Nombredelproducto: string;

  @Column({ name: 'favorito' })
  Favorito: boolean;

  @Column({ name: 'descripcion', type: 'text' })
  Descripcion: string;

  @Column({ name: 'exentoimpuesto' })
  ExentoImpuesto: boolean;

  @Column({ name: 'precioabierto' })
  PrecioAbierto: boolean;

  @Column({ name: 'unidadesulid', nullable: true })
  UnidadesULID?: string;

  @Column({ name: 'areaproduccionulid', nullable: true })
  AreaProduccionULID?: string;

  @Column({ name: 'almacenulid', nullable: true })
  AlmacenULID?: string;

  @Column({ name: 'controlstock' })
  ControlStock: boolean;

  @Column({ name: 'precioxutilidadad' })
  PrecioxUtilidadad: boolean;

  @Column({ name: 'facturable' })
  Facturable: boolean;

  @Column({ name: 'clavetributaria', nullable: true })
  ClaveTributaria?: string;

  @Column({ name: 'suspendido' })
  Suspendido: boolean;

  @Column({ name: 'comedor' })
  Comedor: boolean;

  @Column({ name: 'adomicilio' })
  ADomicilio: boolean;

  @Column({ name: 'mostrador' })
  Mostrador: boolean;

  @Column({ name: 'enlinea' })
  Enlinea: boolean;

  @Column({ name: 'enapp' })
  EnAPP: boolean;

  @Column({ name: 'enmenuqr' })
  EnMenuQR: boolean;

  @Column({ name: 'clasificacionqrulid', nullable: true })
  ClasificacionQRULID?: string;

  @Column({ name: 'datosdinamicos', type: 'json', nullable: true })
  DatosDinamicos?: Record<string, any>;

  @Column({ name: 'fecha_ultimocambio', type: 'timestamp' })
  Fecha_UltimoCambio: Date;

  @Column({ name: 'fecha_sync', type: 'timestamp' })
  Fecha_Sync: Date;

  @Column({ name: 'usuarioulid' })
  UsuarioULID: string;

  @Column({ name: 'empresaulid' })
  EmpresaULID: string;

  @Column({ name: 'canalesventa' })
  CanalesVenta: boolean;
}
