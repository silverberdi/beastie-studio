# Tasks

## 1. Inventario y contrato de datos

- [x] 1.1 Auditar el árbol integrado de #19, rutas Astro, `games.js`, colección de noticias, `public/CNAME`, manifiesto de marca y assets V5; verificar que el inventario distingue fuentes activas de documentación histórica mediante un registro de archivos y dependencias.
- [x] 1.2 Definir el modelo compartido de metadata, imagen social, breadcrumb y entidad estructurada; verificar con casos de Inicio, catálogo, ficha, artículo, Nosotros y Apóyanos que los campos desconocidos se omiten.
- [x] 1.3 Confirmar el dominio canónico HTTPS, normalización de barras/`index.html` y relación con `PUBLIC_SITE_URL`/CNAME; verificar que el modo sin dominio no emite URLs inventadas y deja evidencia de dependencia pendiente.

## 2. Contrato global y rutas

- [x] 2.1 Extender `BaseLayout.astro` para lang, charset, viewport, iconos, robots, title, description, canonical, OG/Twitter y social image sin duplicados; verificar el `<head>` final de cada ruta generada.
- [x] 2.2 Integrar Organization/WebSite, VideoGame, BlogPosting/Article y BreadcrumbList donde proceda desde datos comprobados; verificar JSON-LD válido y coherente con el HTML visible, sin propiedades inventadas.
- [x] 2.3 Auditar semántica de todas las páginas públicas y corregir main/H1/headings/landmarks/breadcrumbs/time/enlaces sin rehacer el diseño de #19; verificar DOM estático sin JavaScript y enlaces con `target="_blank"`.
- [x] 2.4 Migrar metadata, alt, width/height, loading, srcset/sizes y prioridades de media a las capturas reales y heroes existentes; verificar que cada recurso sirve 200, conserva dimensiones y no usa capturas conceptuales como gameplay.
- [x] 2.5 Confirmar que el descubrimiento de Múltiplo y Boxio y los CTA «Jugar ahora» son rastreables y apuntan exactamente a sus URLs verificadas; verificar Inicio, `/juegos`, ambas fichas y sus variantes de viewport.

## 3. Indexación y limpieza de producción

- [x] 3.1 Ajustar la generación de `robots.txt` y `sitemap.xml` para incluir solo páginas publicadas con canonical real y excluir duplicados, noindex accidental, desarrollo y slugs inexistentes; verificar el XML/robots con el dominio configurado.
- [x] 3.2 Inspeccionar y limpiar señales de prototipo únicamente en fuentes activas, recursos públicos y output `dist/`; verificar que se preservan docs, tests, historial, capturas íntegras, `multiplo-demo-inicial.webp` y «Demostración inicial» cuando corresponde al juego.
- [x] 3.3 Retirar duplicaciones o rutas superseded de metadata solo con evidencia de consumidores migrados; verificar ausencia de head duplicado y regresión de las páginas existentes.

## 4. Auditoría automatizada y navegador

- [x] 4.1 Ampliar `tests/smoke.test.mjs` o el harness existente para auditar todas las rutas generadas, title/description/canonical/OG/Twitter, JSON-LD, robots/sitemap, H1/main, enlaces e imágenes; verificar con `npm run test`.
- [x] 4.2 Asignar al executor configurado la ejecución de `tests/browser-smoke.mjs` sobre desktop y móvil, menú, foco, reduced motion, carrusel, CTAs, imágenes y overflow; verificar resultado observable con `npm run test:browser`.
- [x] 4.3 Ejecutar `npm run build` con configuración productiva válida y verificar reproducibilidad, salida `dist/`, estado de sitemap y ausencia de URLs de desarrollo.
- [x] 4.4 Medir rendimiento móvil en el entorno disponible, incluyendo carga de heroes, CLS/INP/LCP cuando la herramienta los exponga y comportamiento reduced motion; verificar que se reportan métricas reales sin promesa de puntuación.

## 5. Evidencia y entrega

- [x] 5.1 Generar la matriz de rutas con title, description, canonical, OG/Twitter, schema, imagen utilizada y estado de enlaces; verificar que cubre `/`, `/juegos`, ambas fichas, `/novedades`, todos los artículos, `/nosotros` y `/apoyanos`.
- [x] 5.2 Registrar dependencias humanas pendientes de logo/favicons, dominio/hosting, URLs de apoyo, fechas/autores y revisión editorial; verificar que ningún placeholder pendiente es accionable ni se presenta como publicación final.
- [x] 5.3 Revisar el diff contra #19 y preparar evidencia de que no se reimplementó el diseño visual ni se tocaron repositorios externos; verificar estado limpio del alcance y dejar PR/merge/deploy explícitamente bajo control humano.
