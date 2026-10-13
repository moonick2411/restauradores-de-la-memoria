-- Datos de prueba FICTICIOS. No representan hechos reales del colegio.
INSERT INTO eventos (titulo, descripcion, estado) VALUES ('Visita guiada de ejemplo','Evento ficticio','Próximo');
INSERT INTO actividades (id_evento, titulo, categoria) VALUES (1,'Salida pedagógica de ejemplo','Patrimonio');
INSERT INTO evidencias (id_actividad, titulo, tipo_archivo, ruta) VALUES (1,'Evidencia de ejemplo','imagen/jpeg','assets/images/pendiente.jpg');
INSERT INTO objetos_museo (nombre, descripcion) VALUES ('Objeto de ejemplo 1','Ficha ficticia');
INSERT INTO exposiciones (titulo) VALUES ('Exposición de ejemplo');
INSERT INTO exposicion_objetos VALUES (1,1);
INSERT INTO aliados (nombre) VALUES ('Institución aliada de ejemplo');
