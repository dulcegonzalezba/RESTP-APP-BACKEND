# Token de Desarrollo para Postman

## Resumen
Se ha creado un endpoint especial para generar tokens de larga duración (365 días) exclusivamente para desarrollo y testing con Postman.

## Endpoint de Token de Desarrollo

### Endpoint
```
POST /auth/system/dev-token
```

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "email": "superadmin@restaurant.com",
  "password": "admin123"
}
```

### Respuesta
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "nombre": "Super Admin",
    "email": "superadmin@restaurant.com",
    "rol": "super_admin",
    "restaurante": null,
    "sucursal": null,
    "permissions": ["*"]
  },
  "expiresIn": "365d"
}
```

## Configuración en Postman

### 1. Crear Variables de Entorno
En tu colección de Postman, crea las siguientes variables:

- `baseUrl`: `http://localhost:3000`
- `authToken`: (se establecerá automáticamente)

### 2. Script de Pre-request (Collection Level)
Agrega este script a nivel de colección para obtener el token automáticamente:

```javascript
// Solo ejecutar si no hay token o si ha expirado
if (!pm.collectionVariables.get("authToken")) {
    pm.sendRequest({
        url: pm.collectionVariables.get("baseUrl") + "/auth/system/dev-token",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: {
            mode: "raw",
            raw: JSON.stringify({
                email: "superadmin@restaurant.com",
                password: "admin123"
            })
        }
    }, (err, res) => {
        if (err) {
            console.log("Error obteniendo token:", err);
        } else {
            const response = res.json();
            pm.collectionVariables.set("authToken", response.accessToken);
            console.log("Token de desarrollo obtenido exitosamente");
        }
    });
}
```

### 3. Configurar Authorization
En cada request que requiera autenticación:

1. Ve a la pestaña **Authorization**
2. Selecciona **Bearer Token**
3. En el campo Token, ingresa: `{{authToken}}`

## Usuarios de Prueba

### Super Admin
```json
{
  "email": "superadmin@restaurant.com",
  "password": "admin123"
}
```

### Admin de Restaurante
```json
{
  "email": "admin@deliciascriollas.com",
  "password": "admin123"
}
```

### Manager de Sucursal
```json
{
  "email": "manager.centronorte@deliciascriollas.com",
  "password": "manager123"
}
```

### Empleado
```json
{
  "email": "mesero.juan@deliciascriollas.com",
  "password": "empleado123"
}
```

## Características del Token de Desarrollo

- **Duración**: 365 días (1 año)
- **Solo en Desarrollo**: El endpoint se desactiva automáticamente en producción
- **Mismos Permisos**: Funciona igual que un token normal, solo con mayor duración
- **Compatible**: Totalmente compatible con la colección de Postman existente

## Endpoints Protegidos Disponibles

Con el token obtenido puedes acceder a todos los endpoints protegidos:

### Autenticación
- `GET /auth/system/profile` - Perfil del usuario
- `GET /auth/system/usuarios` - Lista de usuarios
- `GET /auth/system/restaurantes` - Lista de restaurantes
- `GET /auth/system/sucursales` - Lista de sucursales

### Recursos
- `GET /clientes` - Lista de clientes
- `POST /clientes` - Crear cliente
- `GET /mesas` - Lista de mesas
- `POST /mesas` - Crear mesa
- `GET /productos` - Lista de productos
- `POST /productos` - Crear producto
- `GET /reservaciones` - Lista de reservaciones
- `POST /reservaciones` - Crear reservación

## Notas de Seguridad

⚠️ **IMPORTANTE**: Este endpoint solo está disponible cuando `NODE_ENV !== 'production'`

En producción, los tokens mantienen su duración original de 2 horas para mayor seguridad.

## Solución de Problemas

### Token Expirado
Si el token expira (después de 365 días), simplemente:
1. Borra la variable `authToken` en Postman
2. Ejecuta cualquier request - el script automáticamente obtendrá un nuevo token

### Error 401 - Unauthorized
Verifica que:
1. El servidor esté ejecutándose en modo desarrollo
2. Las credenciales en el script sean correctas
3. La variable `authToken` esté configurada correctamente

### Endpoint No Disponible
Si recibes un error de que el endpoint no está disponible:
1. Verifica que `NODE_ENV` no esté configurado como 'production'
2. Reinicia el servidor en modo desarrollo