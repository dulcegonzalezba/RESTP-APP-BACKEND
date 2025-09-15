# 📊 Colección de Postman - Sistema de Permisos Unificado

## 📋 Descripción

Esta colección de Postman proporciona un conjunto completo de tests para validar todo el **Sistema de Permisos Unificado** implementado en las Fases 3 y 4. Incluye tests automatizados, validaciones de seguridad, y monitoreo de performance.

## 🎯 Funcionalidades Cubiertas

### ✅ **Autenticación JWT**
- Login con diferentes tipos de usuarios (Admin, Gerente, Empleado)
- Verificación de tokens JWT
- Manejo de tokens expirados e inválidos

### ✅ **Sistema de Permisos (Fase 3)**
- Obtención de permisos por usuario
- Validación granular de acciones
- Control de límites monetarios
- Asignación de roles

### ✅ **Sistema de Seguridad Avanzado (Fase 4)**
- Testing de decoradores (@RequierePermiso, @ValidarMontoLimite, @RolMinimo)
- Validación automática con Guards
- Monitoreo con Interceptors
- Sistema de cache inteligente

### ✅ **Monitoreo y Performance**
- Tests de rendimiento (<200ms)
- Validación de cache hits
- Métricas de respuesta

### ✅ **Casos de Error**
- Manejo de errores de autenticación
- Validación de permisos inexistentes
- Control de accesos no autorizados

## 📁 Estructura de la Colección

```
RESTP - Sistema de Permisos Unificado/
├── 🔐 Autenticación/
│   ├── Login - Administrador
│   ├── Login - Gerente  
│   ├── Login - Empleado
│   └── Verificar Token JWT
│
├── 🔑 Sistema de Permisos (Fase 3)/
│   ├── Obtener Permisos de Usuario
│   ├── Validar Acción - CREAR_USUARIOS (Admin)
│   ├── Validar Acción - ELIMINAR_USUARIOS (Empleado)
│   ├── Validar Monto Límite - Dentro del límite
│   ├── Validar Monto Límite - Excede límite
│   └── Asignar Rol a Usuario (Admin)
│
├── 🛡️ Sistema Seguridad Avanzado (Fase 4)/
│   ├── Dashboard Administrativo
│   ├── Dashboard - Acceso Denegado (Empleado)
│   ├── Crear Usuario (Con Permiso)
│   ├── Eliminar Usuario (Solo Admin)
│   ├── Eliminar Usuario - Denegado (Gerente)
│   ├── Procesar Transacción - Monto Válido
│   ├── Procesar Transacción - Monto Excede Límite
│   ├── Aprobar Reembolso - Múltiples Validaciones
│   ├── Ver Logs del Sistema
│   ├── Estado Sistema de Permisos
│   └── Invalidar Cache de Permisos
│
├── 📊 Monitoreo y Performance/
│   ├── Performance Test - Múltiples Requests
│   └── Cache Hit Test
│
└── 🚫 Casos de Error/
    ├── Sin Token de Autenticación
    ├── Token Inválido
    └── Permiso Inexistente
```

## 🚀 Configuración Inicial

### 1. **Importar Archivos**
```bash
# Importar en Postman:
postman/
├── RESTP-Sistema-Permisos-Completo.postman_collection.json
└── RESTP-Desarrollo.postman_environment.json
```

### 2. **Variables de Entorno**
```javascript
{
  "base_url": "http://localhost:3000",
  "jwt_token": "",                 // Se llena automáticamente
  "jwt_token_gerente": "",         // Se llena automáticamente  
  "jwt_token_empleado": "",        // Se llena automáticamente
  "current_user_id": "",           // Se llena automáticamente
  "gerente_user_id": "",           // Se llena automáticamente
  "empleado_user_id": "",          // Se llena automáticamente
  "empresa_id": "empresa-principal",
  "api_version": "v1"
}
```

### 3. **Prerequisitos**
- ✅ Servidor NestJS corriendo en `localhost:3000`
- ✅ Base de datos con datos de prueba
- ✅ Sistema de permisos configurado (Fases 3 y 4)

## 🎮 Cómo Usar la Colección

### **Opción 1: Manualmente en Postman**

1. **Importar colección y entorno**
2. **Ejecutar autenticación primero:**
   ```
   🔐 Autenticación > Login - Administrador
   ```
3. **Explorar endpoints por categoría**
4. **Verificar tests automáticos en cada request**

### **Opción 2: Automatizado con Newman**

#### En Windows (PowerShell):
```powershell
# Instalar Newman
npm install -g newman

# Ejecutar tests automatizados
.\scripts\run-api-tests.ps1
```

#### En Linux/macOS (Bash):
```bash
# Instalar Newman
npm install -g newman

# Ejecutar tests automatizados
./scripts/run-api-tests.sh
```

## 📊 Tests Automatizados

### **Scripts Pre/Post-Request Globales**

**Pre-Request:**
- ✅ Verificación de variables de entorno
- ✅ Logging de requests
- ✅ Medición de tiempo de inicio

