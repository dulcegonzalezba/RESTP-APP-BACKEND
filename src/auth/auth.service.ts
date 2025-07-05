import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const payload = { sub: 'user_id_simulado', email: dto.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    // Aquí deberías guardar al nuevo usuario en la base de datos
    return {
      message: 'Usuario registrado correctamente (simulado)',
      user: {
        name: dto.name,
        email: dto.email,
      },
    };
  }
}
