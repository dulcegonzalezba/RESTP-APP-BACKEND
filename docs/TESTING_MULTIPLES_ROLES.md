# 👥 Testing de Usuarios con Múltiples Roles

Esta documentación explica cómo usar los usuarios de prueba creados para testing del sistema de múltiples roles.

## 🚀 Configuración Inicial

### 1. Ejecutar Scripts de Datos

```bash
# 1. Insertar usuarios con múltiples roles
node scripts/insertar-usuarios-multiples-roles.mjs

# 2. Verificar que se crearon correctamente
node scripts/verificar-usuarios-multiples-roles.mjs
```

### 2. Importar Colección en Postman

1. Importar: `postman/RESTP-Sistema-Permisos-Completo.postman_collection.json`
2. Importar entorno: `postman/RESTP-Desarrollo.postman_environment.json`
3. Seleccionar entorno "RESTP - Desarrollo"

## 👤 Usuarios de Prueba Creados

### 🔧 **Supervisor Multifuncional**
- **Email:** `supervisor.multi@bellavista.com`
- **Usuario:** `supervisor.multi`
- **Password:** `test123`
- **Roles:**
  - ⭐ **Subgerente** (Principal - Prioridad 1)
    - Área: Gerencia
    - Turnos: Mañana, Tarde
    - Acceso efectivo: Sí
  - **Cajero** (Prioridad 2)
    - Área: Caja
    - Turnos: Noche
    - Límite descuento: 30%
  - **Mesero** (Prioridad 3) - 🕒 *Temporal hasta 31/12/2024*
    - Área: Salón
    - Turnos: Todos
    - Válido en todas las sucursales

### 🔄 **Empleado Polivalente**
- **Email:** `empleado.polivalente@bellavista.com`
- **Usuario:** `empleado.polivalente`
- **Password:** `test123`
- **Roles:**
  - ⭐ **Mesero** (Principal - Prioridad 1)
    - Área: Salón
    - Turnos: Mañana, Tarde
  - **Cajero** (Prioridad 2)
    - Área: Caja
    - Turnos: Tarde
    - Límite descuento: 10%
  - **Auxiliar de Cocina** (Prioridad 3)
    - Área: Cocina
    - Turnos: Mañana

### 👑 **Gerente de Turno**
- **Email:** `gerente.turno@bellavista.com`
- **Usuario:** `gerente.turno`
- **Password:** `test123`
- **Roles:**
  - ⭐ **Gerente** (Principal - Prioridad 1)
    - Todas las áreas y sucursales
    - Turnos: Noche
    - Sin límites monetarios
  - **Subgerente** (Prioridad 2)
    - Área: Gerencia
    - Turnos: Mañana, Tarde

### ⏱️ **Empleado Temporal**
- **Email:** `empleado.temporal@bellavista.com`
- **Usuario:** `empleado.temporal`
- **Password:** `test123`
- **Roles:**
  - ⭐ **Auxiliar de Cocina** (Principal - Prioridad 1)
    - Área: Cocina
    - Turnos: Mañana, Tarde
    - Permanente
  - **Mesero** (Prioridad 2) - 🕒 *Temporal: 01/04/2024 - 30/06/2024*
    - Área: Salón
    - Turnos: Tarde
  - **Cajero** (Prioridad 3) - 🕒 *Temporal: 01/05/2024 - 31/07/2024*
    - Área: Caja
    - Turnos: Mañana
    - Requiere supervisión

## 🧪 Casos de Prueba en Postman

### 📁 Sección: "👥 Testing Múltiples Roles"

#### 1. **Login y Obtención de Roles**
```
✅ Login - Supervisor Multifuncional
✅ Login - Empleado Polivalente  
✅ Login - Gerente de Turno
✅ Login - Empleado Temporal
```

#### 2. **Testing de Cambio de Roles**
```
🔄 Obtener Roles del Supervisor
🔄 Cambiar Rol Activo - Supervisor a Cajero
🔄 Validar Permisos como Cajero
🔄 Cambiar a Rol Mesero
🔄 Probar Límites como Mesero
```

#### 3. **Validaciones de Contexto**
```
📍 Testing contexto por sucursal
📍 Testing contexto por área
📍 Testing contexto por turno
📍 Validar terminales asignadas
```