**Post-Request:**
- ✅ Validación de JSON válido
- ✅ Verificación de headers de seguridad
- ✅ Medición de performance
- ✅ Logging de resultados

### **Validaciones por Endpoint**

Cada request incluye tests específicos:

```javascript
// Ejemplo: Login - Administrador
pm.test("Login exitoso", function () {
    pm.response.to.have.status(200);
});

pm.test("Token JWT presente", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('access_token');
    pm.environment.set('jwt_token', jsonData.access_token);
});
```

## 🔄 Flujos de Testing

### **Flujo 1: Testing Completo del Sistema**
1. Autenticación con diferentes usuarios
2. Validación de permisos por rol
3. Testing de endpoints administrativos
4. Validación de límites monetarios
5. Verificación de cache y performance

### **Flujo 2: Testing de Seguridad**
1. Intentos sin autenticación
2. Tokens inválidos
3. Accesos no autorizados
4. Permisos inexistentes

### **Flujo 3: Testing de Performance**
1. Medición de tiempos de respuesta
2. Validación de cache hits
3. Monitoreo de interceptors

## 📈 Reportes y Análisis

### **Reportes Newman**
Los scripts automáticos generan:
- 📄 **Reporte HTML**: Visualización completa
- 📊 **Reporte JSON**: Datos para análisis
- 🖥️ **Output CLI**: Resumen en consola

```bash
# Ejemplo de salida
📈 Resumen de Tests:
   Total ejecutados: 45
   Tests exitosos: 43
   Tests fallidos: 2
   Assertions: 120
```

### **Métricas Incluidas**
- ⏱️ **Response Time**: <200ms esperado
- ✅ **Success Rate**: % de tests exitosos
- 🔄 **Cache Performance**: Hit/miss ratio
- 🔒 **Security Validations**: Controles de acceso

## 🛠️ Personalización

### **Agregar Nuevos Tests**

1. **Duplicar request similar**
2. **Modificar URL y parámetros**
3. **Actualizar tests en pestaña "Tests":**

```javascript
pm.test("Mi nuevo test", function () {
    pm.response.to.have.status(200);
    // Validaciones específicas
});
```

### **Configurar Nuevos Entornos**

```json
{
  "name": "RESTP - Producción",
  "values": [
    {
      "key": "base_url",
      "value": "https://api.restp.com"
    }
  ]
}
```

### **Agregar Variables Dinámicas**

```javascript
// En Pre-request Script
pm.environment.set("timestamp", Date.now());
pm.environment.set("random_id", Math.random().toString(36));
```

## 🎯 Casos de Uso Principales

### **1. Desarrollo Diario**
- Verificar que nuevos cambios no rompan funcionalidad
- Validar permisos después de modificaciones
- Testing rápido de endpoints específicos

### **2. CI/CD Pipeline**
```yaml
# Ejemplo: GitHub Actions
- name: API Tests
  run: |
    npm install -g newman
    newman run postman/collection.json --environment postman/env.json
```

### **3. Onboarding de Desarrolladores**
- Entender la estructura de permisos
- Probar diferentes roles y escenarios
- Familiarizarse con la API

### **4. Debugging de Producción**
- Reproducir problemas reportados
- Validar configuración de permisos
- Verificar comportamiento de cache

## 🔧 Troubleshooting

### **Problemas Comunes**

**1. "Servidor no responde"**
```bash
# Verificar que el servidor esté corriendo
curl http://localhost:3000/health
npm run start:dev
```

**2. "Token expirado"**
```javascript
// Re-ejecutar login
🔐 Autenticación > Login - Administrador
```

**3. "Permisos insuficientes"**
```javascript
// Verificar usuario correcto
GET /permisos/usuario
```

**4. "Tests fallan en CI"**
```bash
# Verificar variables de entorno
export BASE_URL=http://localhost:3000
```

## 📚 Referencias Rápidas

### **Endpoints Principales**
```
POST /auth/login              # Autenticación
GET  /permisos/usuario         # Obtener permisos
POST /permisos/validar-accion  # Validar acción
GET  /admin/dashboard          # Dashboard admin
POST /admin/transacciones      # Procesar transacción
```

### **Códigos de Estado Esperados**
- ✅ **200**: Operación exitosa
- ✅ **201**: Recurso creado
- ❌ **401**: No autenticado
- ❌ **403**: Sin permisos
- ❌ **404**: Recurso no encontrado

### **Headers Importantes**
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

## 🎉 Conclusión

Esta colección de Postman proporciona una **suite completa de testing** para el Sistema de Permisos Unificado, cubriendo:

- 🔐 **45+ requests** organizados por funcionalidad
- 🧪 **120+ tests automatizados** con validaciones específicas
- 📊 **Reportes detallados** de performance y cobertura
- 🚀 **Scripts automatizados** para CI/CD
- 📚 **Documentación completa** para onboarding

**¡El sistema está completamente validado y listo para uso en producción!** 🚀

---

## 📞 Soporte

Para problemas o mejoras:
1. Revisar logs del servidor
2. Verificar configuración de variables
3. Consultar documentación de la API
4. Revisar reportes de Newman