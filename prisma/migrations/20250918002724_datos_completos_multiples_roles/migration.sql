-- =====================================
-- MIGRACIÓN: DATOS COMPLETOS CON MÚLTIPLES ROLES
-- =====================================
-- Esta migración incluye todos los datos base del sistema
-- más usuarios de prueba con configuraciones de múltiples roles

-- =====================================
-- DATOS GLOBALES - HORARIOS
-- =====================================

INSERT INTO "global_sistema"."horarios" (
    "id_horario", "codigo", "nombre", "descripcion", "horario_semanal", 
    "tipo_horario", "aplica_a_tipo", "activo", "fecha_creacion"
) VALUES
('hor_001', 'ADMIN_08_16', 'Administrativo 8-16', 'Horario administrativo municipal',
 '{"lunes":"08:00-16:00","martes":"08:00-16:00","miercoles":"08:00-16:00","jueves":"08:00-16:00","viernes":"08:00-16:00","sabado":null,"domingo":null}',
 'administrativo', 'municipal', true, NOW()),

('hor_002', 'DIRECTIVO_09_17', 'Directivo 9-17', 'Horario directivo municipal',
 '{"lunes":"09:00-17:00","martes":"09:00-17:00","miercoles":"09:00-17:00","jueves":"09:00-17:00","viernes":"09:00-17:00","sabado":null,"domingo":null}',
 'gerencial', 'municipal', true, NOW()),

('hor_003', 'TURNO_MANANA', 'Turno Mañana Restaurante', 'Turno mañana restaurante',
 '{"lunes":"06:00-14:00","martes":"06:00-14:00","miercoles":"06:00-14:00","jueves":"06:00-14:00","viernes":"06:00-14:00","sabado":"06:00-14:00","domingo":"06:00-14:00"}',
 'turno_rotativo', 'restaurante', true, NOW()),

('hor_004', 'TURNO_TARDE', 'Turno Tarde Restaurante', 'Turno tarde restaurante',
 '{"lunes":"14:00-22:00","martes":"14:00-22:00","miercoles":"14:00-22:00","jueves":"14:00-22:00","viernes":"14:00-22:00","sabado":"14:00-22:00","domingo":"14:00-22:00"}',
 'turno_rotativo', 'restaurante', true, NOW()),

('hor_005', 'TURNO_NOCHE', 'Turno Noche Restaurante', 'Turno noche restaurante',
 '{"lunes":"22:00-06:00","martes":"22:00-06:00","miercoles":"22:00-06:00","jueves":"22:00-06:00","viernes":"22:00-06:00","sabado":"22:00-06:00","domingo":"22:00-06:00"}',
 'turno_rotativo', 'restaurante', true, NOW()),

('hor_006', 'FLEXIBLE_GERENCIA', 'Horario Flexible Gerencia', 'Horario flexible para gerencia',
 '{"lunes":"09:00-18:00","martes":"09:00-18:00","miercoles":"09:00-18:00","jueves":"09:00-18:00","viernes":"09:00-18:00","sabado":"09:00-14:00","domingo":null}',
 'gerencial', 'restaurante', true, NOW());

-- =====================================
-- DATOS GLOBALES - EMPRESAS
-- =====================================

INSERT INTO "global_sistema"."empresas" (
    "id_empresa", "codigo", "nombre", "tipo", "configuracion", "activa", "fecha_creacion"
) VALUES
('emp_tepic_001', 'TEPIC_MUN', 'H. Ayuntamiento de Tepic', 'municipal', '{}', true, NOW()),
('emp_bella_vista', 'bella_vista', 'Restaurante Bella Vista', 'restaurante', 
 '{"sucursales":["sucursal_principal","sucursal_norte"],"areas":["gerencia","caja","salon","cocina","bar"],"turnos":["mañana","tarde","noche"]}', true, NOW());

-- =====================================
-- DATOS GLOBALES - MÓDULOS
-- =====================================

INSERT INTO "global_sistema"."modulos" (
    "id_modulo", "codigo", "nombre", "descripcion", "icono", "categoria", "orden_visualizacion", "activo"
) VALUES
-- Módulos municipales
('mod_catastro', 'CATASTRO', 'Catastro y Predial', 'Sistema de catastro municipal', 'building', 'municipal', 1, true),
('mod_obras', 'OBRAS', 'Obras Públicas', 'Gestión de obras públicas', 'hammer', 'municipal', 2, true),
('mod_tesoreria', 'TESORERIA', 'Tesorería', 'Tesorería municipal', 'dollar-sign', 'municipal', 3, true),

