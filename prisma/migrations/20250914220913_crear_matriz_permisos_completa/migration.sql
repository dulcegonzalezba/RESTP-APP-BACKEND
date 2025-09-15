-- Migración: Crear matriz completa de permisos para todos los roles
-- Fecha: 2025-09-14
-- Descripción: Genera todos los permisos para los 6 roles con las 120+ acciones

-- =====================================
-- LIMPIAR PERMISOS EXISTENTES (OPCIONAL)
-- =====================================

-- Comentar esta línea si quieres mantener permisos existentes
-- DELETE FROM "rest_test"."permisos" WHERE id_permiso LIKE 'perm_%';

-- =====================================
-- ADMINISTRADOR (rol_gerente) - ACCESO COMPLETO
-- =====================================

INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", "limitacion_monetaria", 
    "requiere_autorizacion", "activo", "fecha_creacion"
) 
SELECT 
    'perm_admin_' || LPAD(ROW_NUMBER() OVER(ORDER BY ma.orden_visualizacion)::TEXT, 3, '0'),
    'rol_gerente',
    ma.id_modulo_accion,
    true,
    NULL, -- Sin limitaciones monetarias
    false, -- No requiere autorización adicional
    true,
    NOW()
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true AND m.activo = true;

-- =====================================
-- GERENTE (rol_subgerente) - SIN CONFIGURACIÓN CRÍTICA
-- =====================================

INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", "limitacion_monetaria",
    "requiere_autorizacion", "activo", "fecha_creacion"
)
SELECT 
    'perm_ger_' || LPAD(ROW_NUMBER() OVER(ORDER BY ma.orden_visualizacion)::TEXT, 3, '0'),
    'rol_subgerente',
    ma.id_modulo_accion,
    true,
    CASE 
        WHEN ma.codigo = 'APLICAR_DESCUENTO' THEN 1000.00
        WHEN ma.codigo = 'CAMBIAR_PRECIOS' THEN NULL
        ELSE NULL
    END,
    CASE WHEN ma.nivel_criticidad = 'critica' THEN true ELSE false END,
    true,
    NOW()
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.activo = true
  -- Excluir módulos de solo administrador
  AND m.codigo NOT IN ('CONFIG', 'CATALOGOS', 'ENCUESTAS')
  -- Excluir acciones críticas específicas
  AND ma.codigo NOT IN ('GESTIONAR_USUARIOS', 'BACKUP_SISTEMA', 'RESTAURAR_SISTEMA');

-- =====================================
-- CAJERO (rol_cajero) - VENTAS Y FACTURAS
-- =====================================

INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", "limitacion_monetaria",
    "requiere_autorizacion", "activo", "fecha_creacion"
)
SELECT 
    'perm_caj_' || LPAD(ROW_NUMBER() OVER(ORDER BY ma.orden_visualizacion)::TEXT, 3, '0'),
    'rol_cajero',
    ma.id_modulo_accion,
    true,
    CASE 
        WHEN ma.codigo = 'APLICAR_DESCUENTO' THEN 500.00
        WHEN ma.codigo = 'MODIFICAR_FACTURA' THEN 100.00
        ELSE NULL
    END,
    CASE 
        WHEN ma.codigo IN ('CANCELAR_FACTURA', 'CORTE_FINAL') THEN true 
        ELSE false 
    END,
    true,
    NOW()
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.activo = true
  -- Módulos permitidos para cajero
  AND m.codigo IN ('DASHBOARD', 'POS', 'CAJA', 'CLIENTES', 'FACTURAS', 'CAJERO_DASH')
  -- Incluir solo reportes de ventas
  OR (m.codigo = 'REPORTES' AND ma.codigo IN ('VER_REPORTES_VENTAS', 'EXPORTAR_REPORTES'));

-- =====================================
-- MESERO (rol_mesero) - SERVICIO Y MESAS
-- =====================================

INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", "limitacion_monetaria",
    "requiere_autorizacion", "activo", "fecha_creacion"
)
SELECT 
    'perm_mes_' || LPAD(ROW_NUMBER() OVER(ORDER BY ma.orden_visualizacion)::TEXT, 3, '0'),
    'rol_mesero',
    ma.id_modulo_accion,
    true,
    CASE 
        WHEN ma.codigo = 'APLICAR_DESCUENTO' THEN 100.00
        ELSE NULL
    END,
    CASE 
        WHEN ma.codigo IN ('CANCELAR_ORDEN', 'ELIMINAR_CLIENTE') THEN true 
        ELSE false 
    END,
    true,
    NOW()
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.activo = true
  -- Módulos permitidos para mesero
  AND m.codigo IN ('DASHBOARD', 'CLIENTES', 'RESERVACIONES', 'MESERO_DASH', 'MESERO_MESAS', 'MESERO_ORDENES')
  -- Excluir acciones no permitidas
  AND ma.codigo NOT IN ('ELIMINAR_CLIENTE', 'EXPORTAR_CLIENTES', 'CANCELAR_RESERVACION');

-- =====================================
-- COCINERO (rol_cocinero) - COCINA E INVENTARIO
-- =====================================

INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", "limitacion_monetaria",
    "requiere_autorizacion", "activo", "fecha_creacion"
)
SELECT 
    'perm_coc_' || LPAD(ROW_NUMBER() OVER(ORDER BY ma.orden_visualizacion)::TEXT, 3, '0'),
    'rol_cocinero',
    ma.id_modulo_accion,
    true,
    NULL, -- Sin limitaciones monetarias
    CASE 
        WHEN ma.codigo IN ('AJUSTE_INVENTARIO', 'RECHAZAR_ORDEN') THEN true 
        ELSE false 
    END,
    true,
    NOW()
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.activo = true
  -- Módulos permitidos para cocinero
  AND m.codigo IN ('DASHBOARD', 'INVENTARIO', 'RECETAS', 'COCINA', 'COCINA_ORDENES')
  -- Excluir acciones administrativas
  AND ma.codigo NOT IN ('ELIMINAR_RECETA', 'CREAR_RECETA', 'CONFIGURAR_ALERTAS');

-- =====================================
-- AUXILIAR COCINA (rol_auxiliar_cocina) - LIMITADO
-- =====================================

INSERT INTO "rest_test"."permisos" (
    "id_permiso", "id_rol", "id_modulo_accion", "permitido", "limitacion_monetaria",
    "requiere_autorizacion", "activo", "fecha_creacion"
)
SELECT 
    'perm_aux_' || LPAD(ROW_NUMBER() OVER(ORDER BY ma.orden_visualizacion)::TEXT, 3, '0'),
    'rol_auxiliar_cocina',
    ma.id_modulo_accion,
    true,
    NULL,
    false, -- No requiere autorización (rol limitado)
    true,
    NOW()
FROM "global_sistema"."modulo_acciones" ma
JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
WHERE ma.activo = true 
  AND m.activo = true
  -- Solo módulos básicos de cocina
  AND m.codigo IN ('DASHBOARD', 'COCINA_ORDENES', 'RECETAS')
  -- Solo acciones de lectura y operaciones básicas
  AND ma.codigo IN (
    'VER_GENERAL', 
    'VER_ORDENES_COCINA', 
    'MARCAR_EN_PREPARACION', 
    'MARCAR_LISTO', 
    'VER_TIEMPOS_PREPARACION',
    'VER_RECETAS', 
    'VER_INGREDIENTES'
  );

-- =====================================
-- CREAR ÍNDICES PARA PERFORMANCE
-- =====================================

CREATE INDEX IF NOT EXISTS "idx_permisos_rol" ON "rest_test"."permisos"("id_rol");
CREATE INDEX IF NOT EXISTS "idx_permisos_modulo_accion" ON "rest_test"."permisos"("id_modulo_accion");
CREATE INDEX IF NOT EXISTS "idx_permisos_permitido" ON "rest_test"."permisos"("permitido");
CREATE INDEX IF NOT EXISTS "idx_permisos_activo" ON "rest_test"."permisos"("activo");

-- =====================================
-- VERIFICACIÓN COMPLETA DEL SISTEMA
-- =====================================

DO $$
DECLARE
    resumen_permisos RECORD;
    total_permisos INTEGER;
    total_acciones INTEGER;
    total_modulos INTEGER;
    cobertura_percent DECIMAL(5,2);
