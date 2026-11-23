# Referencia visual aprobada — Beastie Studio V5.4

**Estado: paquete de referencia completo, versionado en GitHub.** Se conservan las referencias históricas en `../legacy/`. Esta carpeta es una referencia de diseño, no código Astro listo para copiar sin adaptación.

## Archivos y dependencias locales

| Función | Ruta |
|---|---|
| Inicio interactivo | [inicio.html](inicio.html) |
| Juegos interactivo | [juegos.html](juegos.html) |
| Hero aprobado de Inicio | [assets/hero-parque-beastie.webp](assets/hero-parque-beastie.webp) |
| Hero aprobado de Juegos (arte diferente) | [assets/hero-juegos-islass.webp](assets/hero-juegos-islass.webp) |
| Capturas reales Múltiplo (4) | [assets/screenshots/multiplo/](assets/screenshots/multiplo/) |
| Capturas reales Boxio (3) | [assets/screenshots/boxio/](assets/screenshots/boxio/) |
| Inventario de las siete capturas | [assets/screenshots/manifest.json](assets/screenshots/manifest.json) |

Las dos ilustraciones son distintas; no reutilizar ni recortar el hero de Inicio para construir Juegos. Las siete capturas provienen del material real aportado por el usuario, **no** de renders conceptuales. La procedencia específica de URLs y tiempos de captura no está registrada: no inventar esas evidencias.

## Elección de capturas (fijada para evitar interpretaciones)
- **Múltiplo — principal:** `assets/screenshots/multiplo/multiplo-pregunta-1.webp` (746 × 1178).
- **Boxio — principal:** `assets/screenshots/boxio/boxio-partida-local.webp` (1247 × 818).
- **Múltiplo — galería adicional:** `multiplo-demo-inicial.webp`, `multiplo-respuesta-correcta.webp`, `multiplo-pregunta-2.webp`.
- **Boxio — galería adicional:** `boxio-menu-modos.webp`, `boxio-partida-multibot.webp`.

Importante: las capturas de Múltiplo son **verticales**, las de Boxio **horizontales**. Mostrar la imagen COMPLETA con `object-fit: contain` en un marco visual apropiado, sin recortar texto, botones ni tablero. Optimizar la composición del carrusel en Astro en vez de forzar un recorte artificial. Conservar proporciones e integridad del contenido.

## Integridad verificada del material de referencia
- `hero-parque-beastie.webp`: 1672 × 941, SHA-256 `106eacf7b7b937a47135aa7d67fa4c666546a87534c3ad850f23f26d30a84678`.
- `hero-juegos-islass.webp`: 1672 × 941, SHA-256 `3b9ca7e217a431e3bd9608b0e8b2153cdb4c01f5837b634938a8a48c37ace6b4`.
- Las capturas están inventariadas con SHA-256, tamaño y dimensiones en el manifest.

## Reglas para mini me
1. Tomar **archivos del repositorio**, no URLs de Stitch ni rutas de contenedores temporales.
2. Adaptar las referencias HTML V5.4 a los componentes Astro y preservar rutas/funcionalidades existentes.
3. Implementar parallax real en ambos heroes, ancho completo detrás de titular legible con contorno marfil, scroll normal y `prefers-reduced-motion`.
4. Alimentar el carrusel y las páginas de juegos con `src/data/games.js`; principal y galería según tabla anterior.
5. **Copiar los recursos necesarios a `public/assets/` de producción** o integrarlos con el pipeline Astro; `docs/design/references/v5/` no se sirve automáticamente en producción.
6. Evitar que el sitio público incluya texto provisional, reclamos no comprobados, datos estructurados ficticios, imágenes de juego inventadas o información de proceso.
7. El SEO y la limpieza general están especificados en [issue #20](https://github.com/silverberdi/beastie-studio/issues/20).

## Control de cambios
- [#19 — Implementación visual y capturas](https://github.com/silverberdi/beastie-studio/issues/19)
- [#20 — SEO, semántica y preparación de producción](https://github.com/silverberdi/beastie-studio/issues/20)
