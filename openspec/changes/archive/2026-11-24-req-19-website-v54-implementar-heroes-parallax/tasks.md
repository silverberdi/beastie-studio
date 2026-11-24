# Tasks

## 1. Inventario y assets publicables

- [x] 1.1 Inspeccionar las páginas, componentes, estilos, `src/data/games.js` y convenciones de assets existentes; verificar dimensiones y SHA-256 de los dos heroes y el manifest de siete capturas contra `docs/design/references/v5/`.
- [x] 1.2 Copiar o integrar los heroes y capturas en rutas públicas Astro conservando nombres, dimensiones y proporciones; verificar con el build servido que cada ruta responde 200.
- [x] 1.3 Retirar el uso de `illustration-*-concept.png` como visual principal del catálogo y documentar en el cambio cualquier ruta antigua que haya quedado obsoleta; verificar que no quedan tarjetas principales apuntando a esos archivos.

## 2. Datos y presentación del catálogo

- [x] 2.1 Extender `src/data/games.js` con captura principal, galería opcional y URLs canónicas existentes para Múltiplo y Boxio; verificar que no se duplican datos ni se inventan entradas.
- [x] 2.2 Adaptar `GameCard.astro`, `GameDetail.astro`, `juegos.astro` y `[slug].astro` para renderizar capturas reales desde los datos, galerías opcionales y marcos `contain` sin estirar ni recortar; verificar las proporciones 746×1178 y 1247×818 en navegador.
- [x] 2.3 Ajustar Inicio para consumir la lista de juegos mediante un carrusel sin autoplay con flechas, puntos, swipe, teclado, estado activo y nombres accesibles; verificar la navegación con Múltiplo y Boxio sin tarjetas hardcodeadas.

## 3. Heroes, responsive y navegación global

- [x] 3.1 Implementar el hero de Inicio con `hero-parque-beastie.webp`, el hero único de `/juegos` con `hero-juegos-islass.webp`, contorno `#FFF8F4` y composición completa; verificar que cada ruta usa el arte correcto y que los CTAs permanecen dentro del viewport.
- [x] 3.2 Implementar parallax local con fallback estático, actualización acotada a `requestAnimationFrame` o CSS equivalente, listener pasivo y sin modificar el scroll; verificar entrada, recorrido y salida en scroll real.
- [x] 3.3 Implementar `prefers-reduced-motion` para desactivar movimiento y conservar contenido usable sin JavaScript; verificar el modo reducido y los anchos 320, 375, 768, 1024 y 1440 sin overflow horizontal.
- [x] 3.4 Mantener `aria-current`, foco visible, hover/elevación y enlaces de menú; retirar el botón flotante permanente de apoyo dejando `/apoyanos` como acción secundaria en menú/footer; verificar teclado y navegación interna.

## 4. Verificación y evidencia

- [x] 4.1 Ejecutar `npm run test`, `npm run test:browser` y `npm run build`; conservar la salida observable y corregir cualquier regresión antes de continuar.
- [x] 4.2 Usar el Chromium configurado para visitar Inicio, `/juegos`, `/juegos/multiplo` y `/juegos/boxio` en desktop y móvil; capturar inicio, mitad y final del scroll, galerías, carrusel, foco, enlaces, reduced motion y assets 200.
- [x] 4.3 Comparar las capturas con `docs/design/references/v5/inicio.html`, `juegos.html` y los heroes locales; registrar matriz PASS/FAIL, diferencias intencionales y cualquier validación física pendiente sin sustituir checks automatizables.
- [x] 4.4 Revisar que el diff queda limitado al sitio corporativo y assets del cambio, sin repositorios externos, despliegue, PR automático ni activación de cobros; entregar la evidencia para revisión humana.
