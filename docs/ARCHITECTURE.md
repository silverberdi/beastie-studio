# Arquitectura y estrategia de entrega

## Decisión tecnológica
- Astro con salida **estática** (pre-render).
- Páginas de contenido e índice de artículos con Markdown o colecciones de contenido nativas de Astro (según la versión estable usada).
- Sin CMS, backend, base de datos, autenticación ni pasarela propia de pagos.
- CSS y componentes simples coherentes con Stitch; evitar introducir Angular/React sin requerimiento concreto.
- Hosting estático de bajo costo, proveedor no comprometido hasta validación. No desplegar por defecto.

## Límites
El website promociona y enlaza a juegos existentes; **no** comparte runtime, estado o autenticación con Múltiplo y Boxio. No asumir rutas públicas ni dominios: configurar URLs verificadas mediante datos explícitos. No crear servicios de frontend secretos para «autenticarse» contra un servidor, porque no se requiere API para la web.

## Content model
Colección de artículos: `slug`, `title`, `summary`, `category`, `body`, `heroImage` opcional, `publishedAt` solo cuando sea real. Indices y páginas estáticas construidas en build; categorías seguras y navegables; metadatos SEO y enlaces internos.

## Criterios no funcionales
- Diseño mobile-first, con breakpoints probados para teléfono, tablet y desktop.
- Semántica, teclado, foco visible, contraste, alt para imágenes y sin animaciones indispensables.
- Metadatos SEO, Open Graph y sitemap solo con URLs verificadas.
- Privacidad: sin seguimiento identificable de niños, sin cookies innecesarias.
- Optimizar imágenes, fuentes y carga; no requerir infraestructura adicional.
- Manejar enlaces externos sin generar impresiones falsas de pago disponible.
- No recoger información de menores ni integrar analítica sin una decisión expresa.

## Referencias
- Stitch: https://stitch.withgoogle.com/projects/14862419422026667342
- Múltiplo: https://github.com/silverberdi/multiplo
- Boxio: https://github.com/silverberdi/boxio

## Entrega mediante Mini Me
Los issues autorizados definen incrementos. Utilizar OpenSpec **nativo** (no simular su ciclo ni introducir scripts paralelos de gestión de cambios). Resolver dependencia de asset/logo y URLs antes de la publicación. Cada incremento: criterios de aceptación claros, pruebas proporcionales, PR, revisión y merge humano. No generar implementaciones parciales presentadas como terminadas.

## Orden propuesto
1. Base Astro y sistema compartido, navegación y assets.
2. Home + catálogo + nosotros + fichas de juegos.
3. Novedades + artículos + categorías y metadatos.
4. Apoyo + garantías UX/SEO + preparación del despliegue, **sin activar cobros o producción sin información validada**.
