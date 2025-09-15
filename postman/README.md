# 🚀 Colección de Postman - Sistema de Permisos

Esta carpeta contiene la colección completa de Postman para testing del **Sistema de Permisos Unificado**.

## 📁 Archivos Incluidos

```
postman/
├── RESTP-Sistema-Permisos-Completo.postman_collection.json  # Colección principal
├── RESTP-Desarrollo.postman_environment.json               # Variables de entorno
└── README.md                                               # Esta documentación
```

## 🚀 Inicio Rápido

### 1. **Importar en Postman**
1. Abrir Postman
2. Click en "Import"
3. Seleccionar ambos archivos JSON
4. ¡Listo para usar!

### 2. **Configurar Entorno**
- Seleccionar entorno "RESTP - Desarrollo"
- Verificar que `base_url` sea `http://localhost:3000`
- Los tokens se llenan automáticamente al hacer login

### 3. **Ejecutar Tests**
```bash
# Opción 1: Comando rápido
npm run test:api

# Opción 2: Con reportes completos
npm run test:api:report

# Opción 3: Script automatizado (Windows)
npm run test:api:windows
```

## 📊 Cobertura de Tests

### ✅ **45+ Requests organizados en:**
- 🔐 **Autenticación** (4 requests)
- 🔑 **Sistema de Permisos** (6 requests) 
- 🛡️ **Seguridad Avanzada** (11 requests)
- 📊 **Monitoreo** (2 requests)
- 🚫 **Casos de Error** (3 requests)

### ✅ **120+ Tests Automatizados:**
- Validación de códigos de estado
- Verificación de estructura de datos
- Tests de seguridad y permisos
- Medición de performance
- Validación de cache

## 🎯 Escenarios de Uso

### **Desarrollo Diario**
```bash
# Testing rápido durante desarrollo
npm run test:api
```

### **CI/CD Pipeline**
```yaml
# .github/workflows/api-tests.yml
- name: API Tests
  run: npm run test:api:report
```

### **Debugging**
1. Ejecutar request específico en Postman
2. Revisar logs en "Console"
3. Verificar variables en "Environment"

## 📈 Reportes

Los scripts generan reportes en `./test-reports/`:
- 📄 `api-test-report.html` - Reporte visual
- 📊 `api-test-report.json` - Datos para análisis

## 🔧 Personalización

### **Agregar Nuevo Test**
1. Duplicar request similar
2. Modificar URL y datos
3. Actualizar tests en pestaña "Tests"

### **Nuevo Entorno**
```json
{
  "name": "RESTP - Producción",
  "values": [
    {"key": "base_url", "value": "https://api.restp.com"}
  ]
}
```

## 📚 Documentación Completa

Ver: `docs/POSTMAN_TESTING_GUIDE.md` para documentación detallada.

---

**¡Happy Testing!** 🎉