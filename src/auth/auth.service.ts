import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ulid } from 'ulid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({ correo: dto.correo });
    if (!user) throw new BadRequestException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.contraseña, user.contraseña);
    if (!valid) throw new BadRequestException('Credenciales inválidas');

    const payload = {
      sub: user.usuarioulid,
      correo: user.correo,
      nombre: user.nombrecompleto,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '8h'
    });
    const refresToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d'
    })

    return {
      accessToken: token,
      refresToken,
      user: payload,
    };
  }

  public async register(dto: RegisterDto): Promise<any> {
    const exists = await this.userRepository.findOneBy({ correo: dto.correo });
    if(exists) throw new BadRequestException('Correo ya registrado');

    //HASHEAMOS LA CONTRASEÑA
    const hashedPassword = await bcrypt.hash(dto.contraseña, 10);

    const user = this.userRepository.create({
      nombrecompleto: dto.nombrecompleto,
      correo: dto.correo,
      usuario: dto.usuario,
      contraseña: hashedPassword,
      pin: dto.pin,
      esadministrador: false,
      suspendido: false,
      fecha_ultimocambio: new Date(),
      fecha_sync: new Date().toISOString(),
    });

    return await this.userRepository.save(user);
  }

}
