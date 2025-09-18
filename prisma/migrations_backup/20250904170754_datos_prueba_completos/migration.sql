-- =====================================
-- MIGRACIÓN: DATOS DE PRUEBA COMPLETOS
-- =====================================

-- HORARIOS ESTÁNDAR
INSERT INTO "global_sistema"."horarios" VALUES
('hor_001', 'ADMIN_08_16', 'Administrativo 8-16', 'Horario administrativo municipal',
 '{"lunes":"08:00-16:00","martes":"08:00-16:00","miercoles":"08:00-16:00","jueves":"08:00-16:00","viernes":"08:00-16:00","sabado":null,"domingo":null}',
 'administrativo', 'municipal', true, NOW()),

('hor_002', 'DIRECTIVO_09_17', 'Directivo 9-17', 'Horario directivo municipal',
 '{"lunes":"09:00-17:00","martes":"09:00-17:00","miercoles":"09:00-17:00","jueves":"09:00-17:00","viernes":"09:00-17:00","sabado":null,"domingo":null}',
 'gerencial', 'municipal', true, NOW()),

('hor_003', 'TURNO_MANANA_REST', 'Turno Mañana Restaurante', 'Turno mañana restaurante',
 '{"lunes":"06:00-14:00","martes":"06:00-14:00","miercoles":"06:00-14:00","jueves":"06:00-14:00","viernes":"06:00-14:00","sabado":"06:00-14:00","domingo":"06:00-14:00"}',
 'turno_rotativo', 'restaurante', true, NOW()),

('hor_004', 'TURNO_TARDE_REST', 'Turno Tarde Restaurante', 'Turno tarde restaurante',
 '{"lunes":"14:00-22:00","martes":"14:00-22:00","miercoles":"14:00-22:00","jueves":"14:00-22:00","viernes":"14:00-22:00","sabado":"14:00-22:00","domingo":"14:00-22:00"}',
 'turno_rotativo', 'restaurante', true, NOW());

-- MÓDULOS MUNICIPALES
INSERT INTO "global_sistema"."modulos" VALUES
('mod_catastro', 'CATASTRO', 'Catastro y Predial', 'Sistema de catastro municipal', 'building', 'municipal', 1, true),
('mod_obras', 'OBRAS', 'Obras Públicas', 'Gestión de obras públicas', 'hammer', 'municipal', 2, true),
('mod_tesoreria', 'TESORERIA', 'Tesorería', 'Tesorería municipal', 'dollar-sign', 'municipal', 3, true);

-- MÓDULOS RESTAURANTE
INSERT INTO "global_sistema"."modulos" VALUES
('mod_pos', 'POS', 'Punto de Venta', 'Sistema punto de venta', 'shopping-cart', 'restaurante', 1, true),
('mod_caja', 'CAJA', 'Gestión de Caja', 'Control de cajas y cortes', 'cash-register', 'restaurante', 2, true),
('mod_cocina', 'COCINA', 'Gestión de Cocina', 'Órdenes y preparación', 'chef-hat', 'restaurante', 3, true),
('mod_inventario', 'INVENTARIO', 'Control de Inventario', 'Gestión de productos e inventario', 'package', 'restaurante', 4, true),
('mod_reportes', 'REPORTES', 'Reportes y Analytics', 'Reportes de ventas y estadísticas', 'chart-bar', 'restaurante', 5, true);

-- ACCIONES MUNICIPALES
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_cat_001', 'mod_catastro', 'CONSULTAR', 'Consultar Predios', 'Consultar información predial', false, 'normal', 1, true),
('acc_cat_002', 'mod_catastro', 'MODIFICAR', 'Modificar Datos', 'Modificar información predial', true, 'alta', 2, true),
('acc_cat_003', 'mod_catastro', 'AUTORIZAR_CAMBIO', 'Autorizar Cambios', 'Autorizar cambios catastrales', true, 'critica', 3, true);

-- ACCIONES RESTAURANTE
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_pos_001', 'mod_pos', 'PROCESAR_VENTA', 'Procesar Venta', 'Registrar venta', false, 'normal', 1, true),
('acc_pos_002', 'mod_pos', 'CANCELAR_VENTA', 'Cancelar Venta', 'Cancelar una venta', true, 'alta', 2, true),
('acc_pos_003', 'mod_pos', 'APLICAR_DESCUENTO', 'Aplicar Descuento', 'Aplicar descuentos a productos', true, 'alta', 3, true),

