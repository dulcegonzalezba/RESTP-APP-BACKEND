import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verificarMigracion() {
  try {
    console.log('🔍 Verificando la migración de usuarios con múltiples roles...\n')

    // Verificar usuarios
    const usuarios = await prisma.usuario.findMany({
      where: {
        usuario: {
          in: ['supervisor_multi', 'empleado_polivalente', 'gerente_turno_multi', 'temporal_multi']
        }
      },
      include: {
        usuarioRoles: {
          include: {
            rol: true
          }
        }
      }
    })

    console.log(`✅ Usuarios encontrados: ${usuarios.length}`)
    
    for (const usuario of usuarios) {
      console.log(`\n📋 Usuario: ${usuario.usuario} (${usuario.nombre} ${usuario.apellido})`)
      console.log(`   Email: ${usuario.email}`)
      console.log(`   Estado: ${usuario.estado}`)
      console.log(`   Roles asignados: ${usuario.usuarioRoles.length}`)
      
      for (const usuarioRol of usuario.usuarioRoles) {
        const fechaFin = usuarioRol.fechaFin ? ` hasta ${usuarioRol.fechaFin.toISOString().split('T')[0]}` : ' (permanente)'
        console.log(`   - ${usuarioRol.rol.nombre} (prioridad: ${usuarioRol.prioridad})${fechaFin}`)
      }
    }

    // Verificar totales
    const totalUsuarios = await prisma.usuario.count()
    const totalRoles = await prisma.rol.count()
    const totalUsuarioRoles = await prisma.usuarioRol.count()
    
    console.log('\n📊 Resumen de la base de datos:')
    console.log(`   Total usuarios: ${totalUsuarios}`)
    console.log(`   Total roles: ${totalRoles}`)
    console.log(`   Total asignaciones usuario-rol: ${totalUsuarioRoles}`)

    // Verificar roles específicos
    const rolesEspecificos = await prisma.rol.findMany({
      where: {
        nombre: {
          in: ['supervisor', 'mesero', 'cajero', 'gerente_turno', 'inventario', 'limpieza']
        }
      }
    })
    
    console.log('\n🎭 Roles disponibles para testing:')
    rolesEspecificos.forEach(rol => {
      console.log(`   - ${rol.nombre} (${rol.descripcion})`)
    })

  } catch (error) {
    console.error('❌ Error verificando la migración:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verificarMigracion()