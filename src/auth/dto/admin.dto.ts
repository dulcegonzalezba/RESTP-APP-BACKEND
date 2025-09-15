/**
 * DTOs para el sistema administrativo avanzado
 */

import { IsEmail, IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class CrearUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  nombreCompleto: string;

  @IsOptional()
  @IsPhoneNumber()
  telefono?: string;

  @IsString()
  idEmpresa: string;
}

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  nombreCompleto?: string;

  @IsOptional()
  @IsPhoneNumber()
  telefono?: string;

  @IsOptional()
  @IsString()
  idRol?: string;
}
