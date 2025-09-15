import { SetMetadata } from '@nestjs/common';

/**
 * Decorator para endpoints que requieren validación de límites monetarios
 * @param campo Campo del body que contiene el monto a validar
 * @param opciones Opciones adicionales para la validación
 *
 * @example
 * @ValidarMontoLimite('monto')
 * async crearFactura(@Body() data: { monto: number }) { ... }
 *
 * @example
 * @ValidarMontoLimite('total', {
 *   accionAlternativa: 'AUTORIZAR_MONTO_ALTO',
 *   mensaje: 'Monto excede límite permitido'
 * })
 * async procesarPago(@Body() data: { total: number }) { ... }
 */
export const ValidarMontoLimite = (
  campo: string,
  opciones?: {
    accionAlternativa?: string;
    mensaje?: string;
    permitirCero?: boolean;
  },
) => {
  return SetMetadata('validar-monto-limite', {
    campo,
    accionAlternativa: opciones?.accionAlternativa,
    mensaje:
      opciones?.mensaje || `Monto en campo '${campo}' excede límite permitido`,
    permitirCero: opciones?.permitirCero || false,
  });
};

// Clave para obtener los metadatos del decorator
export const VALIDAR_MONTO_LIMITE_KEY = 'validar-monto-limite';

// Tipo para los metadatos del decorator
export interface ValidarMontoLimiteMetadata {
  campo: string;
  accionAlternativa?: string;
  mensaje: string;
  permitirCero: boolean;
}
