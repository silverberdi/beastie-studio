# Beastie Studio — Dirección visual V5.4

Esta carpeta contiene las referencias HTML correspondientes a la dirección creativa **aprobada** por el propietario del estudio. Mantener siempre diferenciadas las referencias de diseño y el código de producción.

## Archivos
- [`inicio.html`](inicio.html): Inicio, titular «Descubrir. Pensar. Compartir.», composición panorámica, hero con efecto parallax y carrusel.
- [`juegos.html`](juegos.html): catálogo, titular «Nuestros juegos.», parallax con imagen **distinta** de Inicio, fichas de juegos.
- `assets/hero-parque-beastie.webp`: imagen **definitiva de Inicio**, 1672×941.
- `assets/hero-juegos-islass.webp`: imagen **definitiva de Juegos**, 1672×941, no es un recorte de Inicio.

## Estado de integridad de recursos
**IMPORTANTE:** los dos archivos WebP originales aún no han podido transferirse mediante la conexión GitHub de esta sesión. En esta carpeta solo están los HTML versionados; **no afirmar que el wireframe interactivo se renderiza completo desde el repositorio** hasta que los binarios reales estén en `assets/`.

Los dos WebP exactos se entregaron en el paquete descargable V5.4 de la conversación de diseño. **No sustituir por imágenes genéricas o creadas por Stitch**. La ubicación que debe tener cada archivo al completarse el paquete está arriba.

Las capturas reales de Múltiplo y Boxio tampoco están incluidas aún. La implementación en producción requiere capturas auténticas de:
- https://multiplo.silverman.pro/
- https://boxio.silverman.pro/

No confundir ilustraciones editoriales con capturas de gameplay.

## Contrato de integración
1. Adaptar HTML y animaciones **a los componentes Astro existentes**, evitando reescribir el sitio completo.
2. Mantener logo, favicon, paleta y tipografía aprobados; preservar rutas y contenido del sitio ya publicado.
3. Probar de forma manual y automatizada que el parallax sea perceptible, no corte texto y respete `prefers-reduced-motion`.
4. Completar fotografías reales y metadata SEO, datos estructurados, semántica, sitemap y robots según los issues.
5. No publicar los wireframes de esta carpeta como páginas del sitio; solo son referencias de diseño.

## Issues relacionados
- [#19 — Imágenes reales, capturas y parallax](https://github.com/silverberdi/beastie-studio/issues/19)
- [#20 — SEO y limpieza de contenido de producción](https://github.com/silverberdi/beastie-studio/issues/20)

## Estado editorial
El diseño y las interacciones V5.4 están aprobados como referencia. La **integridad de las imágenes dentro de este repositorio está pendiente**; no debe desbloquearse #19 hasta incorporar los dos binarios exactos y screenshots auténticos.
