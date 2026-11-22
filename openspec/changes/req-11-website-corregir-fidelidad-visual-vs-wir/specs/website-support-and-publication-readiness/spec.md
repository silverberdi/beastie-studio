# Spec Delta

## MODIFIED Requirements

### Requirement: La página de apoyo comunica una invitación voluntaria para adultos

La ruta `/apoyanos` SHALL explicar con lenguaje cercano que el apoyo es voluntario y SHALL presentar Patreon, Ko-fi, PayPal, Nequi y Daviplata; Vaki SHALL aparecer únicamente mientras exista una campaña activa verificada. La página SHALL incluir el apartado «También puedes ayudar compartiendo», SHALL evitar repetir innecesariamente la misma invitación y SHALL recuperar la composición ilustrada, jerarquía, tarjetas y fondos de `apoyanos-desktop.png` y `apoyanos-mobile.png`, sin reducirla a un placeholder genérico.

#### Scenario: Composición de apoyo voluntario
- **DADO** que una persona adulta visita `/apoyanos` en desktop o móvil
- **CUANDO** recorre el contenido principal
- **ENTONCES** entiende que el aporte es voluntario, encuentra los canales previstos y ve una composición completa con ilustración, estados y alternativa explícita para compartir, sin presión comercial dirigida a menores

#### Scenario: Lectura de la invitación de apoyo
- **DADO** que una persona adulta visita `/apoyanos`
- **CUANDO** navega por teclado y revisa los canales mostrados
- **ENTONCES** encuentra foco visible, contraste suficiente, texto alternativo contextual y ningún canal pendiente convertido en enlace vacío, `#`, QR o URL inventada

#### Scenario: Vaki sin campaña activa
- **DADO** que no existe una campaña Vaki activa y verificada
- **CUANDO** se renderiza `/apoyanos`
- **ENTONCES** Vaki no se muestra como opción disponible ni se inventa una campaña

### Requirement: La revisión transversal exige calidad verificable y sitemap condicionado

El sitio SHALL mantener metadatos SEO y Open Graph coherentes, `alt` contextual, foco visible, navegación por teclado, contraste y responsive sin overflow horizontal. SHALL ejecutar comprobaciones proporcionales de build, rutas, enlaces internos, accesibilidad crítica y navegador real; SHALL generar capturas completas comparables de las vistas de apoyo y del resto de la matriz; SHALL generar sitemap solo cuando exista una base URL verificada y SHALL omitirlo o dejarlo explícitamente pendiente cuando no exista. No SHALL incluir tracking ni cookies innecesarias.

#### Scenario: Base URL no verificada
- **DADO** que no existe una base URL de dominio verificada
- **CUANDO** se prepara la salida estática
- **ENTONCES** el sitemap no contiene URLs ficticias y la dependencia de dominio/base URL queda registrada para decisión humana

#### Scenario: Revisión automatizable del sitio
- **DADO** un build estático servido por el harness configurado
- **CUANDO** el ejecutor comprueba rutas en desktop y móvil, enlaces internos, foco, menú, imágenes cargadas y overflow
- **ENTONCES** conserva evidencia observable de los checks y cualquier fallo impide presentar la publicación como lista
