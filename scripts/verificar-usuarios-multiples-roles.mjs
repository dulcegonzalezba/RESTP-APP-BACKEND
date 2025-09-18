import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function verificarUsuariosMultiplesRoles() {
  console.log('🔍 Verificando usuarios con múltiples roles...\n');

  try {
    // Buscar usuarios con múltiples roles
    const usuariosConMultiplesRoles = await prisma.usuario.findMany({
      include: {
        usuarioRoles: {
          include: {
            rol: true,
          },
          where: {
            activo: true,
          },
          orderBy: {
            prioridadUsuario: 'asc',
          },
        },
        empresa: {
          select: {
            nombre: true,
            codigo: true,
          },
        },
      },
      where: {
        usuarioRoles: {
          some: {
            activo: true,
          },
        },
        activo: true,
      },
    });

    console.log(`📊 Encontrados ${usuariosConMultiplesRoles.length} usuarios activos\n`);

    // Analizar cada usuario
    for (const usuario of usuariosConMultiplesRoles) {
      const rolesActivos = usuario.usuarioRoles.filter(ur => ur.activo);
      
      if (rolesActivos.length > 1) {
        console.log(`👤 ${usuario.nombre} ${usuario.apellidoPaterno} (${usuario.email})`);
        console.log(`   📧 Usuario: ${usuario.nombreUsuario}`);
        console.log(`   🏢 Empresa: ${usuario.empresa.nombre}`);
        console.log(`   📍 Sucursal: ${usuario.sucursal} | Área: ${usuario.area}`);
        console.log(`   🎯 ${rolesActivos.length} roles activos:`);
        
        rolesActivos.forEach((ur, index) => {
          const indicador = ur.esRolPrincipal ? '⭐' : '  ';
          const vigencia = ur.fechaFin ? `(hasta ${ur.fechaFin.toISOString().split('T')[0]})` : '(permanente)';
          
          console.log(`   ${indicador} ${index + 1}. ${ur.rol.nombre} - Prioridad: ${ur.prioridadUsuario}`);
          console.log(`        └─ Área: ${ur.areaEspecifica || 'Todas'} | Sucursal: ${ur.sucursalEspecifica || 'Todas'}`);
          console.log(`        └─ Turnos: ${JSON.stringify(ur.turnosAsignados)} ${vigencia}`);
          
          if (ur.limitesPersonalizados && Object.keys(ur.limitesPersonalizados).length > 0) {
            console.log(`        └─ Límites: ${JSON.stringify(ur.limitesPersonalizados)}`);
          }
        });
        
        console.log('');
      }
    }

    // Estadísticas
    const usuariosMultiplesRoles = usuariosConMultiplesRoles.filter(u => 
      u.usuarioRoles.filter(ur => ur.activo).length > 1
    );

    console.log('📈 ESTADÍSTICAS:');
    console.log(`   - Total usuarios: ${usuariosConMultiplesRoles.length}`);
    console.log(`   - Con múltiples roles: ${usuariosMultiplesRoles.length}`);
    console.log(`   - Porcentaje múltiples roles: ${((usuariosMultiplesRoles.length / usuariosConMultiplesRoles.length) * 100).toFixed(1)}%`);

    // Analizar roles temporales
    const totalRoles = usuariosConMultiplesRoles.reduce((acc, u) => acc + u.usuarioRoles.length, 0);
    const rolesTemporales = usuariosConMultiplesRoles.reduce((acc, u) => 
      acc + u.usuarioRoles.filter(ur => ur.fechaFin).length, 0
    );

    console.log(`   - Total asignaciones de roles: ${totalRoles}`);
    console.log(`   - Roles temporales: ${rolesTemporales}`);
    console.log(`   - Roles permanentes: ${totalRoles - rolesTemporales}`);

    // Verificar configuraciones especiales
    console.log('\n🔧 CONFIGURACIONES ESPECIALES:');
    
    for (const usuario of usuariosMultiplesRoles) {
      const rolesConLimites = usuario.usuarioRoles.filter(ur => 
        ur.limitesPersonalizados && Object.keys(ur.limitesPersonalizados).length > 0
      );
      
      if (rolesConLimites.length > 0) {
        console.log(`   ${usuario.nombreUsuario}: ${rolesConLimites.length} roles con límites personalizados`);
      }
    }

    // Generar datos para Postman
    console.log('\n📋 DATOS PARA POSTMAN:');
    console.log('┌─────────────────────────────────────────────────────────────────────┐');
    console.log('│ Email                              │ Usuario           │ Roles │ Pass │');
    console.log('├─────────────────────────────────────────────────────────────────────┤');
    
    usuariosMultiplesRoles.forEach(usuario => {
      const rolesCount = usuario.usuarioRoles.filter(ur => ur.activo).length;
      console.log(`│ ${usuario.email.padEnd(34)} │ ${usuario.nombreUsuario.padEnd(17)} │   ${rolesCount}   │test123│`);
    });
    
    console.log('└─────────────────────────────────────────────────────────────────────┘');

    // Lista de IDs para variables de Postman
    console.log('\n🔑 IDS PARA VARIABLES DE ENTORNO:');
    usuariosMultiplesRoles.forEach(usuario => {
      const rolesActivos = usuario.usuarioRoles.filter(ur => ur.activo);
      console.log(`${usuario.nombreUsuario}_user_id: ${usuario.id}`);
      
      rolesActivos.forEach(ur => {
        console.log(`${usuario.nombreUsuario}_rol_${ur.rol.codigo.replace('rol_', '')}_id: ${ur.idRol}`);
      });
      console.log('');
    });

    return {
      totalUsuarios: usuariosConMultiplesRoles.length,
      usuariosMultiplesRoles: usuariosMultiplesRoles.length,
      usuarios: usuariosMultiplesRoles.map(u => ({
        id: u.id,
        email: u.email,
        nombreUsuario: u.nombreUsuario,
        nombre: `${u.nombre} ${u.apellidoPaterno}`,
        roles: u.usuarioRoles.filter(ur => ur.activo).map(ur => ({
          id: ur.idRol,
          codigo: ur.rol.codigo,
          nombre: ur.rol.nombre,
          prioridad: ur.prioridadUsuario,
          esPrincipal: ur.esRolPrincipal,
          esTemporary: !!ur.fechaFin,
          fechaFin: ur.fechaFin,
        })),
      })),
    };

  } catch (error) {
    console.error('❌ Error al verificar usuarios:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la verificación
verificarUsuariosMultiplesRoles()
  .then((resultado) => {
    console.log('\n✅ Verificación completada exitosamente');
    
    if (resultado.usuariosMultiplesRoles === 0) {
      console.log('\n⚠️  NO SE ENCONTRARON USUARIOS CON MÚLTIPLES ROLES');
      console.log('💡 Ejecuta primero: node scripts/insertar-usuarios-multiples-roles.mjs');
    }
  })
  .catch((error) => {
    console.error('💥 Error en la verificación:', error);
    process.exit(1);
  });