# Resumen para PR — req-11

## Cambio

Se restaura la fidelidad visual del sitio Astro frente a las referencias locales: composiciones diferenciadas, ilustraciones conceptuales autorizadas, catálogo, manifiesto, novedades y Apóyanos responsive.

## Checks

- `npm run test` — PASS (9/9).
- `npm run build` — PASS (11 rutas estáticas); sitemap omitido porque `PUBLIC_SITE_URL` no está verificada.
- `npm run test:browser` — PASS en Chromium desktop y móvil; filtros, menú, foco, alt, enlaces internos, imágenes y overflow.
- Capturas completas Astro real: `evidence/captures/`.

## Dependencias y límites

No se modifican logo/favicon, contenido editorial aprobado, repositorios Múltiplo/Boxio, infraestructura ni cobros. Las URLs de juegos y apoyo siguen pendientes y no accionables. La revisión visual humana y la decisión sobre PR/merge/publicación quedan fuera de Apply.
