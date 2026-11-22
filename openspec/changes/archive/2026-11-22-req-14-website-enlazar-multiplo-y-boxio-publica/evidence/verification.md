# Evidencia de Apply

Fecha de ejecución: 2026-11-22

## URLs públicas canónicas

| Juego | URL canónica comprobada | Fuente | Resultado HTTP/navegador | Fecha |
|---|---|---|---|---|
| Múltiplo | `https://multiplo.silverman.pro/` | URL proporcionada explícitamente por el propietario en este Change | HTTP 200; Chromium 200; título `Múltiplo — Aprende a multiplicar jugando` | 2026-11-22 |
| Boxio | `https://boxio.silverman.pro/` | URL proporcionada explícitamente por el propietario en este Change | HTTP 200; Chromium 200; título `Boxio — Puntos y Cajas` | 2026-11-22 |

## Checks reproducibles

- `npm test`: PASS, 11 tests, exit code 0.
- `PUBLIC_SITE_URL=https://beastie-studio.github.io/beastie-studio npm run build`: PASS, 11 rutas estáticas generadas; la base configurada no altera las URLs externas absolutas.
- `npm run test:browser`: PASS, Chromium real en desktop y móvil, exit code 0.
- Capturas generadas por `tests/browser-smoke.mjs` en `evidence/captures/`: Inicio, catálogo, fichas de Múltiplo y Boxio, novedades, nosotros y apoyo en los viewports configurados.

La publicación y el merge siguen sujetos a revisión humana; no se ejecutó ningún deploy.
