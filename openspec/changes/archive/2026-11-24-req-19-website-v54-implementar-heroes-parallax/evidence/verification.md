# Evidencia de Apply — V5.4

## Checks automatizables

| Área | Resultado | Evidencia |
|---|---|---|
| Assets V5 | PASS | `npm run test`; hashes SHA-256 comparados con `docs/design/references/v5/assets/screenshots/manifest.json` y README de referencia. |
| Astro SSG | PASS | `npm run build` termina con exit code 0; 11 páginas estáticas generadas. |
| Unit/smoke | PASS | `npm run test` termina con exit code 0; 13 tests passed. |
| Chromium desktop/mobile | PASS | `npm run test:browser` termina con exit code 0; rutas, imágenes, enlaces, foco, menú, carrusel y overflow verificados. |
| Responsive | PASS | Chromium comprobó 320, 375, 768, 1024 y 1440 px sin overflow horizontal. |
| Reduced motion | PASS | Chromium comprobó `prefers-reduced-motion: reduce`; el transform del hero queda estático y el contenido sigue disponible. |

## Capturas y comparación visual

El smoke browser conserva capturas de Inicio, Juegos, fichas y rutas relacionadas en `evidence/captures/`, separadas por `desktop` y `mobile`. La comparación se hizo contra `docs/design/references/v5/inicio.html`, `juegos.html` y los dos heroes locales.

| Vista | Resultado | Diferencia intencional |
|---|---|---|
| Inicio | PASS | El catálogo usa carrusel controlado en lugar de lista simultánea para cumplir interacción accesible. |
| Juegos | PASS | El hero usa exclusivamente `hero-juegos-islass.webp`; el catálogo mantiene tarjetas data-driven. |
| Fichas | PASS | Las capturas reales usan `contain` y galería opcional; no se usan ilustraciones conceptuales como visual principal. |
| Navegación | PASS | El apoyo permanece en menú/footer; se elimina el botón flotante permanente del baseline. |

La revisión física final de identidad, contraste y composición queda pendiente de revisión humana sobre estas capturas; no sustituye los checks automatizables.
