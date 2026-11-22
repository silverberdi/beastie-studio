# Proposal

## Why

Beastie Studio ya define `/novedades` y el detalle de artículos como parte de la navegación del producto, pero necesita una sección editorial estática que permita descubrir el estudio y sus juegos sin depender de un CMS ni de datos no verificados. Este incremento corresponde al tercer paso de la arquitectura documentada y convierte el contenido inicial aprobado en una experiencia navegable, accesible y mantenible en español.

## What Changes

- Crear el índice estático `/novedades` con artículo destacado, tarjetas enlazadas, categorías con contenido y filtrado verificable; las categorías vacías no se muestran.
- Crear páginas estáticas `/novedades/[slug]` con breadcrumb, navegación semántica, encabezados, subtítulos, contenido Markdown, artículos relacionados, CTA interno al catálogo y metadatos SEO/Open Graph por artículo.
- Modelar la colección editorial con `slug`, título, resumen, categoría, cuerpo, imagen opcional y fecha solo cuando sea real, manteniendo el contenido en español.
- Publicar los cuatro textos iniciales aprobados en `docs/CONTENT.md`: presentación de Beastie Studio, Múltiplo, Boxio y juegos hechos con cariño.
- Aplicar la composición Warm Editorial Arcade y las referencias locales autorizadas de Novedades y artículo de Múltiplo en desktop y móvil, con controles accesibles y sin enlaces inertizados.
- Añadir pruebas reproducibles de build, rutas, clasificación, slugs, metadatos, enlaces y comportamiento responsive mediante el ejecutor de navegador configurado.
- Mantener Astro SSG y componentes compartidos; no introducir CMS, backend, base de datos, analítica, comentarios, servidor ni enlaces externos inventados.
- Registrar como dependencia de verificación la comparación SHA-256 completa de los binarios de marca contra el manifiesto y reconstruir `home-desktop.png` localmente antes de cualquier comparación visual, sin acceder a Stitch.

## Capabilities

### New Capabilities

- `website-editorial-news`: Índice, categorías, modelo de contenido, detalle de artículos, artículos iniciales y verificación navegable de la sección editorial estática.

### Modified Capabilities

- `website-foundation`: La navegación y la cobertura de rutas de la fundación se amplían con contenido real de `/novedades` y sus rutas de detalle, manteniendo SSG, layout accesible y verificación de navegador.

## Impact

- Afecta las páginas Astro, el layout y componentes compartidos, los estilos responsive, la colección Markdown y `docs/CONTENT.md`.
- Amplía las comprobaciones declaradas en `npm run test` y `npm run test:browser`; el navegador Chromium configurado debe ejecutar las verificaciones observables en Apply o Verify.
- No cambia APIs públicas, repositorios de Múltiplo o Boxio, infraestructura, despliegue ni datos de pago. Las URLs de juegos y cualquier imagen editorial externa permanecen ausentes o no accionables hasta estar verificadas.
- La implementación debe usar únicamente `docs/design/references/README.md` y sus archivos locales enumerados; el logo y favicon aprobados se conservan sin reinterpretación.
