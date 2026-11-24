# Matriz de evidencia V5.4

Evidencia generada por el worktree del Change. No certifica merge, publicación ni aprobación visual humana.

| Área | Comprobación reproducible | Resultado |
|---|---|---|
| Assets V5.4 | `npm run test` valida SHA-256 del manifest y `npm run test:browser` solicita imágenes del build | PASS; respuestas 200 |
| Build SSG | `npm run build` | PASS; 11 rutas Astro estáticas |
| Hero Inicio/Juegos | Chromium mide `--parallax-progress` y `--parallax-offset` en tres posiciones | PASS; desplazamiento no nulo, scroll natural |
| Carrusel | Chromium activa flecha y teclado, verifica `inert`/`aria-hidden` y transformación del track | PASS; sin autoplay |
| Responsive | Chromium comprueba overflow en 320, 375, 768, 1024 y 1440 px | PASS; sin overflow horizontal |
| Reduced motion | Chromium emula `prefers-reduced-motion: reduce` y comprueba transform/transición | PASS; composición usable y estática |
| Fallback | Chromium desactiva JavaScript y comprueba enlaces y titular visibles | PASS |
| CLS | Chromium registra `layout-shift` sin entrada reciente | PASS; `0` en ejecución observada |
| Visual | Capturas Inicio/Juegos en desktop y móvil, etapas inicial/media/final | DISPONIBLE en `evidence/captures/`; comparación final queda para revisión humana |

## Límites de entrega

- El build no publica ni despliega.
- El sitemap queda pendiente mientras `PUBLIC_SITE_URL` no sea un dominio HTTPS verificado; no se inventa una URL.
- PR, merge humano, release y validación visual posterior al merge no forman parte de Apply.
- La referencia disponible es únicamente el inventario local de `docs/design/references/`; no se consultó Stitch.
