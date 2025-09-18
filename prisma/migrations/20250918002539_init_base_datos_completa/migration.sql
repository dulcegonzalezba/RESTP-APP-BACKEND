-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "global_sistema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "rest_test";

-- CreateEnum
CREATE TYPE "global_sistema"."TipoEmpresa" AS ENUM ('municipal', 'restaurante', 'retail');

-- CreateEnum
CREATE TYPE "global_sistema"."TipoHorario" AS ENUM ('administrativo', 'operativo', 'gerencial', 'turno_rotativo');

-- CreateEnum
CREATE TYPE "global_sistema"."AplicaTipo" AS ENUM ('municipal', 'restaurante', 'ambos');

-- CreateEnum
CREATE TYPE "global_sistema"."NivelCriticidad" AS ENUM ('baja', 'normal', 'alta', 'critica');

-- CreateEnum
CREATE TYPE "rest_test"."TipoOperacion" AS ENUM ('INSERT', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "rest_test"."EstadoSincronizacion" AS ENUM ('pendiente', 'procesando', 'completado', 'error');

-- CreateTable
CREATE TABLE "global_sistema"."empresas" (
    "id_empresa" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,
    "tipo" "global_sistema"."TipoEmpresa" NOT NULL,
    "configuracion" JSONB NOT NULL DEFAULT '{}',
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "global_sistema"."horarios" (
    "id_horario" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(200),
    "horario_semanal" JSONB NOT NULL,
    "tipo_horario" "global_sistema"."TipoHorario",
    "aplica_a_tipo" "global_sistema"."AplicaTipo",
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id_horario")
);

-- CreateTable
CREATE TABLE "global_sistema"."modulos" (
    "id_modulo" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(200),
    "icono" VARCHAR(50),
    "categoria" VARCHAR(50),
    "orden_visualizacion" INTEGER NOT NULL DEFAULT 1,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "modulos_pkey" PRIMARY KEY ("id_modulo")
);

-- CreateTable
CREATE TABLE "global_sistema"."modulo_acciones" (
    "id_modulo_accion" VARCHAR(26) NOT NULL,
    "id_modulo" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(200),
    "requiere_autorizacion" BOOLEAN NOT NULL DEFAULT false,
    "nivel_criticidad" "global_sistema"."NivelCriticidad" NOT NULL DEFAULT 'normal',
    "orden_visualizacion" INTEGER NOT NULL DEFAULT 1,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "modulo_acciones_pkey" PRIMARY KEY ("id_modulo_accion")
);

-- CreateTable
CREATE TABLE "global_sistema"."planes" (
    "id_plan" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(200),
    "precio" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "tipo_organizacion" VARCHAR(30),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "planes_pkey" PRIMARY KEY ("id_plan")
);

-- CreateTable
CREATE TABLE "global_sistema"."plan_modulos" (
    "id_plan_modulo" VARCHAR(26) NOT NULL,
    "id_plan" VARCHAR(26) NOT NULL,
    "id_modulo" VARCHAR(26) NOT NULL,
    "incluido" BOOLEAN NOT NULL DEFAULT true,
    "limitaciones" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "plan_modulos_pkey" PRIMARY KEY ("id_plan_modulo")
);

-- CreateTable
CREATE TABLE "global_sistema"."empresa_subscripciones" (
    "id_subscripcion" VARCHAR(26) NOT NULL,
    "id_empresa" VARCHAR(26) NOT NULL,
    "id_plan" VARCHAR(26) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_vencimiento" DATE,
    "configuracion_especial" JSONB NOT NULL DEFAULT '{}',
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "empresa_subscripciones_pkey" PRIMARY KEY ("id_subscripcion")
);

-- CreateTable
CREATE TABLE "global_sistema"."licencias" (
    "id_licencia" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(200),
    "precio" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "limitaciones_globales" JSONB NOT NULL DEFAULT '{}',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "licencias_pkey" PRIMARY KEY ("id_licencia")
);

-- CreateTable
CREATE TABLE "global_sistema"."licencia_modulos" (
    "id_licencia_modulo" VARCHAR(26) NOT NULL,
    "id_licencia" VARCHAR(26) NOT NULL,
    "id_modulo" VARCHAR(26) NOT NULL,
    "incluido" BOOLEAN NOT NULL DEFAULT true,
    "limitaciones" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "licencia_modulos_pkey" PRIMARY KEY ("id_licencia_modulo")
);

-- CreateTable
CREATE TABLE "rest_test"."usuarios" (
    "id_usuario" VARCHAR(26) NOT NULL,
    "id_empresa" VARCHAR(26) NOT NULL,
    "numero_empleado" VARCHAR(20),
    "nombre_usuario" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido_paterno" VARCHAR(100) NOT NULL,
    "apellido_materno" VARCHAR(100),
    "fecha_nacimiento" DATE,
    "telefono" VARCHAR(15),
    "sucursal" VARCHAR(50) NOT NULL,
    "area" VARCHAR(50),
    "puesto" VARCHAR(100),
    "nivel" VARCHAR(20),
    "fecha_ingreso" DATE,
    "id_horario_base" VARCHAR(26) NOT NULL,
    "id_rol_por_defecto" VARCHAR(26),
    "turnos_disponibles" JSONB NOT NULL DEFAULT '[]',
    "acceso_efectivo" BOOLEAN NOT NULL DEFAULT false,
    "nivel_acceso_caja" INTEGER NOT NULL DEFAULT 0,
    "certificaciones" JSONB NOT NULL DEFAULT '{}',
    "version" BIGINT NOT NULL DEFAULT 1,
    "ultima_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sincronizado" BOOLEAN NOT NULL DEFAULT true,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "rest_test"."roles" (
    "id_rol" VARCHAR(26) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(200),
    "categoria" VARCHAR(50),
    "area" VARCHAR(50),
    "nivel" VARCHAR(20),
    "prioridad_orden" INTEGER NOT NULL DEFAULT 1,
    "es_rol_principal" BOOLEAN NOT NULL DEFAULT false,
    "puede_ser_por_defecto" BOOLEAN NOT NULL DEFAULT true,
    "acceso_efectivo" BOOLEAN NOT NULL DEFAULT false,
    "limite_descuento" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "puede_abrir_caja" BOOLEAN NOT NULL DEFAULT false,
    "puede_cortes_parciales" BOOLEAN NOT NULL DEFAULT false,
    "puede_cortes_final" BOOLEAN NOT NULL DEFAULT false,
    "sucursales_permitidas" JSONB NOT NULL DEFAULT '[]',
    "turnos_permitidos" JSONB NOT NULL DEFAULT '[]',
    "version" BIGINT NOT NULL DEFAULT 1,
    "ultima_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sincronizado" BOOLEAN NOT NULL DEFAULT true,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "rest_test"."usuario_roles" (
    "id_usuario_rol" VARCHAR(26) NOT NULL,
    "id_usuario" VARCHAR(26) NOT NULL,
    "id_rol" VARCHAR(26) NOT NULL,
    "prioridad_usuario" INTEGER NOT NULL DEFAULT 1,
    "es_rol_principal" BOOLEAN NOT NULL DEFAULT false,
    "sucursal_especifica" VARCHAR(50),
    "area_especifica" VARCHAR(50),
    "estacion_trabajo" VARCHAR(50),
    "turnos_asignados" JSONB NOT NULL DEFAULT '[]',
    "id_horario_especifico" VARCHAR(26),
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE,
    "limites_personalizados" JSONB NOT NULL DEFAULT '{}',
    "terminales_asignadas" JSONB NOT NULL DEFAULT '[]',
    "version" BIGINT NOT NULL DEFAULT 1,
    "ultima_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sincronizado" BOOLEAN NOT NULL DEFAULT true,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_asignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorizado_por" VARCHAR(26),

    CONSTRAINT "usuario_roles_pkey" PRIMARY KEY ("id_usuario_rol")
);

-- CreateTable
CREATE TABLE "rest_test"."permisos" (
    "id_permiso" VARCHAR(26) NOT NULL,
    "id_rol" VARCHAR(26) NOT NULL,
    "id_modulo_accion" VARCHAR(26) NOT NULL,
    "permitido" BOOLEAN NOT NULL DEFAULT true,
    "limitacion_monetaria" DECIMAL(10,2),
    "limitacion_horario" JSONB NOT NULL DEFAULT '{}',
    "limitacion_turno" JSONB NOT NULL DEFAULT '{}',
    "limitacion_sucursal" JSONB NOT NULL DEFAULT '{}',
    "limitacion_terminal" JSONB NOT NULL DEFAULT '{}',
    "requiere_autorizacion" BOOLEAN NOT NULL DEFAULT false,
    "requiere_caja" BOOLEAN NOT NULL DEFAULT false,
    "requiere_turno_activo" BOOLEAN NOT NULL DEFAULT false,
    "version" BIGINT NOT NULL DEFAULT 1,
    "ultima_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sincronizado" BOOLEAN NOT NULL DEFAULT true,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permisos_pkey" PRIMARY KEY ("id_permiso")
);

-- CreateTable
CREATE TABLE "rest_test"."sesiones" (
    "id_sesion" VARCHAR(26) NOT NULL,
    "id_usuario" VARCHAR(26) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "id_rol_activo" VARCHAR(26),
    "roles_disponibles" JSONB NOT NULL DEFAULT '[]',
    "contexto_actual" JSONB NOT NULL DEFAULT '{}',
    "sucursal_actual" VARCHAR(50),
    "turno_actual" VARCHAR(20),
    "terminal_asignada" VARCHAR(50),
    "caja_abierta" BOOLEAN NOT NULL DEFAULT false,
    "inicio_automatico" BOOLEAN NOT NULL DEFAULT true,
    "modo_offline" BOOLEAN NOT NULL DEFAULT false,
    "ultima_sincronizacion" TIMESTAMP(3),
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_expira" TIMESTAMP(3),
    "fecha_ultima_actividad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sesiones_pkey" PRIMARY KEY ("id_sesion")
);

-- CreateTable
CREATE TABLE "rest_test"."log_actividades" (
    "id_actividad" VARCHAR(26) NOT NULL,
    "id_usuario" VARCHAR(26) NOT NULL,
    "id_sesion" VARCHAR(26),
    "id_modulo_accion" VARCHAR(26) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_rol_utilizado" VARCHAR(26),
    "sucursal" VARCHAR(50),
    "turno" VARCHAR(20),
    "terminal" VARCHAR(50),
    "numero_ticket" VARCHAR(50),
    "numero_mesa" VARCHAR(10),
    "monto_transaccion" DECIMAL(10,2),
    "metodo_pago" VARCHAR(30),
    "resultado" VARCHAR(20) NOT NULL DEFAULT 'exitoso',
    "version" BIGINT NOT NULL DEFAULT 1,
    "sincronizado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_actividad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_actividades_pkey" PRIMARY KEY ("id_actividad")
);

-- CreateTable
CREATE TABLE "rest_test"."cola_sincronizacion" (
    "id_cola" VARCHAR(26) NOT NULL,
    "id_usuario" VARCHAR(26),
    "tipo_operacion" "rest_test"."TipoOperacion" NOT NULL,
    "tabla" VARCHAR(100) NOT NULL,
    "id_registro" VARCHAR(26) NOT NULL,
    "datos" JSONB NOT NULL,
    "prioridad" SMALLINT NOT NULL DEFAULT 1,
    "contexto_operacion" JSONB NOT NULL DEFAULT '{}',
    "timestamp_local" BIGINT NOT NULL,
    "intentos" INTEGER NOT NULL DEFAULT 0,
    "estado" "rest_test"."EstadoSincronizacion" NOT NULL DEFAULT 'pendiente',
    "error_message" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cola_sincronizacion_pkey" PRIMARY KEY ("id_cola")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_codigo_key" ON "global_sistema"."empresas"("codigo");

-- CreateIndex
CREATE INDEX "empresas_tipo_activa_idx" ON "global_sistema"."empresas"("tipo", "activa");

-- CreateIndex
CREATE UNIQUE INDEX "horarios_codigo_key" ON "global_sistema"."horarios"("codigo");

-- CreateIndex
CREATE INDEX "horarios_codigo_idx" ON "global_sistema"."horarios"("codigo");

-- CreateIndex
CREATE INDEX "horarios_tipo_horario_aplica_a_tipo_idx" ON "global_sistema"."horarios"("tipo_horario", "aplica_a_tipo");

-- CreateIndex
CREATE UNIQUE INDEX "modulos_codigo_key" ON "global_sistema"."modulos"("codigo");

-- CreateIndex
CREATE INDEX "modulos_categoria_orden_visualizacion_idx" ON "global_sistema"."modulos"("categoria", "orden_visualizacion");

-- CreateIndex
CREATE INDEX "modulo_acciones_nivel_criticidad_idx" ON "global_sistema"."modulo_acciones"("nivel_criticidad");

-- CreateIndex
CREATE UNIQUE INDEX "modulo_acciones_id_modulo_codigo_key" ON "global_sistema"."modulo_acciones"("id_modulo", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "planes_codigo_key" ON "global_sistema"."planes"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "licencias_codigo_key" ON "global_sistema"."licencias"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "licencia_modulos_id_licencia_id_modulo_key" ON "global_sistema"."licencia_modulos"("id_licencia", "id_modulo");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_numero_empleado_key" ON "rest_test"."usuarios"("numero_empleado");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nombre_usuario_key" ON "rest_test"."usuarios"("nombre_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "rest_test"."usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_sucursal_area_nivel_idx" ON "rest_test"."usuarios"("sucursal", "area", "nivel");

-- CreateIndex
CREATE INDEX "usuarios_version_ultima_modificacion_idx" ON "rest_test"."usuarios"("version", "ultima_modificacion");

-- CreateIndex
CREATE INDEX "usuarios_id_rol_por_defecto_idx" ON "rest_test"."usuarios"("id_rol_por_defecto");

-- CreateIndex
CREATE UNIQUE INDEX "roles_codigo_key" ON "rest_test"."roles"("codigo");

-- CreateIndex
CREATE INDEX "roles_prioridad_orden_activo_idx" ON "rest_test"."roles"("prioridad_orden", "activo");

-- CreateIndex
CREATE INDEX "roles_categoria_area_nivel_idx" ON "rest_test"."roles"("categoria", "area", "nivel");

-- CreateIndex
CREATE INDEX "roles_version_ultima_modificacion_idx" ON "rest_test"."roles"("version", "ultima_modificacion");

-- CreateIndex
CREATE INDEX "usuario_roles_id_usuario_prioridad_usuario_activo_idx" ON "rest_test"."usuario_roles"("id_usuario", "prioridad_usuario", "activo");

-- CreateIndex
CREATE INDEX "usuario_roles_id_rol_sucursal_especifica_activo_idx" ON "rest_test"."usuario_roles"("id_rol", "sucursal_especifica", "activo");

-- CreateIndex
CREATE INDEX "usuario_roles_version_ultima_modificacion_idx" ON "rest_test"."usuario_roles"("version", "ultima_modificacion");

-- CreateIndex
CREATE INDEX "permisos_permitido_activo_idx" ON "rest_test"."permisos"("permitido", "activo");

-- CreateIndex
CREATE INDEX "permisos_version_ultima_modificacion_idx" ON "rest_test"."permisos"("version", "ultima_modificacion");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_id_rol_id_modulo_accion_key" ON "rest_test"."permisos"("id_rol", "id_modulo_accion");

-- CreateIndex
CREATE UNIQUE INDEX "sesiones_token_key" ON "rest_test"."sesiones"("token");

-- CreateIndex
CREATE INDEX "sesiones_id_usuario_activa_idx" ON "rest_test"."sesiones"("id_usuario", "activa");

-- CreateIndex
CREATE INDEX "sesiones_sucursal_actual_turno_actual_idx" ON "rest_test"."sesiones"("sucursal_actual", "turno_actual");

-- CreateIndex
CREATE INDEX "sesiones_modo_offline_idx" ON "rest_test"."sesiones"("modo_offline");

-- CreateIndex
CREATE INDEX "log_actividades_id_usuario_fecha_actividad_idx" ON "rest_test"."log_actividades"("id_usuario", "fecha_actividad");

-- CreateIndex
CREATE INDEX "log_actividades_numero_ticket_numero_mesa_idx" ON "rest_test"."log_actividades"("numero_ticket", "numero_mesa");

-- CreateIndex
CREATE INDEX "log_actividades_sucursal_turno_fecha_actividad_idx" ON "rest_test"."log_actividades"("sucursal", "turno", "fecha_actividad");

-- CreateIndex
CREATE INDEX "log_actividades_version_sincronizado_idx" ON "rest_test"."log_actividades"("version", "sincronizado");

-- CreateIndex
CREATE INDEX "cola_sincronizacion_estado_prioridad_fecha_creacion_idx" ON "rest_test"."cola_sincronizacion"("estado", "prioridad", "fecha_creacion");

-- CreateIndex
CREATE INDEX "cola_sincronizacion_tabla_id_registro_idx" ON "rest_test"."cola_sincronizacion"("tabla", "id_registro");

-- AddForeignKey
ALTER TABLE "global_sistema"."modulo_acciones" ADD CONSTRAINT "modulo_acciones_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "global_sistema"."modulos"("id_modulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_sistema"."plan_modulos" ADD CONSTRAINT "plan_modulos_id_plan_fkey" FOREIGN KEY ("id_plan") REFERENCES "global_sistema"."planes"("id_plan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_sistema"."plan_modulos" ADD CONSTRAINT "plan_modulos_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "global_sistema"."modulos"("id_modulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_sistema"."empresa_subscripciones" ADD CONSTRAINT "empresa_subscripciones_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "global_sistema"."empresas"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_sistema"."empresa_subscripciones" ADD CONSTRAINT "empresa_subscripciones_id_plan_fkey" FOREIGN KEY ("id_plan") REFERENCES "global_sistema"."planes"("id_plan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_sistema"."licencia_modulos" ADD CONSTRAINT "licencia_modulos_id_licencia_fkey" FOREIGN KEY ("id_licencia") REFERENCES "global_sistema"."licencias"("id_licencia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_sistema"."licencia_modulos" ADD CONSTRAINT "licencia_modulos_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "global_sistema"."modulos"("id_modulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."usuarios" ADD CONSTRAINT "usuarios_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "global_sistema"."empresas"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."usuarios" ADD CONSTRAINT "usuarios_id_horario_base_fkey" FOREIGN KEY ("id_horario_base") REFERENCES "global_sistema"."horarios"("id_horario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."usuarios" ADD CONSTRAINT "usuarios_id_rol_por_defecto_fkey" FOREIGN KEY ("id_rol_por_defecto") REFERENCES "rest_test"."roles"("id_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."usuario_roles" ADD CONSTRAINT "usuario_roles_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "rest_test"."usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."usuario_roles" ADD CONSTRAINT "usuario_roles_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rest_test"."roles"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."usuario_roles" ADD CONSTRAINT "usuario_roles_id_horario_especifico_fkey" FOREIGN KEY ("id_horario_especifico") REFERENCES "global_sistema"."horarios"("id_horario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."usuario_roles" ADD CONSTRAINT "usuario_roles_autorizado_por_fkey" FOREIGN KEY ("autorizado_por") REFERENCES "rest_test"."usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."permisos" ADD CONSTRAINT "permisos_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rest_test"."roles"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."permisos" ADD CONSTRAINT "permisos_id_modulo_accion_fkey" FOREIGN KEY ("id_modulo_accion") REFERENCES "global_sistema"."modulo_acciones"("id_modulo_accion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."sesiones" ADD CONSTRAINT "sesiones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "rest_test"."usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."sesiones" ADD CONSTRAINT "sesiones_id_rol_activo_fkey" FOREIGN KEY ("id_rol_activo") REFERENCES "rest_test"."roles"("id_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."log_actividades" ADD CONSTRAINT "log_actividades_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "rest_test"."usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."log_actividades" ADD CONSTRAINT "log_actividades_id_sesion_fkey" FOREIGN KEY ("id_sesion") REFERENCES "rest_test"."sesiones"("id_sesion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."log_actividades" ADD CONSTRAINT "log_actividades_id_modulo_accion_fkey" FOREIGN KEY ("id_modulo_accion") REFERENCES "global_sistema"."modulo_acciones"("id_modulo_accion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."log_actividades" ADD CONSTRAINT "log_actividades_id_rol_utilizado_fkey" FOREIGN KEY ("id_rol_utilizado") REFERENCES "rest_test"."roles"("id_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_test"."cola_sincronizacion" ADD CONSTRAINT "cola_sincronizacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "rest_test"."usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;
