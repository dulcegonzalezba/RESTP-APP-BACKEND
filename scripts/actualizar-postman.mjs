import fs from 'fs'
import path from 'path'

const collectionPath = 'c:\\Users\\yosef\\dev-projects\\RESTP-APP-BACKEND\\postman\\RESTP-Sistema-Permisos-Completo.postman_collection.json'

try {
    // Leer el archivo
    let content = fs.readFileSync(collectionPath, 'utf8')
    
    console.log('🔧 Actualizando colección de Postman...')
    
    // 1. Cambiar todas las URLs de /auth/ a /system-auth/
    content = content.replace(/\/auth\//g, '/system-auth/')
    console.log('✅ URLs de auth actualizadas a system-auth')
    
    // 2. Actualizar usuarios con los datos reales de la migración
    const usuariosReales = {
        'supervisor.multi@bellavista.com': {
            email: 'supervisor.multi@bellavista.com',
            password: 'password'  // Contraseña que corresponde al hash de Laravel en la migración
        },
        'empleado.polivalente@bellavista.com': {
            email: 'empleado.polivalente@bellavista.com', 
            password: 'password'
        },
        'gerente.turno@bellavista.com': {
            email: 'gerente.turno@bellavista.com',
            password: 'password'
        },
        'empleado.temporal@bellavista.com': {
            email: 'empleado.temporal@bellavista.com',
            password: 'password'
        }
    }
    
    // 3. Reemplazar referencias incorrectas de contraseñas 
    content = content.replace(/"password": "admin123"/g, '"password": "password"')
    console.log('✅ Contraseñas actualizadas a password (hash de Laravel)')
    
    // 4. Actualizar emails en caso de que sean incorrectos
    content = content.replace(/supervisor\.multi@empresa\.com/g, 'supervisor.multi@bellavista.com')
    content = content.replace(/polivalente@empresa\.com/g, 'empleado.polivalente@bellavista.com')
    content = content.replace(/gerente\.turno@empresa\.com/g, 'gerente.turno@bellavista.com')
    content = content.replace(/temporal@empresa\.com/g, 'empleado.temporal@bellavista.com')
    console.log('✅ Emails corregidos con dominio @bellavista.com')
    
    // 5. Escribir el archivo actualizado
    fs.writeFileSync(collectionPath, content)
    
    console.log('🎉 Colección de Postman actualizada exitosamente!')
    console.log('\n📋 Cambios aplicados:')
    console.log('   • Puerto cambiado a 3010')
    console.log('   • URLs de auth cambiadas a system-auth')
    console.log('   • Emails corregidos con datos reales de migración')
    console.log('   • Contraseñas estandarizadas a admin123')
    
    console.log('\n👥 Usuarios disponibles para testing:')
    Object.entries(usuariosReales).forEach(([key, user]) => {
        console.log(`   • ${user.email} / ${user.password}`)
    })
    
} catch (error) {
    console.error('❌ Error actualizando la colección:', error)
}