import { SetMetadata } from '@nestjs/common';

/**
 * Decorator para marcar endpoints que requieren un permiso específico
 * @param codigoAccion Código de la acción que se debe validar
 * @param opciones Opciones adicionales para la validación
 *
 * @example
 * @RequierePermiso('CREAR_CLIENTE')
 * async crearCliente() { ... }
 *
 * @example
 * @RequierePermiso('PROCESAR_PAGO', { requiereAutorizacion: true })
 * async procesarPago() { ... }
 */
export const RequierePermiso = (
  codigoAccion: string,
  opciones?: {
    requiereAutorizacion?: boolean;
    mensaje?: string;
  },
) => {
  return SetMetadata('requiere-permiso', {
    codigoAccion,
    requiereAutorizacion: opciones?.requiereAutorizacion || false,
    mensaje: opciones?.mensaje || `Se requiere el permiso: ${codigoAccion}`,
  });
};

// Clave para obtener los metadatos del decorator
export const REQUIERE_PERMISO_KEY = 'requiere-permiso';

// Tipo para los metadatos del decorator
export interface RequierePermisoMetadata {
  codigoAccion: string;
  requiereAutorizacion: boolean;
  mensaje: string;
}
