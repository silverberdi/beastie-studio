# Design

## Context

El sitio es Astro SSG y ya separa páginas, componentes, estilos y datos de juegos. La referencia ejecutable de V5.4 está en `docs/design/references/v5/`; sus HTML sirven para comparar composición, pero no se copiarán como páginas. Los assets definitivos y las siete capturas reales deben pasar a rutas que Astro publique. La motivación y el contrato observable están en `proposal.md` y en la spec delta.

## Goals / Non-Goals

**Goals:**

- Integrar los dos heroes correctos con una capa visual de movimiento acotada, legible y degradable a estática.
- Mantener una única fuente de datos de catálogo, con capturas principales y galerías reales reutilizadas en Inicio, `/juegos` y fichas.
- Hacer el carrusel accesible, sin autoplay y ampliable sin editar markup de tarjetas por juego.
- Conservar Astro estático, la navegación existente, las URLs confirmadas y los tokens de identidad.
- Dejar evidencia reproducible de navegador, build, rutas, assets, foco y reduced motion.

**Non-Goals:**

- No reconstruir, embeber ni modificar Múltiplo o Boxio.
- No rediseñar logo, favicon, branding, páginas fuera del alcance visual ni SEO final del issue #20.
- No introducir backend, CMS, base de datos, framework de animación, analítica, autoplay o scroll-jacking.
- No publicar, abrir PR, hacer merge, activar cobros ni resolver decisiones físicas de dispositivo.

## Decisions

1. **Assets locales publicados explícitamente.** Copiar los assets V5 necesarios a `public/assets/` manteniendo nombres y proporciones, o documentar una integración Astro equivalente si el repositorio ya dispone de una convención mejor. La opción de servir directamente desde `docs/` se descarta porque esa carpeta no es salida pública garantizada.

2. **Datos de juego ampliados, componentes reutilizados.** Extender `games.js` con `primaryScreenshot` y una colección opcional de galería, sin duplicar las dos tarjetas en las páginas. `GameCard` y `GameDetail` recibirán los datos y conservarán CTAs existentes. Una colección separada se descarta porque duplicaría la fuente de verdad.

3. **Parallax local con fallback.** Usar una pequeña inicialización en el componente/layout o CSS con `requestAnimationFrame`, listener pasivo y consulta de `prefers-reduced-motion`; el estado inicial será válido sin JavaScript. Una librería pesada o un efecto que controle el scroll se descartan por el límite estático y accesible.

4. **Carrusel controlado por interacción.** Mantener un índice activo, botones con nombres accesibles, puntos seleccionables, eventos de teclado y gestos táctiles; no usar temporizador. La navegación se deriva de la lista de juegos y actualiza estado/foco de forma determinista. Un carrusel hardcodeado o con autoplay se descarta por el requisito de escalabilidad y control del usuario.

5. **Presentación completa de capturas.** Usar marcos responsivos con `object-fit: contain` o equivalente, fondo y dimensiones que admitan las orientaciones vertical y horizontal sin estirar. `cover` se descarta porque ocultaría contenido real del juego.

6. **Verificación en navegador por el ejecutor configurado.** En Apply/Verify se ejecutan los checks declarados y se capturan estados al inicio, mitad y final del scroll en escritorio y móvil, además de reduced motion, foco, enlaces y HTTP 200 de assets. La validación humana queda limitada a revisión visual/decisiones físicas y no sustituye los checks automatizables.

## Risks / Trade-offs

- **[Riesgo]** El arte vertical de Múltiplo puede dominar la tarjeta en anchos pequeños → **Mitigación:** marco con límites responsivos, `contain`, altura estable y comprobación en 320/375 px.
- **[Riesgo]** El parallax puede producir saltos o trabajo excesivo en scroll → **Mitigación:** solo actualizar una variable transformada dentro de `requestAnimationFrame`, listeners pasivos, cancelar al reducir movimiento y no modificar la posición de scroll.
- **[Riesgo]** Rutas relativas pueden fallar bajo el prefijo de GitHub Pages → **Mitigación:** usar el helper/base pública existente de Astro, probar salida servida con el prefijo configurado y comprobar cada asset con estado 200.
- **[Riesgo]** Cambios en el header podrían reintroducir apoyo flotante o romper `aria-current` → **Mitigación:** prueba de navegación/foco y revisión explícita del layout global antes del cierre.
- **[Riesgo]** La referencia HTML y la implementación Astro pueden divergir en detalles visuales → **Mitigación:** matriz de comparación con capturas locales V5.4; registrar diferencias intencionales sin tratar el HTML como código productivo.

## Migration Plan

1. Inspeccionar el estado actual de páginas, componentes, datos, estilos y assets, verificando hashes del paquete V5.4.
2. Añadir rutas públicas y campos de datos; adaptar tarjetas, detalle, hero y carrusel dentro de los componentes existentes.
3. Ejecutar tests, build y navegador real en los viewports definidos; corregir fallos de rutas, foco, responsive, reduced motion o integridad visual.
4. Mantener reversión simple por commit: retirar las rutas nuevas y revertir los cambios de los componentes/datos sin tocar repositorios externos ni despliegue.
5. Entregar evidencia para revisión; PR, merge humano y release son pasos posteriores y no automáticos.

## Open Questions

No quedan preguntas que cambien la especificación o el enfoque. La elección entre copia directa a `public/assets/` y un pipeline Astro existente se resolverá durante Apply según la estructura efectiva del repositorio, manteniendo las mismas rutas finales y evidencia.
