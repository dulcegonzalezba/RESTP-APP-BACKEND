# 🔧 Propuesta: Sistema Unificado de Roles y Permisos

> **Análisis y Propuesta de Integración**: Combinando el sistema de base de datos existente con las necesidades del frontend AppRest.

---

## 📊 **ANÁLISIS DE LA SITUACIÓN ACTUAL**

### 🎯 **Fortalezas de la Base de Datos Actual:**
- ✅ **Sistema granular de permisos** basado en módulos y acciones
- ✅ **Roles flexibles** con configuraciones específicas por restaurante
- ✅ **Control de acceso efectivo** y límites monetarios
- ✅ **Sesiones con contexto** (sucursal, turno, terminal)
- ✅ **Auditoría completa** de actividades
- ✅ **Sincronización** para sistemas offline
- ✅ **Multi-empresa** y multi-sucursal

### 🎯 **Fortalezas del Frontend Actual:**
- ✅ **Navegación optimizada** por rol laboral
- ✅ **Interfaces especializadas** (cajero, mesero, cocinero)
- ✅ **Sistema de licencias** escalable
- ✅ **UX intuitiva** con páginas de inicio específicas
- ✅ **Separación clara** de responsabilidades

### ⚠️ **Gaps Identificados:**
- 🔄 **Mapeo roles**: BD tiene 6 roles vs Frontend tiene 5 roles
- 🔄 **Módulos faltantes**: Frontend tiene módulos no definidos en BD
- 🔄 **Licencias**: Sistema de licencias del frontend no integrado con planes de BD
- 🔄 **Páginas específicas**: Rutas especializadas (/cajero, /mesero) no consideradas

---

## 🚀 **PROPUESTA: SISTEMA UNIFICADO**

### 1. 🎭 **MAPEO DE ROLES (BD ↔ Frontend)**

| BD Role               | Frontend Role     | Código       | Página Inicial    | Prioridad |
|-----------------------|-------------------|--------------|-------------------|-----------|
| `rol_gerente`         | **Administrador** | `ADMIN`      | `/main`           | 1         |
| `rol_subgerente`      | **Gerente**       | `GERENTE`    | `/main`           | 2         |
| `rol_cajero`          | **Cajero**        | `CAJERO`     | `/cajero`         | 3         |
| `rol_mesero`          | **Mesero**        | `MESERO`     | `/mesero`         | 4         |
| `rol_cocinero`        | **Cocinero**      | `COCINERO`   | `/cocina/ordenes` | 5         |
| `rol_auxiliar_cocina` | **Cocinero**      | `AUX_COCINA` | `/cocina/ordenes` | 6         |

**Nota**: `rol_auxiliar_cocina` se mapea al mismo frontend role que `rol_cocinero` pero con permisos limitados.

### 2. 📱 **MÓDULOS UNIFICADOS (BD + Frontend)**

#### **Módulos Existentes en BD que se Mapean:**
```json
{
  "mod_pos": {
    "frontend_routes": ["/ventas/pos", "/cajero"],
    "name": "Punto de Venta",
    "acciones": ["PROCESAR_VENTA", "APLICAR_DESCUENTO", "CANCELAR_VENTA"]
  },
  "mod_caja": {
    "frontend_routes": ["/cajero", "/facturas"],
    "name": "Gestión de Caja", 
    "acciones": ["ABRIR_CAJA", "CORTE_PARCIAL", "CORTE_FINAL", "CONSULTAR_MOV"]
  },
  "mod_cocina": {
    "frontend_routes": ["/cocina/ordenes"],
    "name": "Gestión de Cocina",
    "acciones": ["VER_ORDENES", "MARCAR_LISTO", "CANCELAR_ORDEN"]
  },
  "mod_inventario": {
    "frontend_routes": ["/inventario"],
    "name": "Inventario",
    "acciones": ["VER_STOCK", "ACTUALIZAR_STOCK", "ALERTAS_STOCK"]
  },
  "mod_reportes": {
    "frontend_routes": ["/reportes"],
    "name": "Reportes",
    "acciones": ["VER_VENTAS", "VER_INVENTARIO", "VER_OPERACIONAL"]
  }
}
```

