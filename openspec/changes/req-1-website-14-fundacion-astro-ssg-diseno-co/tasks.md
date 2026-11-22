# Tasks

## 1. Configuración estática y estructura

- [x] 1.1 Crear el manifiesto y la configuración mínima de Astro SSG, fijar versiones reproducibles y documentar `npm install` y el build; verificar que la instalación y el build producen salida estática sin adaptador de servidor.
- [x] 1.2 Crear `src/pages`, `src/components`, `src/layouts`, `src/content`, `public/assets` y `tests` solo cuando sean necesarios; verificar que la estructura no introduce capas o servicios fuera del diseño.
- [x] 1.3 Añadir las páginas placeholder para `/`, `/juegos`, `/novedades`, `/nosotros` y `/apoyanos`; verificar que cada ruta existe en la salida estática y declara su estado placeholder sin contenido inventado.

## 2. Layout, navegación y accesibilidad

- [x] 2.1 Implementar el layout global compartido con header, footer y la firma «Juegos hechos con cariño.»; verificar que todas las páginas placeholder lo consumen.
- [x] 2.2 Implementar navegación desktop y menú móvil con enlaces a Inicio, Juegos, Novedades, Nosotros y Apóyanos, estado activo, control accesible y foco visible; verificarlo con teclado y con los cinco destinos desde cada ruta.
- [x] 2.3 Implementar el CTA flotante «¡Apóyanos!» y el enlace de apoyo del footer hacia `/apoyanos`; verificar navegación interna y que el CTA no cubre controles ni provoca overflow horizontal en viewports móviles.
- [x] 2.4 Añadir semántica, nombres accesibles, targets táctiles, contraste y estilos de foco conforme a `docs/DESIGN.md`; verificar ausencia de controles sin nombre y foco no visible en la revisión automatizada.

## 3. Identidad visual y dependencias de assets

- [x] 3.1 Definir tokens y estilos Warm Editorial Arcade a partir de `docs/DESIGN.md` y contrastarlos con las referencias locales declaradas; verificar que no se consultan Stitch ni enlaces externos.
- [x] 3.2 Ejecutar `python3 docs/design/references/restore-home-desktop.py` y verificar que `docs/design/references/home-desktop.png` mide 2560×8710; conservar los fragmentos como referencia exacta, no como asset de producción.
- [x] 3.3 Verificar la existencia, dimensiones y SHA-256 completo de los binarios aprobados contra `public/assets/brand/manifest.json`, integrar solo los coincidentes y registrar placeholder visible si falta alguno; verificar que el isotipo no sustituye la B de BEASTIE y que el favicon no tiene ala.
- [x] 3.4 Documentar en el cambio las diferencias puntuales frente a las capturas/HTML locales cuando existan; verificar que cada diferencia es atribuible a accesibilidad, SSG, placeholder o dependencia aprobada.

## 4. Verificación reproducible y entrega

- [x] 4.1 Declarar checks de smoke para build, rutas, enlaces internos, menú móvil, teclado, foco, viewport desktop/móvil y overflow horizontal; verificar que cada check tiene un resultado observable y no depende de validación humana para comportamiento automatizable.
- [x] 4.2 Asignar al ejecutor de navegador Chromium disponible la verificación real de navegación, apertura/cierre del menú y viewports; verificar y conservar evidencia de cada ruta y estado interactivo.
- [x] 4.3 Ejecutar la verificación final del cambio y revisar que no se añadieron CMS, backend, autenticación, analítica, cookies de seguimiento, donaciones reales ni despliegue; verificar el alcance mediante inspección del diff y los checks.
- [x] 4.4 Preparar un PR revisable con dependencias de assets, referencias faltantes si aplican, evidencia de build/rutas y límites de publicación; verificar que merge humano y despliegue permanecen pendientes de autorización.