-- Módulos restaurante
('mod_pos', 'POS', 'Punto de Venta', 'Sistema punto de venta', 'shopping-cart', 'restaurante', 1, true),
('mod_caja', 'CAJA', 'Manejo de Caja', 'Sistema de caja y efectivo', 'cash-register', 'restaurante', 2, true),
('mod_cocina', 'COCINA', 'Gestión de Cocina', 'Sistema de cocina y producción', 'chef-hat', 'restaurante', 3, true),
('mod_inventario', 'INVENTARIO', 'Control de Inventario', 'Gestión de inventarios', 'warehouse', 'restaurante', 4, true),
('mod_mesas', 'MESAS', 'Gestión de Mesas', 'Control de mesas y reservaciones', 'table', 'restaurante', 5, true),
('mod_reportes', 'REPORTES', 'Reportes y Análisis', 'Sistema de reportes', 'chart-bar', 'restaurante', 6, true),
('mod_usuarios', 'USUARIOS', 'Gestión de Usuarios', 'Administración de usuarios', 'users', 'administracion', 7, true);

-- =====================================
-- DATOS GLOBALES - ACCIONES DE MÓDULOS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" (
    "id_modulo_accion", "id_modulo", "codigo", "nombre", "descripcion", 
    "requiere_autorizacion", "nivel_criticidad", "orden_visualizacion", "activo"
) VALUES
-- Acciones POS
('acc_pos_001', 'mod_pos', 'crear_venta', 'Crear Venta', 'Crear nueva venta en POS', false, 'normal', 1, true),
('acc_pos_002', 'mod_pos', 'aplicar_descuento', 'Aplicar Descuento', 'Aplicar descuentos a productos', true, 'alta', 2, true),
('acc_pos_003', 'mod_pos', 'cancelar_venta', 'Cancelar Venta', 'Cancelar venta en proceso', true, 'alta', 3, true),
('acc_pos_004', 'mod_pos', 'modificar_precio', 'Modificar Precio', 'Modificar precio de producto', true, 'critica', 4, true),
('acc_pos_005', 'mod_pos', 'consultar_ventas', 'Consultar Ventas', 'Ver historial de ventas', false, 'baja', 5, true),

-- Acciones CAJA
('acc_caja_001', 'mod_caja', 'abrir_caja', 'Abrir Caja', 'Abrir caja para turno', false, 'normal', 1, true),
('acc_caja_002', 'mod_caja', 'cerrar_caja', 'Cerrar Caja', 'Cerrar caja y hacer corte', true, 'alta', 2, true),
('acc_caja_003', 'mod_caja', 'corte_parcial', 'Corte Parcial', 'Realizar corte parcial de caja', true, 'alta', 3, true),
('acc_caja_004', 'mod_caja', 'manejo_efectivo', 'Manejo de Efectivo', 'Manejar dinero en efectivo', false, 'normal', 4, true),
('acc_caja_005', 'mod_caja', 'arqueo_caja', 'Arqueo de Caja', 'Realizar arqueo de caja', true, 'critica', 5, true),

-- Acciones COCINA
('acc_cocina_001', 'mod_cocina', 'ver_ordenes', 'Ver Órdenes', 'Visualizar órdenes de cocina', false, 'baja', 1, true),
('acc_cocina_002', 'mod_cocina', 'marcar_listo', 'Marcar Listo', 'Marcar platillo como listo', false, 'normal', 2, true),
('acc_cocina_003', 'mod_cocina', 'gestionar_inventario', 'Gestionar Inventario', 'Administrar inventario de cocina', true, 'alta', 3, true),

-- Acciones MESAS
('acc_mesas_001', 'mod_mesas', 'asignar_mesa', 'Asignar Mesa', 'Asignar mesa a cliente', false, 'normal', 1, true),
('acc_mesas_002', 'mod_mesas', 'tomar_orden', 'Tomar Orden', 'Tomar orden de cliente', false, 'normal', 2, true),
('acc_mesas_003', 'mod_mesas', 'cambiar_mesa', 'Cambiar Mesa', 'Cambiar cliente de mesa', true, 'normal', 3, true),