('acc_caja_001', 'mod_caja', 'ABRIR_CAJA', 'Abrir Caja', 'Abrir turno de caja', true, 'alta', 1, true),
('acc_caja_002', 'mod_caja', 'CORTE_PARCIAL', 'Corte Parcial', 'Realizar corte parcial', true, 'alta', 2, true),
('acc_caja_003', 'mod_caja', 'CORTE_FINAL', 'Corte Final', 'Cerrar caja del día', true, 'critica', 3, true),
('acc_caja_004', 'mod_caja', 'CONSULTAR_VENTAS', 'Consultar Ventas', 'Ver ventas del día', false, 'normal', 4, true),

('acc_cocina_001', 'mod_cocina', 'VER_ORDENES', 'Ver Órdenes', 'Ver órdenes pendientes', false, 'normal', 1, true),
('acc_cocina_002', 'mod_cocina', 'MARCAR_LISTO', 'Marcar Listo', 'Marcar platillo como listo', false, 'normal', 2, true),
('acc_cocina_003', 'mod_cocina', 'CANCELAR_ORDEN', 'Cancelar Orden', 'Cancelar orden de cocina', true, 'alta', 3, true),

('acc_inv_001', 'mod_inventario', 'CONSULTAR_STOCK', 'Consultar Stock', 'Ver inventario disponible', false, 'normal', 1, true),
('acc_inv_002', 'mod_inventario', 'ACTUALIZAR_STOCK', 'Actualizar Stock', 'Modificar inventario', true, 'alta', 2, true),
('acc_inv_003', 'mod_inventario', 'ENTRADA_MERCANCIA', 'Entrada Mercancía', 'Registrar entrada de productos', true, 'alta', 3, true),

('acc_rep_001', 'mod_reportes', 'VER_VENTAS_DIA', 'Ver Ventas del Día', 'Reporte de ventas diarias', false, 'normal', 1, true),
('acc_rep_002', 'mod_reportes', 'VER_REPORTES_MENSUAL', 'Ver Reportes Mensuales', 'Reportes de gestión mensual', true, 'alta', 2, true),
('acc_rep_003', 'mod_reportes', 'EXPORTAR_DATOS', 'Exportar Datos', 'Exportar reportes en Excel/PDF', true, 'alta', 3, true);

-- PLANES
INSERT INTO "global_sistema"."planes" VALUES
('plan_001', 'BASICO_REST', 'Plan Básico Restaurante', 'Plan básico para restaurantes pequeños', 299.00, 'restaurante', true),
('plan_002', 'PREMIUM_REST', 'Plan Premium Restaurante', 'Plan completo para restaurantes', 599.00, 'restaurante', true),
('plan_003', 'MUNICIPAL_STD', 'Plan Municipal Estándar', 'Plan estándar para municipios', 1299.00, 'municipal', true);

-- ASIGNACIÓN DE MÓDULOS A PLANES
INSERT INTO "global_sistema"."plan_modulos" VALUES
-- Plan Básico Restaurante
('pm_001', 'plan_001', 'mod_pos', true, '{}'),
('pm_002', 'plan_001', 'mod_caja', true, '{"limite_cajas": 2}'),
('pm_003', 'plan_001', 'mod_cocina', true, '{}'),

-- Plan Premium Restaurante
('pm_004', 'plan_002', 'mod_pos', true, '{}'),
('pm_005', 'plan_002', 'mod_caja', true, '{}'),
('pm_006', 'plan_002', 'mod_cocina', true, '{}'),
('pm_007', 'plan_002', 'mod_inventario', true, '{}'),
('pm_008', 'plan_002', 'mod_reportes', true, '{}'),

-- Plan Municipal
('pm_009', 'plan_003', 'mod_catastro', true, '{}'),
('pm_010', 'plan_003', 'mod_obras', true, '{}'),
('pm_011', 'plan_003', 'mod_tesoreria', true, '{}');

