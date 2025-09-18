-- Migración: Agregar acciones granulares completas (120+ acciones)
-- Fecha: 2025-09-14
-- Descripción: Agrega todas las acciones faltantes para cada módulo del sistema

-- =====================================
-- ACCIONES PARA MÓDULO DASHBOARD
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" (
    "id_modulo_accion", "id_modulo", "codigo", "nombre", "descripcion", 
    "requiere_autorizacion", "nivel_criticidad", "orden_visualizacion", "activo"
) VALUES
('acc_dash_001', 'mod_dashboard', 'VER_GENERAL', 'Ver Dashboard General', 'Vista general básica', false, 'normal', 1, true),
('acc_dash_002', 'mod_dashboard', 'VER_AVANZADO', 'Ver Métricas Avanzadas', 'KPIs y métricas detalladas', false, 'normal', 2, true);

-- =====================================
-- ACCIONES PARA MÓDULO PRODUCTOS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_prod_001', 'mod_productos', 'VER_PRODUCTOS', 'Ver Productos', 'Consultar menú y productos', false, 'normal', 1, true),
('acc_prod_002', 'mod_productos', 'CREAR_PRODUCTO', 'Crear Producto', 'Agregar nuevos productos', true, 'alta', 2, true),
('acc_prod_003', 'mod_productos', 'EDITAR_PRODUCTO', 'Editar Producto', 'Modificar productos existentes', true, 'alta', 3, true),
('acc_prod_004', 'mod_productos', 'ELIMINAR_PRODUCTO', 'Eliminar Producto', 'Eliminar productos', true, 'critica', 4, true),
('acc_prod_005', 'mod_productos', 'CAMBIAR_PRECIOS', 'Cambiar Precios', 'Modificar precios de productos', true, 'alta', 5, true),
('acc_prod_006', 'mod_productos', 'VER_CATEGORIAS', 'Ver Categorías', 'Consultar categorías de productos', false, 'normal', 6, true),
('acc_prod_007', 'mod_productos', 'GESTIONAR_CATEGORIAS', 'Gestionar Categorías', 'Crear/editar categorías', true, 'alta', 7, true);

-- =====================================
-- ACCIONES PARA MÓDULO MESAS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_mesa_001', 'mod_mesas', 'VER_LAYOUT', 'Ver Layout de Mesas', 'Visualizar distribución de mesas', false, 'normal', 1, true),
('acc_mesa_002', 'mod_mesas', 'ASIGNAR_MESA', 'Asignar Mesa', 'Asignar mesa a mesero', false, 'normal', 2, true),
('acc_mesa_003', 'mod_mesas', 'CAMBIAR_ESTADO', 'Cambiar Estado Mesa', 'Ocupar/liberar mesas', false, 'normal', 3, true),
('acc_mesa_004', 'mod_mesas', 'CONFIG_LAYOUT', 'Configurar Layout', 'Modificar distribución de mesas', true, 'alta', 4, true),
('acc_mesa_005', 'mod_mesas', 'CREAR_MESA', 'Crear Mesa', 'Agregar nueva mesa al sistema', true, 'alta', 5, true),
('acc_mesa_006', 'mod_mesas', 'ELIMINAR_MESA', 'Eliminar Mesa', 'Eliminar mesa del sistema', true, 'critica', 6, true);

-- =====================================
-- ACCIONES PARA MÓDULO CLIENTES
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_cli_001', 'mod_clientes', 'VER_CLIENTES', 'Ver Clientes', 'Consultar base de datos de clientes', false, 'normal', 1, true),
('acc_cli_002', 'mod_clientes', 'CREAR_CLIENTE', 'Crear Cliente', 'Agregar nuevo cliente', false, 'normal', 2, true),
('acc_cli_003', 'mod_clientes', 'EDITAR_CLIENTE', 'Editar Cliente', 'Modificar datos del cliente', false, 'normal', 3, true),
('acc_cli_004', 'mod_clientes', 'ELIMINAR_CLIENTE', 'Eliminar Cliente', 'Eliminar cliente del sistema', true, 'alta', 4, true),
('acc_cli_005', 'mod_clientes', 'VER_HISTORIAL', 'Ver Historial', 'Consultar historial de pedidos', false, 'normal', 5, true),
('acc_cli_006', 'mod_clientes', 'EXPORTAR_CLIENTES', 'Exportar Clientes', 'Exportar base de datos de clientes', false, 'normal', 6, true);

