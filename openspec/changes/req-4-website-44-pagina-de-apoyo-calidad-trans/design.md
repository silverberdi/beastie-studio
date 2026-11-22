# Design

## Context

La motivación está en `proposal.md`; el contrato observable está en las deltas de `website-support-and-publication-readiness` y `website-foundation`. El repositorio es un Astro SSG sin backend ni CMS. Los datos de apoyo, las URLs de juegos y el dominio no están verificados y no pueden resolverse por inferencia. Las únicas referencias visuales son los archivos locales enumerados en `docs/design/references/README.md`.

## Goals / Non-Goals

**Goals:**

- Entregar una ruta `/apoyanos` editorialmente clara, reutilizando el layout, footer y CTA existentes.
- Representar cada canal desde una configuración declarativa tipada por estado, manteniendo estados pendientes no accionables hasta recibir datos aprobados.
- Centralizar metadatos, base URL opcional y regla de sitemap para impedir URLs de dominio ficticias.
- Verificar la marca con los binarios existentes y el SHA-256 completo del manifiesto, sin modificar imágenes.
- Dejar documentación y evidencia de checks suficiente para una revisión humana y un PR.

**Non-Goals:**

- No crear checkout, formulario, backend, CMS, cuentas, base de datos, analítica, cookies innecesarias ni integración de cobro.
- No decidir URLs de Patreon, Ko-fi, PayPal, Nequi, Daviplata, Vaki, Múltiplo o Boxio; tampoco decidir dominio, hosting o publicación.
- No rediseñar el logo, generar QR, consultar Stitch ni usar ilustraciones conceptuales como capturas de gameplay.
- No desplegar, publicar, abrir un PR automáticamente ni tocar los repositorios de los juegos.

## Decisions

### Configuración declarativa de apoyo

Mantener los canales en un módulo de datos local consumido por la página. Cada entrada tendrá nombre, estado, tipo de destino y valor aprobado solo cuando exista. El renderizado derivará dos estados: control externo accionable únicamente para un canal habilitado y tarjeta pendiente con explicación visible en cualquier otro caso. Esta decisión evita que una plantilla convierta accidentalmente una cadena vacía o un placeholder en un enlace de pago.

Alternativas consideradas: hardcodear botones en la página (rechazado por duplicación y riesgo de destinos inconsistentes) o añadir un CMS/backend (rechazado por el alcance y la arquitectura estática).

### Base URL y sitemap optativos

Leer la base URL únicamente desde la configuración de publicación explícita y verificada. Si no existe, construir el sitio sin sitemap con dominio inventado y registrar la dependencia en la documentación. Cuando exista, generar el sitemap desde las rutas estáticas reales, sin incluir destinos externos como páginas internas.

Alternativas consideradas: fijar el dominio de `public/CNAME` como verdad suficiente (rechazado porque hosting y dominio final siguen pendientes) o generar siempre un sitemap relativo (rechazado porque el formato publicado requiere URLs absolutas verificadas).

### Reutilización del layout y contenido editorial

La página usará componentes compartidos para navegación, CTA flotante, footer, tarjetas y metadatos. El bloque «También puedes ayudar compartiendo» enlazará a fichas internas existentes y no duplicará los textos del hero ni del footer. La composición seguirá los tokens y proporciones de `apoyanos-desktop.png`, `apoyanos-mobile.png` e `illustration-apoyanos.png`; esta última conservará alt que indique que es una ilustración conceptual.

Alternativas consideradas: una composición aislada para `/apoyanos` (rechazada por romper coherencia y aumentar mantenimiento) o usar HTML de referencia como producción (rechazado; solo sirve para estudiar layout/tokens).

### Evidencia de calidad y marca

Apply/Verify ejecutará `npm run test`, `npm run test:browser` y el build documentado con el navegador real disponible. Los checks de navegador comprobarán rutas, menú, enlaces, foco, viewport y overflow; la validación humana quedará reservada a decisiones de contenido, URLs, dominio, hosting y revisión visual final. Antes de comparar Home desktop se ejecutará una vez `python3 docs/design/references/restore-home-desktop.py`. La integridad de los nueve binarios se comprobará con SHA-256 contra `public/assets/brand/manifest.json`.

Alternativas consideradas: pedir al operador que navegue manualmente (rechazado porque el navegador está automatizable) o tratar una captura visual como prueba de comportamiento (rechazado porque no aporta evidencia de interacción).

## Risks / Trade-offs

- [Destino de apoyo pendiente] → Mantener todas las tarjetas no verificadas como pendientes y producir un informe de dependencia humana; no permitir un CTA falso.
- [Base URL ausente] → Omitir el sitemap y registrar la decisión; habilitarlo solo con una variable explícita verificada.
- [Diferencia entre referencia y viewport real] → Comparar únicamente con referencias locales, probar desktop/móvil y conservar la decisión de diseño en el PR.
- [Cambio accidental de branding] → No editar binarios; validar existencia, tamaño y SHA-256 completo antes de integrar el uso en la interfaz.
- [Fallo de un check] → Detener la afirmación de preparación para publicación, conservar la salida del comando y corregir mediante el flujo OpenSpec antes de revisar de nuevo.

## Migration Plan

1. En Apply, inventariar la implementación existente, integrar la página y la configuración declarativa, y documentar variables y dependencias sin completar valores faltantes.
2. Ejecutar build, tests declarados, restauración de Home desktop y verificación de hashes; ejecutar los checks de navegador con evidencia observable.
3. Revisar el informe de dependencias humanas y preparar el PR para merge humano. No ejecutar despliegue ni activar canales.
4. Para rollback, revertir el commit del cambio mediante revisión humana; al ser un sitio estático y sin migraciones persistentes no requiere migración de datos ni rollback de infraestructura.

## Open Questions

- Las URLs y QR aprobados de los canales de apoyo, las URLs públicas de Múltiplo/Boxio, y el dominio/hosting final permanecen como decisiones humanas previas al lanzamiento; no cambian este diseño ni se resuelven aquí.

## Apply inventory

- `src/layouts/BaseLayout.astro` is retained as the caller for navigation, mobile menu, metadata, footer, and floating CTA; its `/apoyanos` consumers remain all existing pages.
- `src/data/games.js` and the generated game routes are retained as the internal sharing destinations; no game repository or runtime is modified.
- `src/pages/apoyanos.astro` replaces only the foundation placeholder for `/apoyanos`; `src/components/Placeholder.astro` remains available for unrelated foundation placeholders.
