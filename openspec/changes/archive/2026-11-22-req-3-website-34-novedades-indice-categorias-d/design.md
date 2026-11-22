# Design

## Context

La fundación ya establece Astro SSG, layout compartido, navegación accesible y las rutas base. Este Change añade el incremento editorial descrito en `proposal.md` y sus deltas de `website-editorial-news` y `website-foundation`. El contenido y las restricciones de producto provienen de `docs/CONTENT.md`, `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/DECISIONS.md` y el inventario visual local.

## Goals / Non-Goals

**Goals:**

- Mantener una única fuente de contenido editorial en Markdown o la colección nativa equivalente de Astro, con validación de frontmatter.
- Generar el índice, filtros y detalles en build, con slugs deterministas, enlaces internos y metadatos derivados del artículo.
- Reutilizar layout, navegación, tarjetas, CTA y tokens Warm Editorial Arcade existentes; adaptar la composición a las referencias locales de Novedades y artículo de Múltiplo.
- Probar en navegador real las rutas, filtros, menú móvil, foco, enlaces y overflow en los viewports declarados.
- Dejar documentación breve para añadir un artículo y evidencia clara para assets de marca y referencias visuales.

**Non-Goals:**

- No crear CMS, editor en navegador, API, base de datos, autenticación, comentarios, búsqueda compleja ni analítica.
- No convertir las ilustraciones conceptuales en capturas de gameplay, no inventar fechas o URLs y no modificar los binarios de marca aprobados.
- No desplegar, publicar, abrir PR ni tocar los repositorios Múltiplo o Boxio desde este Change.

## Decisions

1. **Colección editorial local validada en build.** Se usará el mecanismo de contenido nativo compatible con la versión de Astro ya presente, con esquema para `slug`, `title`, `summary`, `category`, `body`, `heroImage` opcional y `publishedAt` opcional. Esto evita duplicar artículos entre páginas y permite que un slug o campo inválido falle de forma determinista. Se descarta un CMS porque contradice la arquitectura estática y añade infraestructura sin valor para cuatro textos iniciales.

2. **Rutas estáticas derivadas de la colección.** `/novedades` ordenará el artículo destacado y las tarjetas desde la colección; `/novedades/[slug]` generará solo slugs existentes. Las categorías se derivarán de los artículos presentes y el filtro cambiará un estado observable y accesible del índice. Se descarta un endpoint o filtrado dependiente de servidor porque el sitio no tiene runtime.

3. **Metadatos por artículo desde datos declarativos.** El layout de SEO recibirá título, resumen, URL canónica y datos OG del artículo, usando imagen solo si el asset está aprobado. En ausencia de dominio verificado, no se fabricará una URL pública: se conservará la convención/configuración existente y se documentará la dependencia. No se añadirán fechas por defecto.

4. **Contenido textual primero cuando falten assets.** Las tarjetas y detalles podrán renderizarse sin imagen, con placeholder no accionable si el diseño requiere reservar espacio. Las ilustraciones locales solo se usarán con alt contextual que indique su naturaleza conceptual. Esto preserva legibilidad y evita presentar material referencial como producto real.

5. **Verificación automatizable con herramientas existentes.** Se ampliarán los checks declarados en `package.json` (`npm run test` y `npm run test:browser`) para comprobar build, rutas, slugs, clasificación, enlaces, metadatos, menú y viewports con Chromium configurado. El operador/humano no sustituye estas comprobaciones; la validación física posterior a merge queda fuera del bloqueo del Change.

6. **Identidad y referencias bajo control local.** Antes de comparar visualmente se ejecutará una vez `python3 docs/design/references/restore-home-desktop.py`; se usarán exclusivamente los archivos enumerados en el README de referencias. Durante Apply/Verify se comprobará el SHA-256 completo de los nueve binarios indicados por `docs/design/BRAND_ASSETS.md` contra `public/assets/brand/manifest.json`, sin redibujar ni convertir el logo.

## Risks / Trade-offs

- [El dominio o imágenes aprobadas pueden seguir sin estar verificados] → Mantener metadatos sin URLs inventadas, render textual y dependencia visible; no declarar publicación lista.
- [El filtrado client-side puede degradarse en teclado o quedar desincronizado] → Usar controles nativos con nombre accesible, estado perceptible y check de navegador que confirme el conjunto filtrado y el retorno a todos.
- [Las referencias visuales son capturas y HTML, no código productivo] → Extraer tokens y composición de los archivos locales, revisar desktop/móvil y no copiar HTML referencial como implementación.
- [La fundación previa puede tener contratos de layout compartido] → Reutilizar sus componentes y ejecutar las pruebas base junto con las nuevas rutas; cualquier cambio de requisito se resuelve mediante OpenSpec update.
- [Un article frontmatter inválido puede fallar todo el build] → Documentar el esquema y añadir una prueba de contenido mínima; el fallo temprano es preferible a publicar un artículo incompleto.

## Migration Plan

No hay migración de datos ni despliegue automático. En Apply se incorporará la colección, páginas, estilos, documentación y checks dentro del candidato del Change; se ejecutarán build y pruebas declaradas, incluyendo el navegador real. El rollback consiste en revertir el commit del candidato antes del PR/merge humano; no se alteran datos externos ni repositorios de juegos.

## Open Questions

- La URL canónica absoluta y el dominio final siguen pendientes según `docs/DECISIONS.md`; la implementación puede dejar la configuración preparada sin afirmar un dominio hasta que exista decisión humana.
