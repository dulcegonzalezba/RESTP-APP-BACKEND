-- Migración: Implementar sistema completo de licencias
-- Fecha: 2025-09-14
-- Descripción: Crea tablas de licencias y mapeo con módulos para el sistema de roles

-- =====================================
-- CREAR TABLA DE LICENCIAS
-- =====================================

CREATE TABLE "global_sistema"."licencias" (
    "id_licencia" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL UNIQUE,
    "nombre" VARCHAR(100) NOT NULL,
    "nivel" INTEGER NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(200),
    "precio_mensual" DECIMAL(10,2) DEFAULT 0.00,
    "activa" BOOLEAN DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "licencias_pkey" PRIMARY KEY ("id_licencia")
);

-- =====================================
-- CREAR TABLA DE MÓDULOS POR LICENCIA
-- =====================================

CREATE TABLE "global_sistema"."licencia_modulos" (
    "id_licencia_modulo" VARCHAR(26) NOT NULL,
    "id_licencia" VARCHAR(26) NOT NULL,
    "id_modulo" VARCHAR(26) NOT NULL,
    "incluido" BOOLEAN DEFAULT true,
    "limitaciones" JSONB DEFAULT '{}',
    "fecha_creacion" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "licencia_modulos_pkey" PRIMARY KEY ("id_licencia_modulo"),
    CONSTRAINT "licencia_modulos_id_licencia_fkey" FOREIGN KEY ("id_licencia") REFERENCES "global_sistema"."licencias"("id_licencia") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "licencia_modulos_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "global_sistema"."modulos"("id_modulo") ON DELETE CASCADE ON UPDATE CASCADE
);

-- =====================================
-- INSERTAR LICENCIAS DEL SISTEMA
-- =====================================

INSERT INTO "global_sistema"."licencias" (
    "id_licencia", "codigo", "nombre", "nivel", "color", "descripcion", "precio_mensual", "activa", "fecha_creacion"
) VALUES
('lic_gratis', 'GRATIS', 'Gratis', 0, 'bg-gray-500', 'Funcionalidad básica para empezar', 0.00, true, NOW()),
('lic_lite', 'LITE', 'Lite', 1, 'bg-blue-500', 'Gestión completa de productos y clientes', 99.00, true, NOW()),
('lic_pro', 'PRO', 'Pro', 2, 'bg-purple-500', 'Reportes avanzados e inventario completo', 299.00, true, NOW()),
('lic_franquicia', 'FRANQUICIA', 'Franquicia', 3, 'bg-orange-500', 'Multi-sucursal y API completa para franquicias', 599.00, true, NOW());

-- =====================================
-- CONFIGURAR MÓDULOS POR LICENCIA
-- =====================================

-- LICENCIA GRATIS: Solo módulos básicos
INSERT INTO "global_sistema"."licencia_modulos" (
    "id_licencia_modulo", "id_licencia", "id_modulo", "incluido", "limitaciones", "fecha_creacion"
) VALUES
('lic_mod_gratis_1', 'lic_gratis', 'mod_dashboard', true, '{"limitaciones": ["solo_basico", "max_usuarios_5"]}', NOW()),
('lic_mod_gratis_2', 'lic_gratis', 'mod_pos', true, '{"limitaciones": ["ventas_basicas", "max_productos_50"]}', NOW()),
('lic_mod_gratis_3', 'lic_gratis', 'mod_caja', true, '{"limitaciones": ["cortes_basicos", "sin_reportes_avanzados"]}', NOW()),
('lic_mod_gratis_4', 'lic_gratis', 'mod_cajero_dashboard', true, '{"limitaciones": ["funciones_basicas"]}', NOW());