-- EMPRESAS EJEMPLO
INSERT INTO "global_sistema"."empresas" VALUES
('emp_bella_vista', 'BELLA_VISTA', 'Restaurante Bella Vista', 'restaurante', '{"direccion": "Av. Principal 123", "telefono": "311-123-4567", "rfc": "RBV123456789"}', true, NOW()),
('emp_tepic_001', 'TEPIC_MUN', 'H. Ayuntamiento de Tepic', 'municipal', '{"direccion": "Plaza Principal S/N", "telefono": "311-000-0000"}', true, NOW());

-- SUBSCRIPCIONES
INSERT INTO "global_sistema"."empresa_subscripciones" VALUES
('sub_001', 'emp_bella_vista', 'plan_002', '2024-01-01', '2024-12-31', '{"usuarios_max": 25, "sucursales_max": 3}', true),
('sub_002', 'emp_tepic_001', 'plan_003', '2024-01-01', '2025-12-31', '{"empleados_max": 500}', true);

-- ROLES RESTAURANTE
INSERT INTO "rest_test"."roles" VALUES
('rol_admin_rest', 'ADMIN_REST', 'Administrador Restaurante', 'Administrador general del restaurante', 'administracion', 'general', 'alto', 1, true, true, true, 15.00, true, true, true, '["sucursal_principal", "sucursal_norte"]', '["matutino", "vespertino", "nocturno"]', 1, NOW(), true, true, NOW()),

('rol_gerente', 'GERENTE', 'Gerente de Sucursal', 'Gerente de sucursal específica', 'gerencia', 'operaciones', 'alto', 2, true, true, true, 10.00, true, true, false, '[]', '["matutino", "vespertino"]', 1, NOW(), true, true, NOW()),

('rol_cajero', 'CAJERO', 'Cajero', 'Operador de caja registradora', 'operaciones', 'caja', 'medio', 3, false, true, false, 5.00, true, false, false, '[]', '["matutino", "vespertino", "nocturno"]', 1, NOW(), true, true, NOW()),

('rol_mesero', 'MESERO', 'Mesero', 'Atención a mesas y clientes', 'operaciones', 'salon', 'medio', 4, false, true, false, 2.00, false, false, false, '[]', '["matutino", "vespertino", "nocturno"]', 1, NOW(), true, true, NOW()),

('rol_cocinero', 'COCINERO', 'Cocinero', 'Preparación de alimentos', 'operaciones', 'cocina', 'medio', 5, false, true, false, 0.00, false, false, false, '[]', '["matutino", "vespertino", "nocturno"]', 1, NOW(), true, true, NOW()),

('rol_supervisor', 'SUPERVISOR', 'Supervisor de Turno', 'Supervisor de operaciones por turno', 'supervision', 'operaciones', 'medio', 6, false, true, false, 8.00, false, true, false, '[]', '["matutino", "vespertino", "nocturno"]', 1, NOW(), true, true, NOW());

-- USUARIOS RESTAURANTE
INSERT INTO "rest_test"."usuarios" VALUES
('usr_admin_001', 'emp_bella_vista', 'EMP001', 'admin.bellavista', 'admin@bellavista.com', '$2b$10$rHHHGGFFFGGGHHHfgdsfgdfgdsfgdfgdfgdfgdfgdfgdf', 'Carlos', 'Rodríguez', 'García', '1985-03-15', '311-123-4567', 'Principal', 'Administración', 'Gerente General', 'Alto', '2023-01-15', 'hor_003', 'rol_admin_rest', '["matutino", "vespertino"]', true, 5, '{"certificacion_manipulacion": true, "curso_administracion": true}', 1, NOW(), true, true, NOW()),

('usr_gerente_001', 'emp_bella_vista', 'EMP002', 'gerente.principal', 'gerente@bellavista.com', '$2b$10$rHHHGGFFFGGGHHHfgdsfgdfgdsfgdfgdfgdfgdfgdfgdf', 'María', 'López', 'Hernández', '1988-07-22', '311-123-4568', 'Principal', 'Operaciones', 'Gerente de Sucursal', 'Alto', '2023-02-01', 'hor_003', 'rol_gerente', '["matutino", "vespertino"]', true, 4, '{"certificacion_manipulacion": true}', 1, NOW(), true, true, NOW()),

