# Tasks

## 1. Inventario y registro central

- [x] 1.1 Inspeccionar el estado real de `main`, `src/data/games.js`, todos los consumidores de `publicUrl`, rutas, tests y documentación pendiente; verificar que el inventario no toca los repositorios Múltiplo ni Boxio.
- [x] 1.2 Sustituir únicamente los valores nulos del registro por `https://multiplo.silverman.pro/` y `https://boxio.silverman.pro/`, y verificar mediante un test de datos que cada juego conserva exactamente su URL canónica y que no existen duplicaciones de destino.

## 2. CTAs y navegación

- [x] 2.1 Ajustar los componentes de tarjetas, Inicio, catálogo y fichas para derivar «Jugar» del registro central y mantener «Conocer» como enlace interno; verificar los cuatro recorridos con tests de mapeo de href.
- [x] 2.2 Aplicar el tratamiento accesible definido para enlaces externos, incluyendo nombre comprensible de la acción si se abre nueva pestaña, y verificar teclado, foco visible, toque y ausencia de overflow en desktop y móvil.
- [x] 2.3 Verificar que la base/prefijo de publicación solo afecta rutas internas y no transforma las dos URLs absolutas; comprobar assets y navegación interna en la salida estática.

## 3. Documentación y retiro seguro

- [x] 3.1 Actualizar `docs/DECISIONS.md` y cualquier documentación afectada para retirar solo la afirmación de que estas dos URLs están pendientes, conservando pendientes reales de dominio, pagos y publicación; verificar con búsqueda que no quede una afirmación contradictoria.
- [x] 3.2 Retirar la condición antigua que trataba Múltiplo y Boxio como no publicados, conservando el comportamiento no accionable para juegos futuros sin URL; verificar que el diff no modifica branding, ilustraciones ni mejoras de #11.

## 4. Verificación técnica y evidencia

- [x] 4.1 Ejecutar el test configurado (`npm test` / `node --test tests/smoke.test.mjs`) y verificar rutas, mapeo de URLs, separación «Jugar»/«Conocer» y ausencia de enlaces a GitHub.
- [x] 4.2 Ejecutar `npm run build` y verificar la salida Astro estática bajo la base real, incluyendo `/`, `/juegos`, `/juegos/multiplo` y `/juegos/boxio`.
- [x] 4.3 Asignar al ejecutor configurado la prueba real de navegador (`npm run test:browser` / `node tests/browser-smoke.mjs`) en desktop y móvil; verificar CTAs de las tres superficies, menú, foco, alt, overflow y rutas internas con resultado observable.
- [x] 4.4 Comprobar por HTTP y navegador las URLs canónicas de Múltiplo y Boxio, y entregar una tabla `juego | URL canónica comprobada | fuente | resultado HTTP/navegador | fecha`; si alguna falla, registrar `NO VERIFICADO` sin cambiar el valor.
- [x] 4.5 Conservar capturas o registros verificables de Inicio, catálogo y ambas fichas, revisar el diff contra el estado integrado de #11 y preparar la evidencia del PR para merge humano sin deploy manual.
