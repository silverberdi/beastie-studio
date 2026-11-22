# Spec Delta

## MODIFIED Requirements

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

### Requirement: La verificación cubre comportamiento de navegador y vistas principales

El cambio SHALL definir comprobaciones reproducibles de build, rutas, viewport desktop y móvil, navegación asíncrona del menú, enlaces internos, foco visible, alt, metadatos, ausencia de overflow horizontal y accesibilidad crítica, ejecutadas por un navegador real disponible en Apply o Verify cuando corresponda. La evidencia SHALL distinguir checks automatizables de decisiones humanas y no SHALL declarar publicación o cobros activos.

#### Scenario: Smoke test de navegación real

- **DADO** el build estático servido por el harness de verificación
- **CUANDO** el ejecutor navega por las rutas base en viewport desktop y móvil y abre/cierra el menú móvil
- **ENTONCES** observa páginas válidas, enlaces correctos, controles operables, foco visible, alt y ninguna barra de scroll horizontal causada por la interfaz

#### Scenario: Evidencia de build y rutas

- **DADO** que se completa la implementación del cambio
- **CUANDO** se ejecutan los checks declarados
- **ENTONCES** se conserva evidencia observable del comando de build y de cada ruta/verificación, sin usar validación humana para sustituir una comprobación automatizable

#### Scenario: Decisiones físicas o humanas separadas

- **DADO** que quedan por decidir dominio, hosting, URLs de juegos o destinos de aportes
- **CUANDO** se prepara el resultado para revisión
- **ENTONCES** esas decisiones se registran como dependencias humanas y no se presentan como evidencia de navegador ni bloquean la ejecución de checks automatizables
