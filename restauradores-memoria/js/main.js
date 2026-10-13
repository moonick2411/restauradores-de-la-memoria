import { DATA } from './data.js';
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const val = v => v ? esc(v) : '<em class="pend">Por verificar</em>';
const dl = (i, f) => `<dl>${f.map(([l, k]) => `<div><dt>${l}</dt><dd>${val(i[k])}</dd></div>`).join('')}</dl>`;
const tag = i => i.demo ? '<p class="tag">Demostración: contenido ficticio, pendiente de verificar</p>' : '';
const EMPTY = '<p class="empty" role="status">No hay registros que coincidan. Cambia el filtro o la búsqueda.</p>';

// ---- Menú móvil
const btn = $('#menu-btn'), nav = $('#nav');
btn.addEventListener('click', () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });

// ---- Listados con filtro y búsqueda, definidos por configuración
const item = (i, c) => `<article class="item">${c.photo ? `<div class="ph" role="img" aria-label="Fotografía pendiente de ${esc(i.nombre)}">Fotografía pendiente</div>` : ''}<h3>${esc(i.titulo || i.nombre)}</h3>${tag(i)}<p>${esc(i.descripcion)}</p>${dl(i, c.fields)}</article>`;
const thumb = i => `<article class="item"><button class="thumb" data-i="${DATA.galeria.indexOf(i)}" aria-label="Ampliar: ${esc(i.titulo)}"><div class="ph">${esc(i.categoria)}: foto pendiente</div><h3>${esc(i.titulo)}</h3></button>${tag(i)}</article>`;
const LISTS = [
  { box: 'catalogo', src: 'objetos', filter: ['categoria', 'Categoría'], search: true, photo: true, fields: [['Contexto', 'contexto'], ['Procedencia', 'procedencia'], ['Créditos', 'creditos']] },
  { box: 'salidas-lista', src: 'salidas', filter: ['categoria', 'Categoría'], fields: [['Fecha', 'fecha'], ['Lugar', 'lugar'], ['Evidencias', 'evidencias']] },
  { box: 'fechas-lista', src: 'fechas', filter: ['categoria', 'Categoría'], fields: [['Fecha', 'fecha']] },
  { box: 'eventos-lista', src: 'eventos', filter: ['estado', 'Estado'], fields: [['Fecha', 'inicio'], ['Ubicación', 'lugar'], ['Estado', 'estado']] },
  { box: 'reconocimientos-lista', src: 'reconocimientos', fields: [['Fecha', 'fecha'], ['Entidad', 'entidad'], ['Evidencia', 'evidencia']] },
  { box: 'alianzas-lista', src: 'aliados', fields: [['Sitio oficial', 'web'], ['Logotipo', 'logo']] },
  { box: 'galeria-lista', src: 'galeria', filter: ['categoria', 'Categoría'], render: thumb }
];
LISTS.forEach(c => {
  const el = $('#' + c.box), items = DATA[c.src] || [], ctl = [];
  if (c.filter) {
    const opts = [...new Set(items.map(i => i[c.filter[0]]).filter(Boolean))];
    ctl.push(`<label>${c.filter[1]}<select data-f><option value="">Todas</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select></label>`);
  }
  if (c.search) ctl.push('<label>Buscar en el catálogo<input type="search" data-q></label>');
  el.innerHTML = `${ctl.length ? `<div class="controls">${ctl.join('')}</div>` : ''}<div class="list" aria-live="polite"></div>`;
  const out = $('.list', el);
  const draw = () => {
    const f = $('[data-f]', el)?.value || '', q = ($('[data-q]', el)?.value || '').toLowerCase().trim();
    const r = items.filter(i => (!f || i[c.filter[0]] === f) && (!q || [i.nombre, i.descripcion, i.contexto].join(' ').toLowerCase().includes(q)));
    out.innerHTML = r.length ? r.map(i => (c.render || (x => item(x, c)))(i)).join('') : EMPTY;
  };
  el.addEventListener('input', draw);
  draw();
});

// ---- Vista ampliada accesible (dialog nativo: Esc cierra, foco atrapado)
const lb = $('#lb');
let opener = null;
$('#galeria-lista').addEventListener('click', e => {
  const b = e.target.closest('.thumb'); if (!b) return;
  const i = DATA.galeria[b.dataset.i]; opener = b;
  $('#lb-img').textContent = 'Fotografía pendiente';
  $('#lb-img').setAttribute('aria-label', i.alt);
  $('#lb-t').textContent = i.titulo + (i.demo ? ' (demostración)' : '');
  lb.showModal();
});
$('#lb-x').addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
lb.addEventListener('close', () => opener?.focus());

// ---- Validación del formulario (demostración local, sin envío)
const rules = {
  nombre: v => v.trim().length >= 2 || 'Escribe tu nombre (mínimo 2 caracteres).',
  correo: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Escribe un correo válido, por ejemplo nombre@dominio.com.',
  asunto: v => v.trim().length >= 3 || 'Escribe un asunto (mínimo 3 caracteres).',
  mensaje: v => v.trim().length >= 10 || 'Escribe un mensaje de al menos 10 caracteres.'
};
const form = $('#form'), estado = $('#estado');
form.addEventListener('submit', e => {
  e.preventDefault();
  let first = null;
  for (const [k, test] of Object.entries(rules)) {
    const f = form.elements[k], r = test(f.value);
    $('#e-' + k).textContent = r === true ? '' : r;
    f.setAttribute('aria-invalid', r !== true);
    if (r !== true && !first) first = f;
  }
  if (first) { estado.textContent = 'Revisa los campos marcados.'; first.focus(); return; }
  estado.textContent = 'Los datos son válidos. Es una demostración local: no se envió ningún mensaje porque aún no hay backend.';
  form.reset();
});
