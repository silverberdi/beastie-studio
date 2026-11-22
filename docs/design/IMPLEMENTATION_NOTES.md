# Notas de implementación de la fundación

La fundación usa las referencias locales de `docs/design/references/` y el sistema Warm Editorial Arcade documentado en `docs/DESIGN.md`. Las páginas son placeholders explícitos porque este Change no autoriza contenido final, disponibilidad de juegos ni canales de cobro.

## Diferencias frente a las referencias

- El contenido editorial de las capturas se sustituye por estados placeholder visibles: es una dependencia aprobada por el alcance SSG.
- El header y el footer son componentes compartidos y la navegación móvil añade botón con `aria-expanded`, foco visible y enlace de salto: son adaptaciones de accesibilidad y reutilización.
- Las fuentes declaran fallback local para builds sin red; la referencia tipográfica se conserva sin hacer depender el build de una descarga.

## Assets

Los binarios aprobados se integran verbatim según `public/assets/brand/manifest.json`. El logo conserva la palabra completa `BEASTIE`; el favicon usa la fuente sin ala. El hash completo se verifica en `tests/smoke.test.mjs`.

## Alcance de entrega

No se añadieron CMS, backend, autenticación, analítica, cookies de seguimiento, donaciones accionables ni despliegue. El merge y la publicación requieren revisión y autorización humana.