-- LICENCIA LITE: + Productos, Clientes, Mesas, Facturas
INSERT INTO "global_sistema"."licencia_modulos" (
    "id_licencia_modulo", "id_licencia", "id_modulo", "incluido", "limitaciones", "fecha_creacion"
) VALUES
-- Módulos básicos sin limitaciones
('lic_mod_lite_1', 'lic_lite', 'mod_dashboard', true, '{}', NOW()),
('lic_mod_lite_2', 'lic_lite', 'mod_pos', true, '{}', NOW()),
('lic_mod_lite_3', 'lic_lite', 'mod_caja', true, '{}', NOW()),
('lic_mod_lite_4', 'lic_lite', 'mod_cajero_dashboard', true, '{}', NOW()),
-- Módulos adicionales en Lite
('lic_mod_lite_5', 'lic_lite', 'mod_productos', true, '{"limitaciones": ["max_productos_500"]}', NOW()),
('lic_mod_lite_6', 'lic_lite', 'mod_clientes', true, '{"limitaciones": ["max_clientes_1000"]}', NOW()),
('lic_mod_lite_7', 'lic_lite', 'mod_mesas', true, '{"limitaciones": ["max_mesas_20"]}', NOW()),
('lic_mod_lite_8', 'lic_lite', 'mod_facturas', true, '{"limitaciones": ["facturacion_basica"]}', NOW()),
('lic_mod_lite_9', 'lic_lite', 'mod_mesero_dashboard', true, '{}', NOW()),
('lic_mod_lite_10', 'lic_lite', 'mod_mesero_mesas', true, '{}', NOW()),
('lic_mod_lite_11', 'lic_lite', 'mod_mesero_ordenes', true, '{}', NOW());

-- LICENCIA PRO: + Reportes, Inventario, Reservaciones, Recetas, Cocina
INSERT INTO "global_sistema"."licencia_modulos" (
    "id_licencia_modulo", "id_licencia", "id_modulo", "incluido", "limitaciones", "fecha_creacion"
) VALUES
-- Todos los módulos de Lite
('lic_mod_pro_1', 'lic_pro', 'mod_dashboard', true, '{}', NOW()),
('lic_mod_pro_2', 'lic_pro', 'mod_pos', true, '{}', NOW()),
('lic_mod_pro_3', 'lic_pro', 'mod_caja', true, '{}', NOW()),
('lic_mod_pro_4', 'lic_pro', 'mod_cajero_dashboard', true, '{}', NOW()),
('lic_mod_pro_5', 'lic_pro', 'mod_productos', true, '{}', NOW()),
('lic_mod_pro_6', 'lic_pro', 'mod_clientes', true, '{}', NOW()),
('lic_mod_pro_7', 'lic_pro', 'mod_mesas', true, '{}', NOW()),
('lic_mod_pro_8', 'lic_pro', 'mod_facturas', true, '{}', NOW()),
('lic_mod_pro_9', 'lic_pro', 'mod_mesero_dashboard', true, '{}', NOW()),
('lic_mod_pro_10', 'lic_pro', 'mod_mesero_mesas', true, '{}', NOW()),
('lic_mod_pro_11', 'lic_pro', 'mod_mesero_ordenes', true, '{}', NOW()),
-- Módulos adicionales en Pro
('lic_mod_pro_12', 'lic_pro', 'mod_reportes', true, '{}', NOW()),
('lic_mod_pro_13', 'lic_pro', 'mod_inventario', true, '{}', NOW()),
('lic_mod_pro_14', 'lic_pro', 'mod_reservaciones', true, '{}', NOW()),
('lic_mod_pro_15', 'lic_pro', 'mod_recetas', true, '{}', NOW()),
('lic_mod_pro_16', 'lic_pro', 'mod_cocina', true, '{}', NOW()),
('lic_mod_pro_17', 'lic_pro', 'mod_cocina_ordenes', true, '{}', NOW());

-- LICENCIA FRANQUICIA: Todos los módulos sin limitaciones
INSERT INTO "global_sistema"."licencia_modulos" (
    "id_licencia_modulo", "id_licencia", "id_modulo", "incluido", "limitaciones", "fecha_creacion"
)
SELECT 
    'lic_mod_fran_' || ROW_NUMBER() OVER(ORDER BY m.orden_visualizacion),
    'lic_franquicia',
    m.id_modulo,
    true,
    '{}',
    NOW()
FROM "global_sistema"."modulos" m 
WHERE m.activo = true;

