# website-support-and-publication-readiness Specification

## Purpose

Define una página de apoyo voluntario segura para adultos y un cierre verificable de calidad y preparación de publicación, manteniendo el sitio estático, privado y sin activar cobros.

## Requirements

### Requirement: La página de apoyo comunica una invitación voluntaria para adultos

La ruta `/apoyanos` SHALL explicar con lenguaje cercano que el apoyo es voluntario y SHALL presentar Patreon, Ko-fi, PayPal, Nequi y Daviplata; Vaki SHALL aparecer únicamente mientras exista una campaña activa verificada. La página SHALL incluir el apartado «También puedes ayudar compartiendo» y SHALL evitar repetir innecesariamente la misma invitación.

#### Scenario: Lectura de la invitación de apoyo
- **DADO** que una persona adulta visita `/apoyanos`
- **CUANDO** recorre el contenido principal
- **ENTONCES** entiende que el aporte es voluntario, encuentra los canales previstos y ve una alternativa explícita para compartir juegos, sin presión comercial dirigida a menores

#### Scenario: Vaki sin campaña activa
- **DADO** que no existe una campaña Vaki activa y verificada
- **CUANDO** se renderiza `/apoyanos`
- **ENTONCES** Vaki no se muestra como opción disponible ni se inventa una campaña

### Requirement: Los canales de apoyo no presentan destinos ficticios ni controles inertes

Cada canal SHALL configurarse declarativamente con nombre, estado `verificado`/`habilitado` y URL o QR aprobado cuando exista. Si faltan datos reales, el canal SHALL mostrarse como pendiente y no accionable; ningún control de aporte SHALL apuntar a una URL genérica, falsa, vacía o no verificada, y cualquier QR SHALL proceder de un recurso legítimo aprobado.

#### Scenario: Canal pendiente sin destino
- **DADO** que un canal no tiene URL, QR o destinatario aprobado
- **CUANDO** se muestra su tarjeta en `/apoyanos`
- **ENTONCES** se identifica como pendiente, no ofrece un control clicable de aporte y conserva visible la dependencia que requiere decisión humana

#### Scenario: Canal verificado con destino aprobado
- **DADO** que un canal tiene estado habilitado y un destino aprobado
- **CUANDO** una persona activa su control
- **ENTONCES** el control dirige exactamente al destino configurado y no sustituye el valor por una URL genérica ni por un dato inventado

### Requirement: El apoyo contextual conserva navegación interna y protección de menores

El CTA flotante y la invitación del footer SHALL conservar su destino interno `/apoyanos` en las páginas del sitio. La sección de compartir SHALL enlazar únicamente a fichas o rutas de juegos existentes, SHALL evitar formularios de aporte propios y SHALL no recolectar datos infantiles ni incorporar tracking.

#### Scenario: Acceso contextual sin cobro automático
- **DADO** que una persona visita una página del sitio
- **CUANDO** activa el CTA flotante o el enlace de apoyo del footer
- **ENTONCES** llega a `/apoyanos` y no se inicia ningún cobro ni se solicita información personal

#### Scenario: Compartir juegos desde apoyo
- **DADO** que una persona visita el apartado «También puedes ayudar compartiendo»
- **CUANDO** activa un enlace de juego
- **ENTONCES** navega a una ficha interna válida de Múltiplo o Boxio y la interfaz no presenta tracking ni recolección de datos infantiles

### Requirement: La revisión transversal exige calidad verificable y sitemap condicionado

El sitio SHALL mantener metadatos SEO y Open Graph coherentes, `alt` contextual, foco visible, navegación por teclado, contraste y responsive sin overflow horizontal. SHALL ejecutar comprobaciones proporcionales de build, rutas, enlaces internos, accesibilidad crítica y navegador real; SHALL generar sitemap solo cuando exista una base URL verificada y SHALL omitirlo o dejarlo explícitamente pendiente cuando no exista. No SHALL incluir tracking ni cookies innecesarias.

#### Scenario: Base URL no verificada
- **DADO** que no existe una base URL de dominio verificada
- **CUANDO** se prepara la salida estática
- **ENTONCES** el sitemap no contiene URLs ficticias y la dependencia de dominio/base URL queda registrada para decisión humana

#### Scenario: Revisión automatizable del sitio
- **DADO** un build estático servido por el harness configurado
- **CUANDO** el ejecutor comprueba rutas en desktop y móvil, enlaces internos, foco, menú y overflow
- **ENTONCES** conserva evidencia observable de los checks y cualquier fallo impide presentar la publicación como lista

### Requirement: La publicación estática queda documentada sin desplegar

La documentación SHALL describir el comando de build estático, las variables necesarias y el flujo de publicación sin servidor. SHALL incluir un informe final de dependencias humanas para enlaces de aportes, URLs públicas de juegos, dominio y hosting. El cambio SHALL dejar el PR listo para revisión, pero no SHALL desplegar, publicar ni activar cobros automáticamente.

#### Scenario: Preparación para revisión humana
- **DADO** que termina la preparación del cambio
- **CUANDO** se revisan los artefactos y la documentación de publicación
- **ENTONCES** se identifican las dependencias aún pendientes y existe material suficiente para abrir un PR, sin afirmar que el sitio está publicado ni que los cobros están activos