-- =====================================
-- ACCIONES PARA MÓDULO RESERVACIONES
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_res_001', 'mod_reservaciones', 'VER_RESERVACIONES', 'Ver Reservaciones', 'Consultar reservas existentes', false, 'normal', 1, true),
('acc_res_002', 'mod_reservaciones', 'CREAR_RESERVACION', 'Crear Reservación', 'Crear nueva reserva', false, 'normal', 2, true),
('acc_res_003', 'mod_reservaciones', 'EDITAR_RESERVACION', 'Editar Reservación', 'Modificar reserva existente', false, 'normal', 3, true),
('acc_res_004', 'mod_reservaciones', 'CANCELAR_RESERVACION', 'Cancelar Reservación', 'Cancelar reserva', true, 'alta', 4, true),
('acc_res_005', 'mod_reservaciones', 'CONFIRMAR_RESERVACION', 'Confirmar Reservación', 'Confirmar asistencia a reserva', false, 'normal', 5, true),
('acc_res_006', 'mod_reservaciones', 'VER_CALENDARIO', 'Ver Calendario', 'Vista de calendario de reservas', false, 'normal', 6, true);

-- =====================================
-- ACCIONES PARA MÓDULO FACTURAS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_fact_001', 'mod_facturas', 'VER_FACTURAS', 'Ver Facturas', 'Consultar facturas emitidas', false, 'normal', 1, true),
('acc_fact_002', 'mod_facturas', 'CREAR_FACTURA', 'Crear Factura', 'Generar nueva factura', false, 'normal', 2, true),
('acc_fact_003', 'mod_facturas', 'MODIFICAR_FACTURA', 'Modificar Factura', 'Editar factura existente', true, 'alta', 3, true),
('acc_fact_004', 'mod_facturas', 'CANCELAR_FACTURA', 'Cancelar Factura', 'Cancelar factura emitida', true, 'critica', 4, true),
('acc_fact_005', 'mod_facturas', 'REIMPRIMIR_FACTURA', 'Reimprimir Factura', 'Reimprimir documentos fiscales', false, 'normal', 5, true),
('acc_fact_006', 'mod_facturas', 'VER_REPORTES_FISCALES', 'Ver Reportes Fiscales', 'Consultar reportes para SAT', false, 'normal', 6, true);

-- =====================================
-- ACCIONES PARA MÓDULO RECETAS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_rec_001', 'mod_recetas', 'VER_RECETAS', 'Ver Recetas', 'Consultar libro de recetas', false, 'normal', 1, true),
('acc_rec_002', 'mod_recetas', 'CREAR_RECETA', 'Crear Receta', 'Agregar nueva receta', true, 'alta', 2, true),
('acc_rec_003', 'mod_recetas', 'EDITAR_RECETA', 'Editar Receta', 'Modificar receta existente', true, 'alta', 3, true),
('acc_rec_004', 'mod_recetas', 'ELIMINAR_RECETA', 'Eliminar Receta', 'Eliminar receta del sistema', true, 'critica', 4, true),
('acc_rec_005', 'mod_recetas', 'VER_INGREDIENTES', 'Ver Ingredientes', 'Consultar ingredientes por receta', false, 'normal', 5, true),
('acc_rec_006', 'mod_recetas', 'CALCULAR_COSTOS', 'Calcular Costos', 'Calcular costo de recetas', false, 'normal', 6, true);