#### **Módulos del Frontend que Necesitan Crearse en BD:**
```sql
-- Nuevos módulos para BD
INSERT INTO "global_sistema"."modulos" VALUES
('mod_dashboard', 'DASHBOARD', 'Dashboard Principal', 'Vista general del restaurante', 'dashboard', 'general', 1, true),
('mod_productos', 'PRODUCTOS', 'Gestión de Productos', 'Gestión del menú y productos', 'menu', 'operativo', 2, true),
('mod_mesas', 'MESAS', 'Gestión de Mesas', 'Administración de mesas y layout', 'table', 'operativo', 3, true),
('mod_clientes', 'CLIENTES', 'Gestión de Clientes', 'Base de datos de clientes', 'users', 'comercial', 4, true),
('mod_reservaciones', 'RESERVACIONES', 'Reservaciones', 'Sistema de reservas', 'calendar', 'comercial', 5, true),
('mod_catalogos', 'CATALOGOS', 'Catálogos Maestros', 'Configuración de catálogos', 'settings', 'admin', 6, true),
('mod_encuestas', 'ENCUESTAS', 'Encuestas SMS', 'Campañas de satisfacción', 'message', 'marketing', 7, true),
('mod_configuracion', 'CONFIG', 'Configuración', 'Configuración del sistema', 'cog', 'admin', 8, true);
```

### 3. 🎯 **ACCIONES POR MÓDULO (Granulares)**

#### **Módulo Dashboard:**
```sql
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_dash_001', 'mod_dashboard', 'VER_GENERAL', 'Ver Dashboard General', 'Vista general básica', false, 'normal', 1, true),
('acc_dash_002', 'mod_dashboard', 'VER_AVANZADO', 'Ver Métricas Avanzadas', 'KPIs y métricas detalladas', false, 'normal', 2, true);
```

#### **Módulo Productos:**
```sql
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_prod_001', 'mod_productos', 'VER_PRODUCTOS', 'Ver Productos', 'Consultar menú y productos', false, 'normal', 1, true),
('acc_prod_002', 'mod_productos', 'CREAR_PRODUCTO', 'Crear Producto', 'Agregar nuevos productos', true, 'alta', 2, true),
('acc_prod_003', 'mod_productos', 'EDITAR_PRODUCTO', 'Editar Producto', 'Modificar productos existentes', true, 'alta', 3, true),
('acc_prod_004', 'mod_productos', 'ELIMINAR_PRODUCTO', 'Eliminar Producto', 'Eliminar productos', true, 'critica', 4, true),
('acc_prod_005', 'mod_productos', 'CAMBIAR_PRECIOS', 'Cambiar Precios', 'Modificar precios de productos', true, 'alta', 5, true);
```

#### **Módulo Mesas:**
```sql
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_mesa_001', 'mod_mesas', 'VER_LAYOUT', 'Ver Layout de Mesas', 'Visualizar distribución de mesas', false, 'normal', 1, true),
('acc_mesa_002', 'mod_mesas', 'ASIGNAR_MESA', 'Asignar Mesa', 'Asignar mesa a mesero', false, 'normal', 2, true),
('acc_mesa_003', 'mod_mesas', 'CAMBIAR_ESTADO', 'Cambiar Estado Mesa', 'Ocupar/liberar mesas', false, 'normal', 3, true),
('acc_mesa_004', 'mod_mesas', 'CONFIG_LAYOUT', 'Configurar Layout', 'Modificar distribución de mesas', true, 'alta', 4, true);
```

### 4. 🔐 **MATRIZ DE PERMISOS SIMPLIFICADA**

