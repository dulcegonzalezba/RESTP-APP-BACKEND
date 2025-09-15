import { PrismaClient } from '../generated/prisma/index.js';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

async function ejecutarMigraciones() {
    console.log('🚀 Iniciando aplicación de migraciones del sistema de roles...');
    
    try {
        // Migración 1: Módulos faltantes
        console.log('\n📦 1. Aplicando migración de módulos faltantes...');
        const migracion1 = readFileSync('./prisma/migrations/20250914220105_agregar_modulos_faltantes/migration.sql', 'utf8');
        await prisma.$executeRawUnsafe(migracion1);
        console.log('✅ Módulos agregados correctamente');
        
        // Migración 2: Acciones granulares
        console.log('\n⚡ 2. Aplicando migración de acciones granulares...');
        const migracion2 = readFileSync('./prisma/migrations/20250914220444_agregar_acciones_granulares/migration.sql', 'utf8');
        await prisma.$executeRawUnsafe(migracion2);
        console.log('✅ Acciones agregadas correctamente');
        
        // Migración 3: Sistema de licencias
        console.log('\n🔑 3. Aplicando migración del sistema de licencias...');
        const migracion3 = readFileSync('./prisma/migrations/20250914220648_implementar_sistema_licencias/migration.sql', 'utf8');
        await prisma.$executeRawUnsafe(migracion3);
        console.log('✅ Sistema de licencias implementado');
        
        // Migración 4: Matriz de permisos
        console.log('\n🛡️ 4. Aplicando migración de matriz de permisos...');
        const migracion4 = readFileSync('./prisma/migrations/20250914220913_crear_matriz_permisos_completa/migration.sql', 'utf8');
        await prisma.$executeRawUnsafe(migracion4);
        console.log('✅ Matriz de permisos creada');
        
        console.log('\n🎉 ¡TODAS LAS MIGRACIONES APLICADAS EXITOSAMENTE!');
        console.log('📊 Sistema de roles y permisos completamente implementado');
        
    } catch (error) {
        console.error('❌ Error aplicando migraciones:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

ejecutarMigraciones()
    .then(() => {
        console.log('\n✨ Proceso completado. El sistema está listo para usar.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Falló la aplicación de migraciones:', error);
        process.exit(1);
    });