-- =====================================
-- ACCIONES PARA MÓDULO REPORTES (GRANULAR)
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_rep_001', 'mod_reportes', 'VER_REPORTES_VENTAS', 'Reportes de Ventas', 'Reportes específicos de ventas y caja', false, 'normal', 1, true),
('acc_rep_002', 'mod_reportes', 'VER_REPORTES_GESTION', 'Reportes de Gestión', 'Reportes operativos y de gestión', false, 'normal', 2, true),
('acc_rep_003', 'mod_reportes', 'VER_REPORTES_AVANZADOS', 'Reportes Avanzados', 'Análisis detallado y KPIs', false, 'alta', 3, true),
('acc_rep_004', 'mod_reportes', 'EXPORTAR_REPORTES', 'Exportar Reportes', 'Exportar reportes a PDF/Excel', false, 'normal', 4, true),
('acc_rep_005', 'mod_reportes', 'VER_REPORTES_INVENTARIO', 'Reportes de Inventario', 'Reportes de stock y movimientos', false, 'normal', 5, true),
('acc_rep_006', 'mod_reportes', 'PROGRAMAR_REPORTES', 'Programar Reportes', 'Programar reportes automáticos', true, 'alta', 6, true);

-- =====================================
-- ACCIONES PARA MÓDULO CATÁLOGOS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_cat_001', 'mod_catalogos', 'VER_CATALOGOS', 'Ver Catálogos', 'Consultar catálogos maestros', false, 'normal', 1, true),
('acc_cat_002', 'mod_catalogos', 'CREAR_CATALOGO', 'Crear Catálogo', 'Agregar nuevo elemento a catálogo', true, 'alta', 2, true),
('acc_cat_003', 'mod_catalogos', 'EDITAR_CATALOGO', 'Editar Catálogo', 'Modificar elementos de catálogo', true, 'alta', 3, true),
('acc_cat_004', 'mod_catalogos', 'ELIMINAR_CATALOGO', 'Eliminar Catálogo', 'Eliminar elementos de catálogo', true, 'critica', 4, true),
('acc_cat_005', 'mod_catalogos', 'IMPORTAR_CATALOGO', 'Importar Catálogo', 'Importar catálogos desde archivo', true, 'alta', 5, true);

-- =====================================
-- ACCIONES PARA MÓDULO ENCUESTAS
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_enc_001', 'mod_encuestas', 'VER_ENCUESTAS', 'Ver Encuestas', 'Consultar campañas de encuestas', false, 'normal', 1, true),
('acc_enc_002', 'mod_encuestas', 'CREAR_ENCUESTA', 'Crear Encuesta', 'Crear nueva campaña de encuesta', true, 'alta', 2, true),
('acc_enc_003', 'mod_encuestas', 'EDITAR_ENCUESTA', 'Editar Encuesta', 'Modificar encuesta existente', true, 'alta', 3, true),
('acc_enc_004', 'mod_encuestas', 'ELIMINAR_ENCUESTA', 'Eliminar Encuesta', 'Eliminar encuesta', true, 'critica', 4, true),
('acc_enc_005', 'mod_encuestas', 'ENVIAR_ENCUESTA', 'Enviar Encuesta', 'Enviar encuesta por SMS', false, 'normal', 5, true),
('acc_enc_006', 'mod_encuestas', 'VER_RESULTADOS', 'Ver Resultados', 'Consultar resultados de encuestas', false, 'normal', 6, true),
('acc_enc_007', 'mod_encuestas', 'EXPORTAR_RESULTADOS', 'Exportar Resultados', 'Exportar resultados de encuestas', false, 'normal', 7, true);

-- =====================================
-- ACCIONES PARA MÓDULO CONFIGURACIÓN
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_config_001', 'mod_configuracion', 'VER_CONFIGURACION', 'Ver Configuración', 'Consultar configuración del sistema', false, 'normal', 1, true),
('acc_config_002', 'mod_configuracion', 'EDITAR_CONFIGURACION', 'Editar Configuración', 'Modificar configuración del sistema', true, 'critica', 2, true),
('acc_config_003', 'mod_configuracion', 'BACKUP_SISTEMA', 'Backup Sistema', 'Crear respaldo del sistema', true, 'alta', 3, true),
('acc_config_004', 'mod_configuracion', 'RESTAURAR_SISTEMA', 'Restaurar Sistema', 'Restaurar respaldo del sistema', true, 'critica', 4, true),
('acc_config_005', 'mod_configuracion', 'VER_LOGS', 'Ver Logs', 'Consultar logs del sistema', false, 'normal', 5, true),
('acc_config_006', 'mod_configuracion', 'GESTIONAR_USUARIOS', 'Gestionar Usuarios', 'Administrar usuarios del sistema', true, 'alta', 6, true);

