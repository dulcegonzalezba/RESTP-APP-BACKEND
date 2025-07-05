import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private  readonly jwtService: JwtService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    if(!user) throw new BadRequestException('No se pudo registrar el usuario');
    return user;
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const newAccessToken = await this.jwtService.signAsync({
        sub: payload.sub,
        correo: payload.correo,
        nombre: payload.nombre,
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
