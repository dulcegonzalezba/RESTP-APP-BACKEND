// clientes/entities/cliente.entity.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('clientes') // cambia a 'usuarios' si la tabla real se llama así
export class Cliente {
  @PrimaryColumn()
  clienteulid: string;

  @Column({ nullable: true })
  nombrecompleto?: string;

  @Column({ nullable: true })
  usuario?: string;

  @Column({ nullable: true })
  correo?: string;

  @Column({ nullable: true })
  contraseña?: string;

  @Column({ nullable: true })
  pin?: string;

  @Column({ nullable: true })
  celular?: string;

  @Column({ nullable: true })
  puesto?: string;

  @Column({ type: 'boolean', nullable: true })
  esadministrador?: boolean;

  @Column({ type: 'boolean', nullable: true })
  suspendido?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fechasuspension?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  fecha_ultimocambio?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  fecha_sync?: Date;

  @Column({ nullable: true })
  usuario2ulid?: string;

  @Column({ nullable: true })
  empresaulid?: string;
}