-- Acciones USUARIOS
('acc_usuarios_001', 'mod_usuarios', 'crear_usuario', 'Crear Usuario', 'Crear nuevo usuario', true, 'critica', 1, true),
('acc_usuarios_002', 'mod_usuarios', 'editar_usuario', 'Editar Usuario', 'Modificar datos de usuario', true, 'alta', 2, true),
('acc_usuarios_003', 'mod_usuarios', 'asignar_rol', 'Asignar Rol', 'Asignar rol a usuario', true, 'critica', 3, true),
('acc_usuarios_004', 'mod_usuarios', 'desactivar_usuario', 'Desactivar Usuario', 'Desactivar cuenta de usuario', true, 'critica', 4, true),

-- Acciones REPORTES
('acc_reportes_001', 'mod_reportes', 'ver_reportes_ventas', 'Ver Reportes de Ventas', 'Acceso a reportes de ventas', false, 'normal', 1, true),
('acc_reportes_002', 'mod_reportes', 'exportar_reportes', 'Exportar Reportes', 'Exportar reportes en diferentes formatos', true, 'alta', 2, true),
('acc_reportes_003', 'mod_reportes', 'reportes_gerenciales', 'Reportes Gerenciales', 'Acceso a reportes gerenciales avanzados', true, 'critica', 3, true);

-- =====================================
-- DATOS GLOBALES - PLANES Y LICENCIAS
-- =====================================

INSERT INTO "global_sistema"."planes" (
    "id_plan", "codigo", "nombre", "descripcion", "precio", "tipo_organizacion", "activo"
) VALUES
('plan_001', 'MUNICIPAL_BASICO', 'Plan Municipal Básico', 'Plan básico para municipalidades', 500.00, 'municipal', true),
('plan_002', 'RESTAURANTE_COMPLETO', 'Plan Restaurante Completo', 'Plan completo para restaurantes', 299.00, 'restaurante', true),
('plan_003', 'RESTAURANTE_PREMIUM', 'Plan Restaurante Premium', 'Plan premium con todas las funcionalidades', 499.00, 'restaurante', true);

INSERT INTO "global_sistema"."licencias" (
    "id_licencia", "codigo", "nombre", "descripcion", "precio", "limitaciones_globales", "activo", "fecha_creacion"
) VALUES
('lic_001', 'RESTAURANTE_FULL', 'Licencia Restaurante Completa', 'Licencia con todos los módulos de restaurante', 199.00, 
 '{"max_usuarios":50,"max_terminales":10,"max_sucursales":5}', true, NOW()),
('lic_002', 'MUNICIPAL_FULL', 'Licencia Municipal Completa', 'Licencia con todos los módulos municipales', 399.00, 
 '{"max_usuarios":100,"max_dependencias":20}', true, NOW());

-- =====================================
-- DATOS RESTAURANTE - ROLES BASE
-- =====================================

INSERT INTO "rest_test"."roles" (
    "id_rol", "codigo", "nombre", "descripcion", "categoria", "area", "nivel",
    "prioridad_orden", "es_rol_principal", "puede_ser_por_defecto",
    "acceso_efectivo", "limite_descuento", "puede_abrir_caja", "puede_cortes_parciales", "puede_cortes_final",
    "sucursales_permitidas", "turnos_permitidos", "activo", "fecha_creacion"
) VALUES
('rol_gerente', 'rol_gerente', 'Gerente General', 'Acceso completo al sistema', 'administrativo', 'gerencia', 'alto',
 1, true, true, true, 100.0, true, true, true, '[]', '["mañana","tarde","noche"]', true, NOW()),

('rol_subgerente', 'rol_subgerente', 'Subgerente', 'Gestión operativa del restaurante', 'operativo', 'gerencia', 'medio',
 2, true, true, true, 50.0, true, true, true, '[]', '["mañana","tarde"]', true, NOW()),

('rol_cajero', 'rol_cajero', 'Cajero', 'Manejo de caja y ventas', 'operativo', 'caja', 'operativo',
 3, false, true, true, 20.0, true, true, false, '[]', '["mañana","tarde","noche"]', true, NOW()),

('rol_mesero', 'rol_mesero', 'Mesero', 'Atención a clientes y manejo de mesas', 'servicio', 'salon', 'operativo',
 4, false, true, false, 10.0, false, false, false, '[]', '["mañana","tarde","noche"]', true, NOW()),

('rol_cocinero', 'rol_cocinero', 'Cocinero', 'Preparación de alimentos y gestión de cocina', 'operativo', 'cocina', 'operativo',
 5, false, true, false, 0.0, false, false, false, '[]', '["mañana","tarde"]', true, NOW()),

