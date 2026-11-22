# Tasks

## 1. Preparación y datos editoriales

- [x] 1.1 Inspeccionar la implementación compartida y confirmar los consumidores actuales de layout, navegación, tarjetas, footer y CTA de apoyo; verificar que el alcance queda limitado a este repositorio y a las rutas del cambio.
- [x] 1.2 Crear una única fuente estática de datos para exactamente Múltiplo y Boxio con slug, título, resumen, historia, ilustración conceptual, alt y estado de URL pública; verificar que no contiene URLs no verificadas ni datos inventados.
- [x] 1.3 Ejecutar desde la raíz `python3 docs/design/references/restore-home-desktop.py` y verificar `docs/design/references/home-desktop.png` con dimensiones 2560×8710; conservar cualquier fallo como dependencia explícita sin modificar los fragmentos Base64.
- [x] 1.4 Verificar la existencia de los assets de marca obligatorios y contrastar sus SHA-256 completos con `public/assets/brand/manifest.json`; si hay discrepancia, conservar placeholder no accionable y registrar el bloqueo.

## 2. Rutas y contenido

- [x] 2.1 Sustituir el placeholder de `/` por hero, CTAs internos, catálogo destacado de dos juegos, novedades, estudio y apoyo conforme a `docs/CONTENT.md`; verificar destinos reales de cada CTA y ausencia de enlaces `#`.
- [x] 2.2 Implementar `/juegos` con exactamente Múltiplo y Boxio y CTAs «Conocer» hacia sus fichas; verificar que no aparecen juegos adicionales ni duplicados.
- [x] 2.3 Implementar `/juegos/multiplo` y `/juegos/boxio` desde la fuente estática compartida con títulos, resúmenes, historias y «Conocer»; verificar que no se embeben, instalan ni reconstruyen los juegos.
- [x] 2.4 Mantener omitido «Jugar» mientras no exista una URL pública verificada, y verificar que cualquier estado no disponible no tiene href accionable ni afirma disponibilidad.
- [x] 2.5 Sustituir el placeholder de `/nosotros` por el propósito, manifiesto y firma aprobados; verificar que no aparecen fundadores, cifras, sedes, premios ni testimonios inventados.
- [x] 2.6 Configurar títulos, descripciones y OG básicos para las rutas nuevas sin inventar dominio, canonical absoluto o URL social; verificar el HTML generado en build.

## 3. Presentación y retiro seguro

- [x] 3.1 Ajustar componentes y estilos reutilizados para seguir las referencias locales de Inicio, Juegos y Nosotros en desktop y móvil, con ilustraciones conceptuales identificadas mediante alt y placeholders explícitos cuando proceda; verificar foco visible, contraste y ausencia de overflow en los viewports definidos.
- [x] 3.2 Retirar únicamente el markup placeholder sustituido en `/`, `/juegos` y `/nosotros` después de verificar las rutas nuevas, y adaptar `tests/smoke.test.mjs` para que reconozca el contenido editorial que reemplaza los placeholders en esas rutas; verificar que permanecen intactas las rutas y capacidades fuera de este cambio y que `npm run test` no falla por las aserciones antiguas de `Placeholder`.

## 4. Verificación ejecutada

- [x] 4.1 Ejecutar `npm run test` con el executor configurado y conservar evidencia del build/smoke check y de las rutas base renderizadas.
- [x] 4.2 Ejecutar `npm run test:browser` con el executor de navegador configurado; verificar en desktop y móvil navegación por menú, rutas `/`, `/juegos`, ambas fichas y `/nosotros`, contenido clave, enlaces, foco, viewport y ausencia de overflow horizontal, con resultado observable.
- [x] 4.3 Revisar la evidencia visual local de Home y catálogo en dos tamaños y preparar el material comparativo para el PR; verificar que no se abrió Stitch ni se usaron referencias externas.
- [x] 4.4 Confirmar diff final contra proposal, specs y design, registrar dependencias pendientes (URLs públicas y dominio) y preparar PR para revisión y merge humano; verificar que no hubo despliegue ni cambios en Múltiplo o Boxio.
