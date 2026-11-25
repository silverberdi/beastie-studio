# Spec Delta

## ADDED Requirements

### Requirement: La evidencia visual no sustituye los contratos SEO y semánticos

La corrección visual SHALL conservar un `main`, un H1 único, headings lógicos, alt preciso, enlaces HTML rastreables, JSON-LD, canonical, sitemap y robots ya válidos. Las animaciones SHALL ser una mejora progresiva, no una condición para descubrir contenido, y no SHALL añadir CLS observable ni dependencias UI pesadas.

#### Scenario: HTML estable con movimiento desactivado

- **DADO** que se inspecciona una ruta sin ejecutar JavaScript o con reduced motion
- **CUANDO** se recorre el HTML de Inicio, `/juegos` y fichas
- **ENTONCES** siguen presentes main, H1, headings, enlaces de juegos, imágenes con alt y metadatos SEO/JSON-LD esperados
- **Y** el contenido no depende de una clase, un hover o un transform para ser descubrible

### Requirement: La validación separa automatización de decisiones humanas

Los checks de build, `npm run test`, `npm run test:browser`, navegador, viewports, computed styles, assets y enlaces SHALL ejecutarse por el executor configurado y conservar evidencia observable. PR, merge, despliegue, revisión final de marca, dominio y validaciones físicas SHALL quedar explícitamente fuera de la autoridad del executor y bajo control humano.

#### Scenario: Resultado no declarado por markup o build solamente

- **DADO** que build y tests técnicos están verdes
- **CUANDO** no existe evidencia visual y de navegador del parallax y las interacciones
- **ENTONCES** la entrega permanece pendiente o bloqueada, con la causa documentada
- **Y** no se declara completado, desplegado ni sincronizado como finalizado
