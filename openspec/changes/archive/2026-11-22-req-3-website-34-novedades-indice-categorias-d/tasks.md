# Tasks

## 1. Modelo y contenido editorial

- [x] 1.1 Confirmar la fundación Astro existente, sus componentes de layout y el mecanismo de contenido disponible; verificar que la decisión coincide con `design.md` y no añade CMS, backend ni dependencia de servidor.
- [x] 1.2 Crear la colección editorial con esquema para `slug`, `title`, `summary`, `category`, `body`, `heroImage` opcional y `publishedAt` opcional; verificar que frontmatter inválido falla de forma reproducible durante el build.
- [x] 1.3 Incorporar los cuatro artículos de `docs/CONTENT.md` con los slugs aprobados, sin fechas, autores, métricas, testimonios ni claims de disponibilidad; verificar títulos, categorías y cuerpos mediante el test de contenido.
- [x] 1.4 Documentar en `docs/CONTENT.md` o en la documentación editorial existente el procedimiento breve para añadir un artículo Markdown; verificar que los campos obligatorios y la regla de fecha real quedan explícitos.

## 2. Índice, categorías y detalle

- [x] 2.1 Implementar `/novedades` con artículo destacado, tarjetas y categorías derivadas de contenido; verificar que cada tarjeta enlaza a un slug generado y que las categorías vacías se ocultan.
- [x] 2.2 Implementar el filtrado de categorías con controles accesibles y estado observable, incluyendo retorno al conjunto completo; verificarlo con una comprobación de navegador, no solo con inspección estática.
- [x] 2.3 Implementar `/novedades/[slug]` como ruta estática con breadcrumb, navegación semántica, encabezado, subtítulos, retorno al índice, relacionados cuando existan y CTA a `/juegos`; verificar la salida para los cuatro slugs y el comportamiento de slug inexistente.
- [x] 2.4 Añadir metadatos de título, descripción, canonical/OG según la configuración verificada y datos específicos de cada artículo; verificar que no se inventa dominio, fecha ni imagen cuando esos datos no existen.
- [x] 2.5 Integrar imágenes solo desde assets locales aprobados, con alt contextual; verificar que artículos sin imagen siguen siendo legibles y que las ilustraciones conceptuales no se presentan como capturas de gameplay.

## 3. Integración visual y accesibilidad

- [x] 3.1 Reutilizar el layout, navegación, tarjetas, footer, CTA y tokens Warm Editorial Arcade existentes y adaptar la composición a `novedades-desktop.png`, `novedades-mobile.png` y `articulo-multiplo-desktop.png`; verificar que no se consulta Stitch ni se copia HTML referencial como producción.
- [x] 3.2 Reconstruir una vez `home-desktop.png` con `python3 docs/design/references/restore-home-desktop.py` antes de la comparación visual y comprobar la presencia de los binarios de marca contra `public/assets/brand/manifest.json`; registrar cualquier discrepancia como dependencia sin alterar assets.
- [x] 3.3 Ajustar responsive, foco, contraste, nombres accesibles, teclado, menú móvil y áreas táctiles del índice y detalle; verificar en viewport desktop y móvil la ausencia de overflow horizontal y la navegación completa.

## 4. Verificación y entrega

- [x] 4.1 Actualizar o añadir checks de contenido, build, rutas, slugs, categorías, enlaces internos y metadatos; verificar con `npm run test` sin inventar comandos alternativos.
- [x] 4.2 Asignar al ejecutor configurado de navegador la ejecución de `npm run test:browser` sobre `/novedades` y los cuatro detalles en desktop y móvil, incluyendo filtros, menú, foco, enlaces y overflow; conservar evidencia observable de resultados y fallos.
- [x] 4.3 Ejecutar la verificación conjunta del Change contra las specs y design, confirmando las once rutas editoriales/base, ausencia de runtime de servidor y placeholders no accionables donde falten datos; verificar el resultado con el build estático y los checks declarados.
- [x] 4.4 Preparar el candidato para revisión humana y PR sin desplegar ni publicar; verificar que el diff queda limitado a este repositorio y al alcance de este Change, sin tocar Múltiplo, Boxio o infraestructura.