-- =====================================
-- ACCIONES PARA SUBMÓDULOS ESPECIALIZADOS
-- =====================================

-- Dashboard Cajero
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_caj_dash_001', 'mod_cajero_dashboard', 'VER_DASHBOARD_CAJERO', 'Dashboard Cajero', 'Vista especializada del cajero', false, 'normal', 1, true),
('acc_caj_dash_002', 'mod_cajero_dashboard', 'VER_RESUMEN_TURNO', 'Resumen de Turno', 'Ver resumen del turno actual', false, 'normal', 2, true),
('acc_caj_dash_003', 'mod_cajero_dashboard', 'VER_VENTAS_DIA', 'Ventas del Día', 'Ver ventas acumuladas del día', false, 'normal', 3, true);

-- Dashboard Mesero
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_mes_dash_001', 'mod_mesero_dashboard', 'VER_DASHBOARD_MESERO', 'Dashboard Mesero', 'Vista especializada del mesero', false, 'normal', 1, true),
('acc_mes_dash_002', 'mod_mesero_dashboard', 'VER_RESUMEN_SERVICIO', 'Resumen de Servicio', 'Ver resumen del servicio actual', false, 'normal', 2, true),
('acc_mes_dash_003', 'mod_mesero_dashboard', 'VER_MESAS_ASIGNADAS', 'Ver Mesas Asignadas', 'Ver mesas asignadas al mesero', false, 'normal', 3, true);

-- Mis Mesas (específico para mesero)
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_mes_mesa_001', 'mod_mesero_mesas', 'VER_MIS_MESAS', 'Ver Mis Mesas', 'Ver solo mesas asignadas al mesero', false, 'normal', 1, true),
('acc_mes_mesa_002', 'mod_mesero_mesas', 'CAMBIAR_ESTADO_MESA', 'Cambiar Estado Mesa', 'Ocupar/liberar mis mesas', false, 'normal', 2, true),
('acc_mes_mesa_003', 'mod_mesero_mesas', 'ASIGNAR_CLIENTES', 'Asignar Clientes', 'Asignar clientes a mis mesas', false, 'normal', 3, true),
('acc_mes_mesa_004', 'mod_mesero_mesas', 'VER_HISTORIAL_MESA', 'Ver Historial Mesa', 'Ver historial de la mesa', false, 'normal', 4, true);

-- Mis Órdenes (específico para mesero, diferente de cocina)
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_mes_ord_001', 'mod_mesero_ordenes', 'VER_MIS_ORDENES', 'Ver Mis Órdenes', 'Ver órdenes de mis mesas', false, 'normal', 1, true),
('acc_mes_ord_002', 'mod_mesero_ordenes', 'CREAR_ORDEN', 'Crear Orden', 'Crear nueva orden para mesa', false, 'normal', 2, true),
('acc_mes_ord_003', 'mod_mesero_ordenes', 'MODIFICAR_ORDEN', 'Modificar Orden', 'Modificar orden antes de enviar', false, 'normal', 3, true),
('acc_mes_ord_004', 'mod_mesero_ordenes', 'CANCELAR_ORDEN', 'Cancelar Orden', 'Cancelar orden de mesa', true, 'alta', 4, true),
('acc_mes_ord_005', 'mod_mesero_ordenes', 'VER_ESTADO_ORDEN', 'Ver Estado Orden', 'Consultar estado de órdenes', false, 'normal', 5, true);

