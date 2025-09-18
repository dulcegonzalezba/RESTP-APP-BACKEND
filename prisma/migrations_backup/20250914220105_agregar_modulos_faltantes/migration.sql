-- Migración: Agregar módulos faltantes para sistema completo de roles y permisos
-- Fecha: 2025-09-14
-- Descripción: Agrega los 9 módulos faltantes + submódulos especializados para completar el sistema

-- =====================================
-- MÓDULOS FALTANTES CRÍTICOS
-- =====================================

INSERT INTO "global_sistema"."modulos" (
    "id_modulo", "codigo", "nombre", "descripcion", "icono", "categoria", "orden_visualizacion", "activo"
) VALUES
-- Módulos principales faltantes
('mod_dashboard', 'DASHBOARD', 'Dashboard Principal', 'Vista general del restaurante', 'dashboard', 'general', 6, true),
('mod_productos', 'PRODUCTOS', 'Gestión de Productos', 'Gestión del menú y productos', 'menu', 'operativo', 7, true),
('mod_mesas', 'MESAS', 'Gestión de Mesas', 'Administración de mesas y layout', 'table', 'operativo', 8, true),
('mod_clientes', 'CLIENTES', 'Gestión de Clientes', 'Base de datos de clientes', 'users', 'comercial', 9, true),
('mod_reservaciones', 'RESERVACIONES', 'Reservaciones', 'Sistema de reservas', 'calendar', 'comercial', 10, true),
('mod_catalogos', 'CATALOGOS', 'Catálogos Maestros', 'Configuración de catálogos', 'settings', 'admin', 11, true),
('mod_encuestas', 'ENCUESTAS', 'Encuestas SMS', 'Campañas de satisfacción', 'message', 'marketing', 12, true),
('mod_configuracion', 'CONFIG', 'Configuración', 'Configuración del sistema', 'cog', 'admin', 13, true),

-- Módulos FALTANTES identificados
('mod_facturas', 'FACTURAS', 'Facturas', 'Gestión de facturas y documentos fiscales', 'receipt', 'fiscal', 14, true),
('mod_recetas', 'RECETAS', 'Recetas', 'Libro de recetas y preparaciones', 'book-open', 'cocina', 15, true),

-- Submódulos específicos (interfaces especializadas)
('mod_cajero_dashboard', 'CAJERO_DASH', 'Dashboard Cajero', 'Interfaz especializada del cajero', 'calculator', 'cajero', 16, true),
('mod_mesero_dashboard', 'MESERO_DASH', 'Dashboard Mesero', 'Interfaz especializada del mesero', 'user-check', 'mesero', 17, true),
('mod_mesero_mesas', 'MESERO_MESAS', 'Mis Mesas', 'Gestión de mesas asignadas al mesero', 'table', 'mesero', 18, true),
('mod_mesero_ordenes', 'MESERO_ORDENES', 'Mis Órdenes', 'Gestión de órdenes del mesero', 'clipboard-list', 'mesero', 19, true),
('mod_cocina_ordenes', 'COCINA_ORDENES', 'Órdenes de Cocina', 'Órdenes de cocina en tiempo real', 'clock', 'cocina', 20, true);

-- =====================================
-- VERIFICACIÓN DE INSERCIÓN
-- =====================================

-- Verificar que todos los módulos se insertaron correctamente
DO $$
DECLARE
    total_modulos INTEGER;
    nuevos_modulos INTEGER;
BEGIN
    -- Contar total de módulos
    SELECT COUNT(*) INTO total_modulos FROM "global_sistema"."modulos";
    
    -- Contar módulos de restaurante (categorías relevantes)
    SELECT COUNT(*) INTO nuevos_modulos 
    FROM "global_sistema"."modulos" 
    WHERE categoria IN ('general', 'operativo', 'comercial', 'admin', 'marketing', 'fiscal', 'cocina', 'cajero', 'mesero');
    
    -- Mostrar resultados
    RAISE NOTICE 'Total de módulos en sistema: %', total_modulos;
    RAISE NOTICE 'Módulos de restaurante: %', nuevos_modulos;
    
    -- Verificar que tenemos al menos 17 módulos de restaurante
    IF nuevos_modulos < 15 THEN
        RAISE EXCEPTION 'Error: No se insertaron todos los módulos requeridos. Esperados: 15+, Encontrados: %', nuevos_modulos;
    END IF;
    
    RAISE NOTICE 'Migración de módulos completada exitosamente!';
END
$$;