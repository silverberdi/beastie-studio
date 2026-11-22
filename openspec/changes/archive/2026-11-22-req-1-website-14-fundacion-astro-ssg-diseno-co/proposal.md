# Proposal

## Why

El repositorio contiene el contrato de producto y diseño de Beastie Studio, pero aún necesita una base Astro SSG reproducible para convertirlo en un sitio navegable sin introducir backend, CMS ni runtime de servidor. Este cambio establece la fundación compartida para que los incrementos posteriores puedan añadir catálogo, novedades y apoyo sin duplicar navegación ni incumplir accesibilidad, identidad visual o las dependencias de assets aprobados.

## What Changes

- Crear la estructura mínima de un proyecto Astro con salida estática, comandos reproducibles de instalación y build, y sin servidor, CMS, base de datos, autenticación, analítica ni cobros reales.
- Crear un layout global reutilizable con header, navegación desktop y móvil, estados activo y de foco, footer con «Juegos hechos con cariño.» y enlaces a Inicio, Juegos, Novedades, Nosotros y Apóyanos.
- Crear placeholders explícitos y sustituibles para las rutas iniciales, incluida `/apoyanos`, sin inventar contenido final, URLs, fechas, disponibilidad de juegos ni datos de pago.
- Integrar el botón flotante «¡Apóyanos!» y el enlace equivalente del footer hacia `/apoyanos`, cuidando que el botón no cubra acciones en viewport móvil.
- Definir tokens y estilos del sistema «Warm Editorial Arcade» a partir de `docs/DESIGN.md` y únicamente de las referencias locales declaradas, documentando las diferencias puntuales frente a la referencia visual cuando corresponda.
- Integrar solamente los binarios de marca aprobados en `docs/design/BRAND_ASSETS.md`, verificando su existencia, tamaños y SHA-256 completo contra `public/assets/brand/manifest.json`; no redibujar, sustituir ni modificar el logo o favicon.
- Preparar comprobaciones reproducibles de build, rutas, navegación móvil/desktop, teclado, foco, contraste, ausencia de overflow horizontal y enlaces internos mediante un ejecutor de navegador real donde corresponda.
- Mantener fuera de alcance las páginas finales de contenido, artículos definitivos, donaciones accionables, analítica, cookies de seguimiento, despliegue y cualquier cambio en los repositorios Múltiplo o Boxio.

## Capabilities

### New Capabilities

- `website-foundation`: Proyecto Astro SSG estático con layout global, navegación accesible, rutas placeholder, apoyo no accionable, identidad visual local y verificaciones de build/UI.

### Modified Capabilities

- Ninguna; no existen especificaciones OpenSpec previas en este repositorio.

## Impact

- Afectará la configuración y estructura inicial del sitio (`src/`, `public/`, `tests/` y manifiestos de paquetes) y añadirá la especificación de la capacidad `website-foundation`.
- Consumirá únicamente `docs/PRODUCT.md`, `docs/DESIGN.md`, `docs/CONTENT.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/design/BRAND_ASSETS.md` y las referencias locales enumeradas en `docs/design/references/README.md`.
- La integración depende de que los binarios de marca descritos en `BRAND_ASSETS.md` estén presentes y de ejecutar la verificación SHA-256 completa; cualquier ausencia debe permanecer visible como dependencia y placeholder.
- No modifica APIs externas ni crea servicios. La publicación, el merge del PR y la activación de canales de apoyo permanecen bajo control humano.
