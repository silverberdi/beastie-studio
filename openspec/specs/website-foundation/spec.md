# website-foundation Specification

## Purpose

Establece una base web estática, accesible y reutilizable para que Beastie Studio pueda crecer por incrementos sin duplicar navegación, inventar contenido o depender de servicios de servidor.

## Requirements

### Requirement: La fundación se genera como sitio estático reproducible

El sitio SHALL generarse como archivos estáticos mediante Astro SSG, con instalación, build y preparación de publicación documentados y reproducibles, sin runtime de servidor, backend, CMS, base de datos, autenticación, tracking ni pasarela de pago propia. El sitemap SHALL generarse únicamente cuando exista una base URL verificada; en caso contrario no SHALL publicar URLs de dominio inventadas.

#### Scenario: Build estático reproducible
- **DADO** un checkout limpio del repositorio y un entorno CI compatible
- **CUANDO** se instalen las dependencias declaradas y se ejecute el comando de build documentado
- **ENTONCES** el proceso SHALL terminar correctamente y producir únicamente la salida estática del sitio

#### Scenario: No se introduce runtime de servidor
- **DADO** el proyecto configurado para esta fundación
- **CUANDO** se inspeccionen sus dependencias, configuración y salida de build
- **ENTONCES** no SHALL existir un adaptador de servidor, endpoint de backend, CMS, base de datos, autenticación ni pasarela de pago propia

#### Scenario: Sitemap condicionado a dominio verificado
- **DADO** que la base URL de publicación no está verificada
- **CUANDO** se construye la salida estática
- **ENTONCES** el sitemap no SHALL incluir una URL ficticia y la documentación SHALL registrar la dependencia de dominio pendiente

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

### Requirement: Las rutas iniciales son placeholders explícitos y sustituibles

La fundación SHALL incluir páginas renderizadas para Inicio, Juegos, Novedades, Nosotros y Apóyanos, además de las rutas de apoyo necesarias al layout. Las rutas cubiertas por este cambio (`/`, `/juegos` y `/nosotros`) SHALL mostrar contenido editorial aprobado; `/juegos/multiplo` y `/juegos/boxio` SHALL ser fichas informativas; las dependencias aún no verificadas SHALL permanecer visibles como placeholders explícitos y no accionables, sin presentar placeholders como contenido final ni inventar artículos, fechas, disponibilidad, enlaces de juego o datos de pago.

#### Scenario: Comprobación de rutas base y editoriales
- **DADO** una salida estática construida
- **CUANDO** se solicitan `/`, `/juegos`, `/juegos/multiplo`, `/juegos/boxio`, `/novedades`, `/novedades/que-es-beastie-studio`, `/novedades/por-que-creamos-multiplo`, `/novedades/boxio-un-clasico-que-sigue-dando-juego`, `/novedades/juegos-hechos-con-carino`, `/nosotros` y `/apoyanos`
- **ENTONCES** cada ruta responde con una página renderizada, conserva el layout compartido y distingue el contenido aprobado de cualquier dependencia pendiente

#### Scenario: Dependencia no verificada
- **DADO** que falta una URL pública, dato de pago, asset o contenido final
- **CUANDO** se renderiza la sección que lo necesitaría
- **ENTONCES** se muestra una dependencia visible no accionable o placeholder, sin fabricar el valor ni afirmar disponibilidad productiva

### Requirement: El apoyo conduce a una ruta interna no accionable

El botón flotante «¡Apóyanos!» SHALL enlazar a `/apoyanos` y el footer SHALL ofrecer el mismo destino. El botón flotante SHALL permanecer discreto y no cubrir acciones ni contenido esencial en viewport móvil.

#### Scenario: Acceso desde CTA flotante
- **DADO** que una persona está en cualquier página del sitio
- **CUANDO** selecciona «¡Apóyanos!»
- **ENTONCES** llega a `/apoyanos` mediante un enlace interno válido

#### Scenario: Acceso desde footer
- **DADO** que una persona está en cualquier página del sitio
- **CUANDO** selecciona el enlace de apoyo del footer
- **ENTONCES** llega a `/apoyanos`, sin activar un canal de cobro ni un dato no verificado

#### Scenario: CTA sin obstrucción móvil
- **DADO** un viewport móvil con contenido y controles interactivos
- **CUANDO** se muestra el CTA flotante
- **ENTONCES** no cubre controles accionables, no fuerza scroll horizontal y sigue siendo alcanzable por teclado y toque

### Requirement: La identidad visual usa únicamente fuentes locales aprobadas

El sistema SHALL usar los tokens documentados en `docs/DESIGN.md`, las referencias locales inventariadas en `docs/design/references/README.md` y los binarios de marca descritos en `docs/design/BRAND_ASSETS.md`. Las páginas SHALL conservar la composición, jerarquía, color, ritmo y tratamiento editorial observable en la referencia correspondiente, sin convertir capturas completas en banners ni redibujar el logo o favicon. El logo SHALL conservar la palabra completa BEASTIE y el favicon SHALL usar el símbolo sin ala.

