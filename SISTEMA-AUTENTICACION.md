# Sistema de Autenticación Restaurantes - Backend

## Descripción General

Este proyecto implementa un sistema de autenticación completo para una aplicación de gestión de restaurantes con soporte para múltiples restaurantes, sucursales y roles de usuario. El sistema está construido con **NestJS**, **TypeScript** y **JWT** para la autenticación.

## Características Principales

- ✅ **Doble Sistema de Autenticación**: 
  - Sistema administrativo (`/system-auth`) para empleados
  - Sistema de clientes (`/auth`) para usuarios finales
- ✅ **Gestión de Roles Jerárquicos**: Super Admin, Admin Restaurante, Admin Sucursal, Mesero, Cocinero, Cajero
- ✅ **Multi-Restaurante y Multi-Sucursal**: Soporte para múltiples restaurantes con sus respectivas sucursales
- ✅ **Datos de Prueba**: Sistema mock para desarrollo y testing
- ✅ **JWT Token Security**: Tokens de acceso y refresh tokens
- ✅ **Guards y Decoradores**: Protección de rutas basada en roles
- ✅ **Fácil Migración**: Diseñado para migrar fácilmente a base de datos real

## Estructura del Proyecto

```
src/auth/
├── controllers/
│   └── system-auth.controller.ts    # Controlador del sistema administrativo
├── decorators/
│   ├── current-user.decorator.ts    # Decorador para obtener usuario actual
│   └── roles.decorator.ts           # Decorador para especificar roles requeridos
├── dto/
│   ├── login.dto.ts                 # DTO para login de clientes
│   ├── register.dto.ts              # DTO para registro de clientes
│   └── system-login.dto.ts          # DTO para login del sistema administrativo
├── entities/
│   └── user.entity.ts               # Interfaces para Usuario, Restaurante, Sucursal
├── enums/
│   └── role.enum.ts                 # Enum con todos los roles del sistema
├── guards/
│   ├── jwt-auth.guard.ts            # Guard para validar JWT tokens
│   └── roles.guard.ts               # Guard para validar roles de usuario
├── services/
│   ├── mock-data.service.ts         # Servicio con datos de prueba
│   └── system-auth.service.ts       # Servicio de autenticación del sistema
├── strategies/
│   └── jwt.strategy.ts              # Estrategia JWT de Passport
├── auth.controller.ts               # Controlador para clientes
├── auth.service.ts                  # Servicio para clientes
└── auth.module.ts                   # Módulo principal de autenticación
```

## Roles y Permisos

### Jerarquía de Roles

1. **Super Admin** (`super_admin`)
   - Acceso completo al sistema
   - Gestión de todos los restaurantes y sucursales
   - Gestión de todos los usuarios

2. **Administrador de Restaurante** (`restaurante_admin`)
   - Gestión de su restaurante asignado
   - Gestión de todas las sucursales del restaurante
   - Gestión de usuarios de las sucursales del restaurante

3. **Administrador de Sucursal** (`sucursal_admin`)
   - Gestión de su sucursal asignada
   - Gestión de mesas y reservaciones
   - Supervisión del personal de la sucursal

4. **Mesero** (`mesero`)
   - Gestión de mesas y pedidos
   - Creación de reservaciones
   - Consulta de productos del menú

5. **Cocinero** (`cocinero`)
   - Visualización de pedidos
   - Actualización de estado de pedidos
   - Consulta de productos e ingredientes

6. **Cajero** (`cajero`)
   - Procesamiento de pagos
   - Facturación
   - Consulta de pedidos y productos

## API Endpoints

### Sistema Administrativo (`/system-auth`)

| Método | Endpoint                      | Descripción                      | Roles Requeridos              |
|--------|-------------------------------|----------------------------------|-------------------------------|
| POST   | `/system-auth/login`          | Login del sistema                | Público                       |
| POST   | `/system-auth/refresh`        | Renovar token                    | Autenticado                   |
| GET    | `/system-auth/profile`        | Perfil del usuario               | Autenticado                   |
| GET    | `/system-auth/usuarios`       | Lista de usuarios                | Super Admin, Restaurant Admin |
| GET    | `/system-auth/restaurantes`   | Lista de restaurantes            | Super Admin                   |
| GET    | `/system-auth/sucursales`     | Lista de sucursales              | Super Admin, Restaurant Admin |
| GET    | `/system-auth/mi-restaurante` | Info del restaurante del usuario | Autenticado                   |
| GET    | `/system-auth/mi-sucursal`    | Info de la sucursal del usuario  | Autenticado                   |

### Sistema de Clientes (`/auth`)

| Método | Endpoint         | Descripción              |
|--------|------------------|--------------------------|
| POST   | `/auth/login`    | Login de clientes        |
| POST   | `/auth/register` | Registro de clientes     |
| POST   | `/auth/refresh`  | Renovar token de cliente |

## Usuarios de Prueba

Todos los usuarios tienen la contraseña: `123456`

### Super Administrador
- **Email**: `admin@sistema.com`
- **Rol**: `super_admin`

### Restaurante "La Casa del Sabor"
- **Admin**: `juan@casadelsabor.com` (restaurante_admin)
- **Admin Sucursal**: `maria@casadelsabor.com` (sucursal_admin)
- **Mesero**: `carlos@casadelsabor.com` (mesero)

