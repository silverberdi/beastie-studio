# Spec Delta

## Purpose

Define una sección editorial estática y mantenible para que las personas descubran Beastie Studio, Múltiplo, Boxio y la forma de crear sus juegos mediante un índice categorizado y artículos accesibles.

## ADDED Requirements

### Requirement: El índice de novedades presenta artículos y categorías con contenido

La ruta `/novedades` SHALL renderizar un artículo destacado, tarjetas para los demás artículos disponibles y únicamente las categorías Beastie Studio, Múltiplo, Boxio y Diseño que tengan contenido. Cada tarjeta SHALL enlazar a `/novedades/[slug]` y el filtrado o navegación por categoría SHALL producir un resultado observable, sin controles inertizados.

#### Scenario: Índice inicial con categorías

- **DADO** que existen los cuatro artículos iniciales aprobados
- **CUANDO** una persona visita `/novedades`
- **ENTONCES** ve un artículo destacado, tarjetas enlazadas para los cuatro slugs y las categorías Beastie Studio, Múltiplo y Boxio según su contenido, sin mostrar categorías vacías

#### Scenario: Filtrado por categoría

- **DADO** que una persona está en `/novedades` y selecciona una categoría con contenido
- **CUANDO** se aplica el filtro
- **ENTONCES** el resultado muestra solo artículos de esa categoría, conserva enlaces navegables a sus detalles y permite volver al conjunto completo

### Requirement: Los artículos tienen un modelo editorial tipado y contenido mantenible

Cada artículo SHALL declarar `slug`, `title`, `summary`, `category` y `body`; `heroImage` SHALL ser opcional y `publishedAt` SHALL aparecer solo cuando exista una fecha editorial real. El contenido SHALL permanecer en español y corresponder a los cuatro textos iniciales definidos en `docs/CONTENT.md`, sin autores, métricas de lectura, comentarios, testimonios ni fechas inventadas.

#### Scenario: Cuatro artículos iniciales

- **DADO** que el contenido inicial se incorpora al modelo editorial
- **CUANDO** se genera el sitio
- **ENTONCES** están disponibles los slugs `que-es-beastie-studio`, `por-que-creamos-multiplo`, `boxio-un-clasico-que-sigue-dando-juego` y `juegos-hechos-con-carino`, con título, resumen, categoría y cuerpo en español

#### Scenario: Fecha editorial ausente

- **DADO** que un artículo no tiene una fecha real aprobada
- **CUANDO** se renderiza su índice o detalle
- **ENTONCES** no se muestra una fecha reciente inventada ni se presenta como noticia temporal

### Requirement: El detalle de artículo es una página estática accesible y enlazada

Cada ruta `/novedades/[slug]` SHALL incluir navegación semántica, breadcrumb, encabezado principal, subtítulos del contenido, enlace de retorno al índice, artículos relacionados cuando existan y un CTA interno hacia `/juegos`. La página SHALL generarse estáticamente y declarar título, descripción y Open Graph específicos del artículo.

#### Scenario: Detalle de artículo existente

- **DADO** que una persona activa una tarjeta del índice
- **CUANDO** llega al slug correspondiente
- **ENTONCES** encuentra el título y cuerpo correctos, breadcrumb navegable, jerarquía de encabezados, CTA al catálogo y metadatos SEO/OG que describen ese artículo

#### Scenario: Slug inexistente

- **DADO** que se solicita un slug que no pertenece a la colección
- **CUANDO** el sitio está construido
- **ENTONCES** no se genera una página de artículo válida para ese slug y el sitio conserva una respuesta de ruta no encontrada coherente con su salida estática

### Requirement: Las imágenes editoriales respetan assets aprobados y contexto alternativo

Los artículos SHALL usar una imagen solo cuando exista un asset local aprobado para ese artículo; toda imagen publicada SHALL tener texto alternativo contextual. Si el asset no existe, el artículo SHALL mantener una composición textual o placeholder explícito no accionable y no SHALL usar una captura conceptual como gameplay real.

#### Scenario: Artículo sin imagen aprobada

- **DADO** que un artículo no tiene `heroImage` aprobado
- **CUANDO** se renderiza su tarjeta o detalle
- **ENTONCES** el contenido sigue siendo legible sin imagen, no se inventa una URL y no se presenta un placeholder como asset final

### Requirement: La sección editorial conserva accesibilidad responsive y navegación real

El índice y los detalles SHALL conservar la navegación compartida, foco visible, nombres accesibles, contraste suficiente, lectura por teclado y controles táctiles cómodos en móvil y desktop. La interfaz SHALL evitar overflow horizontal y todo enlace o filtro publicado SHALL resolver a un destino o estado verificable.

#### Scenario: Lectura y navegación móvil

- **DADO** que el índice o un artículo se abre en un viewport móvil
- **CUANDO** la persona navega por teclado o toque
- **ENTONCES** puede abrir el menú, recorrer categorías, activar tarjetas y CTA, volver al índice y leer sin scroll horizontal causado por la interfaz

#### Scenario: Verificación en navegador

- **DADO** un build estático servido por el harness configurado
- **CUANDO** el ejecutor de navegador comprueba `/novedades` y los cuatro detalles en desktop y móvil
- **ENTONCES** confirma rutas, slugs, clasificación, enlaces internos, metadatos, foco visible y ausencia de controles inertizados, conservando evidencia observable
