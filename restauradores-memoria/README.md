# Restauradores de la Memoria, Colegio Tom Adams IED (v1, primera entrega)

## Ejecutar
1. Abre la carpeta en Visual Studio Code e instala la extensión **Live Server**.
2. Clic derecho en `index.html`, opción **Open with Live Server**.
   Hace falta un servidor local porque `js/main.js` usa módulos ES (no funcionan abriendo el archivo con doble clic).
   Alternativa: `python -m http.server 8000` y abre http://localhost:8000.

## Qué funciona
Menú móvil, navegación interna, listados renderizados desde `js/data.js`, filtros, búsqueda en el catálogo, vista ampliada accesible de la galería, validación del formulario y enlace al museo.

## Limitaciones
- **Todo el contenido es de demostración** y está marcado como pendiente de verificar. No hay fotografías, logotipo, historia ni alianzas oficiales.
- Una sola página con secciones; `pages/`, `assets/` y archivos `js/` separados (navigation, gallery, etc.) se crean al crecer. Para ampliar, agrega registros en `data.js` o mueve una sección a su propia página.
- El formulario **no envía nada** (no hay backend).
- `museo/index.html` es un marcador: la escena A-Frame está pendiente.
- **No hay conexión a PostgreSQL.** El portal usa datos locales; `database/` solo documenta el esquema.

## Base de datos (PostgreSQL)
```
createdb restauradores
psql -d restauradores -f database/schema.sql
psql -d restauradores -f database/seed.sql
```

## Pendiente para la segunda entrega
Documentos oficiales del proyecto, fotografías con créditos y autorización, logotipo, guía del docente para ajustar el esquema, escena A-Frame, backend y conexión a la base de datos.
