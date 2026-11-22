# Design

## Context

Este cambio parte de la fundación compartida definida por `website-foundation` y de los contratos de `docs/PRODUCT.md`, `docs/CONTENT.md`, `docs/DESIGN.md` y `docs/ARCHITECTURE.md`. La experiencia debe seguir siendo Astro SSG estático, en español, sin runtime de juegos, backend, CMS, base de datos, cuentas ni pagos propios. Las referencias visuales válidas son únicamente los archivos locales de `docs/design/references/`; el logo y favicon aprobados se consumen desde sus rutas de producción y no se redibujan.

## Goals / Non-Goals

**Goals:**

- Entregar el valor vertical de Inicio, catálogo, fichas de Múltiplo y Boxio, y Nosotros con contenido fiel y enlaces internos reales.
- Reutilizar el layout, navegación, footer, CTA de apoyo y tarjetas de la base compartida; modificar solo lo necesario para el nuevo contenido.
- Mantener una única fuente de datos editorial para las dos fichas y sus tarjetas, evitando divergencias entre `/`, `/juegos` y las fichas.
- Hacer explícito el estado no verificado de URLs de juego, assets o datos institucionales, sin inventar destinos.
- Probar navegación, contenido, accesibilidad básica, responsive y ausencia de overflow con el executor de navegador configurado en Apply/Verify.

**Non-Goals:**

- No implementar Novedades ni artículos nuevos más allá de los enlaces o bloque editorial requerido por la base compartida.
- No implementar Apóyanos, cobros, QR, dominio, hosting ni despliegue.
- No acceder a los repositorios Múltiplo o Boxio, modificar sus juegos, instalar sus runtimes ni embeberlos.
- No crear buscador, cuentas, dashboard, CMS, backend, analítica identificable ni nuevos assets de marca.

## Decisions

### Datos editoriales estáticos y composición compartida

Se mantendrán los textos aprobados en contenido estático del proyecto y se reutilizarán los componentes/layouts existentes de la fundación. La colección de juegos tendrá solo dos entradas, con slug, título, resumen, historia, ilustración conceptual opcional y estado de URL pública; las páginas y tarjetas consumirán esos mismos datos.

Alternativa descartada: duplicar el texto en cada página, porque permitiría inconsistencias y contradice la reutilización exigida. Alternativa descartada: CMS o API, porque añade infraestructura fuera de la arquitectura aprobada.

### Rutas y CTA de juego

Se conservarán `/`, `/juegos`, `/juegos/multiplo`, `/juegos/boxio` y `/nosotros` como rutas estáticas accesibles desde menú y tarjetas. «Conocer» siempre será un enlace interno significativo. «Jugar» se renderiza solo si una configuración explícita contiene una URL previamente verificada; mientras no exista, se omite o se muestra como no disponible sin href accionable.

Alternativa descartada: enlazar a `#`, URLs supuestas o repositorios de desarrollo, porque produciría una disponibilidad falsa y rompería el contrato de contenido.

### Referencias visuales y assets

Antes de la integración visual se reconstruirá localmente `docs/design/references/home-desktop.png` con el script autorizado y se contrastarán los PNG/HTML de Inicio, Juegos y Nosotros. Las ilustraciones conceptuales se usarán con contexto y alt que indiquen su carácter conceptual. El logo y favicon serán los binarios aprobados existentes; la verificación SHA-256 completa contra `manifest.json` se tratará como una comprobación de integración, no como una razón para generar sustitutos.

Alternativa descartada: abrir Stitch, generar una captura de gameplay o reinterpretar el logo, porque las referencias locales y los assets aprobados son la autoridad.

### Metadatos sin dominio inventado

Cada ruta tendrá título, descripción y Open Graph derivados del contenido aprobado. Los campos que requieran dominio absoluto se dejarán sin URL inventada o se producirán únicamente cuando exista una configuración de dominio verificada; no se declarará sitemap o canonical con un dominio ficticio.

### Inventario de cambios y retiro seguro

- **Reutilizar:** layout, header/menu móvil, footer, CTA flotante, tokens de diseño, componente de tarjeta y harness/checks declarados por la fundación.
- **Modificar:** contenido de las rutas placeholder, datos de navegación activa, tarjetas de juegos y metadatos para que reflejen las rutas nuevas.
- **Añadir:** páginas estáticas de fichas, datos editoriales compartidos y escenarios/checks específicos del catálogo.
- **Retirar:** solo el markup placeholder que quede sustituido dentro de estas rutas, una vez que el nuevo contenido y sus rutas estén verificados; no retirar rutas de Novedades o Apóyanos fuera de este alcance.

## Risks / Trade-offs

- **[Referencia reconstruida o captura ausente]** → Ejecutar el procedimiento local indicado y registrar la dependencia; no sustituirla por Stitch ni por una imagen inventada.
- **[URL pública o disponibilidad de juego no verificada]** → Omitir «Jugar» y conservar el estado no disponible; una futura verificación deberá actualizar el contenido mediante un cambio revisable.
- **[Asset de marca ausente o hash incorrecto]** → Mantener placeholder no accionable y reportar la dependencia; no modificar ni regenerar los binarios.
- **[Divergencia entre tarjetas y fichas]** → Derivar ambas vistas del mismo registro estático y cubrir el contenido clave en smoke/browser checks.
- **[Cambios de la base compartida]** → Releer sus componentes antes de aplicar y limitar el cambio a los consumidores de este incremento; cualquier modificación contractual requiere actualizar OpenSpec.
- **[Responsive o foco defectuoso]** → Ejecutar `npm run test` y `npm run test:browser` con el navegador configurado, registrando rutas, viewport, menú, enlaces, foco y overflow observados. La revisión humana visual complementa, pero no sustituye, las comprobaciones automatizables.

## Migration Plan

1. En Apply, inspeccionar la base compartida y aplicar el contenido, rutas y componentes definidos aquí.
2. Ejecutar la restauración de la referencia local y contrastar los assets de marca contra el manifiesto, sin editar los originales.
3. Ejecutar los checks declarados (`npm run test` y `npm run test:browser`) y conservar evidencia de build, rutas, contenido, enlaces y viewports.
4. Abrir PR para revisión y merge humano; no desplegar ni activar cobros.
5. Para rollback, revertir el commit/PR del cambio; no borrar migraciones, historia ni assets aprobados. Si una parte resulta no verificable, conservar el placeholder y corregir mediante OpenSpec update antes de ampliar alcance.

## Open Questions

- Las URLs públicas verificadas de Múltiplo y Boxio siguen siendo una dependencia externa: hasta contar con fuente legítima, no se incluirán enlaces «Jugar».
- El dominio final sigue sin confirmarse: los metadatos absolutos y cualquier publicación quedan pendientes de decisión humana.
