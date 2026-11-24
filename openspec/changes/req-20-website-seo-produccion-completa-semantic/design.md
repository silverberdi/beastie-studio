# Design

## Context

Consulta `proposal.md` para la motivación y `specs/website-seo-semantic-publication/spec.md` para el contrato observable. El repositorio ya tiene Astro SSG, un `BaseLayout`, datos de juegos, colección Markdown de noticias, generación de sitemap posterior al build y tests de Node/browser. El árbol activo contiene los heroes y capturas V5 versionados; la ejecución debe integrar #20 sobre #19 sin reimplementar su composición visual. `PUBLIC_SITE_URL`, `public/CNAME`, los manifiestos de marca y las URLs de apoyo/juego siguen sujetos a verificación humana según `docs/DECISIONS.md` y `docs/PUBLICATION.md`.

## Goals / Non-Goals

**Goals:**

- Mantener un único contrato de metadatos reutilizable en el layout, parametrizado por página y capaz de representar rutas de juego y artículos.
- Derivar canonical, Open Graph, Twitter, breadcrumbs y JSON-LD del mismo modelo de ruta, contenido y media que se muestra en HTML.
- Cubrir todas las rutas estáticas generadas y producir una auditoría scriptable de `dist/`, enlaces, imágenes, indexación, semántica y rendimiento medido.
- Conservar la salida estática, la identidad visual aprobada, las capturas reales y el comportamiento accesible de #19, incluyendo reduced motion.
- Dejar claras las dependencias humanas y un rollback sencillo mediante revert del PR antes de merge.

**Non-Goals:**

- No crear backend, CMS, analytics, framework SEO, base de datos, runtime de servidor ni pipeline de pago.
- No rediseñar heroes, carrusel, layout editorial, logo o favicon, ni modificar Múltiplo/Boxio.
- No inventar autores, fechas, ratings, premios, precios, sameAs, assets, URLs de apoyo o claims de producto.
- No desplegar, publicar, abrir PR o hacer merge desde este cambio.

## Decisions

### 1. Extender el layout existente como fuente única de metadata

`BaseLayout.astro` seguirá siendo el punto de composición para `title`, `description`, `canonical`, robots, OG/Twitter, iconos y JSON-LD. Las páginas pasarán datos explícitos y el layout resolverá URLs con `Astro.site`/`PUBLIC_SITE_URL`, evitando metas duplicadas en cada página.

Alternativa descartada: introducir una librería SEO o varios layouts por tipo de página; añade dependencias y facilita divergencias entre rutas.

### 2. Separar modelos de ruta, media y schema de la presentación

Se usará una pequeña representación serializable de metadata (ruta, tipo, imagen, breadcrumb, entidad opcional) y funciones puras para omitir campos desconocidos. `games.js` y la colección de contenido continuarán siendo las fuentes de verdad; los componentes visuales consumirán esos mismos datos para evitar discrepancias entre HTML, OG y JSON-LD.

Alternativa descartada: escribir JSON-LD y alt manualmente en cada página; duplica datos y permite publicar nombres, URLs o imágenes incongruentes.

### 3. Fallo seguro de dominio y generación de indexación

La configuración aceptará únicamente un `PUBLIC_SITE_URL` HTTPS normalizado y compatible con `public/CNAME`. El build destinado a publicación validará que pueda producir canonical, OG y sitemap reales; el modo local no fabricará dominio. robots/sitemap se construirán desde las rutas públicas efectivamente generadas, excluyendo variantes técnicas y páginas no publicables.

Alternativa descartada: usar un dominio por defecto o `localhost`; haría que una salida aparentemente verde publicara URLs falsas.

### 4. Auditoría externa y determinista del output

Se ampliarán los checks existentes con un auditor que recorra `dist/` y un servidor estático para comprobar HTML, rutas, enlaces internos, assets, metas, JSON-LD, robots/sitemap y duplicados. `tests/browser-smoke.mjs` seguirá siendo el ejecutor de navegador para viewport, menú, reduced motion, foco, carrusel y enlaces; no se pedirá esa navegación al operador.

Alternativa descartada: validación solo por grep de fuentes o revisión humana; no prueba lo que realmente se sirve.

### 5. Limpieza con allowlist de producto activo

La limpieza se limitará a `src/`, `public/`, configuración y `dist/` generado. Antes de retirar cualquier señal se distinguirán textos reales de interfaz (incluida «Demostración inicial») de copy de prototipo. `docs/`, tests, historial y referencias no son output público y no se modificarán.

### 6. Evidencia y límites de entrega

La matriz final será un artefacto de verificación del Change, con resultados de `npm run test`, `npm run test:browser`, `npm run build`, auditoría HTML/JSON-LD y mediciones móviles disponibles. Las decisiones físicas/humanas (dominio, assets pendientes, hosting, revisión editorial, PR/merge/deploy) se registrarán como pendientes, no como checks automatizables.

## Risks / Trade-offs

- [El dominio o CNAME no coincide] → validar ambos antes de generar indexación y marcar el build como pendiente en vez de emitir URLs falsas.
- [La integración de #19 cambia nombres o rutas de assets] → leer `games.js` y el inventario local en Apply/Verify, comprobar HTTP 200 y actualizar el plan mediante OpenSpec si el contrato cambia.
- [Metadatos manuales quedan duplicados] → auditar head final por ruta y retirar solo duplicaciones demostradas dentro del mismo Change.
- [Un artículo carece de fecha/autor] → omitir propiedades de schema y conservarlo como contenido editorial, no como noticia fechada.
- [El auditor confunde lenguaje de juego con copy de desarrollo] → usar allowlist/contexto y revisión de la fuente de cada hallazgo; no borrar capturas ni textos reales.
- [Métricas de rendimiento varían por entorno] → reportar medición reproducible con viewport y herramienta concretos, sin prometer una puntuación fija.

## Migration Plan

1. En Apply, inspeccionar el árbol integrado y mapear rutas, fuentes de metadata, assets y consumidores antes de editar.
2. Implementar el contrato en layout/configuración/datos y adaptar páginas sin reabrir diseño visual; generar robots/sitemap desde rutas reales.
3. Migrar consumidores de metadata duplicada y retirar únicamente código superseded con evidencia; conservar una reversión limpia del commit/PR.
4. Ejecutar tests, build, auditoría de `dist/` y checks de navegador configurados; producir la matriz de rutas y registrar pendientes humanos.
5. Entregar para PR y revisión humana. Rollback: revertir el PR antes del merge; no hay migraciones durables, despliegue ni cobros en este Change.