('rol_auxiliar_cocina', 'rol_auxiliar_cocina', 'Auxiliar de Cocina', 'Apoyo en preparación de alimentos', 'operativo', 'cocina', 'auxiliar',
 6, false, true, false, 0.0, false, false, false, '[]', '["mañana","tarde","noche"]', true, NOW()),

('rol_supervisor', 'rol_supervisor', 'Supervisor', 'Supervisión de operaciones por área', 'supervisión', 'multiple', 'medio',
 7, false, true, true, 30.0, true, true, false, '[]', '["mañana","tarde","noche"]', true, NOW()),

('rol_bartender', 'rol_bartender', 'Bartender', 'Preparación de bebidas y manejo de bar', 'servicio', 'bar', 'operativo',
 8, false, true, false, 15.0, false, false, false, '[]', '["tarde","noche"]', true, NOW());

-- =====================================
-- DATOS RESTAURANTE - USUARIOS BASE
-- =====================================

INSERT INTO "rest_test"."usuarios" (
    "id_usuario", "id_empresa", "numero_empleado", "nombre_usuario", "email", "password_hash",
    "nombre", "apellido_paterno", "apellido_materno", "telefono",
    "sucursal", "area", "puesto", "nivel", "fecha_ingreso",
    "id_horario_base", "id_rol_por_defecto", "turnos_disponibles",
    "acceso_efectivo", "nivel_acceso_caja", "activo", "fecha_creacion"
) VALUES
-- Usuarios originales
('usr_admin', 'emp_bella_vista', 'ADM001', 'admin', 'admin@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'Administrador', 'Sistema', NULL, '3111234567',
 'sucursal_principal', 'gerencia', 'Administrador General', 'alto', '2024-01-01',
 'hor_006', 'rol_gerente', '["mañana","tarde","noche"]',
 true, 5, true, NOW()),

('usr_gerente', 'emp_bella_vista', 'GER001', 'gerente.principal', 'gerente@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'Carlos', 'Mendoza', 'Rivera', '3111234568',
 'sucursal_principal', 'gerencia', 'Gerente General', 'alto', '2024-01-05',
 'hor_006', 'rol_gerente', '["mañana","tarde","noche"]',
 true, 5, true, NOW()),

-- USUARIO 1: SUPERVISOR MULTIFUNCIONAL
('usr_supervisor_multi', 'emp_bella_vista', 'SUP001', 'supervisor.multi', 'supervisor.multi@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'Ana Lucia', 'Morales', 'Vega', '3112345678',
 'sucursal_principal', 'gerencia', 'Supervisor Multifuncional', 'medio', '2024-01-10',
 'hor_004', 'rol_subgerente', '["mañana","tarde","noche"]',
 true, 3, true, NOW()),

-- USUARIO 2: EMPLEADO POLIVALENTE
('usr_polivalente', 'emp_bella_vista', 'POL001', 'empleado.polivalente', 'empleado.polivalente@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'Roberto', 'Fernández', 'Castro', '3112345679',
 'sucursal_principal', 'operaciones', 'Empleado Polivalente', 'operativo', '2024-02-01',
 'hor_003', 'rol_mesero', '["mañana","tarde"]',
 false, 1, true, NOW()),

-- USUARIO 3: GERENTE DE TURNO
('usr_gerente_turno', 'emp_bella_vista', 'GT001', 'gerente.turno', 'gerente.turno@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'Carmen', 'Delgado', 'Ruiz', '3112345680',
 'sucursal_principal', 'gerencia', 'Gerente de Turno', 'alto', '2024-01-15',
 'hor_005', 'rol_gerente', '["noche"]',
 true, 5, true, NOW()),

-- USUARIO 4: EMPLEADO TEMPORAL
('usr_temporal', 'emp_bella_vista', 'TEMP001', 'empleado.temporal', 'empleado.temporal@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'Diego', 'Vargas', 'Mendez', '3112345681',
 'sucursal_principal', 'cocina', 'Empleado Temporal', 'operativo', '2024-03-01',
 'hor_003', 'rol_auxiliar_cocina', '["mañana","tarde"]',
 false, 0, true, NOW()),

-- USUARIOS ADICIONALES PARA TESTING
('usr_cajero_senior', 'emp_bella_vista', 'CAJ001', 'cajero.senior', 'cajero.senior@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'María José', 'González', 'López', '3112345682',
 'sucursal_principal', 'caja', 'Cajero Senior', 'operativo', '2024-01-20',
 'hor_003', 'rol_cajero', '["mañana","tarde"]',
 true, 2, true, NOW()),

