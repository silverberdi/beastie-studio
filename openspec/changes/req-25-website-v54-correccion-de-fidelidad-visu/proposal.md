# Proposal

## Why

La integración de #19 dejó una versión reducida que no reproduce la composición, el movimiento ni la jerarquía visual aprobada para V5.4 en las referencias locales. Este cambio corrige la aceptación visual existente, sin rediseñar el sitio ni introducir exploración creativa, para que Inicio y Juegos recuperen el comportamiento observable de `docs/design/references/v5/` manteniendo la base Astro, el contenido y el SEO de #20.

## What Changes

- Rehacer la composición de los heroes de Inicio y Juegos con sus ilustraciones V5.4 respectivas, titulares editoriales, contorno marfil y parallax perceptible ligado al progreso del hero.
- Añadir entrada progresiva, microinteracciones y transiciones discretas con fallback sin JavaScript y soporte de `prefers-reduced-motion`.
- Convertir el catálogo de `/juegos` en un portafolio editorial responsive, data-driven y alternado, usando las capturas reales completas con `object-fit: contain`.
- Convertir el carrusel de Inicio en un track deslizante visible, con peek del siguiente elemento, flechas, indicadores, teclado, foco, swipe y enlaces, sin autoplay.
- Recuperar estados de hover, foco y activo con elevación y contraste accesible en la navegación desktop y móvil.
- Mantener rutas, copy legítimo, logo, favicons, SEO, JSON-LD, robots, sitemap, Astro SSG y ausencia de servidor/CMS.
- Añadir evidencia automatizada de navegador para posiciones del hero, desplazamiento de imagen, carrusel, CLS, responsive, reduced motion, fallback y assets servidos; separar la revisión humana posterior al merge.

## Capabilities

### New Capabilities

<!-- No se introduce una capacidad independiente; se corrigen capacidades existentes de la implementación V5.4. -->

### Modified Capabilities

- `website-v54-heroes-and-game-portfolio`: corregir fidelidad de heroes, parallax, reveal/microinteracciones, portafolio editorial, carrusel deslizante y evidencia reproducible contra las referencias V5.4.
- `website-foundation`: ampliar el contrato de navegación para estados hover, foco y activo claramente visibles, elevación y contraste accesible en desktop y móvil.

## Impact

- Componentes Astro de layout, heroes, catálogo, tarjetas y carrusel; estilos globales y scripts ligeros de interacción.
- Datos y copia existentes en `src/data/games.js`, assets V5.4 locales y su integración en `public/assets/` o pipeline Astro.
- Pruebas declaradas `npm run test`, `npm run test:browser` y build Astro; el executor configurado deberá implementar y ejecutar las comprobaciones de navegador.
- No se modifican los repositorios de Múltiplo o Boxio, no se inventan assets/URLs/datos de pago y no se despliega sin aprobación explícita.
