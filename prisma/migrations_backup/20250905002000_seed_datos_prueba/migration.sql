-- Datos de prueba para el sistema de restaurante

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
 'turno_rotativo', 'restaurante', true, NOW());

-- =====================================
-- DATOS GLOBALES - EMPRESAS
-- =====================================

INSERT INTO "global_sistema"."empresas" (
    "id_empresa", "codigo", "nombre", "tipo", "configuracion", "activa", "fecha_creacion"
) VALUES
('emp_tepic_001', 'TEPIC_MUN', 'H. Ayuntamiento de Tepic', 'municipal', '{}', true, NOW()),
('emp_bella_vista', 'BELLA_VISTA', 'Restaurante Bella Vista', 'restaurante', '{}', true, NOW());

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
('mod_caja', 'CAJA', 'Gestión de Caja', 'Control de cajas y cortes', 'cash-register', 'restaurante', 2, true),
('mod_cocina', 'COCINA', 'Gestión de Cocina', 'Órdenes y preparación', 'chef-hat', 'restaurante', 3, true),
('mod_inventario', 'INVENTARIO', 'Inventario', 'Control de inventario', 'package', 'restaurante', 4, true),
('mod_reportes', 'REPORTES', 'Reportes', 'Reportes y análisis', 'chart-bar', 'restaurante', 5, true);

-- =====================================
-- DATOS GLOBALES - ACCIONES DE MÓDULOS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" (
    "id_modulo_accion", "id_modulo", "codigo", "nombre", "descripcion", 
    "requiere_autorizacion", "nivel_criticidad", "orden_visualizacion", "activo"
) VALUES
-- Acciones municipales
('acc_cat_001', 'mod_catastro', 'CONSULTAR', 'Consultar Predios', 'Consultar información predial', false, 'normal', 1, true),
('acc_cat_002', 'mod_catastro', 'MODIFICAR', 'Modificar Datos', 'Modificar información predial', true, 'alta', 2, true),
('acc_cat_003', 'mod_catastro', 'AUTORIZAR_CAMBIO', 'Autorizar Cambios', 'Autorizar cambios catastrales', true, 'critica', 3, true),

-- Acciones restaurante - POS
('acc_pos_001', 'mod_pos', 'PROCESAR_VENTA', 'Procesar Venta', 'Registrar venta', false, 'normal', 1, true),
('acc_pos_002', 'mod_pos', 'APLICAR_DESCUENTO', 'Aplicar Descuento', 'Aplicar descuentos a ventas', true, 'alta', 2, true),
('acc_pos_003', 'mod_pos', 'CANCELAR_VENTA', 'Cancelar Venta', 'Cancelar venta en proceso', true, 'alta', 3, true),

-- Acciones restaurante - CAJA
('acc_caja_001', 'mod_caja', 'ABRIR_CAJA', 'Abrir Caja', 'Abrir turno de caja', true, 'alta', 1, true),
('acc_caja_002', 'mod_caja', 'CORTE_PARCIAL', 'Corte Parcial', 'Realizar corte parcial', true, 'alta', 2, true),
('acc_caja_003', 'mod_caja', 'CORTE_FINAL', 'Corte Final', 'Cerrar caja del día', true, 'critica', 3, true),
('acc_caja_004', 'mod_caja', 'CONSULTAR_MOV', 'Consultar Movimientos', 'Ver movimientos de caja', false, 'normal', 4, true),

-- Acciones restaurante - COCINA
('acc_cocina_001', 'mod_cocina', 'VER_ORDENES', 'Ver Órdenes', 'Visualizar órdenes pendientes', false, 'normal', 1, true),
('acc_cocina_002', 'mod_cocina', 'MARCAR_LISTO', 'Marcar Listo', 'Marcar platillo como listo', false, 'normal', 2, true),
('acc_cocina_003', 'mod_cocina', 'CANCELAR_ORDEN', 'Cancelar Orden', 'Cancelar orden de cocina', true, 'alta', 3, true);

-- =====================================
-- DATOS GLOBALES - PLANES
-- =====================================

INSERT INTO "global_sistema"."planes" (
    "id_plan", "codigo", "nombre", "descripcion", "precio", "tipo_organizacion", "activo"
) VALUES
('plan_basico_rest', 'BASICO_REST', 'Plan Básico Restaurante', 'Plan básico para restaurantes pequeños', 299.00, 'restaurante', true),
('plan_premium_rest', 'PREMIUM_REST', 'Plan Premium Restaurante', 'Plan completo para restaurantes', 599.00, 'restaurante', true),
('plan_municipal', 'MUNICIPAL', 'Plan Municipal', 'Plan para gobiernos municipales', 0.00, 'municipal', true);

-- =====================================
-- DATOS GLOBALES - MÓDULOS POR PLAN
-- =====================================