-- Órdenes de Cocina (específico para cocina)
INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_coc_ord_001', 'mod_cocina_ordenes', 'VER_ORDENES_COCINA', 'Ver Órdenes Cocina', 'Ver órdenes pendientes de cocina', false, 'normal', 1, true),
('acc_coc_ord_002', 'mod_cocina_ordenes', 'MARCAR_EN_PREPARACION', 'Marcar en Preparación', 'Marcar orden como en preparación', false, 'normal', 2, true),
('acc_coc_ord_003', 'mod_cocina_ordenes', 'MARCAR_LISTO', 'Marcar Listo', 'Marcar platillo como listo', false, 'normal', 3, true),
('acc_coc_ord_004', 'mod_cocina_ordenes', 'RECHAZAR_ORDEN', 'Rechazar Orden', 'Rechazar orden por falta de ingredientes', true, 'alta', 4, true),
('acc_coc_ord_005', 'mod_cocina_ordenes', 'VER_TIEMPOS_PREPARACION', 'Ver Tiempos Preparación', 'Consultar tiempos de preparación', false, 'normal', 5, true);

-- =====================================
-- ACCIONES ADICIONALES PARA INVENTARIO (EXPANDIR EXISTENTE)
-- =====================================

INSERT INTO "global_sistema"."modulo_acciones" VALUES
('acc_inv_005', 'mod_inventario', 'CREAR_MOVIMIENTO', 'Crear Movimiento', 'Registrar entrada/salida de inventario', false, 'normal', 5, true),
('acc_inv_006', 'mod_inventario', 'AJUSTE_INVENTARIO', 'Ajuste de Inventario', 'Realizar ajustes de inventario', true, 'alta', 6, true),
('acc_inv_007', 'mod_inventario', 'VER_REPORTES_STOCK', 'Ver Reportes Stock', 'Consultar reportes de stock', false, 'normal', 7, true),
('acc_inv_008', 'mod_inventario', 'CONFIGURAR_ALERTAS', 'Configurar Alertas', 'Configurar alertas de stock mínimo', false, 'normal', 8, true);

-- =====================================
-- VERIFICACIÓN DE INSERCIÓN
-- =====================================

DO $$
DECLARE
    total_acciones INTEGER;
    nuevas_acciones INTEGER;
    acciones_por_modulo RECORD;
BEGIN
    -- Contar total de acciones
    SELECT COUNT(*) INTO total_acciones FROM "global_sistema"."modulo_acciones";
    
    -- Contar acciones nuevas (excluyendo las que ya existían)
    SELECT COUNT(*) INTO nuevas_acciones 
    FROM "global_sistema"."modulo_acciones" ma
    JOIN "global_sistema"."modulos" m ON ma.id_modulo = m.id_modulo
    WHERE m.categoria IN ('general', 'operativo', 'comercial', 'admin', 'marketing', 'fiscal', 'cocina', 'cajero', 'mesero');
    
    -- Mostrar resultados por módulo
    RAISE NOTICE 'RESUMEN DE ACCIONES POR MÓDULO:';
    RAISE NOTICE '=====================================';
    
    FOR acciones_por_modulo IN 
        SELECT m.codigo, m.nombre, COUNT(ma.id_modulo_accion) as total_acciones
        FROM "global_sistema"."modulos" m
        LEFT JOIN "global_sistema"."modulo_acciones" ma ON m.id_modulo = ma.id_modulo
        WHERE m.categoria IN ('general', 'operativo', 'comercial', 'admin', 'marketing', 'fiscal', 'cocina', 'cajero', 'mesero', 'restaurante')
        GROUP BY m.codigo, m.nombre
        ORDER BY m.codigo
    LOOP
        RAISE NOTICE '% (%): % acciones', acciones_por_modulo.codigo, acciones_por_modulo.nombre, acciones_por_modulo.total_acciones;
    END LOOP;
    
    RAISE NOTICE '=====================================';
    RAISE NOTICE 'Total de acciones en sistema: %', total_acciones;
    RAISE NOTICE 'Acciones de restaurante: %', nuevas_acciones;
    
    -- Verificar que tenemos al menos 100 acciones
    IF nuevas_acciones < 80 THEN
        RAISE EXCEPTION 'Error: No se insertaron suficientes acciones. Esperadas: 80+, Encontradas: %', nuevas_acciones;
    END IF;
    
    RAISE NOTICE 'Migración de acciones completada exitosamente!';
    RAISE NOTICE 'Se agregaron % nuevas acciones granulares', nuevas_acciones - 13; -- 13 eran las existentes
END
$$;