('usr_mesero_jefe', 'emp_bella_vista', 'MES001', 'mesero.jefe', 'mesero.jefe@bellavista.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'Luis Alberto', 'Ramírez', 'Santos', '3112345683',
 'sucursal_principal', 'salon', 'Mesero Jefe', 'operativo', '2024-02-10',
 'hor_004', 'rol_mesero', '["tarde","noche"]',
 false, 0, true, NOW());

-- =====================================
-- ASIGNACIONES DE MÚLTIPLES ROLES
-- =====================================

INSERT INTO "rest_test"."usuario_roles" (
    "id_usuario_rol", "id_usuario", "id_rol", "prioridad_usuario", "es_rol_principal",
    "sucursal_especifica", "area_especifica", "estacion_trabajo", "turnos_asignados",
    "id_horario_especifico", "fecha_inicio", "fecha_fin", "limites_personalizados", 
    "terminales_asignadas", "activo", "fecha_asignacion", "autorizado_por"
) VALUES

-- ROLES PARA ADMIN (1 rol)
('ur_admin_01', 'usr_admin', 'rol_gerente', 1, true, NULL, NULL, 'ADMIN_DESK', 
 '["mañana","tarde","noche"]', 'hor_006', '2024-01-01', NULL, 
 '{"descuentoMaximo":100.0,"montoMaximoVenta":null,"puedeAutorizarDescuentos":true}', 
 '[]', true, NOW(), NULL),

-- ROLES PARA GERENTE PRINCIPAL (1 rol)
('ur_gerente_01', 'usr_gerente', 'rol_gerente', 1, true, NULL, NULL, 'GERENCIA_01', 
 '["mañana","tarde","noche"]', 'hor_006', '2024-01-05', NULL, 
 '{"descuentoMaximo":100.0,"montoMaximoVenta":null,"puedeAutorizarDescuentos":true}', 
 '[]', true, NOW(), 'usr_admin'),

-- ROLES PARA SUPERVISOR MULTIFUNCIONAL (3 roles)
('ur_super_01', 'usr_supervisor_multi', 'rol_subgerente', 1, true, 'sucursal_principal', 'gerencia', 'SUP_DESK_01', 
 '["mañana","tarde"]', 'hor_004', '2024-01-10', NULL, 
 '{"descuentoMaximo":50.0,"montoMaximoVenta":2000.00,"puedeAutorizarDescuentos":true}', 
 '["TERM001","TERM002"]', true, NOW(), 'usr_gerente'),

('ur_super_02', 'usr_supervisor_multi', 'rol_cajero', 2, false, 'sucursal_principal', 'caja', 'CAJA_01', 
 '["noche"]', 'hor_005', '2024-02-01', NULL, 
 '{"descuentoMaximo":30.0,"montoMaximoVenta":1500.00}', 
 '["TERM001","TERM002"]', true, NOW(), 'usr_gerente'),

('ur_super_03', 'usr_supervisor_multi', 'rol_mesero', 3, false, NULL, 'salon', 'SALON_MULTIPLE', 
 '["mañana","tarde","noche"]', NULL, '2024-03-01', '2024-12-31', 
 '{"descuentoMaximo":15.0,"montoMaximoVenta":800.00,"requiereSupervisión":false}', 
 '["TERM003","TERM004"]', true, NOW(), 'usr_gerente'),

-- ROLES PARA EMPLEADO POLIVALENTE (3 roles)
('ur_poli_01', 'usr_polivalente', 'rol_mesero', 1, true, 'sucursal_principal', 'salon', 'SALON_01', 
 '["mañana","tarde"]', 'hor_003', '2024-02-01', NULL, 
 '{"descuentoMaximo":10.0,"montoMaximoVenta":600.00}', 
 '["TERM003","TERM004"]', true, NOW(), 'usr_supervisor_multi'),

('ur_poli_02', 'usr_polivalente', 'rol_cajero', 2, false, 'sucursal_principal', 'caja', 'CAJA_02', 
 '["tarde"]', 'hor_004', '2024-03-01', NULL, 
 '{"descuentoMaximo":10.0,"montoMaximoVenta":1000.00,"requiereSupervisión":true}', 
 '["TERM003","TERM004"]', true, NOW(), 'usr_supervisor_multi'),

