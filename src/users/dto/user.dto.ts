import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  Length,
  IsDateString,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombrecompleto: string;

  @IsString()
  usuario: string;

  @IsEmail()
  correo: string;

  @IsString()
  @Length(6)
  constraseña: string;

  @IsString()
  @Length(4, 8)
  pin: string;

  @IsString()
  celular: string;

  @IsString()
  puesto: string;

  @IsBoolean()
  esadministrador: boolean;

  @IsOptional()
  @IsString()
  usuario2ulid?: string;

  @IsOptional()
  @IsString()
  empresaulid?: string;

  @IsOptional()
  @IsDate()
  fechasuspension?: Date;
}
