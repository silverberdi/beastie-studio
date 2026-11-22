# Evidencia visual — req-11

Fuente única: `docs/design/references/README.md` y archivos locales enumerados allí. La auditoría no accede a Stitch.

## Matriz inicial y final

| Vista | Diferencia inicial | Implementación/captura | Resultado automatizable |
|---|---|---|---|
| Inicio desktop | Hero, catálogo, novedades, manifiesto y apoyo reducidos a texto/degradado | `desktop-home.png`, hero + secciones diferenciadas | PASS: build, rutas, imágenes y overflow |
| Inicio móvil | No existía composición específica; tarjetas sin ilustración | `mobile-home.png`, grid de una columna y CTA seguro | PASS: menú, foco, CTA y overflow |
| Juegos desktop | Tarjetas con arte textual y composición plana | `desktop-juegos.png`, ilustraciones conceptuales locales | PASS: 2 tarjetas, alt y CTAs internos |
| Nosotros desktop | Manifiesto mínimo y sin bloques de principios | contenido de manifiesto + `principles` | PASS: contenido y navegación |
| Novedades desktop | Índice sin ritmo visual/arte de tarjetas | `desktop-novedades.png`, destacado, categorías y filtros | PASS: 4 artículos, 4 filtros y retorno a Todos |
| Novedades móvil | Solo adaptación genérica | layout fluido y tarjetas apiladas | PASS: smoke móvil |
| Artículo Múltiplo desktop | Plantilla correcta pero visualmente austera | `desktop-novedades-por-que-creamos-multiplo.png`, breadcrumb/relacionados/CTA | PASS: slug, metadata y CTA |
| Apóyanos desktop | Composición genérica aunque tenía ilustración | `desktop-apoyanos.png`, hero ilustrado, canales y compartir | PASS: 5 canales pendientes, 0 enlaces falsos |
| Apóyanos móvil | Adaptación básica | composición apilada y espacio para CTA fijo | PASS: alt, foco y 0 overflow |

Todas las vistas conservan header/footer compartidos, fondo marfil, terracota/azul/verde/marfil y foco visible. Las diferencias frente a la referencia son intencionales cuando el screenshot conceptual no es un asset de gameplay, cuando faltan URLs verificadas o cuando se prioriza contenido aprobado sobre copy de la captura.

## Inventario de sustituciones

- `GameCard` y `GameDetail` eran callers del bloque `.conceptual-art` textual; ahora consumen `game.illustration` con `img` y alt contextual.
- `Placeholder.astro` queda sin callers: se conserva como componente de dependencia editorial reutilizable, pero ninguna ruta pública lo renderiza.
- Las reglas globales `.hero`, `.section-tint` y `.featured` siguen siendo variantes explícitas; no se aplicó un único degradado a todas las páginas.
- Las rutas públicas activas (`/`, `/juegos`, `/juegos/[slug]`, `/novedades`, `/novedades/[slug]`, `/nosotros`, `/apoyanos`) comparten `BaseLayout`; no hay callers muertos de rutas sustituidas.

## Assets y marca

Las tres ilustraciones conceptuales se copiaron verbatim desde `docs/design/references/` a `public/assets/illustrations/`:

- `illustration-apoyanos.png`: `99c8d4ea34521e4c59ef6d8bc1e3b423a59dc552b270858040497775827306b6`
- `illustration-boxio-concept.png`: `01ededdefe2afb5d7af2b690d24445e2a815dadc674d957244c03eb0ee563531`
- `illustration-multiplo-editorial.png`: `10bd2c9c3d0e38c4e47e53c6109d1d87f5b4d883e2a8d5d2e1a82d700fd038de`

Logo y favicon no fueron modificados; `npm run test` contrasta sus bytes y SHA-256 con `public/assets/brand/manifest.json`.

## Pendientes humanos

- Confirmar visualmente el parecido final y aprobar cualquier diferencia editorial.
- Verificar en decisión humana las URLs/destinatarios de apoyo, URLs públicas de juegos y dominio de publicación.
- PR, merge, despliegue y activación de cobros no se ejecutan automáticamente.