### Restaurante "Pizzería Italiana"
- **Admin**: `ana@pizzaitaliana.com` (restaurante_admin)
- **Cocinero**: `luis@pizzaitaliana.com` (cocinero)

### Restaurante "Sushi Zen"
- **Admin**: `sofia@sushizen.com` (restaurante_admin)
- **Cajero**: `miguel@sushizen.com` (cajero)

## Configuración

### Variables de Entorno

Archivo `.env`:
```env
# Database Configuration
DB_HOST=tu_host_db
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base_datos

# JWT Configuration
JWT_SECRET=tu_jwt_secret_muy_seguro_para_restaurantes_2024
JWT_EXPIRES_IN=8h
JWT_REFRESH_EXPIRES_IN=7d
```

### Instalación y Ejecución

```bash
# Instalar dependencias
bun install

# Modo desarrollo
bun run start:dev

# Modo producción
bun run build
bun run start:prod
```

## Uso con Postman

### Importar Colección

1. Importa el archivo `postman-collection.json` en Postman
2. La colección incluye todas las rutas configuradas
3. Las variables se actualizan automáticamente

### Ejemplo de Login

```json
POST /system-auth/login
{
  "email": "admin@sistema.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-001",
    "nombre": "Super Administrador",
    "email": "admin@sistema.com",
    "rol": "super_admin",
    "restaurante": null,
    "sucursal": null,
    "permissions": [
      "read:all",
      "write:all",
      "delete:all",
      "manage:usuarios",
      "manage:restaurantes",
      "manage:sucursales"
    ]
  }
}
```

## Uso en Código

### Proteger Rutas con Roles

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { Role } from './auth/enums/role.enum';

@Controller('mesas')
export class MesasController {
  
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MESERO, Role.SUCURSAL_ADMIN)
  async getMesas(@CurrentUser() user: any) {
    // Solo meseros y admins de sucursal pueden ver las mesas
    return this.mesasService.findAll();
  }
  
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUCURSAL_ADMIN)
  async createMesa(@CurrentUser() user: any, @Body() createMesaDto: any) {
    // Solo admins de sucursal pueden crear mesas
    return this.mesasService.create(createMesaDto);
  }
}
```

### Verificar Permisos Manualmente

```typescript
import { SystemAuthService } from './auth/services/system-auth.service';

@Injectable()
export class MiServicio {
  constructor(private systemAuthService: SystemAuthService) {}
  
  async operacionEspecial(user: any, restauranteId: string) {
    // Verificar si el usuario puede acceder al restaurante
    if (!this.systemAuthService.canAccessRestaurante(user, restauranteId)) {
      throw new ForbiddenException('No tienes acceso a este restaurante');
    }
    
    // Verificar permisos específicos
    if (!this.systemAuthService.hasPermission(user, 'write:productos')) {
      throw new ForbiddenException('No tienes permisos para gestionar productos');
    }
    
    // Continuar con la operación
  }
}
```

## Migración a Base de Datos

Para migrar el sistema a una base de datos real:

### 1. Convertir Interfaces a Entidades TypeORM

```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  rol: string;

  @Column({ nullable: true })
  restauranteId?: string;

  @Column({ nullable: true })
  sucursalId?: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @ManyToOne(() => Restaurante)
  @JoinColumn({ name: 'restauranteId' })
  restaurante: Restaurante;

  @ManyToOne(() => Sucursal)
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursal;
}
```

### 2. Crear Repositorios

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return this.userRepository.findOne({ 
      where: { email, activo: true },
      relations: ['restaurante', 'sucursal']
    });
  }
}
```

### 3. Actualizar el Auth Module

```typescript
// auth.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Restaurante, Sucursal]),
    // ... otros imports
  ],
  providers: [
    SystemAuthService,
    UserService, // En lugar de MockDataService
    // ... otros providers
  ],
})
export class AuthModule {}
```

## Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT tokens con expiración
- ✅ Refresh tokens para renovación segura
- ✅ Guards para protección de rutas
- ✅ Validación de roles jerárquicos
- ✅ Separación de contextos (admin vs cliente)

## Testing

Para probar el sistema:

1. **Usar Postman**: Importa la colección incluida
2. **Usuarios de prueba**: Utiliza las credenciales proporcionadas
3. **Flujos de testing**: Prueba diferentes roles y permisos
4. **Endpoints protegidos**: Verifica que los guards funcionen correctamente

## Próximos Pasos

- [ ] Migrar a base de datos real (PostgreSQL/MySQL)
- [ ] Implementar middleware de auditoría
- [ ] Agregar rate limiting
- [ ] Implementar logout con blacklist de tokens
- [ ] Agregar 2FA (autenticación de dos factores)
- [ ] Implementar gestión de sesiones
- [ ] Agregar logs de actividad de usuarios

## Soporte

Para preguntas o problemas con la implementación, revisa:

1. Los archivos de configuración en `src/auth/`
2. Los usuarios de prueba en `MockDataService`
3. La colección de Postman para ejemplos de uso
4. Los guards y decoradores para protección de rutas
