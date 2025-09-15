import { PrismaClient } from '../generated/prisma/index.js';
import { ulid } from 'ulid';

const prisma = new PrismaClient();

async function insertarRoles() {
  console.log('👥 Insertando roles del sistema...');

  const roles = [
    {
      codigo: 'rol_gerente',
      nombre: 'Administrador',
      descripcion: 'Acceso completo al sistema',
      categoria: 'administrativo',
      area: 'administracion',
      nivel: 'gerencial',
      prioridadOrden: 1,
      esRolPrincipal: true,
      accesoEfectivo: true,
      limiteDescuento: 100.0,
      puedeAbrirCaja: true,
      puedeCortesParc: true,
      puedeCortesFinal: true,
    },
    {
      codigo: 'rol_subgerente',
      nombre: 'Gerente',
      descripcion: 'Gestión operativa del restaurante',
      categoria: 'operativo',
      area: 'administracion',
      nivel: 'gerencial',
      prioridadOrden: 2,
      esRolPrincipal: true,
      accesoEfectivo: true,
      limiteDescuento: 50.0,
      puedeAbrirCaja: true,
      puedeCortesParc: true,
      puedeCortesFinal: true,
    },
    {
      codigo: 'rol_cajero',
      nombre: 'Cajero',
      descripcion: 'Manejo de caja y ventas',
      categoria: 'operativo',
      area: 'ventas',
      nivel: 'operativo',
      prioridadOrden: 3,
      esRolPrincipal: false,
      accesoEfectivo: true,
      limiteDescuento: 20.0,
      puedeAbrirCaja: true,
      puedeCortesParc: true,
      puedeCortesFinal: false,
    },
    {
      codigo: 'rol_mesero',
      nombre: 'Mesero',
      descripcion: 'Atención a clientes y manejo de mesas',
      categoria: 'servicio',
      area: 'salon',
      nivel: 'operativo',
      prioridadOrden: 4,
      esRolPrincipal: false,
      accesoEfectivo: false,
      limiteDescuento: 10.0,
      puedeAbrirCaja: false,
      puedeCortesParc: false,
      puedeCortesFinal: false,
    },
    {
      codigo: 'rol_cocinero',
      nombre: 'Cocinero',
      descripcion: 'Preparación de alimentos y gestión de cocina',
      categoria: 'operativo',
      area: 'cocina',
      nivel: 'operativo',
      prioridadOrden: 5,
      esRolPrincipal: false,
      accesoEfectivo: false,
      limiteDescuento: 0.0,
      puedeAbrirCaja: false,
      puedeCortesParc: false,
      puedeCortesFinal: false,
    },
    {
      codigo: 'rol_auxiliar_cocina',
      nombre: 'Auxiliar de Cocina',
      descripcion: 'Apoyo en preparación de alimentos',
      categoria: 'operativo',
      area: 'cocina',
      nivel: 'auxiliar',
      prioridadOrden: 6,
      esRolPrincipal: false,
      accesoEfectivo: false,
      limiteDescuento: 0.0,
      puedeAbrirCaja: false,
      puedeCortesParc: false,
      puedeCortesFinal: false,
    },
  ];

  for (const rol of roles) {
    try {
      const rolId = ulid();

      await prisma.$executeRaw`
                INSERT INTO "rest_test"."roles" (
                    "id_rol", "codigo", "nombre", "descripcion", "categoria", "area", "nivel",
                    "prioridad_orden", "es_rol_principal", "puede_ser_por_defecto",
                    "acceso_efectivo", "limite_descuento", "puede_abrir_caja", 
                    "puede_cortes_parciales", "puede_cortes_final", "activo"
                ) VALUES (
                    ${rolId}, ${rol.codigo}, ${rol.nombre}, ${rol.descripcion}, 
                    ${rol.categoria}, ${rol.area}, ${rol.nivel}, ${rol.prioridadOrden},
                    ${rol.esRolPrincipal}, true, ${rol.accesoEfectivo}, ${rol.limiteDescuento},
                    ${rol.puedeAbrirCaja}, ${rol.puedeCortesParc}, ${rol.puedeCortesFinal}, true
                ) ON CONFLICT ("codigo") DO NOTHING
            `;

      console.log(`✅ Rol ${rol.codigo} (${rol.nombre}) insertado`);
    } catch (error) {
      console.log(`⚠️ Error con rol ${rol.codigo}:`, error.message);
    }
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando inserción de roles...');
    await insertarRoles();
    console.log('✅ ¡Todos los roles insertados exitosamente!');

    // Verificar totales
    const totalRoles = await prisma.$queryRaw`
            SELECT COUNT(*) as total FROM "rest_test"."roles" WHERE activo = true
        `;

    console.log(`📊 Total de roles: ${totalRoles[0].total}`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
