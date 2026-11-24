# Proposal

## Why

El resultado integrado del sitio necesita un contrato SEO, semántico y de publicación verificable antes de presentarse para revisión humana. Hoy los metadatos, canonical, datos estructurados, sitemap, accesibilidad HTML y señales de prototipo no están definidos como una auditoría única para todas las rutas públicas; resolverlo ahora permite publicar el trabajo de #19 sin rehacer su diseño ni inventar datos pendientes.

## What Changes

- Consolidar el layout SEO reutilizable para todas las rutas Astro generadas: idioma, metadatos únicos, canonical absoluto normalizado, Open Graph/Twitter, iconografía, robots y alt de medios.
- Auditar y completar la semántica estática de Inicio, catálogo, fichas, Novedades, artículos, Nosotros y Apóyanos: un `main`, H1 visible, jerarquía de headings, landmarks, breadcrumbs, `time` cuando corresponda y enlaces rastreables sin depender de JavaScript.
- Generar JSON-LD coherente con el contenido visible usando únicamente datos verificables: Organization, WebSite, BreadcrumbList, VideoGame y BlogPosting/Article donde proceda, omitiendo campos desconocidos.
- Generar `robots.txt` y `sitemap.xml` solo con páginas publicadas y el dominio HTTPS canónico configurado; normalizar barras e `index.html` y fallar de forma segura si un build productivo no puede asegurar el dominio.
- Usar los datos definitivos de juegos y las capturas reales entregadas por #19 para metadatos, schema, enlaces, alt y tarjetas; conservar `multiplo-demo-inicial.webp` íntegra y no tocar assets de diseño históricos.
- Limpiar copy, comentarios, URLs, placeholders y señales de desarrollo únicamente en fuentes activas y `dist/`, preservando documentación, tests, historial y la palabra real «Demostración inicial» cuando pertenece a la interfaz del juego.
- Añadir una matriz de rutas y comprobaciones reproducibles de build, HTML servido, enlaces, imágenes, sitemap, JSON-LD, accesibilidad y rendimiento medido; asignar las comprobaciones de navegador al ejecutor configurado.
- Mantener Astro SSG, componentes simples y sin backend, CMS, analytics, framework SEO ni canales de pago nuevos. No desplegar, abrir PR ni hacer merge automáticamente.

## Capabilities

### New Capabilities

- `website-seo-semantic-publication`: contrato transversal de metadatos, canonical, JSON-LD, indexación, semántica, accesibilidad HTML, media y evidencia de publicación para todas las rutas públicas.

### Modified Capabilities

Ninguna. Las capacidades existentes conservan sus requisitos; este cambio añade el contrato transversal de SEO, semántica y publicación que sus rutas consumen.

## Impact

- Fuentes Astro activas, `src/layouts/BaseLayout.astro`, páginas públicas, `src/data/games.js`, colección de noticias, assets públicos, configuración Astro y generación de robots/sitemap.
- Se modificarán únicamente los artefactos activos necesarios para el contrato SEO; no se tocarán los repositorios Múltiplo o Boxio ni las referencias históricas de `docs/design/references/`.
- Las URLs públicas de juego, logo/favicons, destinos de apoyo, dominio/hosting y cualquier fecha o autor no verificados permanecen como dependencias humanas; no se fabrican.
- La validación usará `npm run test`, `npm run test:browser`, `npm run build` y un navegador real disponible, con resultados observables. La publicación final seguirá sujeta a PR, merge y revisión humana.
