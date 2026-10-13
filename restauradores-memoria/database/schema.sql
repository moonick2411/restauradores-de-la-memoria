-- Esquema PostgreSQL inicial (propuesta; ajustar a la guía del docente).
BEGIN;
CREATE TABLE visitantes (
  id_visitante   SERIAL PRIMARY KEY,
  nombre         VARCHAR(120),
  correo         VARCHAR(160) UNIQUE,
  fecha_visita   TIMESTAMPTZ NOT NULL DEFAULT now(),
  consentimiento BOOLEAN NOT NULL DEFAULT FALSE,
  CHECK ((nombre IS NULL AND correo IS NULL) OR consentimiento)  -- datos personales solo con consentimiento
);
CREATE TABLE eventos (
  id_evento    SERIAL PRIMARY KEY,
  titulo       VARCHAR(200) NOT NULL,
  descripcion  TEXT,
  fecha_inicio TIMESTAMPTZ,
  fecha_fin    TIMESTAMPTZ,
  ubicacion    VARCHAR(200),
  estado       VARCHAR(20) NOT NULL DEFAULT 'Próximo' CHECK (estado IN ('Próximo','Realizado','Cancelado')),
  CHECK (fecha_fin IS NULL OR fecha_inicio IS NULL OR fecha_fin >= fecha_inicio)
);
CREATE TABLE actividades (
  id_actividad SERIAL PRIMARY KEY,
  id_evento    INT REFERENCES eventos(id_evento) ON DELETE SET NULL,
  titulo       VARCHAR(200) NOT NULL,
  descripcion  TEXT,
  fecha        DATE,
  categoria    VARCHAR(60)
);
CREATE TABLE evidencias (
  id_evidencia SERIAL PRIMARY KEY,
  id_actividad INT REFERENCES actividades(id_actividad) ON DELETE CASCADE,
  titulo       VARCHAR(200) NOT NULL,
  tipo_archivo VARCHAR(30) NOT NULL,
  ruta         VARCHAR(300) NOT NULL,
  descripcion  TEXT,
  fecha        DATE
);
CREATE TABLE objetos_museo (
  id_objeto       SERIAL PRIMARY KEY,
  nombre          VARCHAR(200) NOT NULL,
  descripcion     TEXT,
  contexto        TEXT,
  procedencia     TEXT,
  fecha_historica DATE,          -- solo si está confirmada
  ruta_modelo3d   VARCHAR(300),
  ruta_foto       VARCHAR(300),
  creditos        VARCHAR(300)
);
CREATE TABLE exposiciones (
  id_exposicion  SERIAL PRIMARY KEY,
  titulo         VARCHAR(200) NOT NULL,
  descripcion    TEXT,
  fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
  estado         VARCHAR(20) NOT NULL DEFAULT 'Borrador' CHECK (estado IN ('Borrador','Publicada','Archivada'))
);
CREATE TABLE exposicion_objetos (   -- relación N:M
  id_exposicion INT REFERENCES exposiciones(id_exposicion) ON DELETE CASCADE,
  id_objeto     INT REFERENCES objetos_museo(id_objeto) ON DELETE CASCADE,
  PRIMARY KEY (id_exposicion, id_objeto)
);
CREATE TABLE aliados (
  id_aliado   SERIAL PRIMARY KEY,
  nombre      VARCHAR(200) NOT NULL,
  descripcion TEXT,
  sitio_web   VARCHAR(300),
  ruta_logo   VARCHAR(300)          -- solo logotipos autorizados
);
CREATE TABLE reconocimientos (
  id_reconocimiento SERIAL PRIMARY KEY,
  id_evidencia      INT REFERENCES evidencias(id_evidencia) ON DELETE SET NULL,
  titulo            VARCHAR(200) NOT NULL,
  entidad_otorgante VARCHAR(200),
  fecha             DATE,
  descripcion       TEXT
);
COMMIT;