#### Scenario: Referencias completas consumidas
- **DADO** que existen las nueve referencias de pantalla y las tres ilustraciones conceptuales inventariadas
- **CUANDO** se prepara la implementación visual
- **ENTONCES** se reconstruye `home-desktop.png`, se comprueba cada archivo y se registra una matriz de diferencias por página antes de declarar fidelidad

#### Scenario: Asset conceptual correctamente identificado
- **DADO** que una ilustración conceptual está autorizada y se integra en una página
- **CUANDO** se renderiza la imagen
- **ENTONCES** se carga desde una ruta pública real, tiene alt contextual y se identifica como ilustración conceptual, nunca como captura de gameplay

#### Scenario: Referencia visual local
- **DADO** la raíz del repositorio
- **CUANDO** se prepara la referencia de Inicio escritorio con `restore-home-desktop.py`
- **ENTONCES** existe `home-desktop.png` con dimensiones 2560×8710 y las comparaciones de diseño usan solamente los archivos locales declarados

#### Scenario: Asset de marca íntegro
- **DADO** que los binarios aprobados existen en sus rutas obligatorias
- **CUANDO** se comparan sus tamaños y SHA-256 completos con `public/assets/brand/manifest.json`
- **ENTONCES** solo se integran los archivos coincidentes, sin redibujar, vectorizar, modificar el diseño ni sustituir la B de BEASTIE por el isotipo

#### Scenario: Asset de marca ausente
- **DADO** que un binario aprobado no existe o no coincide con el manifiesto
- **CUANDO** se prepara la integración
- **ENTONCES** la dependencia se registra como bloqueada y se conserva un placeholder no accionable, sin afirmar que el sitio está listo para producción

### Requirement: La verificación cubre comportamiento de navegador y vistas principales

El cambio SHALL definir comprobaciones reproducibles de build, rutas, viewport desktop y móvil, navegación asíncrona del menú, enlaces internos, enlaces externos de Múltiplo y Boxio, foco visible, alt, metadatos, ausencia de overflow horizontal y accesibilidad crítica, ejecutadas por un navegador real disponible en Apply o Verify cuando corresponda. La evidencia SHALL incluir capturas o registros verificables de los CTAs en Inicio, catálogo y cada ficha, una tabla `juego | URL canónica comprobada | fuente | resultado HTTP/navegador | fecha`, tests de mapeo y navegación, y los resultados de `npm test`, `npm run build` y de la prueba de navegador configurada. SHALL distinguir checks automatizables de decisiones humanas y no SHALL declarar publicación o cobros activos.

#### Scenario: Verificación técnica de las URLs públicas

- **DADO** que las URLs canónicas fueron proporcionadas por el propietario
- **CUANDO** el ejecutor realiza la comprobación HTTP y la navegación con navegador real
- **ENTONCES** conserva para cada juego la URL exacta, fuente, resultado observado y fecha
- **Y** si una comprobación falla temporalmente registra `NO VERIFICADO` sin sustituir la URL ni enlazar al repositorio

#### Scenario: Evidencia de CTAs y mapeo

- **DADO** el sitio Astro servido con su base pública configurada
- **CUANDO** el ejecutor visita Inicio, `/juegos`, `/juegos/multiplo` y `/juegos/boxio` en desktop y móvil
- **ENTONCES** conserva evidencia observable de «Jugar» y «Conocer», y confirma que cada «Jugar» resuelve al dominio correcto
- **Y** confirma que la navegación interna y los assets siguen funcionando bajo el prefijo de GitHub Pages o la base realmente configurada

#### Scenario: Smoke test de navegación real

- **DADO** el build estático servido por el harness de verificación
- **CUANDO** el ejecutor navega por las rutas base en viewport desktop y móvil y abre/cierra el menú móvil
- **ENTONCES** observa páginas válidas, enlaces correctos, controles operables, foco visible, alt y ninguna barra de scroll horizontal causada por la interfaz

#### Scenario: Evidencia de build y rutas

- **DADO** que se completa la implementación del cambio
- **CUANDO** se ejecutan `npm test`, `npm run build` y la prueba de navegador declarada
- **ENTONCES** se conserva evidencia observable del resultado de cada comando y de cada ruta/verificación, sin usar validación humana para sustituir una comprobación automatizable

#### Scenario: Decisiones físicas o humanas separadas

- **DADO** que quedan por decidir dominio, hosting o destinos de aportes
- **CUANDO** se prepara el resultado para revisión
- **ENTONCES** esas decisiones se registran como dependencias humanas y no se presentan como evidencia de navegador ni bloquean los checks automatizables

#### Scenario: Evidencia comparable de vistas
- **DADO** el sitio Astro construido y servido con su base pública configurada
- **CUANDO** el ejecutor captura las rutas en desktop y móvil y las compara con las referencias locales
- **ENTONCES** conserva capturas completas, una matriz PASS/FAIL por vista y las diferencias intencionales, sin afirmar PASS solo por un build verde

#### Scenario: Decisiones físicas o humanas separadas
- **DADO** que quedan por decidir dominio, hosting, URLs de juegos o destinos de aportes
- **CUANDO** se prepara el resultado para revisión
- **ENTONCES** esas decisiones se registran como dependencias humanas y no se presentan como evidencia de navegador ni bloquean la ejecución de checks automatizables
