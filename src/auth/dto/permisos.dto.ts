export interface PermisoUsuarioDto {
  id: string;
  codigo: string;
  nombre: string;
  modulo: string;
  permitido: boolean;
  limitacionMonetaria?: number;
  requiereAutorizacion: boolean;
}

export interface NavegacionItemDto {
  codigo: string;
  nombre: string;
  icono: string;
  ruta: string;
  categoria: string;
  orden: number;
  submenu?: NavegacionItemDto[];
}

export interface PermisosUsuarioResponseDto {
  usuario: {
    id: string;
    nombre: string;
    rol: string;
    licencia: string;
  };
  permisos: PermisoUsuarioDto[];
  navegacion: NavegacionItemDto[];
  limitaciones: Record<string, any>;
}

export interface ValidacionAccionDto {
  permitido: boolean;
  razon: string;
  requiereAutorizacion: boolean;
  limitacionMonetaria?: number;
}

export interface ValidacionRutaDto {
  permitido: boolean;
  razon: string;
  rutaInfo?: NavegacionItemDto;
}
