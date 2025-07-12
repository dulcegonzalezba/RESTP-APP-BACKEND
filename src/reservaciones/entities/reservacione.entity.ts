// reservaciones/entities/reservacion.entity.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('reservaciones')
export class Reservacion {
  @PrimaryColumn()
  reservacionulid: string;

  @Column({ nullable: true })
  canalreservacion?: string; // USER-DEFINED → puedes definir enum

  @Column({ nullable: true })
  comisionistaulid?: string;

  @Column({ nullable: true })
  tiporeservacionulid?: string;

  @Column({ type: 'boolean', nullable: true })
  listadeespera?: boolean;

  @Column({ type: 'boolean', nullable: true })
  niños?: boolean;

  @Column({ type: 'numeric', nullable: true })
  cantidadniños?: number;

  @Column({ type: 'boolean', nullable: true })
  mascotas?: boolean;

  @Column({ type: 'boolean', nullable: true })
  silladeruedas?: boolean;

  @Column({ type: 'boolean', nullable: true })
  sillabebe?: boolean;

  @Column({ nullable: true })
  clienteulid?: string;

  @Column({ nullable: true })
  clientenombre?: string;

  @Column({ nullable: true })
  paiscelular?: string;

  @Column({ nullable: true })
  clientecelular?: string;

  @Column({ nullable: true })
  clientecorreo?: string;

  @Column({ type: 'int', nullable: true })
  numeropersonas?: number;

  @Column({ nullable: true })
  notas?: string;

  @Column({ nullable: true })
  mesaulid?: string;

  @Column({ type: 'timestamp', nullable: true })
  fechareservacion?: Date;

  @Column({ type: 'time', nullable: true })
  horareservacion?: string;

  @Column({ type: 'numeric', nullable: true })
  tiempodeespera?: number;

  @Column({ nullable: true })
  estadoreservacion?: string; // USER-DEFINED → podrías usar enum

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  fecha_ultimocambio?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  fecha_sync?: Date;

  @Column({ nullable: true })
  usuarioulid?: string;

  @Column({ nullable: true })
  empresaulid?: string;
}
