# Proposal

## Why

La implementación publicada de V5.4 todavía no entrega fidelidad perceptible en los puntos que definen la dirección visual: el parallax apenas se aprecia, los estados de interacción no tienen la microanimación aprobada y las capturas reales de Múltiplo y Boxio no reciben suficiente protagonismo. Este cambio corrige ese estado observable preservando el trabajo de SEO, semántica, rutas y publicación estática de #20, sin iniciar otro rediseño ni generar screenshots nuevos.

## What Changes

- Hacer perceptible el recorrido de los dos heroes V5.4 en Inicio y `/juegos`, con ilustraciones independientes, scroll natural, contenido visible y fallback estático para reduced motion y no-JS.
- Ajustar la composición y legibilidad de los titulares «Descubrir. / Pensar. / Compartir.» y «Nuestros / juegos.» según las referencias locales V5, incluido el azul de «Pensar.» y el borde marfil sobre la ilustración.
- Añadir microinteracciones verificables para CTA, navegación, tarjetas y controles del carrusel: elevación o profundidad sutil, feedback active/focus y transiciones aproximadas de 180–280 ms, respetando teclado, touch y reduced motion.
- Hacer que el carrusel de Inicio use desde la primera carga las composiciones definitivas locales de Múltiplo y Boxio, sea deslizable y sin autoplay, mantenga enlaces rastreables y pueda crecer desde `games.js`.
- Hacer que `/juegos` presente bloques editoriales grandes, responsivos y alternados, usando directamente `public/assets/v5/compositions/multiplo-composicion.webp` y `boxio-composicion.webp` con proporciones conservadas y `object-fit: contain`.
- Mantener las galerías de las fichas con las capturas individuales originales y validar que las rutas de producción responden correctamente, sin editar ni regenerar los montajes definitivos.
- Incorporar comprobaciones de navegador reales para scroll 0/50/100 %, computed transforms y estilos, hover/active/focus, carrusel, reduced motion, no-JS, viewports 1440×900 y 375×812, estabilidad y ausencia de overflow.
- Preservar `main`, H1 único, headings, alt, JSON-LD, canonical, sitemap, robots, prioridad de carga de heroes y los contratos SEO existentes. No desplegar, activar cobros, inventar URLs o modificar los repositorios de los juegos.

## Capabilities

### New Capabilities

No se introduce una capacidad nueva; el comportamiento pertenece a las capacidades V5.4, catálogo y publicación ya existentes.

### Modified Capabilities

- `website-v54-heroes-and-game-portfolio`: reforzar el parallax perceptible y accesible, las microinteracciones, el uso de composiciones WebP definitivas, el protagonismo editorial del catálogo y la evidencia de navegador real.
- `website-catalog-and-institutional-pages`: modificar la presentación del carrusel y de los bloques de catálogo para consumir composiciones desde datos, mantener enlaces rastreables y conservar galerías originales.
- `website-seo-semantic-publication`: ampliar la evidencia observable de la presentación visual sin relajar los contratos de semántica, SEO, accesibilidad, no-JS y publicación estática.

## Impact

- Afecta componentes Astro, estilos y scripts pequeños de hero, navegación, CTA, tarjetas, carrusel y bloques editoriales; el modelo de datos `src/data/games.js` recibirá las rutas de composición si aún no las expone.
- Afecta los checks browser declarados en `package.json` y su harness para registrar estados computados, scroll, reduced motion, no-JS, dimensiones y respuestas 200 de assets. No se presupone una dependencia Playwright nueva: se usará el runtime y executor configurados o se documentará el bloqueo.
- Consume únicamente referencias y assets locales inventariados en `docs/design/references/`, `assets/screenshots/` y `public/assets/v5/`. No solicita ni genera imágenes nuevas.
- No cambia APIs, backend, CMS, base de datos, dominios, datos de pago, rutas públicas ni repositorios Múltiplo/Boxio. La publicación y el merge siguen requiriendo PR y control humano.
- Dependencias pendientes: acceso efectivo del executor a navegador/capturas y revisión visual humana posterior; cualquier falta de capacidad de navegador bloquea la declaración de completitud, aunque build y tests pasen.