INSERT INTO "global_sistema"."plan_modulos" (
    "id_plan_modulo", "id_plan", "id_modulo", "incluido", "limitaciones"
) VALUES
-- Plan básico restaurante
('pm_001', 'plan_basico_rest', 'mod_pos', true, '{"max_terminales": 2}'),
('pm_002', 'plan_basico_rest', 'mod_caja', true, '{"max_cajas": 1}'),
('pm_003', 'plan_basico_rest', 'mod_cocina', true, '{}'),

-- Plan premium restaurante
('pm_004', 'plan_premium_rest', 'mod_pos', true, '{"max_terminales": 10}'),
('pm_005', 'plan_premium_rest', 'mod_caja', true, '{"max_cajas": 5}'),
('pm_006', 'plan_premium_rest', 'mod_cocina', true, '{}'),
('pm_007', 'plan_premium_rest', 'mod_inventario', true, '{}'),
('pm_008', 'plan_premium_rest', 'mod_reportes', true, '{}');

-- =====================================
-- DATOS GLOBALES - SUBSCRIPCIONES
-- =====================================

INSERT INTO "global_sistema"."empresa_subscripciones" (
    "id_subscripcion", "id_empresa", "id_plan", "fecha_inicio", "fecha_vencimiento", 
    "configuracion_especial", "activa"
) VALUES
('sub_001', 'emp_bella_vista', 'plan_premium_rest', '2024-01-01', '2024-12-31', '{}', true),
('sub_002', 'emp_tepic_001', 'plan_municipal', '2024-01-01', NULL, '{}', true);

-- =====================================
-- DATOS RESTAURANTE - ROLES
-- =====================================

INSERT INTO "rest_test"."roles" (
    "id_rol", "codigo", "nombre", "descripcion", "categoria", "area", "nivel",
    "prioridad_orden", "es_rol_principal", "puede_ser_por_defecto",
    "acceso_efectivo", "limite_descuento", "puede_abrir_caja", 
    "puede_cortes_parciales", "puede_cortes_final",
    "sucursales_permitidas", "turnos_permitidos", "activo", "fecha_creacion"
) VALUES
('rol_gerente', 'GERENTE', 'Gerente General', 'Gerente con acceso completo', 'administracion', 'gerencia', 'alto', 1, true, true, true, 100.00, true, true, true, '["sucursal_principal"]', '["mañana", "tarde", "noche"]', true, NOW()),

('rol_subgerente', 'SUBGERENTE', 'Subgerente', 'Subgerente de área', 'administracion', 'gerencia', 'medio', 2, false, true, true, 50.00, true, true, false, '["sucursal_principal"]', '["mañana", "tarde"]', true, NOW()),

('rol_cajero', 'CAJERO', 'Cajero', 'Operador de caja', 'operativo', 'caja', 'bajo', 3, false, true, true, 10.00, false, false, false, '["sucursal_principal"]', '["mañana", "tarde", "noche"]', true, NOW()),

('rol_mesero', 'MESERO', 'Mesero', 'Mesero de restaurante', 'operativo', 'salon', 'bajo', 4, false, true, false, 5.00, false, false, false, '["sucursal_principal"]', '["mañana", "tarde", "noche"]', true, NOW()),

('rol_cocinero', 'COCINERO', 'Cocinero', 'Cocinero principal', 'operativo', 'cocina', 'medio', 5, false, true, false, 0.00, false, false, false, '["sucursal_principal"]', '["mañana", "tarde", "noche"]', true, NOW()),

('rol_auxiliar_cocina', 'AUX_COCINA', 'Auxiliar de Cocina', 'Ayudante de cocina', 'operativo', 'cocina', 'bajo', 6, false, true, false, 0.00, false, false, false, '["sucursal_principal"]', '["mañana", "tarde", "noche"]', true, NOW());

-- =====================================
-- DATOS RESTAURANTE - USUARIOS
-- =====================================

INSERT INTO "rest_test"."usuarios" (
    "id_usuario", "id_empresa", "numero_empleado", "nombre_usuario", "email", "password_hash",
    "nombre", "apellido_paterno", "apellido_materno", "telefono",
    "sucursal", "area", "puesto", "nivel", "fecha_ingreso",
    "id_horario_base", "id_rol_por_defecto", "turnos_disponibles",
    "acceso_efectivo", "nivel_acceso_caja", "activo", "fecha_creacion"
) VALUES
('usr_001', 'emp_bella_vista', 'EMP001', 'admin', 'admin@bellavista.com', '$2b$10$exemplo_hash_password_admin',
 'Juan Carlos', 'García', 'López', '3111234567',
 'sucursal_principal', 'gerencia', 'Gerente General', 'alto', '2024-01-01',
 'hor_002', 'rol_gerente', '["mañana", "tarde", "noche"]',
 true, 5, true, NOW()),

