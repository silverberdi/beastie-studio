# Design

## Context

El cambio se apoya en el contrato V5.4 existente, el catálogo data-driven y la publicación Astro SSG. Las referencias autorizadas son los HTML y assets locales bajo `docs/design/references/v5/`; las composiciones finales ya existen en `public/assets/v5/compositions/` y no deben regenerarse. La entrega debe conservar SEO/semántica de #20, no introducir backend ni tocar los juegos externos. Ver `proposal.md` para la motivación.

## Goals / Non-Goals

**Goals:**

- Entregar dos heroes independientes con parallax perceptible y scroll nativo, con composición estática usable como fallback.
- Centralizar las rutas de composiciones en los datos de juegos y reutilizarlas en carrusel, catálogo y fichas sin duplicación.
- Hacer medibles los estados de interacción y probarlos en navegador real en los viewports definidos.
- Mantener carga estable, semántica HTML, accesibilidad, SEO y ausencia de recorte de capturas.

**Non-Goals:**

- No rediseñar otras rutas, cambiar branding, reemplazar el logo ni generar screenshots o montajes nuevos.
- No añadir React, CMS, backend, analítica, dependencias UI pesadas ni scroll-jacking.
- No desplegar, abrir PR, hacer merge ni resolver decisiones humanas de dominio, publicación o assets.

## Decisions

1. **Parallax acotado por hero con progreso del componente.** Cada hero conservará su imagen en el HTML y aplicará un desplazamiento pequeño y observable derivado de su progreso dentro del viewport, preferentemente con `transform` y listener pasivo o equivalente CSS. Se elige esto sobre scroll-jacking y sobre un parallax global porque mantiene el scroll nativo, limita el coste y permite medir imagen y texto por separado.

2. **Fallback HTML/CSS primero.** El texto, CTA y estructura visual se renderizarán visibles antes de cualquier mejora JS. `prefers-reduced-motion` y ausencia de JS anularán transforms y transiciones de movimiento. Se elige sobre ocultar/revelar contenido porque SEO, teclado y no-JS son contratos existentes.

3. **Composiciones como dato de juego.** Se añadirá un campo de composición local al registro central y un componente reusable recibirá la relación de aspecto y el índice para resolver layout vertical/horizontal y alternancia. Se elige sobre rutas hardcodeadas en páginas para mantener el carrusel ampliable y evitar divergencia entre Inicio y Juegos.

4. **Animaciones CSS pequeñas y estados nativos.** Hover, focus-visible, active y touch usarán transiciones de 180–280 ms, transform/sombra sutil y foco visible; los controles no dependerán de animación permanente. Se elige CSS/JS pequeño sobre una biblioteca de interacción porque Astro estático y la superficie del cambio no justifican una dependencia nueva.

5. **Evidencia en el executor browser configurado.** El check browser existente se ampliará para medir computed styles, scroll, media query de reduced motion, no-JS, respuestas de assets, overflow y estabilidad, además de guardar capturas o video breve. Se elige el executor configurado sobre instrucciones al operador porque viewport, navegación y asincronía son automatizables según el request.

6. **Retiro seguro de la presentación suplantada.** Se inventariarán portadas tipográficas, cajas horizontales o recortes que dejen de ser consumidores de las capturas y se retirarán solo cuando la composición nueva esté integrada y cubierta por evidencia. No se borrarán assets históricos ni referencias locales.

## Risks / Trade-offs

- [Parallax imperceptible o excesivo] → definir umbrales observables en la evidencia, comparar 0/50/100 % y limitar el desplazamiento para no cortar titulares ni aumentar CLS.
- [Fallback inconsistente entre JS y no-JS] → renderizar contenido completo en HTML, probar la misma matriz con scripts desactivados y reduced motion.
- [Composición vertical pequeña en desktop] → usar contenedor diferenciado por relación de aspecto, `contain`, dimensiones explícitas y revisión en 375/768/1440 px.
- [El harness no puede capturar video o computed styles] → registrar la capacidad faltante como bloqueo concreto; no declarar completitud con solo build/tests.
- [Regresión de SEO o carga] → ejecutar los tres comandos declarados, auditar dist y conservar preload/prioridad de heroes, alt, landmarks y metadatos existentes.

## Migration Plan

1. Inspeccionar callers y componentes actuales de hero, catálogo, carrusel, fichas y checks browser; registrar qué presentación queda sustituida.
2. Añadir las rutas de composición a los datos y adaptar componentes reutilizables, manteniendo primero el HTML visible y las galerías individuales.
3. Aplicar parallax, estados de interacción y responsive; retirar únicamente la presentación antigua demostrablemente suplantada.
4. Ejecutar `npm run test`, `npm run test:browser` y `npm run build`; servir el build local y ejecutar la matriz browser con evidencia visual y de computed styles.
5. Si falla la verificación, revertir el cambio de presentación manteniendo los assets versionados y documentar el fallo. El despliegue y el merge requieren el flujo humano posterior.

