# 📋 Sistema de Permisos y Roles - Frontend AppRest

> **Documento de referencia**: Sistema de permisos y roles implementado en el frontend **ANTES** de la integración del nuevo sistema de autenticación JWT.

---

## 🎭 Roles Definidos

### 1. 👑 **Administrador**
- **Tipo**: Acceso completo al sistema
- **Página inicial**: `/main`
- **Color identificativo**: `bg-red-100 text-red-800`
- **Descripción**: Control total sobre todas las funcionalidades del restaurante

#### 📱 Módulos con Acceso Completo:
- ✅ **Dashboard** (`/main`) - Vista general del restaurante
- ✅ **Productos** (`/productos`) - Gestión completa del menú y productos
- ✅ **Catálogos** (`/catalogos`) - Gestión de catálogos maestros (solo Admin)
- ✅ **Mesas** (`/mesas`) - Administración completa de mesas
- ✅ **Clientes** (`/clientes`) - Base de datos completa de clientes
- ✅ **Reservaciones** (`/reservaciones`) - Gestión completa de reservas
- ✅ **Punto de Venta** (`/ventas/pos`) - Sistema POS completo
- ✅ **Encuestas SMS** (`/encuestas`) - Campañas de satisfacción (exclusivo Admin)
- ✅ **Reportes** (`/reportes`) - Análisis y estadísticas completas
- ✅ **Configuración** (`/configuracion`) - Configuración del sistema (exclusivo Admin)

---

### 2. 🏢 **Gerente**
- **Tipo**: Acceso de gestión operativa
- **Página inicial**: `/main`
- **Color identificativo**: `bg-blue-100 text-blue-800`
- **Descripción**: Gestión operativa del restaurante sin acceso a configuraciones críticas

#### 📱 Módulos Disponibles:
- ✅ **Dashboard** (`/main`) - Vista general
- ✅ **Productos** (`/productos`) - Solo gestión del menú (sin configuraciones avanzadas)
- ✅ **Mesas** (`/mesas`) - Solo visualización de estado, no configuración
- ✅ **Clientes** (`/clientes`) - Gestión completa de clientes
- ✅ **Reservaciones** (`/reservaciones`) - Gestión completa de reservas
- ✅ **Punto de Venta** (`/ventas/pos`) - Sistema POS completo
- ✅ **Reportes** (`/reportes`) - Solo reportes de gestión operativa

#### ❌ Restricciones:
- **Catálogos maestros** - No puede modificar configuraciones base
- **Encuestas SMS** - Sin acceso a campañas
- **Configuración del sistema** - Sin acceso a configuraciones críticas

---

### 3. 💰 **Cajero**
- **Tipo**: Acceso centrado en operaciones de venta
- **Página inicial**: `/cajero` (interfaz especializada)
- **Color identificativo**: `bg-green-100 text-green-800`
- **Descripción**: Enfocado en punto de venta y transacciones

#### 📱 Módulos Disponibles:
- ✅ **Dashboard** (`/main`) - Vista general básica
- ✅ **Punto de Venta** (`/ventas/pos`) - Función principal y especializada
- ✅ **Clientes** (`/clientes`) - Solo información básica para ventas
- ✅ **Facturas** (`/facturas`) - Gestión de facturas y documentos fiscales
- ✅ **Reportes de Ventas** (`/reportes/ventas`) - Solo reportes de caja

#### ❌ Restricciones:
- **Productos** - No puede modificar menú
- **Mesas** - Sin acceso a gestión de mesas
- **Reservaciones** - Sin acceso a reservas
- **Configuración** - Sin acceso a configuraciones

---

### 4. 🍽️ **Mesero**
- **Tipo**: Acceso operativo de servicio al cliente
- **Página inicial**: `/mesero` (interfaz especializada)
- **Color identificativo**: `bg-purple-100 text-purple-800`
- **Descripción**: Gestión de mesas asignadas y atención al cliente

#### 📱 Módulos Disponibles:
- ✅ **Dashboard** (`/main`) - Vista general básica
- ✅ **Mis Mesas** (`/mesero/mesas`) - Solo mesas asignadas al mesero
- ✅ **Órdenes** (`/mesero/ordenes`) - Gestión de órdenes de sus mesas (Badge: "3")
- ✅ **Reservaciones** (`/reservaciones`) - Solo visualización de reservas del día
- ✅ **Clientes** (`/clientes`) - Solo información básica para servicio

#### 📋 Funcionalidades Específicas:
- **Mesas asignadas** - Control solo de las mesas bajo su responsabilidad
- **Órdenes pendientes** - Gestión de pedidos de sus clientes
- **Información de clientes** - Acceso a datos básicos para personalizar servicio

