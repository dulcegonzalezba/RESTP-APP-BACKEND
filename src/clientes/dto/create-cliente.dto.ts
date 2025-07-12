// clientes/dto/create-cliente.dto.ts

export class CreateClienteDto {
  clienteulid: string;

  nombrecompleto?: string;
  usuario?: string;
  correo?: string;
  contraseña?: string;
  pin?: string;
  celular?: string;
  puesto?: string;
  esadministrador?: boolean;
  suspendido?: boolean;
  fechasuspension?: Date;
  usuario2ulid?: string;
  empresaulid?: string;
}