```sql
-- ADMINISTRADOR (rol_gerente) - Acceso completo a todo
INSERT INTO "rest_test"."permisos" (id_permiso, id_rol, id_modulo_accion, permitido, activo) 
SELECT 
    'perm_admin_' || ROW_NUMBER() OVER(),
    'rol_gerente',
    id_modulo_accion,
    true,
    true
FROM "global_sistema"."modulo_acciones" WHERE activo = true;

-- GERENTE (rol_subgerente) - Sin configuración crítica
INSERT INTO "rest_test"."permisos" (id_permiso, id_rol, id_modulo_accion, permitido, requiere_autorizacion, activo)
SELECT 
    'perm_ger_' || ROW_NUMBER() OVER(),
    'rol_subgerente',
    ma.id_modulo_accion,
    true,
    CASE WHEN ma.nivel_criticidad = 'critica' THEN true ELSE false END,
    true
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.codigo NOT IN ('CONFIG', 'CATALOGOS', 'ENCUESTAS');

-- CAJERO (rol_cajero) - Solo POS y Caja
INSERT INTO "rest_test"."permisos" (id_permiso, id_rol, id_modulo_accion, permitido, limitacion_monetaria, activo)
SELECT 
    'perm_caj_' || ROW_NUMBER() OVER(),
    'rol_cajero',
    ma.id_modulo_accion,
    true,
    CASE WHEN ma.codigo = 'APLICAR_DESCUENTO' THEN 500.00 ELSE NULL END,
    true
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.codigo IN ('DASHBOARD', 'POS', 'CAJA', 'CLIENTES');

-- MESERO (rol_mesero) - Solo operaciones de servicio
INSERT INTO "rest_test"."permisos" (id_permiso, id_rol, id_modulo_accion, permitido, limitacion_monetaria, activo)
SELECT 
    'perm_mes_' || ROW_NUMBER() OVER(),
    'rol_mesero',
    ma.id_modulo_accion,
    true,
    CASE WHEN ma.codigo = 'APLICAR_DESCUENTO' THEN 100.00 ELSE NULL END,
    true
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.codigo IN ('DASHBOARD', 'MESAS', 'CLIENTES', 'RESERVACIONES')
  AND ma.codigo NOT IN ('CONFIG_LAYOUT', 'ELIMINAR_PRODUCTO');

-- COCINERO (rol_cocinero) - Solo cocina e inventario
INSERT INTO "rest_test"."permisos" (id_permiso, id_rol, id_modulo_accion, permitido, activo)
SELECT 
    'perm_coc_' || ROW_NUMBER() OVER(),
    'rol_cocinero',
    ma.id_modulo_accion,
    true,
    true
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.codigo IN ('DASHBOARD', 'COCINA', 'INVENTARIO');
```

### 5. 🏗️ **ESTRUCTURA DE RESPUESTA PARA FRONTEND**

#### **Login Response Mejorado:**
```typescript
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    nombre: string;
    sucursal: string;
    area: string;
  };
  session: {
    id: string;
    rolActivo: {
      codigo: string; // 'ADMIN', 'GERENTE', etc.
      nombre: string;
      frontendRole: string; // Para mapeo directo
      paginaInicial: string; // '/main', '/cajero', etc.
      color: string; // 'bg-red-100 text-red-800'
    };
    rolesDisponibles: RolInfo[];
    permisos: PermisoDetallado[];
    contexto: {
      sucursal: string;
      turno: string;
      terminal?: string;
      licencia: LicenciaInfo;
    }
  }
}

interface PermisoDetallado {
  modulo: string; // 'DASHBOARD', 'POS', etc.
  accion: string; // 'VER_PRODUCTOS', 'PROCESAR_VENTA', etc.
  permitido: boolean;
  limitacionMonetaria?: number;
  requiereAutorizacion: boolean;
  // Para frontend
  frontendRoute?: string; // '/productos', '/ventas/pos'
  frontendAction?: string; // 'read', 'create', 'update', 'delete'
}

interface LicenciaInfo {
  tipo: 'Gratis' | 'Lite' | 'Pro' | 'Franquicia';
  nivel: number; // 0-3
  color: string;
  modulos: string[]; // Módulos disponibles según licencia
}
```

### 6. 🎯 **ENDPOINTS PROPUESTOS**

```typescript
// Obtener permisos del usuario actual
GET /api/auth/permissions
Response: {
  permisos: PermisoDetallado[];
  navegacion: NavegacionItem[];
  licencia: LicenciaInfo;
}

// Validar acción específica
POST /api/auth/validate-action
Body: { modulo: string, accion: string, monto?: number }
Response: { permitido: boolean, motivo?: string }

// Cambiar rol activo
POST /api/auth/switch-role
Body: { rolId: string }
Response: LoginResponse

// Obtener navegación por rol
GET /api/auth/navigation
Response: NavegacionItem[]
```

### 7. 🔧 **IMPLEMENTACIÓN SIMPLIFICADA**