BEGIN
    -- Contar totales
    SELECT COUNT(*) INTO total_permisos FROM "rest_test"."permisos" WHERE activo = true;
    SELECT COUNT(*) INTO total_acciones FROM "global_sistema"."modulo_acciones" WHERE activo = true;
    SELECT COUNT(*) INTO total_modulos FROM "global_sistema"."modulos" WHERE activo = true;
    
    -- Calcular cobertura
    cobertura_percent := (total_permisos::DECIMAL / (total_acciones * 6)) * 100;
    
    RAISE NOTICE '';
    RAISE NOTICE '🎉 SISTEMA DE ROLES Y PERMISOS COMPLETADO';
    RAISE NOTICE '=============================================';
    RAISE NOTICE 'Total de módulos: %', total_modulos;
    RAISE NOTICE 'Total de acciones: %', total_acciones;
    RAISE NOTICE 'Total de permisos: %', total_permisos;
    RAISE NOTICE 'Cobertura promedio: %%%', ROUND(cobertura_percent, 2);
    RAISE NOTICE '';
    RAISE NOTICE 'RESUMEN POR ROL:';
    RAISE NOTICE '================';
    
    -- Mostrar resumen por rol
    FOR resumen_permisos IN 
        SELECT 
            r.codigo as rol_codigo,
            r.nombre as rol_nombre,
            COUNT(p.id_permiso) as total_permisos,
            COUNT(CASE WHEN p.permitido = true THEN 1 END) as permisos_concedidos,
            COUNT(CASE WHEN p.limitacion_monetaria IS NOT NULL THEN 1 END) as con_limitacion_monetaria,
            COUNT(CASE WHEN p.requiere_autorizacion = true THEN 1 END) as requiere_autorizacion
        FROM "rest_test"."roles" r
        LEFT JOIN "rest_test"."permisos" p ON r.id_rol = p.id_rol AND p.activo = true
        WHERE r.activo = true
        GROUP BY r.codigo, r.nombre, r.prioridad_orden
        ORDER BY r.prioridad_orden
    LOOP
        RAISE NOTICE '% (%): % permisos (% concedidos, % con límite $, % requieren auth)', 
            resumen_permisos.rol_codigo,
            resumen_permisos.rol_nombre,
            resumen_permisos.total_permisos,
            resumen_permisos.permisos_concedidos,
            resumen_permisos.con_limitacion_monetaria,
            resumen_permisos.requiere_autorizacion;
    END LOOP;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ VERIFICACIONES:';
    
    -- Verificar que todos los roles tienen permisos
    IF EXISTS (
        SELECT 1 FROM "rest_test"."roles" r 
        WHERE r.activo = true 
        AND NOT EXISTS (
            SELECT 1 FROM "rest_test"."permisos" p 
            WHERE p.id_rol = r.id_rol AND p.activo = true
        )
    ) THEN
        RAISE EXCEPTION '❌ Error: Hay roles sin permisos asignados';
    ELSE
        RAISE NOTICE '✅ Todos los roles tienen permisos asignados';
    END IF;
    
    -- Verificar cobertura mínima
    IF cobertura_percent < 50 THEN
        RAISE EXCEPTION '❌ Error: Cobertura muy baja: %%. Mínimo requerido: 50%%', ROUND(cobertura_percent, 2);
    ELSE
        RAISE NOTICE '✅ Cobertura de permisos: %% (✓ > 50%%)', ROUND(cobertura_percent, 2);
    END IF;
    
    -- Verificar que Admin tiene acceso completo
    IF (SELECT COUNT(*) FROM "rest_test"."permisos" 
        WHERE id_rol = 'rol_gerente' AND permitido = true AND activo = true) < total_acciones THEN
        RAISE EXCEPTION '❌ Error: Administrador no tiene acceso completo';
    ELSE
        RAISE NOTICE '✅ Administrador tiene acceso completo';
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '🚀 SISTEMA LISTO PARA IMPLEMENTACIÓN BACKEND!';
    RAISE NOTICE 'Próximos pasos: Schema Prisma → Services → Endpoints → Testing';
    RAISE NOTICE '';
END
$$;