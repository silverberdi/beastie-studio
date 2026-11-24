# Spec Delta

## MODIFIED Requirements

### Requirement: Los heroes V5.4 usan el arte correcto y conservan la lectura

Inicio SHALL usar `docs/design/references/v5/assets/hero-parque-beastie.webp` a ancho completo detrás de «Descubrir. Pensar. Compartir.» y `/juegos` SHALL usar exclusivamente `docs/design/references/v5/assets/hero-juegos-islass.webp` detrás de «Nuestros juegos.». Los titulares SHALL componerse como tipografía editorial expresiva, con «Pensar.» en azul, contorno marfil `#FFF8F4` cuando el arte pase detrás y contenido completo dentro del viewport. Cada hero SHALL ofrecer una transición visible desde la superficie marfil hacia el arte y un recorrido de imagen perceptible ligado al progreso del hero, sin alterar el scroll natural.

#### Scenario: Hero de Inicio con recorrido perceptible

- **DADO** que una persona visita Inicio en escritorio o móvil
- **CUANDO** desplaza desde el inicio hasta pasar el hero
- **ENTONCES** la imagen ocupa el ancho y se desplaza perceptiblemente detrás del titular, con entrada, recorrido y salida coherentes sin alterar el scroll natural
- **Y** el texto «Descubrir. Pensar. Compartir.» conserva su contorno marfil y no queda cortado

#### Scenario: Hero único de Juegos

- **DADO** que una persona visita `/juegos`
- **CUANDO** atraviesa el hero haciendo scroll
- **ENTONCES** se muestra `hero-juegos-islass.webp` y no `hero-parque-beastie.webp`
- **Y** «Nuestros juegos.» y sus controles permanecen legibles y dentro del viewport

#### Scenario: Composición editorial de Inicio

- **DADO** que el arte atraviesa la zona del titular durante el scroll
- **CUANDO** se observan el inicio, la mitad y el final del hero
- **ENTONCES** «Descubrir.», «Pensar.» y «Compartir.» permanecen en líneas distinguibles, con «Pensar.» azul y contorno marfil legible sobre el arte
- **Y** la imagen recorre una distancia visiblemente perceptible sin quedar limitada a un desplazamiento imperceptible

#### Scenario: Composición editorial de Juegos

- **DADO** que una persona recorre el hero de `/juegos`
- **CUANDO** el arte y el titular cambian de etapa
- **ENTONCES** ambos forman una secuencia análoga a `docs/design/references/v5/juegos.html`
- **Y** ningún título, CTA o imagen queda oculto bajo el header o cortado por el viewport

### Requirement: El movimiento es accesible, responsive y no secuestra el scroll

Los efectos de parallax, reveal y carrusel SHALL usar una técnica de animación acotada al componente y listeners pasivos o CSS equivalente, sin scroll-jacking. Con `prefers-reduced-motion: reduce`, la composición SHALL quedar estática y usable sin JavaScript, conservando texto, enlaces y controles. La composición SHALL ser usable en 320, 375, 768, 1024 y 1440 px, manteniendo la paleta y fuentes aprobadas. Los bloques SHALL aparecer progresivamente de forma discreta con un estado visible y funcional antes de la mejora de movimiento.

#### Scenario: Movimiento reducido

- **DADO** que el navegador indica `prefers-reduced-motion: reduce`
- **CUANDO** se renderizan Inicio, `/juegos` y un carrusel
- **ENTONCES** no se ejecutan animaciones de movimiento y permanece una composición estática usable
- **Y** los enlaces, textos y controles siguen disponibles sin depender de JavaScript

#### Scenario: Responsive sin recorte funcional

- **DADO** que una persona usa cualquiera de los cinco anchos soportados
- **CUANDO** navega heroes y catálogo
- **ENTONCES** no existe overflow horizontal causado por la interfaz, el titular se ajusta y ningún CTA o control queda fuera del viewport

#### Scenario: Revelado progresivo con fallback

- **DADO** que una persona navega Inicio o `/juegos` con JavaScript disponible o desactivado
- **CUANDO** una sección entra en el viewport
- **ENTONCES** sus bloques pueden revelarse de forma discreta con un estado inicial legible, y sin JavaScript todo el contenido permanece visible y operable
- **Y** el movimiento no es necesario para descubrir texto, enlaces o CTAs

### Requirement: Las capturas reales son datos publicables del catálogo

El catálogo SHALL continuar siendo data-driven desde `src/data/games.js`. Múltiplo SHALL usar `assets/screenshots/multiplo/multiplo-pregunta-1.webp` como principal y Boxio SHALL usar `assets/screenshots/boxio/boxio-partida-local.webp`; las galerías opcionales SHALL conservar las cinco rutas adicionales fijadas en `docs/design/references/v5/README.md`. Las rutas finales SHALL resolverse desde assets públicos servidos por Astro o un pipeline documentado y no SHALL usar `illustration-*-concept.png` como visual principal. `/juegos` SHALL presentar proyectos grandes apilados con alternancia visual editorial, adaptados a móvil, y las imágenes SHALL mostrarse completas con `object-fit: contain` sin recortar UI.

