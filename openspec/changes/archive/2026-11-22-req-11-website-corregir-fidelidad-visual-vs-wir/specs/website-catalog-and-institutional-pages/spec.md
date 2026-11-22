# Spec Delta

## MODIFIED Requirements

### Requirement: El inicio presenta el propósito y el catálogo inicial

La ruta `/` SHALL mostrar el hero «Descubrir. Pensar. Compartir.», la firma «Juegos hechos con cariño.», los CTAs internos «Explorar juegos» y «Conoce Beastie Studio», y secciones visualmente completas de juegos, novedades, estudio y apoyo con el contenido aprobado en `docs/CONTENT.md`. La composición SHALL recuperar la jerarquía, fondos, ilustración, formas, espaciado y ritmo de las referencias desktop y móvil; no SHALL sustituir bloques diseñados por encabezados, párrafos o degradados genéricos.

#### Scenario: Inicio comparable en desktop
- **DADO** que una persona visita `/` en un viewport de aproximadamente 1440 px
- **CUANDO** recorre la página completa
- **ENTONCES** identifica el hero ilustrado, catálogo, novedades, estudio, apoyo, header y footer en una composición equivalente a `home-desktop.png`, con enlaces internos válidos

#### Scenario: Inicio móvil adaptado
- **DADO** que una persona visita `/` en un viewport de aproximadamente 390 px
- **CUANDO** recorre la página completa
- **ENTONCES** observa la composición móvil de `home-mobile.png`, sin comprimir el layout desktop, sin overflow y sin que el CTA flotante cubra controles

#### Scenario: Descubrimiento desde el inicio
- **DADO** que una persona visita `/`
- **CUANDO** recorre el contenido principal y activa los CTAs
- **ENTONCES** identifica el propósito de Beastie Studio, encuentra Múltiplo y Boxio, y los enlaces llevan a `/juegos` y `/nosotros` sin enlaces `#` engañosos

### Requirement: La composición usa referencias locales e ilustraciones correctamente identificadas

Las rutas de este cambio SHALL seguir la composición responsive y los tokens de las referencias locales declaradas en `docs/design/references/README.md`. Las ilustraciones conceptuales de Múltiplo y Boxio SHALL llevar texto alternativo adecuado y no SHALL presentarse como capturas reales de gameplay; cualquier asset ausente SHALL conservar un placeholder explícito y no accionable. Las sustituciones visuales textuales o degradados genéricos que contradigan una referencia existente SHALL retirarse dentro del mismo cambio.

#### Scenario: Comparación responsive local
- **DADO** que existen las referencias locales requeridas y se reconstruye `home-desktop.png` con el procedimiento indicado
- **CUANDO** se comparan Inicio, catálogo, fichas y Nosotros en viewport móvil y desktop
- **ENTONCES** aparecen las secciones, imágenes, fondos y ornamentos relevantes de cada referencia, sin overflow horizontal y con foco visible y contraste suficiente

#### Scenario: Ilustración conceptual no confundida con gameplay
- **DADO** que se muestra una ilustración exportada de Múltiplo o Boxio
- **CUANDO** la persona la encuentra en una tarjeta o ficha
- **ENTONCES** el texto alternativo y el contexto la identifican como ilustración conceptual, no como una captura del juego