('usr_cajero_001', 'emp_bella_vista', 'EMP003', 'cajero.ana', 'ana.cajero@bellavista.com', '$2b$10$rHHHGGFFFGGGHHHfgdsfgdfgdsfgdfgdfgdfgdfgdfgdf', 'Ana', 'Martínez', 'Jiménez', '1995-11-08', '311-123-4569', 'Principal', 'Caja', 'Cajero Principal', 'Medio', '2023-03-10', 'hor_003', 'rol_cajero', '["matutino", "vespertino"]', true, 2, '{"curso_pos": true}', 1, NOW(), true, true, NOW()),

('usr_mesero_001', 'emp_bella_vista', 'EMP004', 'mesero.juan', 'juan.mesero@bellavista.com', '$2b$10$rHHHGGFFFGGGHHHfgdsfgdfgdsfgdfgdfgdfgdfgdfgdf', 'Juan', 'Pérez', 'Morales', '1992-05-14', '311-123-4570', 'Principal', 'Salón', 'Mesero Senior', 'Medio', '2023-04-05', 'hor_003', 'rol_mesero', '["matutino", "vespertino"]', false, 1, '{"certificacion_manipulacion": true}', 1, NOW(), true, true, NOW()),

('usr_cocinero_001', 'emp_bella_vista', 'EMP005', 'chef.luis', 'luis.chef@bellavista.com', '$2b$10$rHHHGGFFFGGGHHHfgdsfgdfgdsfgdfgdfgdfgdfgdfgdf', 'Luis', 'García', 'Ramos', '1987-09-30', '311-123-4571', 'Principal', 'Cocina', 'Chef Principal', 'Alto', '2023-01-20', 'hor_003', 'rol_cocinero', '["matutino", "vespertino"]', false, 1, '{"certificacion_chef": true, "certificacion_manipulacion": true}', 1, NOW(), true, true, NOW()),

('usr_supervisor_001', 'emp_bella_vista', 'EMP006', 'supervisor.rosa', 'rosa.supervisor@bellavista.com', '$2b$10$rHHHGGFFFGGGHHHfgdsfgdfgdsfgdfgdfgdfgdfgdfgdf', 'Rosa', 'Sánchez', 'Díaz', '1990-12-03', '311-123-4572', 'Principal', 'Operaciones', 'Supervisor de Turno', 'Medio', '2023-02-15', 'hor_004', 'rol_supervisor', '["vespertino", "nocturno"]', false, 3, '{"curso_supervision": true}', 1, NOW(), true, true, NOW());

-- ASIGNACIÓN DE ROLES A USUARIOS
INSERT INTO "rest_test"."usuario_roles" VALUES
('ur_001', 'usr_admin_001', 'rol_admin_rest', 1, true, 'Principal', 'Administración', 'Terminal-Admin', '["matutino", "vespertino"]', null, '2023-01-15', null, '{"limite_descuento_especial": 20.00}', '["terminal_1", "terminal_admin"]', 1, NOW(), true, true, NOW(), null),

('ur_002', 'usr_gerente_001', 'rol_gerente', 1, true, 'Principal', 'Operaciones', 'Terminal-Gerencia', '["matutino", "vespertino"]', null, '2023-02-01', null, '{"limite_efectivo": 5000.00}', '["terminal_1", "terminal_2"]', 1, NOW(), true, true, NOW(), 'usr_admin_001'),

('ur_003', 'usr_cajero_001', 'rol_cajero', 1, true, 'Principal', 'Caja', 'Terminal-Caja-1', '["matutino", "vespertino"]', null, '2023-03-10', null, '{}', '["terminal_caja_1"]', 1, NOW(), true, true, NOW(), 'usr_gerente_001'),

('ur_004', 'usr_mesero_001', 'rol_mesero', 1, true, 'Principal', 'Salón', 'Terminal-Meseros', '["matutino", "vespertino"]', null, '2023-04-05', null, '{}', '["terminal_meseros"]', 1, NOW(), true, true, NOW(), 'usr_gerente_001'),

