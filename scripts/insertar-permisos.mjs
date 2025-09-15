import { PrismaClient } from '../generated/prisma/index.js';
import { ulid } from 'ulid';

const prisma = new PrismaClient();

async function insertarPermisos() {
  console.log('🛡️ Insertando matriz de permisos...');

  // Obtener roles, módulos y acciones
  const roles = await prisma.$queryRaw`
        SELECT id_rol, codigo FROM "rest_test"."roles" WHERE activo = true
    `;

  const moduloAcciones = await prisma.$queryRaw`
        SELECT ma.id_modulo_accion, ma.codigo, m.codigo as modulo_codigo
        FROM "global_sistema"."modulo_acciones" ma
        JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
        WHERE ma.activo = true AND m.activo = true
    `;

  const rolesMap = {};
  roles.forEach((r) => {
    rolesMap[r.codigo] = r.id_rol;
  });

  console.log(
    `📊 Encontrados ${roles.length} roles y ${moduloAcciones.length} acciones`,
  );

  // Configuración de permisos por rol
  const configuracionPermisos = {
    rol_gerente: {
      // ADMINISTRADOR
      acceso: 'COMPLETO',
      limitacionMonetaria: null,
      requiereAutorizacion: false,
      modulosExcluidos: [],
    },
    rol_subgerente: {
      // GERENTE
      acceso: 'OPERATIVO',
      limitacionMonetaria: 1000.0,
      requiereAutorizacion: true,
      modulosExcluidos: ['CONFIG', 'CATALOGOS', 'ENCUESTAS'],
      accionesExcluidas: [
        'GEST_USUARIOS',
        'BACKUP_SISTEMA',
        'RESTAURAR_SISTEMA',
      ],
    },
    rol_cajero: {
      // CAJERO
      acceso: 'VENTAS',
      limitacionMonetaria: 500.0,
      requiereAutorizacion: true,
      modulosPermitidos: [
        'DASHBOARD',
        'PRODUCTOS',
        'CLIENTES',
        'FACTURAS',
        'CAJERO_DASH',
        'REPORTES',
      ],
      accionesPermitidas: [
        'VER_GENERAL',
        'VER_PRODUCTOS',
        'VER_CLIENTES',
        'CREAR_CLIENTE',
        'EDITAR_CLIENTE',
        'VER_FACTURAS',
        'CREAR_FACTURA',
        'MODIFICAR_FACTURA',
        'APLICAR_DESCUENTO',
        'VER_RESUMEN_CAJA',
        'VER_VENTAS_DIA',
        'CORTE_PARCIAL',
        'CORTE_FINAL',
        'VER_REP_VENTAS',
      ],
    },
    rol_mesero: {
      // MESERO
      acceso: 'SERVICIO',
      limitacionMonetaria: 100.0,
      requiereAutorizacion: true,
      modulosPermitidos: [
        'DASHBOARD',
        'CLIENTES',
        'RESERVACIONES',
        'MESERO_DASH',
        'MESERO_MESAS',
        'MESERO_ORDENES',
      ],
      accionesPermitidas: [
        'VER_GENERAL',
        'VER_CLIENTES',
        'CREAR_CLIENTE',
        'EDITAR_CLIENTE',
        'VER_RESERVACIONES',
        'CREAR_RESERVACION',
        'EDITAR_RESERVACION',
        'CONFIRMAR_LLEGADA',
        'VER_MESAS_ASIG',
        'VER_ORD_PEND',
        'VER_COMISIONES',
        'ASIGNAR_MESA',
        'LIMPIAR_MESA',
        'TOMAR_ORDEN',
        'MODIFICAR_ORDEN',
        'ENVIAR_COCINA',
      ],
    },
    rol_cocinero: {
      // COCINERO
      acceso: 'COCINA',
      limitacionMonetaria: null,
      requiereAutorizacion: true,
      modulosPermitidos: ['DASHBOARD', 'RECETAS', 'COCINA_ORDENES'],
      accionesPermitidas: [
        'VER_GENERAL',
        'VER_RECETAS',
        'VER_INGREDIENTES',
        'CALCULAR_COSTOS',
        'VER_ORD_COCINA',
        'MARC_EN_PREP',
        'MARCAR_LISTO',
        'VER_TIEMPOS_PREP',
      ],
    },
    rol_auxiliar_cocina: {
      // AUXILIAR COCINA
      acceso: 'LIMITADO',
      limitacionMonetaria: null,
      requiereAutorizacion: false,
      modulosPermitidos: ['DASHBOARD', 'COCINA_ORDENES', 'RECETAS'],
      accionesPermitidas: [
        'VER_GENERAL',
        'VER_ORD_COCINA',
        'MARC_EN_PREP',
        'MARCAR_LISTO',
        'VER_TIEMPOS_PREP',
        'VER_RECETAS',
        'VER_INGREDIENTES',
      ],
    },
  };

  // Insertar permisos para cada rol
  for (const [rolCodigo, config] of Object.entries(configuracionPermisos)) {
    const rolId = rolesMap[rolCodigo];
    if (!rolId) {
      console.log(`⚠️ Rol ${rolCodigo} no encontrado`);
      continue;
    }

    console.log(`\n👤 Procesando rol: ${rolCodigo}`);
    let permisosInsertados = 0;

    for (const accion of moduloAcciones) {
      try {
        let permitido = false;
        let limitacionMonetaria = null;
        let requiereAutorizacion = false;

        // Determinar si la acción está permitida según la configuración
        if (config.acceso === 'COMPLETO') {
          permitido = true;
        } else if (config.modulosPermitidos) {
          // Solo módulos específicos
          if (config.modulosPermitidos.includes(accion.modulo_codigo)) {
            if (config.accionesPermitidas) {
              permitido = config.accionesPermitidas.includes(accion.codigo);
            } else {
              permitido = true;
            }
          }
        } else if (config.modulosExcluidos) {
          // Todos excepto excluidos
          if (!config.modulosExcluidos.includes(accion.modulo_codigo)) {
            if (config.accionesExcluidas) {
              permitido = !config.accionesExcluidas.includes(accion.codigo);
            } else {
              permitido = true;
            }
          }
        }

        // Aplicar limitaciones
        if (permitido) {
          if (
            accion.codigo === 'APLICAR_DESCUENTO' &&
            config.limitacionMonetaria
          ) {
            limitacionMonetaria = config.limitacionMonetaria;
          }

          if (
            config.requiereAutorizacion &&
            [
              'CANCELAR_FACTURA',
              'ELIMINAR_CLIENTE',
              'CANCELAR_ORDEN',
              'RECHAZAR_ORDEN',
            ].includes(accion.codigo)
          ) {
            requiereAutorizacion = true;
          }
        }

        // Insertar permiso solo si está permitido o es necesario registrar la denegación
        if (permitido) {
          const permisoId = ulid();
          await prisma.$executeRaw`
                        INSERT INTO "rest_test"."permisos" (
                            "id_permiso", "id_rol", "id_modulo_accion", "permitido", 
                            "limitacion_monetaria", "requiere_autorizacion", "activo"
                        ) VALUES (
                            ${permisoId}, ${rolId}, ${accion.id_modulo_accion}, ${permitido},
                            ${limitacionMonetaria}, ${requiereAutorizacion}, true
                        ) ON CONFLICT ("id_rol", "id_modulo_accion") DO NOTHING
                    `;
          permisosInsertados++;
        }
      } catch (error) {
        console.log(
          `⚠️ Error con ${rolCodigo}.${accion.codigo}:`,
          error.message,
        );
      }
    }

    console.log(`✅ ${rolCodigo}: ${permisosInsertados} permisos insertados`);
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando inserción de permisos...');
    await insertarPermisos();
    console.log('✅ ¡Matriz de permisos insertada exitosamente!');

    // Verificar totales
    const totalPermisos = await prisma.$queryRaw`
            SELECT COUNT(*) as total FROM "rest_test"."permisos" WHERE activo = true
        `;

    const permisosPorRol = await prisma.$queryRaw`
            SELECT r.codigo, COUNT(p.id_permiso) as total_permisos
            FROM "rest_test"."roles" r
            LEFT JOIN "rest_test"."permisos" p ON r.id_rol = p.id_rol AND p.activo = true
            WHERE r.activo = true
            GROUP BY r.codigo, r.prioridad_orden
            ORDER BY r.prioridad_orden
        `;

    console.log(`\n📊 Total de permisos: ${totalPermisos[0].total}`);
    console.log('\n📋 Permisos por rol:');
    permisosPorRol.forEach((rol) => {
      console.log(`   ${rol.codigo}: ${rol.total_permisos} permisos`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
