// mesas/entities/mesa.entity.ts

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('mesas')
export class Mesa {
  @PrimaryColumn()
  mesaulid: string;

  @Column({ nullable: true })
  clavemesa?: string;

  @Column({ nullable: true })
  nombremesa?: string;

  @Column({ nullable: true })
  tipomesaulid?: string;

  @Column({ nullable: true })
  areaventasulid?: string;

  @Column({ type: 'int', nullable: true })
  comensalesmaximos?: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  fecha_ultimocambio?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  fecha_sync?: Date;

  @Column({ nullable: true })
  usuarioulid?: string;

  @Column({ nullable: true })
  empresaulid?: string;
}
