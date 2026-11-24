# website-seo-semantic-publication Specification

## Purpose

Define el contrato público de SEO, semántica, accesibilidad HTML, indexación y evidencia para que cada página estática de Beastie Studio sea rastreable, verificable y publicable sin inventar datos ni introducir infraestructura.

## Requirements

### Requirement: Cada ruta pública tiene un contrato de metadatos único

Toda URL generada SHALL servirse con `lang="es"`, charset, viewport, iconografía real, robots coherente, un único title y description específicos, canonical absoluto normalizado bajo `https://beastie-studio.silverman.pro/`, y metadatos Open Graph/Twitter coherentes con la ruta. Las imágenes sociales SHALL ser locales, versionadas y absolutas; no SHALL aparecer localhost, `file://`, URLs vacías o referencias a Stitch.

#### Scenario: Metadatos de una ruta pública

- **DADO** cualquier página generada del sitio
- **CUANDO** se inspecciona su HTML sin ejecutar JavaScript
- **ENTONCES** contiene title, description, canonical, `og:locale=es_CO`, `og:site_name`, tipo, URL, imagen, `twitter:card=summary_large_image`, título, descripción, imagen y alt, sin duplicados

#### Scenario: Normalización de canonical

- **DADO** que una ruta puede solicitarse con barra final o `index.html`
- **CUANDO** se calcula su URL canónica
- **ENTONCES** ambas variantes apuntan a un único canonical HTTPS absoluto del dominio configurado y nunca a localhost o una ruta vacía

### Requirement: La salida incluye semántica rastreable y accesible

Cada ruta pública SHALL tener un único `main`, un H1 visible, jerarquía lógica de headings y landmarks HTML apropiados. Fichas y artículos SHALL incluir `nav aria-label="Ruta de navegación"`; los enlaces internos, CTAs y títulos de juegos SHALL estar presentes en HTML estático. Las imágenes SHALL tener alt específico y dimensiones, y los enlaces con `target="_blank"` SHALL usar `rel="noopener noreferrer"`.

#### Scenario: Recorrido HTML sin JavaScript

- **DADO** una ruta pública construida
- **CUANDO** se recorre el DOM sin ejecutar JavaScript
- **ENTONCES** se encuentran un main, un H1 visible, enlaces rastreables a las páginas públicas y una jerarquía de secciones válida

#### Scenario: Descubrimiento de juegos

- **DADO** que el Inicio o un carrusel se renderiza
- **CUANDO** se desactiva JavaScript o no se interactúa con el carrusel
- **ENTONCES** Múltiplo y Boxio siguen descubriéndose mediante enlaces HTML a sus fichas

### Requirement: Los datos estructurados solo usan información verificable

Las páginas SHALL emitir JSON-LD válido y coherente con el contenido visible. Inicio SHALL poder emitir Organization y WebSite; fichas SHALL emitir VideoGame y BreadcrumbList solo con datos comprobados; Novedades y artículos SHALL emitir BlogPosting o Article y BreadcrumbList solo con autores, fechas e imágenes disponibles. No SHALL inventarse rating, review, author, sameAs, precio, edad, premios, fechas ni `dateModified`.

#### Scenario: Schema de ficha de juego

- **DADO** una ficha de Múltiplo o Boxio con captura real y URL pública confirmada
- **CUANDO** se valida su JSON-LD
- **ENTONCES** identifica el juego, su imagen real, URL canónica y breadcrumb, omitiendo campos no comprobados

#### Scenario: Artículo sin fecha o autor

- **DADO** un artículo sin fecha editorial o autor verificable
- **CUANDO** se genera su JSON-LD
- **ENTONCES** no incluye esas propiedades ni presenta el artículo como noticia reciente

### Requirement: Robots y sitemap contienen únicamente páginas publicables

Con un dominio HTTPS verificado, robots.txt y sitemap.xml SHALL contener únicamente rutas públicas reales, sin duplicados con/sin barra, `index.html`, desarrollo, noindex accidental o URLs ficticias. Sin dominio verificable, el build productivo SHALL fallar de forma explícita o dejar la generación pendiente sin emitir URLs inventadas.

#### Scenario: Sitemap productivo

- **DADO** un build con `PUBLIC_SITE_URL` HTTPS válido y verificado
- **CUANDO** se inspeccionan robots.txt y sitemap.xml
- **ENTONCES** solo contienen URLs canónicas de páginas publicadas y ninguna ruta de desarrollo o duplicada

#### Scenario: Dominio ausente

- **DADO** que no existe un dominio canónico HTTPS verificable
- **CUANDO** se prepara un build productivo
- **ENTONCES** no se publica un sitemap con dominio inventado y se registra la dependencia pendiente de forma explícita

### Requirement: El contenido público no contiene señales de prototipo ni claims inventados

La inspección de fuentes activas, dist, HTML, CSS, JavaScript y recursos públicos SHALL excluir copy editorial de demo del sitio, placeholder de incompletitud, WIP, TODO, URLs de prueba, tokens ficticios y claims no verificados. SHALL conservar capturas reales intactas y la expresión «Demostración inicial» cuando sea texto auténtico de la interfaz del juego; no SHALL limpiar documentación, tests o referencias históricas.

#### Scenario: Limpieza acotada al producto

- **DADO** un término de desarrollo encontrado en el repositorio
- **CUANDO** se determina si se publica
- **ENTONCES** solo se retira si aparece en fuentes activas o recursos servidos como señal de incompletitud, y se conserva si pertenece únicamente a docs, tests, historial o una función real del juego

### Requirement: La validación final produce evidencia reproducible sin desplegar

La entrega SHALL incluir una matriz de todas las rutas generadas con title, description, canonical, OG/Twitter, schema, imagen y estado de enlaces, además de resultados observables de build, tests declarados, validación de robots/sitemap/JSON-LD, semántica, accesibilidad, imágenes y enlaces. Las comprobaciones de navegador, viewport, movimiento reducido y navegación asíncrona SHALL ejecutarse por el executor configurado; las decisiones humanas de assets, dominio, hosting, PR, merge y publicación SHALL quedar separadas y no SHALL declararse resueltas por un build verde.

#### Scenario: Auditoría completa de rutas

- **DADO** el árbol integrado de #19 y #20
- **CUANDO** se ejecutan las comprobaciones sobre dist y las fuentes activas
- **ENTONCES** se reportan todas las rutas públicas, sus metadatos, schemas, medios, enlaces y fallos, sin inspeccionar históricos como salida web

#### Scenario: Evidencia de navegador

- **DADO** un build estático servido por el harness configurado
- **CUANDO** el executor comprueba desktop y móvil, menú, foco, reduced motion, enlaces e imágenes
- **ENTONCES** conserva resultados observables de esas comprobaciones y no delega navegación automatizable al operador o a validación humana