('ur_005', 'usr_cocinero_001', 'rol_cocinero', 1, true, 'Principal', 'Cocina', 'Terminal-Cocina', '["matutino", "vespertino"]', null, '2023-01-20', null, '{}', '["terminal_cocina"]', 1, NOW(), true, true, NOW(), 'usr_gerente_001'),

('ur_006', 'usr_supervisor_001', 'rol_supervisor', 1, true, 'Principal', 'Operaciones', 'Terminal-Supervision', '["vespertino", "nocturno"]', null, '2023-02-15', null, '{"limite_autorizacion": 1000.00}', '["terminal_1", "terminal_2"]', 1, NOW(), true, true, NOW(), 'usr_gerente_001');

-- PERMISOS POR ROL
-- Permisos Admin Restaurante (acceso completo)
INSERT INTO "rest_test"."permisos" VALUES
('perm_001', 'rol_admin_rest', 'acc_pos_001', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_002', 'rol_admin_rest', 'acc_pos_002', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_003', 'rol_admin_rest', 'acc_pos_003', true, 15.00, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_004', 'rol_admin_rest', 'acc_caja_001', true, null, '{}', '{}', '{}', '{}', false, true, false, 1, NOW(), true, true, NOW()),
('perm_005', 'rol_admin_rest', 'acc_caja_002', true, null, '{}', '{}', '{}', '{}', false, true, false, 1, NOW(), true, true, NOW()),
('perm_006', 'rol_admin_rest', 'acc_caja_003', true, null, '{}', '{}', '{}', '{}', false, true, false, 1, NOW(), true, true, NOW()),
('perm_007', 'rol_admin_rest', 'acc_caja_004', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_008', 'rol_admin_rest', 'acc_rep_001', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_009', 'rol_admin_rest', 'acc_rep_002', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_010', 'rol_admin_rest', 'acc_rep_003', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW());

-- Permisos Cajero (limitados)
INSERT INTO "rest_test"."permisos" VALUES
('perm_011', 'rol_cajero', 'acc_pos_001', true, null, '{}', '{}', '{}', '{}', false, false, true, 1, NOW(), true, true, NOW()),
('perm_012', 'rol_cajero', 'acc_pos_003', true, 5.00, '{}', '{}', '{}', '{}', true, false, true, 1, NOW(), true, true, NOW()),
('perm_013', 'rol_cajero', 'acc_caja_001', true, null, '{}', '{}', '{}', '{}', true, true, true, 1, NOW(), true, true, NOW()),
('perm_014', 'rol_cajero', 'acc_caja_004', true, null, '{}', '{}', '{}', '{}', false, false, true, 1, NOW(), true, true, NOW());

-- Permisos Mesero
INSERT INTO "rest_test"."permisos" VALUES
('perm_015', 'rol_mesero', 'acc_pos_001', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_016', 'rol_mesero', 'acc_pos_003', true, 2.00, '{}', '{}', '{}', '{}', true, false, false, 1, NOW(), true, true, NOW());

-- Permisos Cocinero
INSERT INTO "rest_test"."permisos" VALUES
('perm_017', 'rol_cocinero', 'acc_cocina_001', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_018', 'rol_cocinero', 'acc_cocina_002', true, null, '{}', '{}', '{}', '{}', false, false, false, 1, NOW(), true, true, NOW()),
('perm_019', 'rol_cocinero', 'acc_cocina_003', true, null, '{}', '{}', '{}', '{}', true, false, false, 1, NOW(), true, true, NOW());

-- SESIONES DE EJEMPLO (opcional)
INSERT INTO "rest_test"."sesiones" VALUES
('ses_001', 'usr_admin_001', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin_token', 'rol_admin_rest', '["rol_admin_rest"]', '{"sucursal": "Principal", "terminal": "Terminal-Admin"}', 'Principal', 'matutino', 'Terminal-Admin', false, true, false, null, NOW(), NOW() + INTERVAL '8 hours', NOW(), true),

('ses_002', 'usr_cajero_001', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.cajero_token', 'rol_cajero', '["rol_cajero"]', '{"sucursal": "Principal", "terminal": "Terminal-Caja-1"}', 'Principal', 'matutino', 'Terminal-Caja-1', true, true, false, null, NOW(), NOW() + INTERVAL '8 hours', NOW(), true);
