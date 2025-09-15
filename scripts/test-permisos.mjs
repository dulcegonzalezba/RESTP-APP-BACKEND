import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function probarSistemaPermisos() {
  console.log('🔍 Verificando sistema de permisos...\n');

  try {
    // 1. Verificar que tenemos usuarios con roles
    const usuariosConRoles = await prisma.usuario.findMany({
      include: {
        usuarioRoles: {
          include: {
            rol: true,
          },
        },
      },
      take: 3,
    });

    console.log('👥 Usuarios con roles:');
    usuariosConRoles.forEach((usuario) => {
      console.log(`  - ${usuario.nombre} (${usuario.email})`);
      usuario.usuarioRoles.forEach((ur) => {
        console.log(`    └─ Rol: ${ur.rol.nombre}`);
      });
    });

    // 2. Verificar permisos por rol
    const rolesConPermisos = await prisma.rol.findMany({
      include: {
        permisos: {
          include: {
            moduloAccion: {
              include: {
                modulo: true,
              },
            },
          },
        },
      },
      take: 2,
    });

    console.log('\n🔐 Permisos por rol:');
    rolesConPermisos.forEach((rol) => {
      console.log(`  - ${rol.nombre} (${rol.permisos.length} permisos)`);
      rol.permisos.slice(0, 3).forEach((permiso) => {
        console.log(
          `    └─ ${permiso.moduloAccion.modulo.nombre}: ${permiso.moduloAccion.nombre} (${permiso.permitido ? '✅' : '❌'})`,
        );
      });
      if (rol.permisos.length > 3) {
        console.log(`    └─ ... y ${rol.permisos.length - 3} más`);
      }
    });

    // 3. Verificar empresas con subscripciones
    const empresasConPlanes = await prisma.empresa.findMany({
      include: {
        subscripciones: {
          where: { activa: true },
          include: {
            plan: {
              include: {
                modulos: {
                  include: {
                    modulo: true,
                  },
                },
              },
            },
          },
        },
      },
      take: 2,
    });

    console.log('\n🏢 Empresas con planes activos:');
    empresasConPlanes.forEach((empresa) => {
      console.log(`  - ${empresa.nombre}`);
      empresa.subscripciones.forEach((sub) => {
        console.log(
          `    └─ Plan: ${sub.plan.nombre} (${sub.plan.modulos.length} módulos)`,
        );
        sub.plan.modulos.slice(0, 3).forEach((pm) => {
          console.log(`      └─ ${pm.modulo.nombre}`);
        });
      });
    });

    // 4. Conteos generales
    const stats = await Promise.all([
      prisma.modulo.count(),
      prisma.moduloAccion.count(),
      prisma.rol.count(),
      prisma.permiso.count(),
      prisma.usuario.count(),
    ]);

    console.log('\n📊 Estadísticas del sistema:');
    console.log(`  - Módulos: ${stats[0]}`);
    console.log(`  - Acciones: ${stats[1]}`);
    console.log(`  - Roles: ${stats[2]}`);
    console.log(`  - Permisos: ${stats[3]}`);
    console.log(`  - Usuarios: ${stats[4]}`);

    console.log('\n✅ Sistema de permisos funcionando correctamente!');
  } catch (error) {
    console.error('❌ Error verificando sistema de permisos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

probarSistemaPermisos();
