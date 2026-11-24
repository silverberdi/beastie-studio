# Spec Delta

## MODIFIED Requirements

### Requirement: El layout global ofrece navegación coherente y accesible

Toda página placeholder SHALL usar un layout compartido con header, navegación desktop y móvil, footer y enlaces internos a `/`, `/juegos`, `/novedades`, `/nosotros` y `/apoyanos`. La navegación SHALL exponer estado activo, foco de teclado visible, nombres accesibles, controles táctiles cómodos y estados de hover/elevación perceptibles sin depender exclusivamente del color.

#### Scenario: Navegación desktop

- **DADO** que una persona visita cualquier ruta placeholder en un viewport desktop
- **CUANDO** observa y usa el header y el footer
- **ENTONCES** encuentra los cinco destinos requeridos, el destino actual se identifica mediante estado activo y cada enlace interno resuelve a su ruta correcta

#### Scenario: Menú móvil operable

- **DADO** que una persona visita cualquier ruta placeholder en un viewport móvil
- **CUANDO** abre y cierra el control del menú y activa sus enlaces por toque o teclado
- **ENTONCES** puede acceder a todas las secciones, el estado abierto/cerrado es perceptible y el menú no provoca overflow horizontal

#### Scenario: Foco de teclado

- **DADO** que una persona navega mediante teclado
- **CUANDO** mueve el foco por los controles del header, menú, contenido, CTA flotante y footer
- **ENTONCES** cada control enfocado tiene un indicador visible, orden lógico y nombre accesible

#### Scenario: Hover, activo y elevación

- **DADO** que una persona navega en escritorio o móvil por el header
- **CUANDO** pasa sobre, enfoca o activa un enlace de navegación
- **ENTONCES** el control muestra una transición y elevación discretas, el estado activo es claramente distinguible y el contraste sigue siendo accesible
- **Y** la interacción no desplaza inesperadamente el contenido ni elimina el indicador de foco
