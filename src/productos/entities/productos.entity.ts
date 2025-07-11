// productos/entities/producto.entity.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryColumn()
  productoulid: string;

  @Column()
  grupoproductoulid: string;

  @Column()
  subgrupoproductoulid: string;

  @Column()
  claveproducto: string;

  @Column()
  tipoproducto: string; // podrías usar @Column({ type: 'enum', enum: TipoProducto }) si defines un enum

  @Column()
  nombredelproducto: string;

  @Column()
  favorito: boolean;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  exentoimpuesto: boolean;

  @Column()
  precioabierto: boolean;

  @Column()
  unidadesulid: string;

  @Column()
  areaproduccionulid: string;

  @Column()
  almacenulid: string;

  @Column()
  controlstock: boolean;

  @Column()
  precioxutilidad: boolean;

  @Column()
  facturable: boolean;

  @Column()
  clavetributaria: string;

  @Column()
  suspendido: boolean;

  @Column()
  comedor: boolean;

  @Column()
  adomicilio: boolean;

  @Column()
  mostrador: boolean;

  @Column()
  enlinea: boolean;

  @Column()
  enapp: boolean;

  @Column()
  canalesventa: boolean;

  @Column()
  enmenuqr: boolean;

  @Column()
  clasificacionqrulid: string;

  @Column({ type: 'json' })
  datosdinamicos: any;

  @Column({ type: 'timestamp' })
  fecha_ultimocambio: Date;

  @Column({ type: 'timestamp' })
  fecha_sync: Date;

  @Column()
  usuarioulid: string;

  @Column()
  empresaulid: string;
}