('ur_poli_03', 'usr_polivalente', 'rol_auxiliar_cocina', 3, false, 'sucursal_principal', 'cocina', 'COCINA_AUX_01', 
 '["mañana"]', 'hor_003', '2024-04-01', NULL, 
 '{"descuentoMaximo":0.0,"montoMaximoVenta":0.00,"requiereSupervisión":true}', 
 '["TERM005"]', true, NOW(), 'usr_supervisor_multi'),

-- ROLES PARA GERENTE DE TURNO (2 roles)
('ur_gt_01', 'usr_gerente_turno', 'rol_gerente', 1, true, NULL, NULL, 'GERENCIA_NOCHE', 
 '["noche"]', 'hor_005', '2024-01-15', NULL, 
 '{"descuentoMaximo":100.0,"montoMaximoVenta":null,"puedeAutorizarDescuentos":true}', 
 '[]', true, NOW(), 'usr_admin'),

('ur_gt_02', 'usr_gerente_turno', 'rol_subgerente', 2, false, 'sucursal_principal', 'gerencia', 'SUP_DESK_02', 
 '["mañana","tarde"]', 'hor_004', '2024-02-01', NULL, 
 '{"descuentoMaximo":50.0,"montoMaximoVenta":2000.00,"puedeAutorizarDescuentos":true}', 
 '["TERM001","TERM002"]', true, NOW(), 'usr_admin'),

-- ROLES PARA EMPLEADO TEMPORAL (3 roles - algunos temporales)
('ur_temp_01', 'usr_temporal', 'rol_auxiliar_cocina', 1, true, 'sucursal_principal', 'cocina', 'COCINA_AUX_02', 
 '["mañana","tarde"]', 'hor_003', '2024-03-01', NULL, 
 '{"descuentoMaximo":0.0,"montoMaximoVenta":0.00,"requiereSupervisión":true}', 
 '["TERM005"]', true, NOW(), 'usr_supervisor_multi'),

('ur_temp_02', 'usr_temporal', 'rol_mesero', 2, false, 'sucursal_principal', 'salon', 'SALON_TEMP_01', 
 '["tarde"]', 'hor_004', '2024-04-01', '2024-06-30', 
 '{"descuentoMaximo":5.0,"montoMaximoVenta":400.00,"requiereSupervisión":true}', 
 '["TERM006"]', true, NOW(), 'usr_supervisor_multi'),

('ur_temp_03', 'usr_temporal', 'rol_cajero', 3, false, 'sucursal_principal', 'caja', 'CAJA_TEMP_01', 
 '["mañana"]', 'hor_003', '2024-05-01', '2024-07-31', 
 '{"descuentoMaximo":5.0,"montoMaximoVenta":300.00,"requiereSupervisión":true}', 
 '["TERM005"]', true, NOW(), 'usr_supervisor_multi'),

-- ROLES PARA CAJERO SENIOR (2 roles)
('ur_caj_01', 'usr_cajero_senior', 'rol_cajero', 1, true, 'sucursal_principal', 'caja', 'CAJA_PRINCIPAL', 
 '["mañana","tarde"]', 'hor_003', '2024-01-20', NULL, 
 '{"descuentoMaximo":20.0,"montoMaximoVenta":1200.00}', 
 '["TERM001","TERM002"]', true, NOW(), 'usr_supervisor_multi'),

('ur_caj_02', 'usr_cajero_senior', 'rol_supervisor', 2, false, 'sucursal_principal', 'caja', 'SUP_CAJA', 
 '["tarde"]', 'hor_004', '2024-03-01', NULL, 
 '{"descuentoMaximo":30.0,"montoMaximoVenta":1500.00,"puedeAutorizarDescuentos":true}', 
 '["TERM001","TERM002","TERM003"]', true, NOW(), 'usr_gerente'),

-- ROLES PARA MESERO JEFE (2 roles)
('ur_mes_01', 'usr_mesero_jefe', 'rol_mesero', 1, true, 'sucursal_principal', 'salon', 'SALON_JEFE', 
 '["tarde","noche"]', 'hor_004', '2024-02-10', NULL, 
 '{"descuentoMaximo":10.0,"montoMaximoVenta":700.00}', 
 '["TERM003","TERM004","TERM006"]', true, NOW(), 'usr_supervisor_multi'),

