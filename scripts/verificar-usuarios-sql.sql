-- Verificar usuarios con múltiples roles creados por la migración
SELECT 
    u.usuario,
    u.nombre,
    u.apellido,
    u.email,
    u.estado,
    COUNT(ur.id) as total_roles
FROM global_sistema.usuario u
LEFT JOIN global_sistema.usuario_rol ur ON u.id = ur.id_usuario
WHERE u.usuario IN ('supervisor_multi', 'empleado_polivalente', 'gerente_turno_multi', 'temporal_multi')
GROUP BY u.id, u.usuario, u.nombre, u.apellido, u.email, u.estado
ORDER BY u.usuario;

-- Detallar los roles específicos de cada usuario
SELECT 
    u.usuario,
    u.nombre,
    r.nombre as rol_nombre,
    ur.prioridad_usuario,
    ur.es_rol_principal,
    ur.fecha_inicio,
    ur.fecha_fin,
    CASE 
        WHEN ur.fecha_fin IS NULL THEN 'Permanente'
        WHEN ur.fecha_fin > NOW() THEN 'Temporal activo'
        ELSE 'Temporal vencido'
    END as tipo_asignacion
FROM global_sistema.usuario u
JOIN global_sistema.usuario_rol ur ON u.id = ur.id_usuario
JOIN global_sistema.rol r ON ur.id_rol = r.id
WHERE u.usuario IN ('supervisor_multi', 'empleado_polivalente', 'gerente_turno_multi', 'temporal_multi')
ORDER BY u.usuario, ur.prioridad_usuario;

-- Resumen general de la base de datos
SELECT 
    'Usuarios totales' as metric,
    COUNT(*) as count
FROM global_sistema.usuario
UNION ALL
SELECT 
    'Roles totales' as metric,
    COUNT(*) as count
FROM global_sistema.rol
UNION ALL
SELECT 
    'Asignaciones usuario-rol' as metric,
    COUNT(*) as count
FROM global_sistema.usuario_rol;