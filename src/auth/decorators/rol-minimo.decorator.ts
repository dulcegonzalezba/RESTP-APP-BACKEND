import { SetMetadata } from '@nestjs/common';

/**
 * Niveles de roles en orden jerárquico (de menor a mayor privilegio)
 */
export enum NivelRol {
  COCINERO = 1,
  MESERO = 2,
  CAJERO = 3,
  SUPERVISOR = 4,
  GERENTE = 5,
  ADMINISTRADOR = 6,
}

/**
 * Mapeo de códigos de rol a niveles
 */
export const MAPA_NIVELES_ROL: Record<string, NivelRol> = {
  COCINERO: NivelRol.COCINERO,
  MESERO: NivelRol.MESERO,
  CAJERO: NivelRol.CAJERO,
  SUPERVISOR: NivelRol.SUPERVISOR,
  GERENTE: NivelRol.GERENTE,
  ADMINISTRADOR: NivelRol.ADMINISTRADOR,
};

/**
 * Decorator para endpoints que requieren un nivel mínimo de rol
 * @param nivelMinimo Nivel mínimo requerido
 * @param opciones Opciones adicionales
 *
 * @example
 * @RolMinimo(NivelRol.GERENTE)
 * async generarReporte() { ... }
 *
 * @example
 * @RolMinimo(NivelRol.SUPERVISOR, {
 *   mensaje: 'Solo supervisores o superiores pueden acceder'
 * })
 * async configurarSistema() { ... }
 */
export const RolMinimo = (
  nivelMinimo: NivelRol,
  opciones?: {
    mensaje?: string;
    permitirMismoNivel?: boolean;
  },
) => {
  return SetMetadata('rol-minimo', {
    nivelMinimo,
    mensaje:
      opciones?.mensaje ||
      `Se requiere nivel de rol mínimo: ${NivelRol[nivelMinimo]}`,
    permitirMismoNivel: opciones?.permitirMismoNivel ?? true,
  });
};

// Clave para obtener los metadatos del decorator
export const ROL_MINIMO_KEY = 'rol-minimo';

// Tipo para los metadatos del decorator
export interface RolMinimoMetadata {
  nivelMinimo: NivelRol;
  mensaje: string;
  permitirMismoNivel: boolean;
}
