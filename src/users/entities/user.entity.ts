import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { ulid } from "ulid";

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 26 })
  usuarioulid: string;

  @Column()
  nombrecompleto: string;

  @Column()
  usuario: string;

  @Column()
  correo: string;

  @Column()
  contraseña: string;

  @Column()
  pin: string;
  
  @Column({nullable: true})
  celular: string;

  @Column({nullable: true})
  puesto: string;

  @Column()
  esadministrador: boolean;

  @Column()
  suspendido: boolean;

  @Column({ type: 'timestamp', nullable: true})
  fechasuspension: Date;

  @Column()
  fecha_ultimocambio: Date;

  @Column()
  fecha_sync: string;

  @Column({nullable: true})
  usuario2ulid: string;

  @Column({nullable: true})
  empresaulid: string;

  @BeforeInsert()
  setId() {
    this.usuarioulid = ulid();
  }
}
