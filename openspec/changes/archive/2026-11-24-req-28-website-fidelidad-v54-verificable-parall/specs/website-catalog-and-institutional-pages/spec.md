# Spec Delta

## ADDED Requirements

### Requirement: El catálogo visual consume composiciones auténticas desde datos

El registro central de juegos SHALL exponer la ruta de composición de cada juego cuando exista. Inicio SHALL presentar Múltiplo y Boxio como elementos del carrusel desde su primera carga; `/juegos` SHALL presentar bloques editoriales grandes y alternados, responsivos y data-driven. Las galerías de `/juegos/[slug]` SHALL continuar usando capturas individuales reales.

#### Scenario: Carrusel y catálogo comparten la fuente de datos

- **DADO** que `games.js` contiene los juegos aprobados y sus composiciones locales
- **CUANDO** se construyen Inicio y `/juegos`
- **ENTONCES** ambas vistas referencian las mismas composiciones sin duplicar entradas ni inventar juegos
- **Y** cada juego conserva un enlace interno «Conocer» a su ficha

#### Scenario: Carrusel sin autoplay y ampliable

- **DADO** que el carrusel contiene dos o más juegos
- **CUANDO** la persona usa flechas, indicadores, teclado o swipe
- **ENTONCES** cambia de forma determinista, deja visible el estado activo y no inicia autoplay
- **Y** la estructura admite entre 2 y 10 o más entradas válidas desde datos

### Requirement: La presentación editorial conserva las proporciones de cada juego

Las composiciones de Múltiplo y Boxio SHALL mostrarse completas, sin recorte ni distorsión, con layout diferenciado para relación vertical y horizontal, y con CTAs visibles en 320, 375, 768 y 1440 px. La falta de un asset no SHALL resolverse generando una imagen nueva.

#### Scenario: Montaje vertical y horizontal legible

- **DADO** que la persona observa el catálogo en móvil o escritorio
- **CUANDO** recorre los bloques de Múltiplo y Boxio
- **ENTONCES** la pantalla vertical de Múltiplo no queda perdida en una caja horizontal y la composición horizontal de Boxio conserva su tablero completo
- **Y** ninguna imagen produce overflow ni oculta sus controles o CTA
