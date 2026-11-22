# website-catalog-and-institutional-pages Specification

## Purpose

Define el contenido institucional y el catálogo inicial de Beastie Studio para que las personas puedan descubrir el estudio, identificar Múltiplo y Boxio, consultar sus fichas y navegar desde móvil o escritorio sin depender de servicios de servidor.

## Requirements

### Requirement: El inicio presenta el propósito y el catálogo inicial

La ruta `/` SHALL mostrar el hero «Descubrir. Pensar. Compartir.», la firma «Juegos hechos con cariño.», los CTAs internos «Explorar juegos» y «Conoce Beastie Studio», y secciones de juegos, novedades, estudio y apoyo con el contenido aprobado en `docs/CONTENT.md`.

#### Scenario: Descubrimiento desde el inicio

- **DADO** que una persona visita `/`
- **CUANDO** recorre el contenido principal y activa los CTAs
- **ENTONCES** identifica el propósito de Beastie Studio, encuentra Múltiplo y Boxio, y los enlaces llevan a `/juegos` y `/nosotros` sin enlaces `#` engañosos

### Requirement: El catálogo y las fichas exponen exactamente los juegos aprobados

La ruta `/juegos` SHALL listar exactamente Múltiplo y Boxio. Las rutas `/juegos/multiplo` y `/juegos/boxio` SHALL presentar respectivamente el título, resumen, historia y CTA «Conocer» definidos en `docs/CONTENT.md`, sin reconstruir, embeber ni instalar los juegos.

#### Scenario: Catálogo sin duplicados ni juegos adicionales

- **DADO** que una persona visita `/juegos`
- **CUANDO** inspecciona las tarjetas y activa cada CTA
- **ENTONCES** solo encuentra Múltiplo y Boxio y cada tarjeta resuelve a su ficha correspondiente

#### Scenario: Ficha de Múltiplo

- **DADO** que una persona visita `/juegos/multiplo`
- **CUANDO** lee la ficha
- **ENTONCES** encuentra «Aprender multiplicación jugando.», el resumen, la historia aprobada y un CTA «Conocer» navegable dentro del sitio

#### Scenario: Ficha de Boxio

- **DADO** que una persona visita `/juegos/boxio`
- **CUANDO** lee la ficha
- **ENTONCES** encuentra «Estrategia sencilla, decisiones interesantes.», el resumen, la historia aprobada y un CTA «Conocer» navegable dentro del sitio

### Requirement: Los enlaces de juego reflejan únicamente disponibilidad verificada

Las fichas y tarjetas SHALL omitir el CTA «Jugar» cuando no exista una URL pública verificada en una fuente legítima. Si una URL se verifica posteriormente, el enlace SHALL apuntar exactamente a ese destino y no a un placeholder.

#### Scenario: URL de juego no verificada

- **DADO** que no hay una URL pública verificada para Múltiplo o Boxio
- **CUANDO** se renderiza el catálogo o una ficha
- **ENTONCES** no aparece un enlace «Jugar» accionable ni se afirma disponibilidad pública

### Requirement: Nosotros presenta el manifiesto sin datos institucionales inventados

La ruta `/nosotros` SHALL mostrar el título, propósito, manifiesto y firma aprobados en `docs/CONTENT.md`, sin inventar fundadores, cifras, sedes, premios, testimonios o promesas de disponibilidad.

#### Scenario: Lectura del manifiesto

- **DADO** que una persona visita `/nosotros`
- **CUANDO** lee la página
- **ENTONCES** entiende que Beastie Studio es un proyecto independiente y encuentra «Juegos hechos con cariño.» sin datos institucionales no confirmados

### Requirement: La composición usa referencias locales e ilustraciones correctamente identificadas

Las rutas de este cambio SHALL seguir la composición responsive y los tokens de las referencias locales declaradas en `docs/design/references/README.md`. Las ilustraciones conceptuales de Múltiplo y Boxio SHALL llevar texto alternativo adecuado y no SHALL presentarse como capturas reales de gameplay; cualquier asset ausente SHALL conservar un placeholder explícito y no accionable.

#### Scenario: Comparación responsive local

- **DADO** que existen las referencias locales requeridas y se reconstruye `home-desktop.png` con el procedimiento indicado
- **CUANDO** se comparan Inicio, catálogo y Nosotros en viewport móvil y desktop
- **ENTONCES** la navegación y composición son consistentes, no hay overflow horizontal causado por la interfaz y los controles mantienen foco visible y contraste suficiente

#### Scenario: Ilustración conceptual no confundida con gameplay

- **DADO** que se muestra una ilustración exportada de Múltiplo o Boxio
- **CUANDO** la persona la encuentra en una tarjeta o ficha
- **ENTONCES** el texto alternativo y el contexto la identifican como ilustración conceptual, no como una captura del juego
