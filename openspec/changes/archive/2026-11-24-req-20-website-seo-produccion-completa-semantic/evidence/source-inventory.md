# Inventario de fuentes activas

| Área | Fuente activa | Dependencia / conservación |
|---|---|---|
| Rutas | `src/pages/**/*.astro` | 11 rutas estáticas generadas; no se modifican repositorios externos. |
| Metadata/schema | `src/layouts/BaseLayout.astro`, `src/data/seo.js` | Contrato único; campos desconocidos se omiten. |
| Juegos | `src/data/games.js` | URLs HTTPS verificadas y capturas V5 con manifiesto SHA-256. |
| Editorial | `src/content/news/*.md`, `src/content.config.ts` | Cuatro artículos; no se inventan fechas/autores. |
| Publicación | `astro.config.mjs`, `scripts/generate-sitemap.mjs`, `src/pages/robots.txt.ts`, `public/CNAME` | Sitemap requiere `PUBLIC_SITE_URL` HTTPS igual al CNAME. |
| Marca | `public/assets/brand/*`, `public/favicon*`, `public/apple-touch-icon.png` | Manifiesto de marca y hashes existentes; no se redibuja el logo. |
| Visual V5 | `public/v5/*`, `docs/design/references/v5/*` | Assets reales preservados; `docs/design/references/legacy/` es histórico y no es output. |

No se inspeccionaron Stitch ni los repositorios Múltiplo/Boxio.
