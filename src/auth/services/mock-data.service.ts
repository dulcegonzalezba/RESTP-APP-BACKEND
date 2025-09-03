import { Injectable } from '@nestjs/common';
import { Usuario, Restaurante, Sucursal } from '../entities/user.entity';
import { Role } from '../enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MockDataService {
  private usuarios: Usuario[] = [];
  private restaurantes: Restaurante[] = [];
  private sucursales: Sucursal[] = [];

  constructor() {
    void this.initializeMockData();
  }

  private async initializeMockData() {
    // Crear restaurantes de prueba
    this.restaurantes = [
      {
        id: 'rest-001',
        nombre: 'La Casa del Sabor',
        descripcion: 'Restaurante de comida tradicional',
        activo: true,
        fechaCreacion: new Date('2024-01-01'),
      },
      {
        id: 'rest-002',
        nombre: 'Pizzería Italiana',
        descripcion: 'Auténtica pizza italiana',
        activo: true,
        fechaCreacion: new Date('2024-01-15'),
      },
      {
        id: 'rest-003',
        nombre: 'Sushi Zen',
        descripcion: 'Sushi fresco y delicioso',
        activo: true,
        fechaCreacion: new Date('2024-02-01'),
      },
    ];

    // Crear sucursales de prueba
    this.sucursales = [
      {
        id: 'suc-001',
        nombre: 'Casa del Sabor - Centro',
        direccion: 'Av. Principal 123, Centro',
        telefono: '555-0001',
        restauranteId: 'rest-001',
        activo: true,
        fechaCreacion: new Date('2024-01-05'),
      },
      {
        id: 'suc-002',
        nombre: 'Casa del Sabor - Norte',
        direccion: 'Blvd. Norte 456, Zona Norte',
        telefono: '555-0002',
        restauranteId: 'rest-001',
        activo: true,
        fechaCreacion: new Date('2024-01-10'),
      },
      {
        id: 'suc-003',
        nombre: 'Pizzería Italiana - Plaza',
        direccion: 'Plaza Comercial, Local 15',
        telefono: '555-0003',
        restauranteId: 'rest-002',
        activo: true,
        fechaCreacion: new Date('2024-01-20'),
      },
      {
        id: 'suc-004',
        nombre: 'Sushi Zen - Polanco',
        direccion: 'Av. Polanco 789',
        telefono: '555-0004',
        restauranteId: 'rest-003',
        activo: true,
        fechaCreacion: new Date('2024-02-05'),
      },
    ];

    // Crear usuarios de prueba con contraseñas hasheadas
    const hashedPassword = await bcrypt.hash('123456', 10);

    this.usuarios = [
      {
        id: 'user-001',
        nombre: 'Super Administrador',
        email: 'admin@sistema.com',
        password: hashedPassword,
        rol: Role.SUPER_ADMIN,
        activo: true,
        fechaCreacion: new Date('2024-01-01'),
      },
      {
        id: 'user-002',
        nombre: 'Juan Pérez',
        email: 'juan@casadelsabor.com',
        password: hashedPassword,
        rol: Role.RESTAURANTE_ADMIN,
        restauranteId: 'rest-001',
        activo: true,
        fechaCreacion: new Date('2024-01-02'),
      },
      {
        id: 'user-003',
        nombre: 'María González',
        email: 'maria@casadelsabor.com',
        password: hashedPassword,
        rol: Role.SUCURSAL_ADMIN,
        restauranteId: 'rest-001',
        sucursalId: 'suc-001',
        activo: true,
        fechaCreacion: new Date('2024-01-03'),
      },
      {
        id: 'user-004',
        nombre: 'Carlos Rodríguez',
        email: 'carlos@casadelsabor.com',
        password: hashedPassword,
        rol: Role.MESERO,
        restauranteId: 'rest-001',
        sucursalId: 'suc-001',
        activo: true,
        fechaCreacion: new Date('2024-01-04'),
      },
      {
        id: 'user-005',
        nombre: 'Ana López',
        email: 'ana@pizzaitaliana.com',
        password: hashedPassword,
        rol: Role.RESTAURANTE_ADMIN,
        restauranteId: 'rest-002',
        activo: true,
        fechaCreacion: new Date('2024-01-16'),
      },
      {
        id: 'user-006',
        nombre: 'Luis Martínez',
        email: 'luis@pizzaitaliana.com',
        password: hashedPassword,
        rol: Role.COCINERO,
        restauranteId: 'rest-002',
        sucursalId: 'suc-003',
        activo: true,
        fechaCreacion: new Date('2024-01-21'),
      },
      {
        id: 'user-007',
        nombre: 'Sofia Chen',
        email: 'sofia@sushizen.com',
        password: hashedPassword,
        rol: Role.RESTAURANTE_ADMIN,
        restauranteId: 'rest-003',
        activo: true,
        fechaCreacion: new Date('2024-02-02'),
      },
      {
        id: 'user-008',
        nombre: 'Miguel Torres',
        email: 'miguel@sushizen.com',
        password: hashedPassword,
        rol: Role.CAJERO,
        restauranteId: 'rest-003',
        sucursalId: 'suc-004',
        activo: true,
        fechaCreacion: new Date('2024-02-06'),
      },
    ];
  }

  // Métodos para usuarios
  findUserByEmail(email: string): Usuario | undefined {
    return this.usuarios.find((user) => user.email === email && user.activo);
  }

  findUserById(id: string): Usuario | undefined {
    return this.usuarios.find((user) => user.id === id && user.activo);
  }

  getAllUsers(): Usuario[] {
    return this.usuarios.filter((user) => user.activo);
  }

  getUsersByRestaurante(restauranteId: string): Usuario[] {
    return this.usuarios.filter(
      (user) => user.restauranteId === restauranteId && user.activo,
    );
  }

  getUsersBySucursal(sucursalId: string): Usuario[] {
    return this.usuarios.filter(
      (user) => user.sucursalId === sucursalId && user.activo,
    );
  }

  // Métodos para restaurantes
  getAllRestaurantes(): Restaurante[] {
    return this.restaurantes.filter((rest) => rest.activo);
  }

  findRestauranteById(id: string): Restaurante | undefined {
    return this.restaurantes.find((rest) => rest.id === id && rest.activo);
  }

  // Métodos para sucursales
  getAllSucursales(): Sucursal[] {
    return this.sucursales.filter((suc) => suc.activo);
  }

  findSucursalById(id: string): Sucursal | undefined {
    return this.sucursales.find((suc) => suc.id === id && suc.activo);
  }

  getSucursalesByRestaurante(restauranteId: string): Sucursal[] {
    return this.sucursales.filter(
      (suc) => suc.restauranteId === restauranteId && suc.activo,
    );
  }

  // Método para validar permisos
  hasPermission(user: Usuario, requiredRole: Role): boolean {
    const roleHierarchy = {
      [Role.SUPER_ADMIN]: 6,
      [Role.RESTAURANTE_ADMIN]: 5,
      [Role.SUCURSAL_ADMIN]: 4,
      [Role.CAJERO]: 3,
      [Role.COCINERO]: 2,
      [Role.MESERO]: 1,
    };

    return roleHierarchy[user.rol as Role] >= roleHierarchy[requiredRole];
  }

  // Método para verificar si un usuario puede acceder a un restaurante
  canAccessRestaurante(user: Usuario, restauranteId: string): boolean {
    if ((user.rol as Role) === Role.SUPER_ADMIN) return true;
    return user.restauranteId === restauranteId;
  }

  // Método para verificar si un usuario puede acceder a una sucursal
  canAccessSucursal(user: Usuario, sucursalId: string): boolean {
    if ((user.rol as Role) === Role.SUPER_ADMIN) return true;

    const sucursal = this.findSucursalById(sucursalId);
    if (!sucursal) return false;

    // Si es admin de restaurante, puede acceder a todas las sucursales del restaurante
    if (
      (user.rol as Role) === Role.RESTAURANTE_ADMIN &&
      user.restauranteId === sucursal.restauranteId
    ) {
      return true;
    }

    // Para otros roles, debe estar asignado específicamente a la sucursal
    return user.sucursalId === sucursalId;
  }
}
