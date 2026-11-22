# Spec Delta

## MODIFIED Requirements

### Requirement: Los enlaces de juego reflejan únicamente disponibilidad verificada

Las fichas y tarjetas SHALL omitir el CTA «Jugar» cuando no exista una URL pública verificada en una fuente legítima. Para este cambio, Múltiplo SHALL usar exactamente `https://multiplo.silverman.pro/` y Boxio SHALL usar exactamente `https://boxio.silverman.pro/`, registradas en la fuente declarativa central de juegos. Cuando esas URLs estén verificadas, las superficies de Inicio, catálogo y ficha SHALL mostrar un CTA «Jugar» que apunte al juego correspondiente; «Conocer» SHALL conservar su destino editorial interno. Ninguna URL SHALL apuntar al repositorio fuente, a un placeholder, al otro juego o a una página interna por error.

#### Scenario: URLs públicas confirmadas y mapeadas

- **DADO** que el propietario proporcionó las URLs públicas canónicas de Múltiplo y Boxio
- **CUANDO** se carga el registro de juegos
- **ENTONCES** Múltiplo usa exactamente `https://multiplo.silverman.pro/` y Boxio usa exactamente `https://boxio.silverman.pro/`
- **Y** cada URL se conserva como un único dato de catálogo sin duplicación de destinos en las vistas

#### Scenario: Jugar Múltiplo desde Inicio, catálogo y ficha

- **DADO** que una persona visita Inicio, `/juegos` o `/juegos/multiplo`
- **CUANDO** selecciona el CTA «Jugar» asociado a Múltiplo
- **ENTONCES** el enlace tiene como destino absoluto `https://multiplo.silverman.pro/`
- **Y** no dirige a Boxio, al repositorio de código ni a una ficha interna

#### Scenario: Jugar Boxio desde Inicio, catálogo y ficha

- **DADO** que una persona visita Inicio, `/juegos` o `/juegos/boxio`
- **CUANDO** selecciona el CTA «Jugar» asociado a Boxio
- **ENTONCES** el enlace tiene como destino absoluto `https://boxio.silverman.pro/`
- **Y** no dirige a Múltiplo, al repositorio de código ni a una ficha interna

#### Scenario: Conocer conserva la navegación editorial

- **DADO** que una tarjeta o ficha ofrece los CTAs «Jugar» y «Conocer»
- **CUANDO** la persona selecciona «Conocer»
- **ENTONCES** «Conocer» mantiene la navegación interna a la ficha editorial correspondiente
- **Y** ambos controles tienen nombres accesibles, foco visible y tamaño operable en teclado y pantalla táctil

#### Scenario: URL no verificada fuera del alcance confirmado

- **DADO** que una URL pública futura no está verificada en una fuente legítima
- **CUANDO** se renderiza su tarjeta o ficha
- **ENTONCES** no aparece un enlace «Jugar» accionable ni se afirma disponibilidad pública para ese juego

#### Scenario: URL de juego no verificada

- **DADO** que no hay una URL pública verificada para Múltiplo o Boxio
- **CUANDO** se renderiza el catálogo o una ficha
- **ENTONCES** no aparece un enlace «Jugar» accionable ni se afirma disponibilidad pública
