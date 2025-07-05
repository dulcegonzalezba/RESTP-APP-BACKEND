import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nombrecompleto: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contraseña: string;
}
