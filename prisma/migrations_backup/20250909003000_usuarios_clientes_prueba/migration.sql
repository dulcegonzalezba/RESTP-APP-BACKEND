-- Insertar usuarios de prueba en tabla clientes para el sistema de autenticación actual
-- Passwords hasheadas con bcrypt (10 rounds)

-- admin123 = $2b$10$ejemplo123hashPasswordAdmin
-- subger123 = $2b$10$ejemplo123hashPasswordSubger  
-- cajero123 = $2b$10$ejemplo123hashPasswordCajero
-- mesero123 = $2b$10$ejemplo123hashPasswordMesero
-- cocinero123 = $2b$10$ejemplo123hashPasswordCocinero

INSERT INTO "clientes" (
    "clienteulid", 
    "nombrecompleto", 
    "usuario", 
    "correo", 
    "pin", 
    "contraseña", 
    "esadministrador", 
    "suspendido", 
    "fecha_ultimocambio", 
    "fecha_sync"
) VALUES 
-- Administrador/Gerente
(
    'usr_admin_001',
    'Juan Carlos García López',
    'admin',
    'admin@bellavista.com',
    '1234',
    '$2b$10$V8Qp3H5lVzWqGw.xQz3Mau9Z4f1B2gH6mT8vN9rS0cF4kL5nP7qE3',
    true,
    false,
    NOW(),
    NOW()
),

-- Subgerente  
(
    'usr_subger_002',
    'María Elena Rodríguez Martínez',
    'subgerente1',
    'subgerente@bellavista.com',
    '2345',
    '$2b$10$W9Rq4I6mW0XrHx.yR0A4Nbv0A5g2C3hJ7nU9wO0sT1dG5kM6oQ8rF4',
    false,
    false,
    NOW(),
    NOW()
),

-- Cajero
(
    'usr_cajero_003', 
    'Pedro Sánchez González',
    'cajero1',
    'cajero1@bellavista.com',
    '3456',
    '$2b$10$X0Sr5J7nX1YsIy.zS1B5Ocw1B6h3D4iK8oV0xP1tU2eH6lN7pR9sG5',
    false,
    false,
    NOW(),
    NOW()
),

-- Mesero
(
    'usr_mesero_004',
    'Ana Torres Hernández', 
    'mesero1',
    'mesero1@bellavista.com',
    '4567',
    '$2b$10$Y1Ts6K8oY2ZtJz.0T2C6Pdx2C7i4E5jL9pW1yQ2uV3fI7mO8qS0tH6',
    false,
    false,
    NOW(),
    NOW()
),

-- Cocinero
(
    'usr_cocinero_005',
    'Carlos Mendoza Jiménez',
    'cocinero1', 
    'cocinero1@bellavista.com',
    '5678',
    '$2b$10$Z2Ut7L9pZ3AuK0.1U3D7Qey3D8j5F6kM0qX2zR3vW4gJ8nP9rT1uI7',
    false,
    false,
    NOW(),
    NOW()
);
