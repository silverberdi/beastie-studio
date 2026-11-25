# Tasks

## 1. Inventario y contrato de datos

- [x] 1.1 Inspeccionar los componentes, callers y estilos actuales de hero, navegación, tarjetas, carrusel, catálogo y fichas; registrar en el cambio qué presentación será sustituida y verificar que no se toca ningún repositorio de Múltiplo o Boxio.
- [x] 1.2 Confirmar hashes, dimensiones y rutas 200 de `public/assets/v5/` y capturas individuales; añadir las rutas de composición a `src/data/games.js` o equivalente y verificar que el build las resuelve sin regenerar ni editar WebP.

## 2. Heroes y movimiento accesible

- [x] 2.1 Implementar los heroes independientes de Inicio y `/juegos` con sus assets V5 locales, titular y CTA visibles, header sticky seguro y recorrido ligado al progreso del componente; verificar visualmente 0/50/100 % y computed transforms en 1440×900 y 375×812.
- [x] 2.2 Implementar fallback estático para `prefers-reduced-motion` y no-JS, sin scroll-jacking ni contenido oculto; verificar texto, enlaces, CTA, foco y ausencia de overflow con scripts desactivados y media query `reduce`.
- [x] 2.3 Ajustar microinteracciones de CTA, `.site-nav`, tarjetas y controles del carrusel con transición de 180–280 ms, elevación/profundidad sutil, active y focus-visible; verificar cambios reales de computed style en normal, hover, active y focus mediante navegador.

## 3. Catálogo editorial y carrusel

- [x] 3.1 Adaptar el componente reusable de showcase/card para usar `multiplo-composicion.webp` y `boxio-composicion.webp` desde datos, `object-fit: contain`, proporciones conservadas y layout vertical/horizontal alternado; verificar capturas completas y CTAs visibles en 320, 375, 768 y 1440 px.
- [x] 3.2 Integrar las composiciones como arte principal del carrusel de Inicio desde la primera carga, con flechas/indicadores/swipe, teclado, estado activo, enlaces a fichas y sin autoplay; verificar navegación determinista con dos entradas y compatibilidad con una colección de 2–10 o más datos.
- [x] 3.3 Integrar `/juegos` con bloques editoriales grandes alternados por índice y conservar las galerías individuales de `/juegos/multiplo` y `/juegos/boxio`; verificar que cada imagen, enlace y alt se sirve desde HTML estático y que las rutas responden 200.
- [x] 3.4 Retirar solo las portadas tipográficas, cajas horizontales o recortes que queden demostrablemente suplantados por las composiciones, conservando referencias y assets históricos; verificar ausencia de consumidores activos duplicados y repetir el smoke browser.

## 4. Evidencia y regresión

- [x] 4.1 Ampliar `npm run test:browser` o su harness configurado para registrar screenshots/video breve, scroll 0/50/100 %, transforms de imagen/texto, computed styles, carrusel, reduced motion, no-JS, overflow, CLS y status 200 de assets; verificar que la evidencia se guarda como resultado reproducible.
- [x] 4.2 Ejecutar `npm run test`, `npm run test:browser` y `npm run build`, y auditar dist para `main`, H1 único, headings, alt, JSON-LD, canonical, sitemap, robots y enlaces; verificar que no hay regresiones SEO, accesibilidad ni de carga.
- [x] 4.3 Comparar Inicio y `/juegos` locales contra `docs/design/references/v5/inicio.html`, `juegos.html` y `composiciones-capturas.html` en desktop/móvil; registrar diferencias perceptibles, evidencia final y cualquier validación humana pendiente sin declarar despliegue o merge.
- [x] 4.4 Si el executor no puede abrir navegador real o capturar la evidencia requerida, marcar la entrega bloqueada con la capacidad concreta ausente; verificar que no se declara completitud solo por build o tests verdes.
