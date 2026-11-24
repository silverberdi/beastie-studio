# Design

## Context

El cambio parte de un sitio Astro SSG que ya conserva rutas, contenido, SEO y componentes compartidos, pero cuya implementación visual de V5.4 es reducida. La referencia ejecutable y normativa está únicamente en `docs/design/references/v5/inicio.html`, `juegos.html`, sus assets y el README local; no se copiarán HTML de referencia como páginas de producción ni se consultará Stitch.

## Goals / Non-Goals

**Goals:**

- Reutilizar la estructura y datos existentes, corrigiendo la composición visual dentro del mismo flujo Astro.
- Hacer que el progreso normal del scroll controle de forma medible el recorrido de cada hero, sin secuestrar el scroll.
- Mantener una ruta sin JavaScript, una variante estática para movimiento reducido y controles accesibles.
- Servir los assets V5.4 desde rutas de producción verificables y conservar sus proporciones.
- Obtener evidencia comparable en navegador real, incluyendo posiciones del hero, carrusel, CLS y viewports solicitados.

**Non-Goals:**

- Crear un rediseño, cambiar branding, redibujar el logo o inventar ilustraciones, juegos, enlaces o datos de pago.
- Introducir React, una librería de animación pesada, un CMS, backend, scroll-jacking o autoplay.
- Cambiar el contenido editorial, las rutas SEO o los repositorios de Múltiplo y Boxio.
- Declarar despliegue, merge, publicación o aprobación humana como resultado automático del build.

## Decisions

### 1. Progreso de hero acotado al layout y CSS

Cada hero conservará su flujo normal y expondrá un progreso acotado entre entrada y salida. Un controlador ligero actualizará variables CSS de transformación en un listener pasivo o mediante una alternativa equivalente; la imagen será el único plano desplazado y el titular conservará su jerarquía y legibilidad. CSS será responsable de contornos, transición marfil-arte, estados iniciales y `prefers-reduced-motion`.

Se elige esta separación sobre un observer que solo active una clase porque la referencia exige medir una distancia de imagen perceptible en tres posiciones del recorrido. Se evita fijar el documento o manipular `scrollTop`, que produciría scroll-jacking y más riesgo de CLS.

### 2. Mejora progresiva para reveal y microinteracciones

Los bloques recibirán un estado base visible y, cuando haya JavaScript, un `IntersectionObserver` podrá añadir una clase de entrada discreta. Hover, foco, activo y elevación se resolverán con transiciones CSS y no serán necesarios para leer o navegar. La variante reduced-motion desactiva transformaciones y transiciones de movimiento, pero conserva contraste, foco y contenido.

Se elige mejora progresiva sobre ocultar elementos hasta que cargue JavaScript para que la navegación siga funcionando con scripts desactivados y para no convertir la animación en una dependencia de contenido.

### 3. Assets y catálogo desde una única fuente de datos

Se mantendrá `src/data/games.js` como registro de juegos. Los recursos fijados por el README V5.4 se copiarán o integrarán mediante el pipeline Astro en rutas públicas, comprobando dimensiones, integridad y estado 200. El portafolio usará una composición editorial alternada derivada de los índices de los datos; las capturas se mostrarán en contenedores que respeten su relación de aspecto con `object-fit: contain`.

Se elige conservar el modelo data-driven sobre markup por página para que el carrusel y el catálogo soporten entre 2 y 10 o más entradas sin duplicación. No se usa `cover` porque recortaría UI real de Múltiplo o Boxio.

### 4. Carrusel basado en track visible

El carrusel conservará controles y enlaces semánticos, pero moverá un track horizontal mediante una posición calculada para el índice activo. El viewport mostrará un peek del siguiente slide cuando el ancho lo permita; botones, indicadores, teclado y swipe modificarán el mismo estado. No habrá autoplay. Con reduced-motion la posición cambia sin transición, y con un solo elemento se mantiene una presentación estable.

Se elige un track sobre alternar `hidden` porque la transición y el peek son parte observable de la aceptación. El índice se normaliza contra la longitud del registro para soportar catálogos futuros.

### 5. Verificación visual y de estabilidad en el executor configurado

Apply/Verify ejecutará `npm run test`, `npm run test:browser` y `npm run build`, servirá la salida estática y usará el Chromium disponible para inspeccionar 1440×900 y 375×812. Las comprobaciones registrarán posiciones de imagen en 0/50/100%, cambios de índice del carrusel, rutas de assets, overflow, foco, reduced-motion y CLS. Las capturas lado a lado se tomarán contra los HTML locales equivalentes; la decisión de fidelidad final y cualquier revisión física quedan separadas bajo control humano.

No se introduce Playwright como dependencia del proyecto si el harness/configuración existente puede ejecutar el navegador declarado; cualquier adaptación de los checks se mantiene en la herramienta de prueba configurada y no en un runtime público.

## Risks / Trade-offs

- [Riesgo] El desplazamiento puede verse débil en ciertos tamaños o velocidades de scroll → Mitigación: medir la posición en tres etapas, ajustar el recorrido contra la referencia local y registrar evidencia visual desktop/móvil.
- [Riesgo] El contorno del titular puede perder legibilidad sobre zonas claras del arte → Mitigación: usar `paint-order`/`-webkit-text-stroke` y una sombra o fallback CSS robusto, validado con contraste en cada etapa.
- [Riesgo] El asset no queda servido por la ruta final → Mitigación: comprobar copia/pipeline, estado 200 y dimensiones en navegador antes de declarar la tarea verificable.
- [Riesgo] La animación introduce CLS o overflow horizontal → Mitigación: reservar dimensiones de imagen, limitar transformaciones al plano visual y medir CLS/overflow en los viewports del contrato.
- [Riesgo] La navegación móvil pierde contraste al añadir elevación → Mitigación: conservar estados de foco visibles, tamaños táctiles y contraste independiente del color.
- [Riesgo] La referencia y la implementación divergen por herencia CSS → Mitigación: retirar reglas superseded dentro del mismo cambio y comparar los estados inicial/medio/final, no solo la presencia de clases.

## Migration Plan

1. Ajustar componentes, estilos, assets y checks dentro del branch del cambio; no tocar producción.
2. Ejecutar build, pruebas declaradas y verificación de navegador sobre la salida estática.
3. Revisar la evidencia visual y técnica en PR; si la regresión es material, revertir el commit del cambio sin migración de datos.
4. Después del merge humano, realizar la validación visual explícita sobre el despliegue; no confundir éxito de Actions con fidelidad visual.
