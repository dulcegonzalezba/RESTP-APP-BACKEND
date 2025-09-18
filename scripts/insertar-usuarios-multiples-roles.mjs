
import { PrismaClient } from '../generated/prisma/index.js';
import { ulid } from 'ulid';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function insertarUsuariosMultiplesRoles() {
  console.log('👥 Insertando usuarios de prueba con múltiples roles...\n');

  try {
    // Obtener referencias de empresa, horarios y roles existentes
    const empresa = await prisma.empresa.findUnique({
      where: { codigo: 'bella_vista' }
    });

    const horarios = await prisma.horario.findMany({
      where: { activo: true }
    });

    const roles = await prisma.rol.findMany({
      where: { activo: true }
    });

    if (!empresa || horarios.length === 0 || roles.length === 0) {
      throw new Error('❌ Faltan datos base (empresa, horarios o roles)');
    }

    console.log(`📊 Datos base encontrados:`);
    console.log(`   - Empresa: ${empresa.nombre}`);
    console.log(`   - Horarios: ${horarios.length}`);
    console.log(`   - Roles: ${roles.length}\n`);

    // Hash para passwords de prueba
    const passwordHash = await bcrypt.hash('test123', 10);

    // ===== USUARIO 1: SUPERVISOR MULTIFUNCIONAL =====
    const supervisorId = ulid();
    const supervisor = await prisma.usuario.create({
      data: {
        id: supervisorId,
        idEmpresa: empresa.id,
        numeroEmpleado: 'SUP001',
        nombreUsuario: 'supervisor.multi',
        email: 'supervisor.multi@bellavista.com',
        passwordHash,
        nombre: 'Ana Lucia',
        apellidoPaterno: 'Morales',
        apellidoMaterno: 'Vega',
        telefono: '3112345678',
        sucursal: 'sucursal_principal',
        area: 'gerencia',
        puesto: 'Supervisor Multifuncional',
        nivel: 'medio',
        fechaIngreso: new Date('2024-01-10'),
        idHorarioBase: horarios[1].id,
        idRolPorDefecto: roles.find(r => r.codigo === 'rol_subgerente')?.id,
        turnosDisponibles: ['mañana', 'tarde', 'noche'],
        accesoEfectivo: true,
        nivelAccesoCaja: 3,
        activo: true
      }
    });

    // Asignar múltiples roles al supervisor
    const rolesAsignarSupervisor = [
      {
        idRol: roles.find(r => r.codigo === 'rol_subgerente')?.id,
        prioridadUsuario: 1,
        esRolPrincipal: true,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'gerencia',
        turnosAsignados: ['mañana', 'tarde'],
        fechaInicio: new Date('2024-01-10')
      },
      {
        idRol: roles.find(r => r.codigo === 'rol_cajero')?.id,
        prioridadUsuario: 2,
        esRolPrincipal: false,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'caja',
        turnosAsignados: ['noche'],
        fechaInicio: new Date('2024-02-01')
      },
      {
        idRol: roles.find(r => r.codigo === 'rol_mesero')?.id,
        prioridadUsuario: 3,
        esRolPrincipal: false,
        sucursalEspecifica: null, // Válido en todas las sucursales
        areaEspecifica: 'salon',
        turnosAsignados: ['mañana', 'tarde', 'noche'],
        fechaInicio: new Date('2024-03-01'),
        fechaFin: new Date('2024-12-31') // Rol temporal hasta fin de año
      }
    ];

    for (const rolData of rolesAsignarSupervisor) {
      if (rolData.idRol) {
        await prisma.usuarioRol.create({
          data: {
            id: ulid(),
            idUsuario: supervisorId,
            ...rolData,
            limitesPersonalizados: {
              descuentoMaximo: rolData.idRol === roles.find(r => r.codigo === 'rol_cajero')?.id ? 30.0 : 15.0,
              montoMaximoVenta: 2000.00
            },
            terminalesAsignadas: ['TERM001', 'TERM002'],
            activo: true,
            fechaAsignacion: new Date()
          }
        });
      }
    }

    console.log(`✅ Usuario supervisor creado: ${supervisor.email}`);
    console.log(`   └─ ${rolesAsignarSupervisor.length} roles asignados\n`);

    // ===== USUARIO 2: EMPLEADO POLIVALENTE =====
    const polivalenteId = ulid();
    const polivalente = await prisma.usuario.create({
      data: {
        id: polivalenteId,
        idEmpresa: empresa.id,
        numeroEmpleado: 'POL001',
        nombreUsuario: 'empleado.polivalente',
        email: 'empleado.polivalente@bellavista.com',
        passwordHash,
        nombre: 'Roberto',
        apellidoPaterno: 'Fernández',
        apellidoMaterno: 'Castro',
        telefono: '3112345679',
        sucursal: 'sucursal_principal',
        area: 'operaciones',
        puesto: 'Empleado Polivalente',
        nivel: 'operativo',
        fechaIngreso: new Date('2024-02-01'),
        idHorarioBase: horarios[2].id,
        idRolPorDefecto: roles.find(r => r.codigo === 'rol_mesero')?.id,
        turnosDisponibles: ['mañana', 'tarde'],
        accesoEfectivo: false,
        nivelAccesoCaja: 1,
        activo: true
      }
    });

    // Asignar múltiples roles al empleado polivalente
    const rolesAsignarPolivalente = [
      {
        idRol: roles.find(r => r.codigo === 'rol_mesero')?.id,
        prioridadUsuario: 1,
        esRolPrincipal: true,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'salon',
        turnosAsignados: ['mañana', 'tarde'],
        fechaInicio: new Date('2024-02-01')
      },
      {
        idRol: roles.find(r => r.codigo === 'rol_cajero')?.id,
        prioridadUsuario: 2,
        esRolPrincipal: false,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'caja',
        turnosAsignados: ['tarde'],
        fechaInicio: new Date('2024-03-01')
      },
      {
        idRol: roles.find(r => r.codigo === 'rol_auxiliar_cocina')?.id,
        prioridadUsuario: 3,
        esRolPrincipal: false,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'cocina',
        turnosAsignados: ['mañana'],
        fechaInicio: new Date('2024-04-01')
      }
    ];

    for (const rolData of rolesAsignarPolivalente) {
      if (rolData.idRol) {
        await prisma.usuarioRol.create({
          data: {
            id: ulid(),
            idUsuario: polivalenteId,
            ...rolData,
            limitesPersonalizados: {
              descuentoMaximo: 10.0,
              montoMaximoVenta: 1000.00
            },
            terminalesAsignadas: ['TERM003', 'TERM004'],
            activo: true,
            fechaAsignacion: new Date()
          }
        });
      }
    }

    console.log(`✅ Usuario polivalente creado: ${polivalente.email}`);
    console.log(`   └─ ${rolesAsignarPolivalente.length} roles asignados\n`);

    // ===== USUARIO 3: GERENTE DE TURNO =====
    const gerenteTurnoId = ulid();
    const gerenteTurno = await prisma.usuario.create({
      data: {
        id: gerenteTurnoId,
        idEmpresa: empresa.id,
        numeroEmpleado: 'GT001',
        nombreUsuario: 'gerente.turno',
        email: 'gerente.turno@bellavista.com',
        passwordHash,
        nombre: 'Carmen',
        apellidoPaterno: 'Delgado',
        apellidoMaterno: 'Ruiz',
        telefono: '3112345680',
        sucursal: 'sucursal_principal',
        area: 'gerencia',
        puesto: 'Gerente de Turno',
        nivel: 'alto',
        fechaIngreso: new Date('2024-01-15'),
        idHorarioBase: horarios[0].id,
        idRolPorDefecto: roles.find(r => r.codigo === 'rol_gerente')?.id,
        turnosDisponibles: ['noche'],
        accesoEfectivo: true,
        nivelAccesoCaja: 5,
        activo: true
      }
    });

    // Asignar múltiples roles al gerente de turno
    const rolesAsignarGerente = [
      {
        idRol: roles.find(r => r.codigo === 'rol_gerente')?.id,
        prioridadUsuario: 1,
        esRolPrincipal: true,
        sucursalEspecifica: null, // Válido en todas las sucursales
        areaEspecifica: null,     // Válido en todas las áreas
        turnosAsignados: ['noche'],
        fechaInicio: new Date('2024-01-15')
      },
      {
        idRol: roles.find(r => r.codigo === 'rol_subgerente')?.id,
        prioridadUsuario: 2,
        esRolPrincipal: false,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'gerencia',
        turnosAsignados: ['mañana', 'tarde'],
        fechaInicio: new Date('2024-02-01')
      }
    ];

    for (const rolData of rolesAsignarGerente) {
      if (rolData.idRol) {
        await prisma.usuarioRol.create({
          data: {
            id: ulid(),
            idUsuario: gerenteTurnoId,
            ...rolData,
            limitesPersonalizados: {
              descuentoMaximo: 100.0,
              montoMaximoVenta: null, // Sin límite
              puedeAutorizarDescuentos: true
            },
            terminalesAsignadas: [], // Acceso a todas las terminales
            activo: true,
            fechaAsignacion: new Date()
          }
        });
      }
    }

    console.log(`✅ Usuario gerente de turno creado: ${gerenteTurno.email}`);
    console.log(`   └─ ${rolesAsignarGerente.length} roles asignados\n`);

    // ===== USUARIO 4: EMPLEADO CON ROLES TEMPORALES =====
    const temporalId = ulid();
    const temporal = await prisma.usuario.create({
      data: {
        id: temporalId,
        idEmpresa: empresa.id,
        numeroEmpleado: 'TEMP001',
        nombreUsuario: 'empleado.temporal',
        email: 'empleado.temporal@bellavista.com',
        passwordHash,
        nombre: 'Diego',
        apellidoPaterno: 'Vargas',
        apellidoMaterno: 'Mendez',
        telefono: '3112345681',
        sucursal: 'sucursal_principal',
        area: 'cocina',
        puesto: 'Empleado Temporal',
        nivel: 'operativo',
        fechaIngreso: new Date('2024-03-01'),
        idHorarioBase: horarios[2].id,
        idRolPorDefecto: roles.find(r => r.codigo === 'rol_auxiliar_cocina')?.id,
        turnosDisponibles: ['mañana', 'tarde'],
        accesoEfectivo: false,
        nivelAccesoCaja: 0,
        activo: true
      }
    });

    // Asignar roles temporales
    const rolesAsignarTemporal = [
      {
        idRol: roles.find(r => r.codigo === 'rol_auxiliar_cocina')?.id,
        prioridadUsuario: 1,
        esRolPrincipal: true,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'cocina',
        turnosAsignados: ['mañana', 'tarde'],
        fechaInicio: new Date('2024-03-01')
      },
      {
        idRol: roles.find(r => r.codigo === 'rol_mesero')?.id,
        prioridadUsuario: 2,
        esRolPrincipal: false,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'salon',
        turnosAsignados: ['tarde'],
        fechaInicio: new Date('2024-04-01'),
        fechaFin: new Date('2024-06-30') // Rol temporal por 3 meses
      },
      {
        idRol: roles.find(r => r.codigo === 'rol_cajero')?.id,
        prioridadUsuario: 3,
        esRolPrincipal: false,
        sucursalEspecifica: 'sucursal_principal',
        areaEspecifica: 'caja',
        turnosAsignados: ['mañana'],
        fechaInicio: new Date('2024-05-01'),
        fechaFin: new Date('2024-07-31') // Rol temporal por verano
      }
    ];

    for (const rolData of rolesAsignarTemporal) {
      if (rolData.idRol) {
        await prisma.usuarioRol.create({
          data: {
            id: ulid(),
            idUsuario: temporalId,
            ...rolData,
            limitesPersonalizados: {
              descuentoMaximo: 5.0,
              montoMaximoVenta: 500.00,
              requiereSupervisión: true
            },
            terminalesAsignadas: ['TERM005'],
            activo: true,
            fechaAsignacion: new Date()
          }
        });
      }
    }

    console.log(`✅ Usuario temporal creado: ${temporal.email}`);
    console.log(`   └─ ${rolesAsignarTemporal.length} roles asignados (algunos temporales)\n`);

    // ===== RESUMEN FINAL =====
    console.log('🎉 ¡Usuarios con múltiples roles creados exitosamente!\n');
    
    console.log('📋 RESUMEN DE USUARIOS CREADOS:');
    console.log('┌─────────────────────────────────────────────────────────────┐');
    console.log('│ Usuario                     │ Email                         │ Roles │');
    console.log('├─────────────────────────────────────────────────────────────┤');
    console.log('│ Supervisor Multifuncional  │ supervisor.multi@...          │   3   │');
    console.log('│ Empleado Polivalente       │ empleado.polivalente@...      │   3   │');
    console.log('│ Gerente de Turno           │ gerente.turno@...             │   2   │');
    console.log('│ Empleado Temporal          │ empleado.temporal@...         │   3   │');
    console.log('└─────────────────────────────────────────────────────────────┘\n');

    console.log('🔑 CREDENCIALES DE ACCESO:');
    console.log('   - Password para todos: test123');
    console.log('   - Usuarios listos para testing en Postman\n');

    console.log('📊 CONFIGURACIONES ESPECIALES:');
    console.log('   ✓ Roles con diferentes prioridades');
    console.log('   ✓ Contextos específicos (sucursal, área, turno)');
    console.log('   ✓ Roles temporales con fechas de vencimiento');
    console.log('   ✓ Límites personalizados por rol');
    console.log('   ✓ Terminales asignadas específicas');

  } catch (error) {
    console.error('❌ Error al insertar usuarios:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el script
insertarUsuariosMultiplesRoles()
  .catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });