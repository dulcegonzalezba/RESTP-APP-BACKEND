import { PrismaClient } from '../generated/prisma/index.js';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function insertarAccionesCorregidas() {
    console.log('⚡ Insertando acciones con IDs corregidos...');
    
    // Obtener módulos existentes
    const modulos = await prisma.$queryRaw`
        SELECT id_modulo, codigo FROM "global_sistema"."modulos" WHERE activo = true
    `;
    
    const modulosMap = {};
    modulos.forEach(m => {
        modulosMap[m.codigo] = m.id_modulo;
    });
    
    // Verificar si REPORTES existe, si no, crearlo
    if (!modulosMap['REPORTES']) {
        console.log('📊 Creando módulo REPORTES...');
        const reportesId = createId();
        await prisma.$executeRaw`
            INSERT INTO "global_sistema"."modulos" (
                "id_modulo", "codigo", "nombre", "descripcion", "icono", "categoria", "orden_visualizacion", "activo"
            ) VALUES (
                ${reportesId}, 'REPORTES', 'Reportes', 'Sistema de reportes', 'chart', 'admin', 16, true
            )
        `;
        modulosMap['REPORTES'] = reportesId;
        console.log('✅ Módulo REPORTES creado');
    }
    
    const acciones = [
        // DASHBOARD
        { modulo: 'DASHBOARD', codigo: 'VER_RESUMEN_VENTAS', nombre: 'Ver Resumen de Ventas', orden: 2 },
        
        // PRODUCTOS
        { modulo: 'PRODUCTOS', codigo: 'CREAR_PRODUCTO', nombre: 'Crear Producto', orden: 2 },
        { modulo: 'PRODUCTOS', codigo: 'EDITAR_PRODUCTO', nombre: 'Editar Producto', orden: 3 },
        { modulo: 'PRODUCTOS', codigo: 'ELIMINAR_PRODUCTO', nombre: 'Eliminar Producto', orden: 4 },
        { modulo: 'PRODUCTOS', codigo: 'CAMBIAR_PRECIOS', nombre: 'Cambiar Precios', orden: 5 },
        { modulo: 'PRODUCTOS', codigo: 'GEST_CATEGORIAS', nombre: 'Gestionar Categorías', orden: 6 },
        
        // CLIENTES
        { modulo: 'CLIENTES', codigo: 'ELIMINAR_CLIENTE', nombre: 'Eliminar Cliente', orden: 4 },
        { modulo: 'CLIENTES', codigo: 'EXPORT_CLIENTES', nombre: 'Exportar Clientes', orden: 6 },
        
        // RESERVACIONES
        { modulo: 'RESERVACIONES', codigo: 'VER_RESERVACIONES', nombre: 'Ver Reservaciones', orden: 1 },
        { modulo: 'RESERVACIONES', codigo: 'CREAR_RESERVACION', nombre: 'Crear Reservación', orden: 2 },
        { modulo: 'RESERVACIONES', codigo: 'EDITAR_RESERVACION', nombre: 'Editar Reservación', orden: 3 },
        { modulo: 'RESERVACIONES', codigo: 'CANCEL_RESERVACION', nombre: 'Cancelar Reservación', orden: 4 },
        { modulo: 'RESERVACIONES', codigo: 'CONFIRMAR_LLEGADA', nombre: 'Confirmar Llegada', orden: 5 },
        { modulo: 'RESERVACIONES', codigo: 'GEST_LISTA_ESPERA', nombre: 'Gestionar Lista de Espera', orden: 6 },
        
        // FACTURAS
        { modulo: 'FACTURAS', codigo: 'MODIFICAR_FACTURA', nombre: 'Modificar Factura', orden: 3 },
        { modulo: 'FACTURAS', codigo: 'CANCELAR_FACTURA', nombre: 'Cancelar Factura', orden: 4 },
        { modulo: 'FACTURAS', codigo: 'REIMP_FACTURA', nombre: 'Reimprimir Factura', orden: 5 },
        { modulo: 'FACTURAS', codigo: 'APLICAR_DESCUENTO', nombre: 'Aplicar Descuento', orden: 6 },
        
        // RECETAS
        { modulo: 'RECETAS', codigo: 'VER_INGREDIENTES', nombre: 'Ver Ingredientes', orden: 5 },
        
        // REPORTES
        { modulo: 'REPORTES', codigo: 'VER_REP_VENTAS', nombre: 'Ver Reportes de Ventas', orden: 1 },
        { modulo: 'REPORTES', codigo: 'VER_REP_PRODUCTOS', nombre: 'Ver Reportes de Productos', orden: 2 },
        { modulo: 'REPORTES', codigo: 'VER_REP_CLIENTES', nombre: 'Ver Reportes de Clientes', orden: 3 },
        { modulo: 'REPORTES', codigo: 'VER_REP_INVENTARIO', nombre: 'Ver Reportes de Inventario', orden: 4 },
        { modulo: 'REPORTES', codigo: 'EXPORTAR_REPORTES', nombre: 'Exportar Reportes', orden: 5 },
        { modulo: 'REPORTES', codigo: 'PROGR_REPORTES', nombre: 'Programar Reportes', orden: 6 },
        
        // CATALOGOS
        { modulo: 'CATALOGOS', codigo: 'CREAR_CATEGORIA', nombre: 'Crear Categoría', orden: 2 },
        { modulo: 'CATALOGOS', codigo: 'EDITAR_CATEGORIA', nombre: 'Editar Categoría', orden: 3 },
        { modulo: 'CATALOGOS', codigo: 'ELIM_CATEGORIA', nombre: 'Eliminar Categoría', orden: 4 },
        { modulo: 'CATALOGOS', codigo: 'GEST_UNIDADES', nombre: 'Gestionar Unidades de Medida', orden: 5 },
        
        // ENCUESTAS
        { modulo: 'ENCUESTAS', codigo: 'CREAR_ENCUESTA', nombre: 'Crear Encuesta', orden: 2 },
        { modulo: 'ENCUESTAS', codigo: 'EDITAR_ENCUESTA', nombre: 'Editar Encuesta', orden: 3 },
        { modulo: 'ENCUESTAS', codigo: 'ELIM_ENCUESTA', nombre: 'Eliminar Encuesta', orden: 4 },
        { modulo: 'ENCUESTAS', codigo: 'VER_RESPUESTAS', nombre: 'Ver Respuestas', orden: 6 },
        { modulo: 'ENCUESTAS', codigo: 'ANAL_SATISFACCION', nombre: 'Analizar Satisfacción', orden: 7 },
        
        // CONFIG
        { modulo: 'CONFIG', codigo: 'VER_CONFIGURACION', nombre: 'Ver Configuración', orden: 1 },
        { modulo: 'CONFIG', codigo: 'CONFIG_EMPRESA', nombre: 'Configurar Empresa', orden: 2 },
        { modulo: 'CONFIG', codigo: 'GEST_USUARIOS', nombre: 'Gestionar Usuarios', orden: 3 },
        { modulo: 'CONFIG', codigo: 'CONFIG_IMPRESORAS', nombre: 'Configurar Impresoras', orden: 4 },
        { modulo: 'CONFIG', codigo: 'RESTAURAR_SISTEMA', nombre: 'Restaurar Sistema', orden: 6 }
    ];
    
    console.log('📋 Insertando acciones principales...');
    for (const accion of acciones) {
        try {
            const moduloId = modulosMap[accion.modulo];
            if (!moduloId) {
                console.log(`⚠️ Módulo ${accion.modulo} no encontrado`);
                continue;
            }
            
            const accionId = createId();
            await prisma.$executeRaw`
                INSERT INTO "global_sistema"."modulo_acciones" (
                    "id_modulo_accion", "id_modulo", "codigo", "nombre", "orden_visualizacion", "activo"
                ) VALUES (
                    ${accionId}, ${moduloId}, ${accion.codigo}, ${accion.nombre}, ${accion.orden}, true
                ) ON CONFLICT ("id_modulo", "codigo") DO NOTHING
            `;
            console.log(`✅ ${accion.modulo}.${accion.codigo} insertada`);
        } catch (error) {
            console.log(`⚠️ Error con ${accion.modulo}.${accion.codigo}:`, error.message);
        }
    }
    
    // Acciones especializadas
    const accionesEspecializadas = [
        // CAJERO_DASH
        { modulo: 'CAJERO_DASH', codigo: 'VER_RESUMEN_CAJA', nombre: 'Ver Resumen de Caja', orden: 1 },
        { modulo: 'CAJERO_DASH', codigo: 'VER_VENTAS_DIA', nombre: 'Ver Ventas del Día', orden: 2 },
        { modulo: 'CAJERO_DASH', codigo: 'CORTE_PARCIAL', nombre: 'Realizar Corte Parcial', orden: 3 },
        
        // MESERO_DASH
        { modulo: 'MESERO_DASH', codigo: 'VER_MESAS_ASIG', nombre: 'Ver Mesas Asignadas', orden: 1 },
        { modulo: 'MESERO_DASH', codigo: 'VER_ORD_PEND', nombre: 'Ver Órdenes Pendientes', orden: 2 },
        { modulo: 'MESERO_DASH', codigo: 'VER_COMISIONES', nombre: 'Ver Comisiones', orden: 3 },
        
        // MESERO_MESAS
        { modulo: 'MESERO_MESAS', codigo: 'ASIGNAR_MESA', nombre: 'Asignar Mesa', orden: 1 },
        { modulo: 'MESERO_MESAS', codigo: 'LIMPIAR_MESA', nombre: 'Limpiar Mesa', orden: 2 },
        { modulo: 'MESERO_MESAS', codigo: 'TRANSFERIR_MESA', nombre: 'Transferir Mesa', orden: 3 },
        
        // MESERO_ORDENES
        { modulo: 'MESERO_ORDENES', codigo: 'TOMAR_ORDEN', nombre: 'Tomar Orden', orden: 1 },
        { modulo: 'MESERO_ORDENES', codigo: 'MODIFICAR_ORDEN', nombre: 'Modificar Orden', orden: 2 },
        { modulo: 'MESERO_ORDENES', codigo: 'CANCELAR_ORDEN', nombre: 'Cancelar Orden', orden: 3 },
        { modulo: 'MESERO_ORDENES', codigo: 'ENVIAR_COCINA', nombre: 'Enviar a Cocina', orden: 4 },
        
        // COCINA_ORDENES
        { modulo: 'COCINA_ORDENES', codigo: 'VER_ORD_COCINA', nombre: 'Ver Órdenes de Cocina', orden: 1 },
        { modulo: 'COCINA_ORDENES', codigo: 'MARC_EN_PREP', nombre: 'Marcar en Preparación', orden: 2 },
        { modulo: 'COCINA_ORDENES', codigo: 'MARCAR_LISTO', nombre: 'Marcar Listo', orden: 3 },
        { modulo: 'COCINA_ORDENES', codigo: 'RECHAZAR_ORDEN', nombre: 'Rechazar Orden', orden: 4 },
        { modulo: 'COCINA_ORDENES', codigo: 'VER_TIEMPOS_PREP', nombre: 'Ver Tiempos de Preparación', orden: 5 }
    ];
    
    console.log('🔧 Insertando acciones especializadas...');
    for (const accion of accionesEspecializadas) {
        try {
            const moduloId = modulosMap[accion.modulo];
            if (!moduloId) {
                console.log(`⚠️ Módulo ${accion.modulo} no encontrado`);
                continue;
            }
            
            const accionId = createId();
            await prisma.$executeRaw`
                INSERT INTO "global_sistema"."modulo_acciones" (
                    "id_modulo_accion", "id_modulo", "codigo", "nombre", "orden_visualizacion", "activo"
                ) VALUES (
                    ${accionId}, ${moduloId}, ${accion.codigo}, ${accion.nombre}, ${accion.orden}, true
                ) ON CONFLICT ("id_modulo", "codigo") DO NOTHING
            `;
            console.log(`✅ ${accion.modulo}.${accion.codigo} insertada`);
        } catch (error) {
            console.log(`⚠️ Error con ${accion.modulo}.${accion.codigo}:`, error.message);
        }
    }
}

async function main() {
    try {
        console.log('🚀 Insertando acciones corregidas...');
        await insertarAccionesCorregidas();
        console.log('✅ ¡Todas las acciones insertadas exitosamente!');
        
        // Verificar totales
        const totalAcciones = await prisma.$queryRaw`
            SELECT COUNT(*) as total FROM "global_sistema"."modulo_acciones" WHERE activo = true
        `;
        console.log(`📊 Total de acciones: ${totalAcciones[0].total}`);
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();