# Tasks

## 1. Inspección y preparación de assets

- [x] 1.1 Auditar los componentes Astro, estilos, datos y reglas heredadas que afectan Inicio, `/juegos`, heroes, catálogo, carrusel y navegación; verificar que el inventario documentado coincide con las rutas reales antes de editar.
- [x] 1.2 Integrar en el pipeline público los dos heroes V5.4 y las capturas fijadas por el README local, conservando dimensiones, hashes y nombres; verificar cada ruta con build y respuesta HTTP 200 en el servidor estático.
- [x] 1.3 Confirmar que `src/data/games.js` sigue siendo la única fuente del catálogo y que no aparecen entradas, escenas, logos, URLs o datos de pago inventados; verificar mediante inspección de datos y smoke test de rutas.

## 2. Heroes y movimiento progresivo

- [x] 2.1 Reestructurar el hero de Inicio para las tres líneas «Descubrir.», «Pensar.» y «Compartir.», la superficie marfil, el contorno legible y el CTA accesible; verificar composición completa en 1440×900 y 375×812.
- [x] 2.2 Reestructurar el hero de `/juegos` con `hero-juegos-islass.webp`, titular expresivo y secuencia análoga a la referencia sin reutilizar el arte de Inicio; verificar que texto, CTA e imagen no se cortan.
- [x] 2.3 Implementar el progreso acotado de ambos heroes y su transformación visual perceptible sin scroll-jacking; verificar automáticamente la posición de cada imagen en 0%, 50% y 100% del hero y confirmar un desplazamiento no nulo en movimiento normal.
- [x] 2.4 Añadir reveal progresivo, hover, foco y microinteracciones como mejora progresiva; verificar con JavaScript desactivado que todo el contenido y los enlaces siguen visibles y operables.
- [x] 2.5 Aplicar reduced-motion y fallback estático para heroes, reveals, carrusel y navegación; verificar con `prefers-reduced-motion: reduce` que no hay transiciones de movimiento y que los controles siguen utilizables.

## 3. Portafolio editorial y carrusel

- [x] 3.1 Reemplazar la cuadrícula institucional de `/juegos` por proyectos editoriales responsive alternados derivados de los datos; verificar en escritorio y móvil que hay más de dos entradas soportadas sin markup duplicado.
- [x] 3.2 Presentar las capturas principales y galerías completas con proporciones y `object-fit: contain`, sin recortar UI ni sustituir assets reales; verificar dimensiones intrínsecas, alt, overflow y estado 200 de cada recurso.
- [x] 3.3 Convertir `GameCarousel` en un track visible con transición deslizante y peek del siguiente slide, manteniendo flechas, indicadores, swipe, teclado, foco y links sin autoplay; verificar cambios deterministas para 2, 5 y 10 entradas mediante navegador.

## 4. Navegación y regresión visual

- [x] 4.1 Ajustar header y menú móvil para estados activo, hover, foco, contraste y elevación sin obstrucción ni overflow; verificar navegación por teclado y toque en los viewports soportados.
- [x] 4.2 Eliminar CSS superseded que vuelva a imponer banners, tarjetas ocultas o presentación institucional previa; verificar una matriz PASS/FAIL frente a `inicio.html` y `juegos.html` en estados inicial, medio y final.
- [x] 4.3 Preservar las rutas, copy, metadata SEO, JSON-LD, robots, sitemap, logo, favicon y la salida Astro SSG; verificar los checks existentes y una inspección de diff limitada a la aceptación del issue.

## 5. Pruebas y evidencia de entrega

- [x] 5.1 Ampliar los checks declarados para medir parallax, carrusel, reduced-motion, fallback, foco, assets 200, overflow y CLS con Chromium; verificar que los resultados sean observables y no comprobaciones de strings solamente.
- [x] 5.2 Ejecutar `npm run test`, `npm run test:browser` y `npm run build` con el executor configurado, registrando salida y rutas comprobadas; verificar por separado que cada comando termina con el resultado observado.
- [x] 5.3 Capturar Inicio y Juegos en 1440×900 y 375×812 al 0%, 50% y 100% del hero y preparar comparativas lado a lado con las referencias locales; verificar que la evidencia incluye movimiento, carrusel y no solo una captura estática.
- [x] 5.4 Entregar la matriz técnica y visual para revisión humana, dejando explícitos los límites de PR, merge, despliegue y validación posterior al merge; verificar que no se declara completitud por build verde ni se ejecuta despliegue.