#### **Servicio de Permisos (Backend):**
```typescript
@Injectable()
export class PermisosService {
  
  async getPermisosUsuario(usuarioId: string, rolActivo?: string) {
    // 1. Obtener rol activo del usuario
    const rol = await this.getRolActivo(usuarioId, rolActivo);
    
    // 2. Obtener permisos del rol con joins
    const permisos = await this.prisma.permiso.findMany({
      where: { idRol: rol.id, activo: true },
      include: {
        moduloAccion: {
          include: { modulo: true }
        }
      }
    });
    
    // 3. Transformar a formato frontend
    return permisos.map(p => ({
      modulo: p.moduloAccion.modulo.codigo,
      accion: p.moduloAccion.codigo,
      permitido: p.permitido,
      limitacionMonetaria: p.limitacionMonetaria,
      requiereAutorizacion: p.requiereAutorizacion,
      frontendRoute: this.mapToFrontendRoute(p.moduloAccion.modulo.codigo),
      frontendAction: this.mapToFrontendAction(p.moduloAccion.codigo)
    }));
  }
  
  async validarAccion(usuarioId: string, modulo: string, accion: string, monto?: number) {
    // Lógica simple de validación
    const permiso = await this.getPermiso(usuarioId, modulo, accion);
    
    if (!permiso?.permitido) return { permitido: false, motivo: 'sin_permiso' };
    if (monto && permiso.limitacionMonetaria && monto > permiso.limitacionMonetaria) {
      return { permitido: false, motivo: 'limite_excedido' };
    }
    
    return { permitido: true };
  }
}
```

#### **Hook de React (Frontend):**
```typescript
function usePermisos() {
  const { user } = useAuth();
  
  const puedeAcceder = (modulo: string, accion?: string) => {
    const permisos = user?.session?.permisos || [];
    return permisos.some(p => 
      p.modulo === modulo && 
      (accion ? p.accion === accion : true) && 
      p.permitido
    );
  };
  
  const puedeNavegar = (ruta: string) => {
    const permisos = user?.session?.permisos || [];
    return permisos.some(p => p.frontendRoute === ruta && p.permitido);
  };
  
  return { puedeAcceder, puedeNavegar };
}
```

### 8. ⚡ **VENTAJAS DE ESTA PROPUESTA**

#### **✅ Simplicidad:**
- **1 tabla de roles** con configuración específica restaurante
- **1 tabla de permisos** granular pero no excesiva
- **Mapeo directo** BD ↔ Frontend
- **Endpoints mínimos** pero potentes

#### **✅ Flexibilidad:**
- **Roles específicos** por área de trabajo
- **Permisos granulares** cuando se necesitan
- **Limitaciones monetarias** configurables
- **Sistema de licencias** integrado

#### **✅ Escalabilidad:**
- **Multi-empresa** y multi-sucursal ready
- **Nuevos módulos** fáciles de agregar
- **Nuevos roles** sin cambios estructurales
- **Auditoría completa** incluida

#### **✅ UX Optimizada:**
- **Navegación específica** por rol
- **Páginas de inicio** optimizadas
- **Validaciones en tiempo real**
- **Interfaces especializadas** mantenidas

---

## 🚀 **PLAN DE IMPLEMENTACIÓN**

### **Fase 1: Preparación de BD (1-2 días)**
1. ✅ Crear módulos faltantes en BD
2. ✅ Crear acciones granulares para cada módulo
3. ✅ Generar permisos básicos para cada rol
4. ✅ Migración de datos de prueba

### **Fase 2: Backend Services (2-3 días)**
1. ✅ Servicio de permisos unificado
2. ✅ Endpoints de validación
3. ✅ Transformadores BD → Frontend
4. ✅ Middleware de autorización

### **Fase 3: Frontend Integration (2-3 días)**
1. ✅ Hook de permisos
2. ✅ Componente de navegación dinámico
3. ✅ Guards de rutas actualizado
4. ✅ Validaciones de acciones

### **Fase 4: Testing y Refinamiento (1-2 días)**
1. ✅ Pruebas por rol
2. ✅ Validación de flujos críticos
3. ✅ Optimización de performance
4. ✅ Documentación final

---

## 🎯 **DECISIÓN REQUERIDA**

¿Procedo con la implementación de esta propuesta? 

**Beneficios principales:**
- ✅ Mantiene la flexibilidad del sistema actual de BD
- ✅ Respeta la UX del frontend existente  
- ✅ Unifica ambos sistemas sin perder funcionalidad
- ✅ Implementación incremental (no breaking changes)
- ✅ Escalable y mantenible a largo plazo

**¿Algún ajuste o consideración adicional antes de proceder?**