('ur_mes_02', 'usr_mesero_jefe', 'rol_supervisor', 2, false, 'sucursal_principal', 'salon', 'SUP_SALON', 
 '["noche"]', 'hor_005', '2024-04-01', NULL, 
 '{"descuentoMaximo":25.0,"montoMaximoVenta":1000.00,"puedeAutorizarDescuentos":true}', 
 '["TERM003","TERM004","TERM006"]', true, NOW(), 'usr_gerente_turno');

-- =====================================
-- MATRIZ DE PERMISOS BASE
-- =====================================

INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", 
    "limitacion_monetaria", "limitacion_horario", "limitacion_turno", 
    "limitacion_sucursal", "limitacion_terminal", "requiere_autorizacion",
    "requiere_caja", "requiere_turno_activo", "activo", "fecha_creacion"
) VALUES

-- PERMISOS GERENTE (acceso completo)
('perm_ger_001', 'rol_gerente', 'acc_pos_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_002', 'rol_gerente', 'acc_pos_002', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_003', 'rol_gerente', 'acc_pos_003', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_004', 'rol_gerente', 'acc_pos_004', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_005', 'rol_gerente', 'acc_pos_005', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_006', 'rol_gerente', 'acc_caja_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_007', 'rol_gerente', 'acc_caja_002', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_008', 'rol_gerente', 'acc_caja_003', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_009', 'rol_gerente', 'acc_caja_004', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_010', 'rol_gerente', 'acc_caja_005', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_011', 'rol_gerente', 'acc_usuarios_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_012', 'rol_gerente', 'acc_usuarios_002', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_013', 'rol_gerente', 'acc_usuarios_003', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_014', 'rol_gerente', 'acc_usuarios_004', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_015', 'rol_gerente', 'acc_reportes_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_016', 'rol_gerente', 'acc_reportes_002', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_ger_017', 'rol_gerente', 'acc_reportes_003', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),

-- PERMISOS SUBGERENTE
('perm_sub_001', 'rol_subgerente', 'acc_pos_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sub_002', 'rol_subgerente', 'acc_pos_002', true, 500.00, '{}', '{}', '{}', '{}', true, false, false, true, NOW()),
('perm_sub_003', 'rol_subgerente', 'acc_pos_003', true, NULL, '{}', '{}', '{}', '{}', true, false, false, true, NOW()),
('perm_sub_004', 'rol_subgerente', 'acc_pos_005', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sub_005', 'rol_subgerente', 'acc_caja_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sub_006', 'rol_subgerente', 'acc_caja_002', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sub_007', 'rol_subgerente', 'acc_caja_003', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sub_008', 'rol_subgerente', 'acc_caja_004', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sub_009', 'rol_subgerente', 'acc_usuarios_002', true, NULL, '{}', '{}', '{}', '{}', true, false, false, true, NOW()),
('perm_sub_010', 'rol_subgerente', 'acc_reportes_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sub_011', 'rol_subgerente', 'acc_reportes_002', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),

