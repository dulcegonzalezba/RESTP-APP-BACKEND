import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret', // luego lo configuras con variables de entorno
    });
    this.configService = configService;
  }

  async validate(payload: any) {
    // Aquí decides qué devolver cuando el token sea válido
    return { userId: payload.sub, email: payload.email };
  }
}
