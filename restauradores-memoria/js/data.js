// Contenido de DEMOSTRACIÓN. Todo registro con demo:true es ficticio y está pendiente de verificar.
// Reemplazar por datos oficiales del colegio o por una API conectada a PostgreSQL.
const D = true;
const PEND = 'Por verificar';
export const DATA = {
  objetos: [
    { nombre: 'Objeto de ejemplo 1', categoria: 'Documentos', descripcion: 'Ficha de prueba para el catálogo.', contexto: PEND, procedencia: PEND, creditos: 'Por incorporar', demo: D },
    { nombre: 'Objeto de ejemplo 2', categoria: 'Fotografías', descripcion: 'Segunda ficha para probar búsqueda y filtros.', contexto: PEND, procedencia: PEND, creditos: 'Por incorporar', demo: D }
  ],
  salidas: [
    { titulo: 'Salida pedagógica de ejemplo', categoria: 'Patrimonio', descripcion: 'Registro ficticio que muestra cómo se verá una salida.', fecha: null, lugar: null, evidencias: 'Por incorporar', demo: D }
  ],
  fechas: [
    { titulo: 'Fecha conmemorativa de ejemplo', categoria: 'Institucional', descripcion: 'No es una efeméride real del colegio.', fecha: null, demo: D }
  ],
  eventos: [
    { titulo: 'Visita guiada de ejemplo', estado: 'Próximo', descripcion: 'Evento ficticio para probar el filtro por estado.', inicio: null, lugar: null, demo: D },
    { titulo: 'Jornada de archivo de ejemplo', estado: 'Realizado', descripcion: 'Evento ficticio ya realizado.', inicio: null, lugar: null, demo: D }
  ],
  reconocimientos: [
    { titulo: 'Reconocimiento de ejemplo', descripcion: 'No corresponde a un logro real.', fecha: null, entidad: null, evidencia: 'Por incorporar', demo: D }
  ],
  aliados: [
    { nombre: 'Institución aliada de ejemplo', descripcion: 'No existe una alianza real con esta entidad.', web: null, logo: 'No autorizado aún', demo: D }
  ],
  galeria: [
    { titulo: 'Fotografía de ejemplo 1', categoria: 'Fotografías', alt: 'Marcador de posición para una fotografía institucional pendiente', demo: D },
    { titulo: 'Material documental de ejemplo', categoria: 'Documentos', alt: 'Marcador de posición para un documento pendiente', demo: D }
  ]
};
