# Sistema de Seguridad Avanzado - Fase 4

## 📋 Resumen

El **Sistema de Seguridad Avanzado** implementa una arquitectura completa de autenticación y autorización basada en decoradores, guards e interceptors de NestJS. Proporciona validación granular de permisos, control de montos límite, verificación de roles jerárquicos, y funcionalidades de auditoría con cache optimizado.

## 🏗️ Arquitectura

### Componentes Principales

```
src/auth/
├── decorators/           # Decoradores para endpoints
├── guards/              # Guards de validación automática  
├── interceptors/        # Interceptors de auditoría y performance
├── services/            # Servicios de cache y lógica de negocio
├── controllers/         # Controladores con ejemplos avanzados
├── tests/               # Suite completa de tests
└── index.ts            # Exportaciones centralizadas
```

## 🎯 Decoradores Disponibles

### @RequierePermiso(codigoAccion)
Valida que el usuario tenga un permiso específico para ejecutar la acción.

```typescript
@RequierePermiso('CREAR_USUARIOS')
@UseGuards(PermisosGuard)
async crearUsuario(@Body() datos: CrearUsuarioDto) {
  // Solo usuarios con permiso CREAR_USUARIOS pueden acceder
}
```

### @ValidarMontoLimite(codigoLimite)
Verifica que el monto del request no exceda los límites del usuario.

```typescript
@ValidarMontoLimite('LIMITE_TRANSACCIONES')
@UseGuards(MontoLimiteGuard)
async procesarTransaccion(@Body() { monto }: { monto: number }) {
  // Valida que el monto esté dentro de los límites permitidos
}
```

### @RolMinimo(nivelRol)
Asegura que el usuario tenga al menos el nivel de rol especificado.

```typescript
@RolMinimo(NivelRol.SUPERVISOR)
@UseGuards(RolMinimoGuard)
async operacionSupervisor() {
  // Solo usuarios con rol SUPERVISOR o superior
}
```

## 🛡️ Guards de Seguridad

### PermisosGuard
- **Propósito**: Valida permisos específicos por acción
- **Configuración**: Usa metadata del decorador @RequierePermiso
- **Cache**: Utiliza PermisosCache para optimizar consultas
- **Integración**: Con PermisosService para validación en BD

### MontoLimiteGuard  
- **Propósito**: Controla límites monetarios por usuario/rol
- **Detección**: Busca campo 'monto' en request body
- **Validación**: Compara contra límites configurados en BD
- **Flexibilidad**: Permite endpoints sin monto

### RolMinimoGuard
- **Propósito**: Verifica jerarquía de roles
- **Niveles**: EMPLEADO < SUPERVISOR < GERENTE < ADMINISTRADOR
- **Configuración**: Usa metadata del decorador @RolMinimo
- **Validación**: Compara nivel del usuario vs requerido

## 📊 Interceptors de Monitoreo

### AuditoriaPermisosInterceptor
Registra todas las operaciones de seguridad para auditoría.

**Información capturada:**
- Usuario que ejecuta la acción
- Timestamp y duración
- Permisos validados
- Request/Response (configurable)
- Integración con sistemas externos

### PerformancePermisosInterceptor
Monitorea el rendimiento del sistema de permisos.

**Métricas recolectadas:**
- Tiempo de validación de permisos
- Alertas por operaciones lentas (>100ms)
- Estadísticas de cache hit/miss
- Métricas de throughput

## 🚀 Cache Inteligente

### PermisosCache
Sistema de cache en memoria con TTL configurable para optimizar consultas frecuentes.

**Características:**
- **TTL Diferenciado**: 10 min permisos, 2 min validaciones
- **Invalidación Granular**: Por usuario, empresa o completa
- **Limpieza Automática**: Cada 5 minutos
- **Estadísticas**: Monitoreo de uso y rendimiento

```typescript
// Ejemplo de uso
const permisos = cache.getPermisosUsuario('user123', 'emp1');
if (!permisos) {
  const nuevosPermisos = await service.obtenerPermisos();
  cache.setPermisosUsuario('user123', 'emp1', nuevosPermisos);
}
```

## 🏆 Ejemplos de Uso Avanzado

### Endpoint con Múltiples Validaciones

```typescript
@Post('reembolsos/:id/aprobar')
@RolMinimo(NivelRol.SUPERVISOR)           // Rol mínimo
@RequierePermiso('APROBAR_REEMBOLSOS')    // Permiso específico
@ValidarMontoLimite('LIMITE_REEMBOLSOS')  // Límite monetario
@UseGuards(RolMinimoGuard, PermisosGuard, MontoLimiteGuard)
@UseInterceptors(AuditoriaPermisosInterceptor, PerformancePermisosInterceptor)
async aprobarReembolso(
  @Param('id') idReembolso: string,
  @Body() datos: { monto: number; motivo: string },
  @CurrentUser() usuario: UsuarioAutenticado,
) {
  // Lógica del endpoint - todas las validaciones son automáticas
}
```

