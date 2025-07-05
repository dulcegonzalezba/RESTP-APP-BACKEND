import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nombrecompleto: string;

  @IsString()
  usuario: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(4)
  pin: string;

  @IsString()
  @MinLength(6)
  contraseña: string;
}
