# Design

## Context

La propuesta establece la primera capacidad del repositorio: una fundación Astro estática para el sitio corporativo de Beastie Studio. No hay capacidades OpenSpec existentes ni implementación que migrar. Las restricciones de producto, identidad y entrega provienen de `docs/PRODUCT.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/design/BRAND_ASSETS.md` y del inventario local de referencias.

## Goals / Non-Goals

**Goals:**

- Dejar una base pequeña y mantenible con componentes compartidos para layout, navegación, footer, CTA y placeholders.
- Hacer explícitas las rutas, estados de accesibilidad, tokens visuales, dependencias de assets y comandos reproducibles.
- Probar el comportamiento de navegador automatizable en desktop y móvil con el Chromium disponible en el entorno.
- Mantener los enlaces de apoyo internos y no accionables hasta que existan datos verificados.

**Non-Goals:**

- Crear contenido editorial final, artículos definitivos, fichas completas de juegos o integraciones con los repositorios de juegos.
- Activar Patreon, Ko-fi, PayPal, Nequi, Daviplata o Vaki; inventar URL, QR, destinatarios o disponibilidad.
- Añadir CMS, backend, base de datos, autenticación, analítica, cookies de seguimiento o despliegue.
- Abrir Stitch, consumir enlaces externos como referencia visual o generar/modificar logos.

## Decisions

1. **Astro SSG y componentes nativos simples.** Se elegirá la versión estable compatible con el entorno y la salida estática configurada explícitamente. Astro encaja con la arquitectura aprobada y evita runtime de servidor; no se añadirá React u otro framework sin requerimiento.
2. **Layout único con componentes reutilizables.** Header, menú móvil, footer, CTA y superficies de placeholder tendrán responsabilidades acotadas y serán consumidos por todas las páginas base. Esto evita que cada página derive estados activos, foco o enlaces distintos.
3. **CSS centralizado con tokens documentados.** Los colores `#FFF8F4`, `#D3432B`, `#2A5CDE`, `#1F8A65`, `#E59F24` y `#1E1B18`, junto con Outfit y Plus Jakarta Sans, se expresarán como tokens. Las diferencias frente a HTML/capturas locales se registrarán en el propio cambio; las capturas no se copiarán como código de producción.
4. **Assets aprobados por copia verificable.** Se usarán las rutas de `BRAND_ASSETS.md` y se comprobarán tamaño y SHA-256 completo contra el manifiesto antes de integrarlas. La verificación no se reemplaza por inspección visual ni por conversión automática.
5. **Placeholders explícitos para información pendiente.** Las páginas existirán para probar navegación, pero los datos no verificados se mostrarán como dependencia no accionable. Esto permite sustituir el contenido en cambios posteriores sin crear falsas promesas.
6. **Checks de navegador por ejecutor configurado.** Las pruebas de viewport, menú, enlaces, foco y overflow se asignarán al ejecutor de navegador real durante Apply/Verify. Las decisiones humanas quedarán limitadas a revisión visual o física posterior y no sustituirán checks automatizables.

### Alternativas consideradas

- **CMS o backend:** rechazado porque contradice `docs/ARCHITECTURE.md` y no aporta valor a esta fundación estática.
- **Recrear el logo desde SVG o CSS:** rechazado porque `docs/DESIGN.md` exige usar el asset aprobado y no reinterpretarlo.
- **Usar Stitch o referencias externas:** rechazado por el contrato de ejecución; las referencias locales versionadas son la única fuente visual.
- **Menús separados por página:** rechazado porque aumentaría duplicación y riesgo de divergencia de accesibilidad.

## Risks / Trade-offs

- **[Assets o hashes no disponibles localmente]** → detener la sustitución del placeholder, registrar la dependencia concreta y no declarar preparación productiva.
- **[Referencias de Inicio no reconstruidas]** → ejecutar el restaurador local antes de comparar; tratar los fragmentos Base64 como copia de referencia, no como diseño nuevo.
- **[El CTA flotante obstruye controles en ciertos tamaños]** → reservar espacio seguro y verificar múltiples viewports móviles con navegador real.
- **[Fuentes externas no disponibles en build aislado]** → mantener fallback tipográfico documentado y no introducir una dependencia de red para generar el sitio.
- **[Cambios futuros necesitan contenido real]** → conservar rutas y componentes estables, dejando el contenido desacoplado y sustituible en los siguientes Changes.

## Migration Plan

No hay migración de datos ni despliegue en este Change. Durante Apply se creará la estructura y se verificarán build, assets, rutas y vistas; durante Verify se recopilará evidencia. El rollback consiste en no fusionar el PR o revertir el commit de la fundación mediante el flujo humano normal. La publicación queda explícitamente fuera de esta propuesta.

## Open Questions

- La versión estable concreta de Astro y las versiones de dependencias se fijarán durante Apply según el entorno CI observado; no cambia el contrato SSG ni los escenarios.
- Las URLs y datos accionables de apoyo, así como la disponibilidad pública de los juegos, se resolverán en cambios posteriores con verificación explícita.