### Controlador Administrativo Completo

El `AdminAvanzadoController` demuestra patrones de uso real con:

- ✅ **Dashboard administrativo** - Solo gerentes y superiores
- ✅ **CRUD de usuarios** - Permisos granulares por operación  
- ✅ **Transacciones financieras** - Validación de montos límite
- ✅ **Configuración del sistema** - Solo administradores
- ✅ **Consulta de logs** - Permisos específicos de auditoría

## 🧪 Testing

### Suite de Tests Incluida

```typescript
// Tests de integración completos
describe('Sistema de Seguridad Completo', () => {
  // PermisosGuard tests
  it('debe permitir acceso con permiso válido')
  it('debe denegar acceso sin permiso')
  it('debe usar cache cuando disponible')
  
  // MontoLimiteGuard tests  
  it('debe permitir transacciones dentro del límite')
  it('debe denegar transacciones que excedan límite')
  
  // RolMinimoGuard tests
  it('debe permitir acceso con rol suficiente')
  it('debe denegar acceso con rol insuficiente')
  
  // Integración de Guards
  it('debe manejar múltiples validaciones correctamente')
  
  // PermisosCache tests
  it('debe almacenar y recuperar permisos')
  it('debe invalidar cache por usuario/empresa')
});
```

## ⚙️ Configuración

### Integración en AuthModule

```typescript
@Module({
  imports: [PermisosModule, PassportModule, JwtModule.registerAsync(...)],
  controllers: [AuthController, SystemAuthController, AdminAvanzadoController],
  providers: [
    // Servicios base
    AuthService, SystemAuthService, PermisosCache,
    
    // Guards de seguridad
    JwtAuthGuard, PermisosGuard, MontoLimiteGuard, RolMinimoGuard,
    
    // Interceptors de monitoreo
    AuditoriaPermisosInterceptor, PerformancePermisosInterceptor,
  ],
  exports: [
    // Exportar guards e interceptors para uso global
    PermisosGuard, MontoLimiteGuard, RolMinimoGuard,
    AuditoriaPermisosInterceptor, PerformancePermisosInterceptor,
    PermisosCache,
  ],
})
export class AuthModule {}
```

### Variables de Entorno

```env
# Configuración de cache
PERMISOS_CACHE_TTL=600000          # 10 minutos
VALIDACIONES_CACHE_TTL=120000      # 2 minutos

# Configuración de auditoría  
AUDITORIA_INCLUDE_REQUEST_BODY=true
AUDITORIA_INCLUDE_RESPONSE_BODY=false

# Configuración de performance
PERFORMANCE_ALERT_THRESHOLD=100    # ms
PERFORMANCE_METRICS_ENABLED=true
```

## 🚀 Implementación en Producción

### Consideraciones de Rendimiento

1. **Cache Redis**: Reemplazar PermisosCache con Redis para escalabilidad
2. **Base de Datos**: Índices optimizados en tablas de permisos
3. **Logging**: Integración con ELK Stack o similar
4. **Métricas**: Exportar métricas a Prometheus/Grafana

### Seguridad Adicional

1. **Rate Limiting**: Por usuario y endpoint
2. **IP Whitelisting**: Para operaciones críticas
3. **Encriptación**: Datos sensibles en cache
4. **Rotación de Tokens**: JWT con refresh tokens

## 📚 API Reference

### Decoradores
- `@RequierePermiso(codigo: string)`
- `@ValidarMontoLimite(codigoLimite: string)`
- `@RolMinimo(nivel: NivelRol)`
- `@CurrentUser()` - Inyecta usuario autenticado

### Guards  
- `PermisosGuard` - Validación de permisos
- `MontoLimiteGuard` - Control de límites monetarios
- `RolMinimoGuard` - Verificación de roles jerárquicos

### Interceptors
- `AuditoriaPermisosInterceptor` - Logging de auditoría
- `PerformancePermisosInterceptor` - Monitoreo de rendimiento

### Services
- `PermisosCache` - Cache inteligente de permisos
- `PermisosService` - Lógica de validación (Fase 3)

## 📈 Roadmap

### Próximas Mejoras
- [ ] Integración con Redis para cache distribuido
- [ ] Dashboard web para administración de permisos
- [ ] API GraphQL para consultas complejas
- [ ] Integración con Active Directory/LDAP
- [ ] Sistema de notificaciones en tiempo real
- [ ] Analytics avanzados de uso

---

## 🎉 Conclusión

La **Fase 4** completa el sistema de permisos unificado con una arquitectura robusta, escalable y fácil de usar. Los desarrolladores pueden aplicar validaciones complejas de seguridad simplemente usando decoradores, mientras que el sistema maneja automáticamente la validación, cache, auditoría y monitoreo.

**¡El sistema está listo para producción!** 🚀