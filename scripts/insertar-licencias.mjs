import { PrismaClient } from '../generated/prisma/index.js';
import { ulid } from 'ulid';

const prisma = new PrismaClient();

async function insertarLicencias() {
  console.log('🔑 Insertando sistema de licencias...');

  // Obtener módulos existentes
  const modulos = await prisma.$queryRaw`
        SELECT id_modulo, codigo FROM "global_sistema"."modulos" WHERE activo = true
    `;

  const modulosMap = {};
  modulos.forEach((m) => {
    modulosMap[m.codigo] = m.id_modulo;
  });

  const licencias = [
    {
      codigo: 'GRATIS',
      nombre: 'Licencia Gratuita',
      descripcion: 'Acceso básico a funcionalidades esenciales',
      precio: 0.0,
      limitaciones: {
        usuarios: 2,
        sucursales: 1,
        mesas: 5,
        productos: 50,
        facturas_mes: 100,
      },
      modulos: ['DASHBOARD', 'POS', 'CAJA', 'PRODUCTOS', 'MESAS'],
    },
    {
      codigo: 'LITE',
      nombre: 'Licencia Lite',
      descripcion: 'Funcionalidades intermedias para restaurantes pequeños',
      precio: 299.0,
      limitaciones: {
        usuarios: 5,
        sucursales: 1,
        mesas: 15,
        productos: 200,
        facturas_mes: 500,
      },
      modulos: [
        'DASHBOARD',
        'POS',
        'CAJA',
        'PRODUCTOS',
        'MESAS',
        'CLIENTES',
        'INVENTARIO',
        'REPORTES',
      ],
    },
    {
      codigo: 'PRO',
      nombre: 'Licencia Pro',
      descripcion: 'Funcionalidades completas para restaurantes medianos',
      precio: 699.0,
      limitaciones: {
        usuarios: 15,
        sucursales: 3,
        mesas: 50,
        productos: 1000,
        facturas_mes: 2000,
      },
      modulos: [
        'DASHBOARD',
        'POS',
        'CAJA',
        'PRODUCTOS',
        'MESAS',
        'CLIENTES',
        'RESERVACIONES',
        'INVENTARIO',
        'REPORTES',
        'FACTURAS',
        'RECETAS',
        'CATALOGOS',
        'CAJERO_DASH',
        'MESERO_DASH',
        'MESERO_MESAS',
        'COCINA_ORDENES',
      ],
    },
    {
      codigo: 'FRANQUICIA',
      nombre: 'Licencia Franquicia',
      descripcion: 'Acceso completo sin limitaciones para franquicias',
      precio: 1299.0,
      limitaciones: {
        usuarios: -1, // Sin límite
        sucursales: -1,
        mesas: -1,
        productos: -1,
        facturas_mes: -1,
      },
      modulos: Object.keys(modulosMap), // Todos los módulos
    },
  ];

  // Insertar licencias
  for (const licencia of licencias) {
    try {
      const licenciaId = ulid();

      await prisma.$executeRaw`
                INSERT INTO "global_sistema"."licencias" (
                    "id_licencia", "codigo", "nombre", "descripcion", "precio", "limitaciones_globales", "activo"
                ) VALUES (
                    ${licenciaId}, ${licencia.codigo}, ${licencia.nombre}, ${licencia.descripcion}, 
                    ${licencia.precio}, ${JSON.stringify(licencia.limitaciones)}::jsonb, true
                ) ON CONFLICT ("codigo") DO NOTHING
            `;

      console.log(`✅ Licencia ${licencia.codigo} insertada`);

      // Insertar módulos de la licencia
      for (const moduloCodigo of licencia.modulos) {
        const moduloId = modulosMap[moduloCodigo];
        if (!moduloId) {
          console.log(
            `⚠️ Módulo ${moduloCodigo} no encontrado para licencia ${licencia.codigo}`,
          );
          continue;
        }

        try {
          const licenciaModuloId = ulid();
          await prisma.$executeRaw`
                        INSERT INTO "global_sistema"."licencia_modulos" (
                            "id_licencia_modulo", "id_licencia", "id_modulo", "incluido", "limitaciones"
                        ) VALUES (
                            ${licenciaModuloId}, ${licenciaId}, ${moduloId}, true, '{}'
                        ) ON CONFLICT ("id_licencia", "id_modulo") DO NOTHING
                    `;
        } catch (error) {
          console.log(
            `⚠️ Error insertando módulo ${moduloCodigo} para licencia ${licencia.codigo}`,
          );
        }
      }
    } catch (error) {
      console.log(`⚠️ Error con licencia ${licencia.codigo}:`, error.message);
    }
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando inserción de licencias...');
    await insertarLicencias();
    console.log('✅ ¡Sistema de licencias insertado exitosamente!');

    // Verificar totales
    const totalLicencias = await prisma.$queryRaw`
            SELECT COUNT(*) as total FROM "global_sistema"."licencias" WHERE activo = true
        `;

    const totalLicenciaModulos = await prisma.$queryRaw`
            SELECT COUNT(*) as total FROM "global_sistema"."licencia_modulos"
        `;

    console.log(`📊 Total de licencias: ${totalLicencias[0].total}`);
    console.log(
      `📊 Total de licencia-módulos: ${totalLicenciaModulos[0].total}`,
    );
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
