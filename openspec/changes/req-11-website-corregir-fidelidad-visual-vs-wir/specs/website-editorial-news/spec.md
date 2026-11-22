# Spec Delta

## MODIFIED Requirements

### Requirement: El índice de novedades presenta artículos y categorías con contenido

La ruta `/novedades` SHALL renderizar un artículo destacado, tarjetas para los demás artículos disponibles y únicamente las categorías Beastie Studio, Múltiplo, Boxio y Diseño que tengan contenido. Cada tarjeta SHALL enlazar a `/novedades/[slug]` y el filtrado o navegación por categoría SHALL producir un resultado observable, sin controles inertizados. La composición SHALL recuperar el tratamiento editorial, escala, ritmo, fondos y jerarquía de `novedades-desktop.png` y `novedades-mobile.png` según el viewport.

#### Scenario: Índice comparable en desktop y móvil
- **DADO** que existen los cuatro artículos iniciales aprobados
- **CUANDO** una persona visita `/novedades` en desktop o móvil y recorre el contenido
- **ENTONCES** ve el destacado, tarjetas, categorías y espacios editoriales en la composición correspondiente, con enlaces navegables y sin overflow

#### Scenario: Índice inicial con categorías
- **DADO** que existen los cuatro artículos iniciales aprobados
- **CUANDO** una persona visita `/novedades`
- **ENTONCES** ve un artículo destacado, tarjetas enlazadas para los cuatro slugs y las categorías Beastie Studio, Múltiplo y Boxio según su contenido, sin mostrar categorías vacías

#### Scenario: Filtrado por categoría
- **DADO** que una persona está en `/novedades` y selecciona una categoría con contenido
- **CUANDO** se aplica el filtro
- **ENTONCES** el resultado muestra solo artículos de esa categoría, conserva enlaces navegables a sus detalles y permite volver al conjunto completo

### Requirement: El detalle de artículo es una página estática accesible y enlazada

Cada ruta `/novedades/[slug]` SHALL incluir navegación semántica, breadcrumb, encabezado principal, subtítulos del contenido, enlace de retorno al índice, artículos relacionados cuando existan y un CTA interno hacia `/juegos`. La página SHALL generarse estáticamente, declarar título, descripción y Open Graph específicos del artículo, y reproducir la cabecera editorial, lectura, imagen autorizada cuando proceda y relacionados de `articulo-multiplo-desktop.png` sin inventar imágenes o fechas.

#### Scenario: Detalle de Múltiplo comparable
- **DADO** que una persona activa el artículo de Múltiplo
- **CUANDO** llega a su slug en desktop
- **ENTONCES** encuentra cabecera editorial, cuerpo legible, breadcrumb, CTA al catálogo, relacionados y metadatos específicos en una composición equivalente a la referencia local

#### Scenario: Artículo sin imagen aprobada
- **DADO** que el artículo no tiene `heroImage` aprobado
- **CUANDO** se renderiza su tarjeta o detalle
- **ENTONCES** el contenido sigue siendo legible sin imagen, no se inventa una URL y no se presenta un placeholder como asset final

#### Scenario: Detalle de artículo existente
- **DADO** que una persona activa una tarjeta del índice
- **CUANDO** llega al slug correspondiente
- **ENTONCES** encuentra el título y cuerpo correctos, breadcrumb navegable, jerarquía de encabezados, CTA al catálogo y metadatos SEO/OG que describen ese artículo

#### Scenario: Slug inexistente
- **DADO** que se solicita un slug que no pertenece a la colección
- **CUANDO** el sitio está construido
- **ENTONCES** no se genera una página de artículo válida para ese slug y el sitio conserva una respuesta de ruta no encontrada coherente con su salida estática
