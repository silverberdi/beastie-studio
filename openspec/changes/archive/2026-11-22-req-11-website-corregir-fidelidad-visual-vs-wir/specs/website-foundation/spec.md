# Spec Delta

## MODIFIED Requirements

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

El cambio SHALL definir comprobaciones reproducibles de build, rutas, viewport desktop y móvil, navegación asíncrona del menú, enlaces internos, foco visible, alt, metadatos, ausencia de overflow horizontal y accesibilidad crítica, ejecutadas por un navegador real disponible en Apply o Verify cuando corresponda. La evidencia SHALL incluir capturas completas del Astro ejecutado y pares comparables con las referencias para las nueve vistas; SHALL distinguir checks automatizables de decisiones humanas y no SHALL declarar publicación o cobros activos.

#### Scenario: Evidencia comparable de vistas
- **DADO** el sitio Astro construido y servido con su base pública configurada
- **CUANDO** el ejecutor captura las rutas en desktop y móvil y las compara con las referencias locales
- **ENTONCES** conserva capturas completas, una matriz PASS/FAIL por vista y las diferencias intencionales, sin afirmar PASS solo por un build verde

#### Scenario: Evidencia de build y rutas
- **DADO** que se completa la implementación del cambio
- **CUANDO** se ejecutan los checks declarados
- **ENTONCES** se conserva evidencia observable del comando de build y de cada ruta/verificación, sin usar validación humana para sustituir una comprobación automatizable

#### Scenario: Decisiones físicas o humanas separadas
- **DADO** que quedan por decidir dominio, hosting, URLs de juegos o destinos de aportes
- **CUANDO** se prepara el resultado para revisión
- **ENTONCES** esas decisiones se registran como dependencias humanas y no se presentan como evidencia de navegador ni bloquean la ejecución de checks automatizables

#### Scenario: Smoke test de navegación real
- **DADO** el build estático servido por el harness de verificación
- **CUANDO** el ejecutor navega por las rutas base en viewport desktop y móvil y abre/cierra el menú móvil
- **ENTONCES** observa páginas válidas, enlaces correctos, controles operables, foco visible, alt y ninguna barra de scroll horizontal causada por la interfaz
