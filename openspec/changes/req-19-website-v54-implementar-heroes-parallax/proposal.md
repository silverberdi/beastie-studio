# Proposal

## Why

El sitio Astro existente necesita adoptar la dirección visual V5.4 aprobada para que Inicio y Juegos comuniquen el catálogo con una composición cinematográfica, responsive y accesible. Los heroes y las capturas reales ya están versionados en el repositorio, por lo que este cambio puede convertirlos en una experiencia publicable y data-driven sin reconstruir los juegos ni introducir infraestructura nueva.

## What Changes

- Actualizar Inicio con el hero `hero-parque-beastie.webp` a ancho completo, titular legible con contorno marfil y parallax perceptible con scroll natural y fallback estático.
- Actualizar `/juegos` con el hero exclusivo `hero-juegos-islass.webp`, conservando la ortografía `islass` y controles legibles en desktop y móvil.
- Integrar las siete capturas WebP reales mediante rutas publicables, manifest y datos centralizados en `src/data/games.js`; usar las capturas principales y galerías fijadas para Múltiplo y Boxio.
- Reemplazar los visuales conceptuales principales de las tarjetas y fichas por capturas completas, preservando las proporciones 746×1178 y 1247×818 mediante una presentación equivalente a `object-fit: contain`.
- Mantener el catálogo generado desde datos, ampliar `/juegos` como portafolio editorial y mostrar la captura principal y galería opcional en `/juegos/[slug]`.
- Añadir un carrusel de Inicio sin autoplay, con flechas, puntos, swipe, estado activo, teclado y navegación rastreable, preparado para crecer desde `games.js`.
- Conservar los CTAs y URLs públicas confirmadas de Múltiplo y Boxio, la navegación accesible y la paleta/fuentes aprobadas; retirar el botón flotante permanente de apoyo y dejar el apoyo en menú/footer.
- Implementar movimiento con APIs del navegador o CSS moderno sin scroll-jacking, desactivarlo con `prefers-reduced-motion` y validar los breakpoints 320, 375, 768, 1024 y 1440.
- Verificar con build, tests declarados y navegador real las vistas, assets 200, carrusel, enlaces, foco, reduced motion, fallbacks y ausencia de regresiones; dejar PR, merge, release y decisiones físicas fuera del cambio y bajo control humano.

## Capabilities

### New Capabilities

- `website-v54-heroes-and-game-portfolio`: Define los heroes V5.4, parallax accesible, portafolio con capturas reales y carrusel data-driven.

### Modified Capabilities

Ninguna. La dirección V5.4 se expresa como una capacidad adicional sobre las capacidades existentes, preservando sus requisitos y escenarios base.

## Impact

- Páginas y componentes Astro: `src/pages/index.astro`, `src/pages/juegos.astro`, `src/pages/juegos/[slug].astro`, `src/layouts/BaseLayout.astro`, `src/components/GameCard.astro` y `src/components/GameDetail.astro`.
- Datos y estilos: `src/data/games.js` y `src/styles/global.css`, con posible JavaScript pequeño y localizado para parallax/carrusel.
- Assets públicos: copia o pipeline documentado desde `docs/design/references/v5/assets/` hacia rutas finales servidas por Astro; no se modifica `docs/design/references/legacy/`.
- Validación: `npm run test`, `npm run test:browser`, `npm run build` y comprobaciones en el Chromium disponible, incluyendo screenshots de Inicio/Juegos y fichas en desktop/móvil.
- No afecta los repositorios Múltiplo o Boxio, no añade backend/CMS/dependencias pesadas y no publica ni activa cobros.