#### ❌ Restricciones:
- **Productos** - No puede modificar menú
- **POS** - Sin acceso a punto de venta
- **Reportes** - Sin acceso a reportes
- **Configuración** - Sin acceso a configuraciones

---

### 5. 👨‍🍳 **Cocinero**
- **Tipo**: Acceso centrado en producción de cocina
- **Página inicial**: `/cocina/ordenes` (directo a órdenes)
- **Color identificativo**: `bg-orange-100 text-orange-800`
- **Descripción**: Gestión de órdenes de cocina y control de producción

#### 📱 Módulos Disponibles:
- ✅ **Dashboard** (`/main`) - Vista general básica
- ✅ **Órdenes de Cocina** (`/cocina/ordenes`) - Función principal (Badge dinámico con órdenes pendientes)
- ✅ **Inventario** (`/inventario`) - Control de stock de ingredientes
- ✅ **Recetas** (`/recetas`) - Libro de recetas y preparaciones

#### 📋 Funcionalidades Específicas:
- **Órdenes pendientes** - Visualización en tiempo real de pedidos
- **Control de inventario** - Gestión de ingredientes disponibles
- **Libro de recetas** - Acceso a preparaciones y procedimientos

#### ❌ Restricciones:
- **Clientes** - Sin acceso a información de clientes
- **POS** - Sin acceso a punto de venta
- **Reportes** - Sin acceso a reportes
- **Configuración** - Sin acceso a configuraciones

---

## 🏗️ Estructura de Módulos del Sistema

### 📁 **Módulos Principales**

| Módulo             | Ruta             | Descripción                    | Roles con Acceso                                     |
|--------------------|------------------|--------------------------------|------------------------------------------------------|
| **Dashboard**      | `/main`          | Vista general del restaurante  | Todos                                                |
| **Productos**      | `/productos`     | Gestión del menú y productos   | Admin, Gerente                                       |
| **Catálogos**      | `/catalogos`     | Catálogos maestros del sistema | Solo Admin                                           |
| **Mesas**          | `/mesas`         | Administración de mesas        | Admin (completo), Gerente (estado)                   |
| **Clientes**       | `/clientes`      | Base de datos de clientes      | Admin, Gerente, Cajero (info), Mesero (info)         |
| **Reservaciones**  | `/reservaciones` | Sistema de reservas            | Admin, Gerente, Mesero (vista)                       |
| **Punto de Venta** | `/ventas/pos`    | Sistema POS                    | Admin, Gerente, Cajero                               |
| **Reportes**       | `/reportes`      | Sistema de reportes            | Admin (completo), Gerente (gestión), Cajero (ventas) |
| **Configuración**  | `/configuracion` | Configuración del sistema      | Solo Admin                                           |

### 📁 **Módulos Específicos por Rol**

#### 💰 Cajero
- **`/cajero`** - Interfaz principal especializada
- **`/facturas`** - Gestión de facturas y documentos fiscales

#### 🍽️ Mesero
- **`/mesero`** - Interfaz principal especializada
- **`/mesero/mesas`** - Gestión de mesas asignadas
- **`/mesero/ordenes`** - Gestión de órdenes de servicio

#### 👨‍🍳 Cocinero
- **`/cocina/ordenes`** - Órdenes de cocina en tiempo real
- **`/inventario`** - Control de inventario de cocina
- **`/recetas`** - Libro de recetas y preparaciones

#### 👑 Solo Administrador
- **`/encuestas`** - Campañas de encuestas SMS
- **`/configuracion`** - Configuración completa del sistema

---

## 🔐 Sistema de Licencias

### 📊 **Tipos de Licencia** (Jerárquico)

| Licencia       | Nivel | Color           | Descripción                      |
|----------------|-------|-----------------|----------------------------------|
| **Gratis**     | 0     | `bg-gray-500`   | Funcionalidad básica             |
| **Lite**       | 1     | `bg-blue-500`   | + Gestión de productos           |
| **Pro**        | 2     | `bg-purple-500` | + Reportes e inventario avanzado |
| **Franquicia** | 3     | `bg-orange-500` | + Multi-sucursal y API completa  |

### 🎯 **Funcionalidades por Licencia**

