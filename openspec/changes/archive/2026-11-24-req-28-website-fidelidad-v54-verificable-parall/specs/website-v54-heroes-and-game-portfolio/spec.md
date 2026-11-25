# Spec Delta

## ADDED Requirements

### Requirement: El parallax V5.4 es perceptible y conserva el scroll natural

Inicio SHALL usar `hero-parque-beastie.webp` y `/juegos` SHALL usar `hero-juegos-islass.webp` como ilustraciones independientes. En movimiento normal, la imagen SHALL recorrer una distancia observable detrás del titular entre 0 %, 50 % y 100 % del tramo del hero, mientras el titular, CTA y header sticky permanecen legibles y no cortados. El scroll SHALL seguir siendo nativo, sin scroll-jacking.

#### Scenario: Recorrido visible de Inicio y Juegos

- **DADO** que la persona visita Inicio o `/juegos` a 1440×900 con movimiento reducido desactivado
- **CUANDO** captura cada hero al inicio, mitad y final del tramo de scroll
- **ENTONCES** observa entrada, recorrido y salida de la ilustración detrás del titular, con posiciones computadas distintas y perceptibles
- **Y** Inicio usa el parque y Juegos usa la ilustración de Islass, sin reutilizar un recorte del otro hero

#### Scenario: Composición estática reducida y sin JavaScript

- **DADO** que `prefers-reduced-motion` indica `reduce` o que JavaScript está desactivado
- **CUANDO** se abre Inicio o `/juegos`
- **ENTONCES** la composición queda estática, digna y completamente visible
- **Y** los textos, enlaces y CTA siguen operables sin depender del parallax

### Requirement: Las interacciones V5.4 tienen estados observables y accesibles

CTA, enlaces de `.site-nav`, tarjetas relevantes y controles del carrusel SHALL mostrar transición real de aproximadamente 180–280 ms, elevación equivalente a `translateY(-3px)` o profundidad sutil en hover/focus, y feedback de presión en active/touch. Los estados focus SHALL ser visibles y no SHALL depender de hover ni de animación permanente.

#### Scenario: Estados computados de controles

- **DADO** un control visible en escritorio
- **CUANDO** el navegador compara computed style en normal, hover, active y focus
- **ENTONCES** registra cambios observables de transform, sombra, color o profundidad acordes a cada estado
- **Y** el foco permanece visible al navegar con teclado

### Requirement: Las composiciones finales son el arte principal del catálogo

El carrusel de Inicio SHALL consumir desde los datos las composiciones `public/assets/v5/compositions/multiplo-composicion.webp` y `boxio-composicion.webp` desde la primera carga, sin autoplay, con flechas/indicadores o swipe y enlaces reales a las fichas. `/juegos` SHALL mostrar las mismas composiciones en bloques editoriales grandes alternados por índice. Ambas SHALL conservar proporciones y mostrarse completas con `object-fit: contain`; las fichas SHALL conservar sus galerías individuales.

#### Scenario: Múltiplo y Boxio visibles desde la primera carga

- **DADO** que el catálogo contiene Múltiplo y Boxio
- **CUANDO** se abre Inicio o `/juegos`
- **ENTONCES** las composiciones auténticas son el arte principal y se identifican mediante enlaces a `/juegos/multiplo` y `/juegos/boxio`
- **Y** no se usan portadas tipográficas ni montajes nuevos como sustituto

#### Scenario: Relaciones de aspecto conservadas

- **DADO** que se visualizan las composiciones en desktop y móvil
- **CUANDO** se calcula su caja y se inspecciona la imagen
- **ENTONCES** Múltiplo conserva la composición vertical completa y Boxio la horizontal completa, sin recortar ni distorsionar UI real

### Requirement: La evidencia de navegador verifica comportamiento real

La validación SHALL usar el executor de navegador configurado para registrar screenshots o video/GIF breve, scroll 0/50/100 %, transformaciones computadas de imagen y texto, estados de controles, carrusel, reduced motion, no-JS, overflow, CLS y respuestas 200 de assets en 1440×900 y 375×812. Un build o test verde por sí solo no SHALL declarar fidelidad completada.

#### Scenario: Evidencia reproducible de interacción y movimiento

- **DADO** un build estático servido localmente
- **CUANDO** el executor recorre Inicio, `/juegos` y ambas fichas en desktop y móvil
- **ENTONCES** conserva resultados observables de parallax, controles, carrusel, reduced motion, no-JS, assets y estabilidad
- **Y** si no existe acceso a navegador real o captura, el estado queda bloqueado con la explicación concreta de la capacidad ausente
