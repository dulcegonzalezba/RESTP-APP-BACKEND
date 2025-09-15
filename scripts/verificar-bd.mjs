import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function verificarRoles() {
  console.log('🔍 Verificando roles existentes...');

  const roles = await prisma.$queryRaw`
        SELECT id_rol, codigo, nombre FROM "rest_test"."roles" WHERE activo = true
    `;

  console.log(`📊 Roles encontrados: ${roles.length}`);
  roles.forEach((rol) => {
    console.log(`   - ${rol.codigo} (${rol.nombre})`);
  });

  const modulos = await prisma.$queryRaw`
        SELECT codigo, nombre FROM "global_sistema"."modulos" WHERE activo = true ORDER BY orden_visualizacion
    `;

  console.log(`\n📦 Módulos encontrados: ${modulos.length}`);
  modulos.forEach((modulo) => {
    console.log(`   - ${modulo.codigo} (${modulo.nombre})`);
  });

  const acciones = await prisma.$queryRaw`
        SELECT COUNT(*) as total FROM "global_sistema"."modulo_acciones" WHERE activo = true
    `;

  console.log(`\n⚡ Total de acciones: ${acciones[0].total}`);

  const licencias = await prisma.$queryRaw`
        SELECT codigo, nombre FROM "global_sistema"."licencias" WHERE activo = true
    `;

  console.log(`\n🔑 Licencias encontradas: ${licencias.length}`);
  licencias.forEach((licencia) => {
    console.log(`   - ${licencia.codigo} (${licencia.nombre})`);
  });
}

async function main() {
  try {
    await verificarRoles();
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