| Funcionalidad            | Licencia Requerida | Descripción                              |
|--------------------------|--------------------|------------------------------------------|
| **Gestión de Productos** | Lite+              | Crear, editar y eliminar productos       |
| **Reportes Avanzados**   | Pro+               | Análisis detallado de ventas y productos |
| **Inventario Avanzado**  | Pro+               | Control de stock y alertas de inventario |
| **Integración POS**      | Pro+               | Conexión con sistemas de punto de venta  |
| **Multi-sucursal**       | Franquicia         | Gestión de múltiples ubicaciones         |
| **API Completa**         | Franquicia         | Acceso completo a la API REST            |

---

## 📋 Matriz de Accesos Completa

| Módulo/Función     | 👑 Admin           | 🏢 Gerente         | 💰 Cajero     | 🍽️ Mesero       | 👨‍🍳 Cocinero |
|--------------------|--------------------|--------------------|---------------|------------------|----------------|
| **Dashboard**      | ✅ Completo         | ✅ Completo         | ✅ Básico      | ✅ Básico         | ✅ Básico       |
| **Productos**      | ✅ Completo         | ✅ Gestión          | ❌             | ❌                | ❌              |
| **Catálogos**      | ✅ Completo         | ❌                  | ❌             | ❌                | ❌              |
| **Mesas**          | ✅ Admin completa   | ✅ Solo estado      | ❌             | ✅ Solo asignadas | ❌              |
| **Clientes**       | ✅ Base completa    | ✅ Gestión          | ✅ Info básica | ✅ Info básica    | ❌              |
| **Reservaciones**  | ✅ Gestión completa | ✅ Gestión completa | ❌             | ✅ Solo vista     | ❌              |
| **Punto de Venta** | ✅ Completo         | ✅ Completo         | ✅ Principal   | ❌                | ❌              |
| **Reportes**       | ✅ Todos            | ✅ Gestión          | ✅ Solo ventas | ❌                | ❌              |
| **Configuración**  | ✅ Completo         | ❌                  | ❌             | ❌                | ❌              |
| **Encuestas SMS**  | ✅ Completo         | ❌                  | ❌             | ❌                | ❌              |
| **Inventario**     | ✅ Completo         | ❌                  | ❌             | ❌                | ✅ Control      |
| **Recetas**        | ✅ Completo         | ❌                  | ❌             | ❌                | ✅ Gestión      |
| **Facturas**       | ✅ Completo         | ❌                  | ✅ Gestión     | ❌                | ❌              |

---

## 🛡️ Rutas Protegidas

### 📍 **Rutas Públicas** (sin autenticación)
```typescript
["/", "/login", "/acceso-denegado"]
```

### 🔒 **Rutas Protegidas** (requieren autenticación)
```typescript
[
  // Dashboard principal
  "/main",
  
  // Módulos de gestión
  "/productos", "/catalogos", "/inventario", 
  "/clientes", "/mesas", "/reservaciones", "/recetas",
  
  // Módulos administrativos
  "/reportes", "/ventas", "/facturas", 
  "/encuestas", "/configuracion",
  
  // Interfaces específicas
  "/cajero", "/mesero", "/cocina"
]
```

### 🚪 **Redirección por Rol** (después del login)
- **super_admin/admin/gerente** → `/main`
- **cajero** → `/cajero`
- **mesero** → `/mesero`
- **cocinero** → `/cocina/ordenes`

---

## 🎨 Identificación Visual de Roles

### 🏷️ **Colores de Badges**
```css
Administrador: bg-red-100 text-red-800
Gerente:       bg-blue-100 text-blue-800
Cajero:        bg-green-100 text-green-800
Mesero:        bg-purple-100 text-purple-800
Cocinero:      bg-orange-100 text-orange-800
```

### 📊 **Badges Dinámicos**
- **Mesero - Órdenes**: Muestra "3" (órdenes pendientes)
- **Cocinero - Órdenes**: Badge dinámico con conteo en tiempo real

---

## 📝 Notas Técnicas

### 🔧 **Implementación**
- **Archivo principal**: `components/layout/role-navigation.tsx`
- **Validación de rutas**: `lib/config/routes.ts`
- **Middleware**: `middleware.ts` (verificación de tokens)
- **Context**: Cada rol tiene navegación específica generada dinámicamente

### 🎯 **Principios de Diseño**
1. **Menor privilegio**: Cada rol tiene acceso solo a lo necesario
2. **Separación de responsabilidades**: Interfaces específicas por rol
3. **Escalabilidad**: Sistema de licencias para funcionalidades adicionales
4. **Usabilidad**: Navegación optimizada por función laboral

---

> **Fecha de creación**: 10 de septiembre de 2025  
> **Estado**: Sistema original antes de integración JWT  
> **Autor**: Sistema AppRest Frontend