-- =====================================
-- CREAR ÍNDICES PARA PERFORMANCE
-- =====================================

CREATE INDEX "idx_licencias_codigo" ON "global_sistema"."licencias"("codigo");
CREATE INDEX "idx_licencias_nivel" ON "global_sistema"."licencias"("nivel");
CREATE INDEX "idx_licencia_modulos_licencia" ON "global_sistema"."licencia_modulos"("id_licencia");
CREATE INDEX "idx_licencia_modulos_modulo" ON "global_sistema"."licencia_modulos"("id_modulo");
CREATE UNIQUE INDEX "idx_licencia_modulos_unique" ON "global_sistema"."licencia_modulos"("id_licencia", "id_modulo");

-- =====================================
-- AGREGAR LICENCIA A TABLA DE EMPRESAS
-- =====================================

-- Agregar columna de licencia a la tabla empresas si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'global_sistema' 
        AND table_name = 'empresas' 
        AND column_name = 'id_licencia'
    ) THEN
        ALTER TABLE "global_sistema"."empresas" 
        ADD COLUMN "id_licencia" VARCHAR(26) DEFAULT 'lic_gratis';
        
        -- Agregar foreign key
        ALTER TABLE "global_sistema"."empresas"
        ADD CONSTRAINT "empresas_id_licencia_fkey" 
        FOREIGN KEY ("id_licencia") REFERENCES "global_sistema"."licencias"("id_licencia");
        
        -- Actualizar empresas existentes con licencia Gratis por defecto
        UPDATE "global_sistema"."empresas" 
        SET "id_licencia" = 'lic_gratis' 
        WHERE "id_licencia" IS NULL;
        
        RAISE NOTICE 'Columna id_licencia agregada a tabla empresas';
    ELSE
        RAISE NOTICE 'Columna id_licencia ya existe en tabla empresas';
    END IF;
END
$$;

-- =====================================
-- VERIFICACIÓN DE INSERCIÓN
-- =====================================

DO $$
DECLARE
    total_licencias INTEGER;
    total_modulos_licencia INTEGER;
    licencia_info RECORD;
BEGIN
    -- Contar licencias
    SELECT COUNT(*) INTO total_licencias FROM "global_sistema"."licencias";
    
    -- Contar relaciones licencia-módulos
    SELECT COUNT(*) INTO total_modulos_licencia FROM "global_sistema"."licencia_modulos";
    
    -- Mostrar resumen por licencia
    RAISE NOTICE 'RESUMEN DEL SISTEMA DE LICENCIAS:';
    RAISE NOTICE '=====================================';
    
    FOR licencia_info IN 
        SELECT 
            l.codigo, 
            l.nombre, 
            l.nivel,
            l.precio_mensual,
            COUNT(lm.id_modulo) as total_modulos
        FROM "global_sistema"."licencias" l
        LEFT JOIN "global_sistema"."licencia_modulos" lm ON l.id_licencia = lm.id_licencia
        GROUP BY l.codigo, l.nombre, l.nivel, l.precio_mensual
        ORDER BY l.nivel
    LOOP
        RAISE NOTICE 'Licencia % (Nivel %): % módulos - $%/mes', 
            licencia_info.codigo, 
            licencia_info.nivel, 
            licencia_info.total_modulos,
            licencia_info.precio_mensual;
    END LOOP;
    
    RAISE NOTICE '=====================================';
    RAISE NOTICE 'Total de licencias: %', total_licencias;
    RAISE NOTICE 'Total de relaciones licencia-módulo: %', total_modulos_licencia;
    
    -- Verificaciones
    IF total_licencias != 4 THEN
        RAISE EXCEPTION 'Error: Esperadas 4 licencias, encontradas: %', total_licencias;
    END IF;
    
    IF total_modulos_licencia < 50 THEN
        RAISE EXCEPTION 'Error: Muy pocas relaciones licencia-módulo. Encontradas: %', total_modulos_licencia;
    END IF;
    
    RAISE NOTICE 'Sistema de licencias implementado exitosamente!';
END
$$;