('usr_002', 'emp_bella_vista', 'EMP002', 'subgerente1', 'subgerente@bellavista.com', '$2b$10$exemplo_hash_password_subger',
 'María Elena', 'Rodríguez', 'Martínez', '3111234568',
 'sucursal_principal', 'gerencia', 'Subgerente', 'medio', '2024-01-15',
 'hor_002', 'rol_subgerente', '["mañana", "tarde"]',
 true, 3, true, NOW()),

('usr_003', 'emp_bella_vista', 'EMP003', 'cajero1', 'cajero1@bellavista.com', '$2b$10$exemplo_hash_password_cajero',
 'Pedro', 'Sánchez', 'González', '3111234569',
 'sucursal_principal', 'caja', 'Cajero Principal', 'bajo', '2024-02-01',
 'hor_003', 'rol_cajero', '["mañana", "tarde"]',
 true, 1, true, NOW()),

('usr_004', 'emp_bella_vista', 'EMP004', 'mesero1', 'mesero1@bellavista.com', '$2b$10$exemplo_hash_password_mesero',
 'Ana', 'Torres', 'Hernández', '3111234570',
 'sucursal_principal', 'salon', 'Mesero Senior', 'bajo', '2024-02-15',
 'hor_003', 'rol_mesero', '["mañana", "tarde", "noche"]',
 false, 0, true, NOW()),

('usr_005', 'emp_bella_vista', 'EMP005', 'cocinero1', 'cocinero1@bellavista.com', '$2b$10$exemplo_hash_password_cocinero',
 'Carlos', 'Mendoza', 'Jiménez', '3111234571',
 'sucursal_principal', 'cocina', 'Jefe de Cocina', 'medio', '2024-03-01',
 'hor_003', 'rol_cocinero', '["mañana", "tarde"]',
 false, 0, true, NOW());

-- =====================================
-- DATOS RESTAURANTE - ASIGNACIÓN DE ROLES
-- =====================================

INSERT INTO "rest_test"."usuario_roles" (
    "id_usuario_rol", "id_usuario", "id_rol", "prioridad_usuario", "es_rol_principal",
    "sucursal_especifica", "area_especifica", "fecha_inicio", "activo", "fecha_asignacion"
) VALUES
('ur_001', 'usr_001', 'rol_gerente', 1, true, 'sucursal_principal', 'gerencia', '2024-01-01', true, NOW()),
('ur_002', 'usr_002', 'rol_subgerente', 1, true, 'sucursal_principal', 'gerencia', '2024-01-15', true, NOW()),
('ur_003', 'usr_003', 'rol_cajero', 1, true, 'sucursal_principal', 'caja', '2024-02-01', true, NOW()),
('ur_004', 'usr_004', 'rol_mesero', 1, true, 'sucursal_principal', 'salon', '2024-02-15', true, NOW()),
('ur_005', 'usr_005', 'rol_cocinero', 1, true, 'sucursal_principal', 'cocina', '2024-03-01', true, NOW());

-- =====================================
-- DATOS RESTAURANTE - PERMISOS
-- =====================================

-- Permisos para Gerente (acceso completo)
INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", 
    "limitacion_monetaria", "requiere_autorizacion", "activo", "fecha_creacion"
) VALUES
('perm_001', 'rol_gerente', 'acc_pos_001', true, NULL, false, true, NOW()),
('perm_002', 'rol_gerente', 'acc_pos_002', true, NULL, false, true, NOW()),
('perm_003', 'rol_gerente', 'acc_pos_003', true, NULL, false, true, NOW()),
('perm_004', 'rol_gerente', 'acc_caja_001', true, NULL, false, true, NOW()),
('perm_005', 'rol_gerente', 'acc_caja_002', true, NULL, false, true, NOW()),
('perm_006', 'rol_gerente', 'acc_caja_003', true, NULL, false, true, NOW()),
('perm_007', 'rol_gerente', 'acc_caja_004', true, NULL, false, true, NOW()),

-- Permisos para Cajero
('perm_008', 'rol_cajero', 'acc_pos_001', true, NULL, false, true, NOW()),
('perm_009', 'rol_cajero', 'acc_pos_002', true, 500.00, true, true, NOW()),
('perm_010', 'rol_cajero', 'acc_caja_004', true, NULL, false, true, NOW()),

-- Permisos para Mesero
('perm_011', 'rol_mesero', 'acc_pos_001', true, NULL, false, true, NOW()),
('perm_012', 'rol_mesero', 'acc_pos_002', true, 100.00, true, true, NOW()),

-- Permisos para Cocinero
('perm_013', 'rol_cocinero', 'acc_cocina_001', true, NULL, false, true, NOW()),
('perm_014', 'rol_cocinero', 'acc_cocina_002', true, NULL, false, true, NOW()),
('perm_015', 'rol_cocinero', 'acc_cocina_003', true, NULL, true, true, NOW());