#### Scenario: Principales y galerías del catálogo

- **DADO** que existen Múltiplo y Boxio en `games.js`
- **CUANDO** se muestran Inicio, `/juegos` o una ficha
- **ENTONCES** Múltiplo muestra `multiplo-pregunta-1.webp` y Boxio muestra `boxio-partida-local.webp`
- **Y** las fichas pueden mostrar `multiplo-demo-inicial.webp`, `multiplo-respuesta-correcta.webp`, `multiplo-pregunta-2.webp`, `boxio-menu-modos.webp` y `boxio-partida-multibot.webp` como galerías reales

#### Scenario: Assets servidos y rutas íntegras

- **DADO** un build Astro servido mediante la publicación estática configurada
- **CUANDO** se solicitan las capturas principales y de galería
- **ENTONCES** cada asset resuelve mediante una ruta final válida con estado 200
- **Y** Múltiplo conserva 746×1178, Boxio conserva 1247×818 y la imagen completa se presenta sin recortar preguntas, respuestas, controles o tablero

#### Scenario: Portafolio editorial responsive

- **DADO** que una persona observa `/juegos` en escritorio y móvil
- **CUANDO** recorre el catálogo
- **ENTONCES** los proyectos aparecen como composiciones editoriales prominentes y alternadas, generadas desde los datos sin hardcodear entradas
- **Y** la disposición se adapta a móvil sin recortar las capturas reales ni perder sus CTAs

### Requirement: Inicio y Juegos ofrecen un carrusel accesible y sin autoplay

El carrusel del Inicio SHALL derivarse de `games.js`, admitir dos, cinco, diez o más juegos sin entradas inventadas, y ofrecer flechas, puntos, estado activo, swipe, teclado y navegación rastreable. SHALL permanecer sin autoplay. El contenido SHALL disponerse en un track visible con transición deslizante perceptible y un peek del siguiente slide, sin ocultar instantáneamente todas las tarjetas no activas.

#### Scenario: Navegación multi-item

- **DADO** que `games.js` contiene Múltiplo y Boxio
- **CUANDO** una persona usa flechas, puntos, swipe o teclado
- **ENTONCES** cambia el elemento activo de forma determinista, el estado activo es perceptible y la navegación no inicia autoplay
- **Y** cada elemento conserva un nombre accesible y un destino rastreable

#### Scenario: Catálogo ampliable desde datos

- **DADO** que el registro de juegos recibe dos, cinco, diez o más entradas válidas
- **CUANDO** se construyen Inicio y `/juegos`
- **ENTONCES** las tarjetas y el carrusel se generan desde esos datos sin duplicar tarjetas hardcodeadas ni inventar juegos

#### Scenario: Track deslizante con peek

- **DADO** que el carrusel muestra más de un juego
- **CUANDO** se selecciona otro indicador, flecha, enlace, foco o gesto de swipe
- **ENTONCES** el track cambia de posición con una transición deslizante perceptible y deja visible parte del siguiente elemento cuando el viewport lo permite
- **Y** el carrusel no usa autoplay ni un salto instantáneo basado en ocultar las tarjetas restantes

### Requirement: La verificación V5.4 produce evidencia de navegador reproducible

Apply o Verify SHALL ejecutar los comandos declarados `npm run test`, `npm run test:browser` y `npm run build`, y un navegador real SHALL comprobar Inicio, `/juegos`, ambas fichas, assets 200, carrusel multi-item, enlaces, foco, reduced motion, fallbacks y ausencia de overflow en escritorio y móvil. La evidencia SHALL distinguir checks automatizables de validaciones físicas o decisiones humanas. También SHALL medir la diferencia de posición de las imágenes entre etapas del hero y registrar CLS observable; no SHALL inferir resultados de strings o de la mera existencia de una clase.

#### Scenario: Evidencia completa de vistas y comportamiento

- **DADO** que el sitio se sirve desde el build estático
- **CUANDO** el ejecutor captura Inicio y Juegos al inicio, mitad y final del scroll en desktop y móvil, y abre ambas fichas
- **ENTONCES** conserva evidencia de la composición, capturas completas, navegación, foco, carrusel, enlaces y estado de movimiento reducido
- **Y** registra el resultado observable de los tres comandos declarados sin pedir al operador que ejecute navegación automatizable

#### Scenario: Dependencias humanas separadas

- **DADO** que el resultado está listo para revisión
- **CUANDO** se prepara el PR
- **ENTONCES** PR, merge, release y cualquier validación física posterior quedan explícitamente bajo control humano
- **Y** no se declara despliegue, cobro activo ni implementación terminada por el mero hecho de que el build pase

#### Scenario: Medición de movimiento y estabilidad

- **DADO** que el build se sirve en un navegador automatizado con viewports 1440×900 y 375×812
- **CUANDO** se recorren las posiciones 0%, 50% y 100% de cada hero
- **ENTONCES** se registra la posición observable de la imagen, se evidencia un desplazamiento perceptible en movimiento normal y se registra CLS sin inventar resultados
- **Y** la comparación visual usa los HTML y assets locales de `docs/design/references/v5/`
