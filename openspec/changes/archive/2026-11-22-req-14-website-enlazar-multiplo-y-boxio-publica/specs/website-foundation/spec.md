# Spec Delta

## MODIFIED Requirements

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