-- PERMISOS CAJERO
('perm_caj_001', 'rol_cajero', 'acc_pos_001', true, NULL, '{}', '{}', '{}', '{}', false, true, true, true, NOW()),
('perm_caj_002', 'rol_cajero', 'acc_pos_002', true, 200.00, '{}', '{}', '{}', '{}', true, true, true, true, NOW()),
('perm_caj_003', 'rol_cajero', 'acc_pos_005', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_caj_004', 'rol_cajero', 'acc_caja_001', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),
('perm_caj_005', 'rol_cajero', 'acc_caja_003', true, NULL, '{}', '{}', '{}', '{}', false, true, true, true, NOW()),
('perm_caj_006', 'rol_cajero', 'acc_caja_004', true, NULL, '{}', '{}', '{}', '{}', false, true, true, true, NOW()),

-- PERMISOS MESERO
('perm_mes_001', 'rol_mesero', 'acc_pos_001', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),
('perm_mes_002', 'rol_mesero', 'acc_pos_002', true, 50.00, '{}', '{}', '{}', '{}', true, false, true, true, NOW()),
('perm_mes_003', 'rol_mesero', 'acc_pos_005', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_mes_004', 'rol_mesero', 'acc_mesas_001', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),
('perm_mes_005', 'rol_mesero', 'acc_mesas_002', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),
('perm_mes_006', 'rol_mesero', 'acc_mesas_003', true, NULL, '{}', '{}', '{}', '{}', true, false, true, true, NOW()),

-- PERMISOS COCINERO
('perm_coc_001', 'rol_cocinero', 'acc_cocina_001', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),
('perm_coc_002', 'rol_cocinero', 'acc_cocina_002', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),
('perm_coc_003', 'rol_cocinero', 'acc_cocina_003', true, NULL, '{}', '{}', '{}', '{}', true, false, true, true, NOW()),

-- PERMISOS AUXILIAR COCINA
('perm_aux_001', 'rol_auxiliar_cocina', 'acc_cocina_001', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),
('perm_aux_002', 'rol_auxiliar_cocina', 'acc_cocina_002', true, NULL, '{}', '{}', '{}', '{}', false, false, true, true, NOW()),

-- PERMISOS SUPERVISOR
('perm_sup_001', 'rol_supervisor', 'acc_pos_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_002', 'rol_supervisor', 'acc_pos_002', true, 300.00, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_003', 'rol_supervisor', 'acc_pos_003', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_004', 'rol_supervisor', 'acc_pos_005', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_005', 'rol_supervisor', 'acc_caja_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_006', 'rol_supervisor', 'acc_caja_003', true, NULL, '{}', '{}', '{}', '{}', false, true, true, true, NOW()),
('perm_sup_007', 'rol_supervisor', 'acc_caja_004', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_008', 'rol_supervisor', 'acc_mesas_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_009', 'rol_supervisor', 'acc_mesas_002', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_010', 'rol_supervisor', 'acc_mesas_003', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),
('perm_sup_011', 'rol_supervisor', 'acc_reportes_001', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW()),

-- PERMISOS BARTENDER
('perm_bar_001', 'rol_bartender', 'acc_pos_001', true, NULL, '{}', '{"permitidos":["tarde","noche"]}', '{}', '{}', false, false, true, true, NOW()),
('perm_bar_002', 'rol_bartender', 'acc_pos_002', true, 100.00, '{}', '{"permitidos":["tarde","noche"]}', '{}', '{}', true, false, true, true, NOW()),
('perm_bar_003', 'rol_bartender', 'acc_pos_005', true, NULL, '{}', '{}', '{}', '{}', false, false, false, true, NOW());

-- =====================================
-- DATOS ADICIONALES PARA TESTING
-- =====================================

-- Insertar algunas sesiones de ejemplo para testing
INSERT INTO "rest_test"."sesiones" (
    "id_sesion", "id_usuario", "token", "id_rol_activo", "roles_disponibles", "contexto_actual",
    "sucursal_actual", "turno_actual", "terminal_asignada", "caja_abierta",
    "inicio_automatico", "modo_offline", "fecha_inicio", "fecha_expira", "activa"
) VALUES
('ses_admin_001', 'usr_admin', 'admin_session_token_example', 'rol_gerente', 
 '["rol_gerente"]', 
 '{"area":"gerencia","nivel":"alto","permisos_especiales":true}',
 'sucursal_principal', 'mañana', 'ADMIN_TERM', false,
 true, false, NOW(), NOW() + INTERVAL '24 hours', true),

('ses_super_001', 'usr_supervisor_multi', 'super_session_token_example', 'rol_subgerente', 
 '["rol_subgerente","rol_cajero","rol_mesero"]', 
 '{"area":"gerencia","nivel":"medio","rol_activo":"subgerente"}',
 'sucursal_principal', 'tarde', 'TERM001', false,
 true, false, NOW(), NOW() + INTERVAL '8 hours', true);

-- Insertar algunos logs de actividad de ejemplo
INSERT INTO "rest_test"."log_actividades" (
    "id_actividad", "id_usuario", "id_sesion", "id_modulo_accion", "descripcion",
    "id_rol_utilizado", "sucursal", "turno", "terminal", "resultado", "fecha_actividad"
) VALUES
('log_001', 'usr_admin', 'ses_admin_001', 'acc_usuarios_001', 'Creación de usuario supervisor multifuncional',
 'rol_gerente', 'sucursal_principal', 'mañana', 'ADMIN_TERM', 'exitoso', NOW()),

('log_002', 'usr_supervisor_multi', 'ses_super_001', 'acc_pos_001', 'Creación de venta - cambio de rol a cajero',
 'rol_cajero', 'sucursal_principal', 'noche', 'TERM001', 'exitoso', NOW()),

('log_003', 'usr_supervisor_multi', 'ses_super_001', 'acc_mesas_001', 'Asignación de mesa - rol mesero activo',
 'rol_mesero', 'sucursal_principal', 'tarde', 'TERM003', 'exitoso', NOW());