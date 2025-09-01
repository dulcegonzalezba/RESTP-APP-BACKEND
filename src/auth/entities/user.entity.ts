export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: string;
  restauranteId?: string;
  sucursalId?: string;
  activo: boolean;
  fechaCreacion: Date;
}

export interface Restaurante {
  id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  fechaCreacion: Date;
}

export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  telefono?: string;
  restauranteId: string;
  activo: boolean;
  fechaCreacion: Date;
}