#### 4. **Testing de Roles Temporales**
```
⏱️ Verificar roles con fechas de vencimiento
⏱️ Asignar nuevo rol temporal
⏱️ Validar roles expirados
```

## 🔧 Variables de Entorno Configuradas

Las siguientes variables se configuran automáticamente al hacer login:

```json
{
  "jwt_token_supervisor": "token_del_supervisor",
  "jwt_token_polivalente": "token_del_polivalente", 
  "jwt_token_gerente_turno": "token_del_gerente_turno",
  "jwt_token_temporal": "token_del_temporal",
  
  "supervisor_user_id": "id_del_supervisor",
  "polivalente_user_id": "id_del_polivalente",
  "gerente_turno_user_id": "id_del_gerente_turno", 
  "temporal_user_id": "id_del_temporal",
  
  "supervisor_roles": "[array_de_roles]",
  "polivalente_roles": "[array_de_roles]",
  "gerente_turno_roles": "[array_de_roles]",
  "temporal_roles": "[array_de_roles]"
}
```

## 🚀 Flujo de Testing Completo

### 1. **Preparación**
```bash
# Ejecutar en terminal
node scripts/insertar-usuarios-multiples-roles.mjs
node scripts/verificar-usuarios-multiples-roles.mjs
```

### 2. **Testing Básico**
1. **Login** con cada usuario
2. **Verificar** que se obtienen múltiples roles
3. **Validar** rol principal y prioridades

### 3. **Testing de Cambio de Contexto**
1. **Cambiar** rol activo en sesión
2. **Validar** que los permisos cambian
3. **Probar** limitaciones específicas por rol

### 4. **Testing de Roles Temporales**
1. **Verificar** fechas de vencimiento
2. **Asignar** nuevos roles temporales
3. **Validar** comportamiento al expirar

### 5. **Testing de Límites y Restricciones**
1. **Probar** límites monetarios por rol
2. **Validar** restricciones de horario/turno
3. **Verificar** terminales asignadas

## 📊 Escenarios de Testing

### ✅ **Escenario 1: Supervisor en Múltiples Áreas**
```
Usuario: supervisor.multi@bellavista.com
Flujo:
1. Login como Subgerente (rol principal)
2. Cambiar a rol Cajero para turno noche
3. Validar límites de descuento como cajero
4. Cambiar a rol Mesero temporal
5. Verificar permisos limitados de mesero
```

### ✅ **Escenario 2: Empleado Polivalente por Turnos**
```
Usuario: empleado.polivalente@bellavista.com
Flujo:
1. Login como Mesero (mañana)
2. Cambiar a Auxiliar Cocina (turno mañana)
3. Cambiar a Cajero (solo turno tarde)
4. Validar restricciones de horario
```

### ✅ **Escenario 3: Gestión de Roles Temporales**
```
Usuario: empleado.temporal@bellavista.com
Flujo:
1. Verificar roles con fecha de vencimiento
2. Intentar usar rol expirado
3. Asignar nuevo rol temporal
4. Validar configuración temporal
```

## 🔍 Troubleshooting

### ❌ **Error: "No se encontraron usuarios con múltiples roles"**
```bash
# Solución: Ejecutar script de inserción
node scripts/insertar-usuarios-multiples-roles.mjs
```

### ❌ **Error: "Token inválido"**
```bash
# Solución: Hacer login nuevamente en Postman
# Los tokens tienen expiración
```

### ❌ **Error: "Rol no encontrado"**
```bash
# Solución: Verificar que los roles base existen
node scripts/insertar-roles.mjs
```

## 📈 Métricas de Testing

Al ejecutar la suite completa, deberías ver:

- ✅ **4 usuarios** con múltiples roles creados
- ✅ **11 asignaciones** de roles total
- ✅ **3 roles temporales** con fechas de vencimiento
- ✅ **100% tests** pasando en Postman
- ✅ **Validación completa** de permisos por contexto

## 🎯 Próximos Pasos

1. **Implementar APIs** de cambio de rol en tiempo real
2. **Agregar validación** de roles expirados
3. **Crear dashboard** para gestión de roles
4. **Implementar notificaciones** de vencimiento
5. **Agregar auditoría** de cambios de roles