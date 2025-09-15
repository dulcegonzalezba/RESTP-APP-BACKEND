/**
 * Enum para niveles jerárquicos de roles
 * Usado en el sistema de validación de roles mínimos
 */
export enum NivelRol {
  EMPLEADO = 1,
  SUPERVISOR = 2,
  GERENTE = 3,
  ADMINISTRADOR = 4,
}

/**
 * Mapeo de roles del sistema a niveles jerárquicos
 */
export const MAPEO_ROLES_NIVELES = {
  empleado: NivelRol.EMPLEADO,
  mesero: NivelRol.EMPLEADO,
  cocinero: NivelRol.EMPLEADO,
  cajero: NivelRol.EMPLEADO,
  supervisor: NivelRol.SUPERVISOR,
  sucursal_admin: NivelRol.SUPERVISOR,
  gerente: NivelRol.GERENTE,
  restaurante_admin: NivelRol.GERENTE,
  administrador: NivelRol.ADMINISTRADOR,
  super_admin: NivelRol.ADMINISTRADOR,
} as const;

/**
 * Función para obtener el nivel de un rol
 */
export function obtenerNivelRol(rol: string): NivelRol {
  return (
    MAPEO_ROLES_NIVELES[rol as keyof typeof MAPEO_ROLES_NIVELES] ||
    NivelRol.EMPLEADO
  );
}

/**
 * Función para verificar si un rol tiene nivel suficiente
 */
export function tieneNivelSuficiente(
  rolUsuario: string,
  nivelMinimo: NivelRol,
): boolean {
  const nivelUsuario = obtenerNivelRol(rolUsuario);
  return nivelUsuario >= nivelMinimo;
}
