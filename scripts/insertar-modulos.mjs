import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function insertarModulos() {
    console.log('📦 Insertando módulos...');
    
    const modulos = [
        {
            id: 'mod_dashboard',
            codigo: 'DASHBOARD',
            nombre: 'Dashboard Principal',
            descripcion: 'Vista general del restaurante',
            icono: 'dashboard',
            categoria: 'general',
            orden: 6
        },
        {
            id: 'mod_productos',
            codigo: 'PRODUCTOS',
            nombre: 'Gestión de Productos',
            descripcion: 'Gestión del menú y productos',
            icono: 'menu',
            categoria: 'operativo',
            orden: 7
        },
        {
            id: 'mod_mesas',
            codigo: 'MESAS',
            nombre: 'Gestión de Mesas',
            descripcion: 'Administración de mesas y layout',
            icono: 'table',
            categoria: 'operativo',
            orden: 8
        },
        {
            id: 'mod_clientes',
            codigo: 'CLIENTES',
            nombre: 'Gestión de Clientes',
            descripcion: 'Base de datos de clientes',
            icono: 'users',
            categoria: 'comercial',
            orden: 9
        },
        {
            id: 'mod_reservaciones',
            codigo: 'RESERVACIONES',
            nombre: 'Reservaciones',
            descripcion: 'Sistema de reservas',
            icono: 'calendar',
            categoria: 'comercial',
            orden: 10
        },
        {
            id: 'mod_catalogos',
            codigo: 'CATALOGOS',
            nombre: 'Catálogos Maestros',
            descripcion: 'Configuración de catálogos',
            icono: 'settings',
            categoria: 'admin',
            orden: 11
        },
        {
            id: 'mod_encuestas',
            codigo: 'ENCUESTAS',
            nombre: 'Encuestas SMS',
            descripcion: 'Campañas de satisfacción',
            icono: 'message',
            categoria: 'marketing',
            orden: 12
        },
        {
            id: 'mod_configuracion',
            codigo: 'CONFIG',
            nombre: 'Configuración',
            descripcion: 'Configuración del sistema',
            icono: 'cog',
            categoria: 'admin',
            orden: 13
        },
        {
            id: 'mod_facturas',
            codigo: 'FACTURAS',
            nombre: 'Facturación',
            descripcion: 'Sistema de facturación',
            icono: 'file-text',
            categoria: 'admin',
            orden: 14
        },
        {
            id: 'mod_recetas',
            codigo: 'RECETAS',
            nombre: 'Recetas',
            descripcion: 'Gestión de recetas y costo',
            icono: 'chef-hat',
            categoria: 'operativo',
            orden: 15
        }
    ];
    
    for (const modulo of modulos) {
        try {
            await prisma.$executeRaw`
                INSERT INTO "global_sistema"."modulos" (
                    "id_modulo", "codigo", "nombre", "descripcion", "icono", "categoria", "orden_visualizacion", "activo"
                ) VALUES (
                    ${modulo.id}, ${modulo.codigo}, ${modulo.nombre}, ${modulo.descripcion}, 
                    ${modulo.icono}, ${modulo.categoria}, ${modulo.orden}, true
                ) ON CONFLICT ("codigo") DO NOTHING
            `;
            console.log(`✅ Módulo ${modulo.codigo} insertado`);
        } catch (error) {
            console.log(`⚠️ Módulo ${modulo.codigo} ya existe o error:`, error.message);
        }
    }
    
    // Submódulos especializados
    const submodulos = [
        {
            id: 'mod_cajero_dash',
            codigo: 'CAJERO_DASH',
            nombre: 'Dashboard Cajero',
            descripcion: 'Vista específica para cajeros',
            icono: 'cashier',
            categoria: 'especializado',
            orden: 16
        },
        {
            id: 'mod_mesero_dash',
            codigo: 'MESERO_DASH',
            nombre: 'Dashboard Mesero',
            descripcion: 'Vista específica para meseros',
            icono: 'waiter',
            categoria: 'especializado',
            orden: 17
        },
        {
            id: 'mod_mesero_mesas',
            codigo: 'MESERO_MESAS',
            nombre: 'Mesas Mesero',
            descripcion: 'Gestión de mesas para meseros',
            icono: 'table-waiter',
            categoria: 'especializado',
            orden: 18
        },
        {
            id: 'mod_mesero_ordenes',
            codigo: 'MESERO_ORDENES',
            nombre: 'Órdenes Mesero',
            descripcion: 'Gestión de órdenes para meseros',
            icono: 'order-waiter',
            categoria: 'especializado',
            orden: 19
        },
        {
            id: 'mod_cocina_ordenes',
            codigo: 'COCINA_ORDENES',
            nombre: 'Órdenes Cocina',
            descripcion: 'Vista de órdenes para cocina',
            icono: 'kitchen-order',
            categoria: 'especializado',
            orden: 20
        }
    ];
    
    for (const submodulo of submodulos) {
        try {
            await prisma.$executeRaw`
                INSERT INTO "global_sistema"."modulos" (
                    "id_modulo", "codigo", "nombre", "descripcion", "icono", "categoria", "orden_visualizacion", "activo"
                ) VALUES (
                    ${submodulo.id}, ${submodulo.codigo}, ${submodulo.nombre}, ${submodulo.descripcion}, 
                    ${submodulo.icono}, ${submodulo.categoria}, ${submodulo.orden}, true
                ) ON CONFLICT ("codigo") DO NOTHING
            `;
            console.log(`✅ Submódulo ${submodulo.codigo} insertado`);
        } catch (error) {
            console.log(`⚠️ Submódulo ${submodulo.codigo} ya existe o error:`, error.message);
        }
    }
}

async function main() {
    try {
        console.log('🚀 Iniciando inserción de módulos...');
        await insertarModulos();
        console.log('✅ ¡Todos los módulos insertados exitosamente!');
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();