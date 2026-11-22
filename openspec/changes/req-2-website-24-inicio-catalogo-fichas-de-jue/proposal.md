# Proposal

## Why

La base compartida del sitio ya permite construir incrementos editoriales, pero todavía no materializa el valor principal solicitado para descubrir Beastie Studio: Inicio, catálogo, fichas de Múltiplo y Boxio, y la presentación institucional. Este cambio implementa ese siguiente incremento vertical en español, manteniendo el sitio Astro estático, navegable y fiel al contenido y a las referencias visuales locales autorizadas.

## What Changes

- Convertir las rutas de Inicio, Juegos y Nosotros desde placeholders en contenido editorial institucional y de catálogo.
- Crear `/juegos/multiplo` y `/juegos/boxio` como fichas informativas estáticas con los textos aprobados, CTA interno «Conocer» y sin embeber ni reconstruir los juegos.
- Componer `/` con el hero «Descubrir. Pensar. Compartir.», CTAs internos, catálogo destacado de exactamente Múltiplo y Boxio, novedades, bloque del estudio y apoyo discreto.
- Componer `/juegos` con exactamente Múltiplo y Boxio, y `/nosotros` con el manifiesto y propósito aprobados, sin fundadores, cifras, sedes ni premios inventados.
- Reutilizar la navegación, tarjetas, footer, apoyo y sistema visual existentes, adaptando desktop y móvil a las referencias locales de Inicio, Juegos y Nosotros.
- Usar las ilustraciones conceptuales exportadas solo como ilustraciones identificadas, nunca como capturas de gameplay; conservar placeholders explícitos para cualquier asset o dato no verificado.
- Omitir CTAs «Jugar» hasta verificar una URL pública legítima de cada juego; no crear enlaces `#` ni destinos ficticios.
- Mantener metadatos SEO y Open Graph básicos sin inventar dominio, y preparar evidencia de rutas, contenido, enlaces y responsive mediante los checks de navegador configurados para Apply/Verify.

## Capabilities

### New Capabilities

- `website-catalog-and-institutional-pages`: Inicio, catálogo, fichas de Múltiplo y Boxio, y página Nosotros con navegación, contenido y presentación responsive verificables.

### Modified Capabilities

- `website-foundation`: Las rutas placeholder de Inicio, Juegos y Nosotros pasan a contenido institucional y de catálogo; se añaden las fichas de juegos y se precisa la regla de CTAs externos únicamente con URLs verificadas, manteniendo los requisitos de accesibilidad, assets de marca, navegación y verificación de navegador.

## Impact

- Afecta las páginas Astro, componentes reutilizables, estilos y contenido estático del sitio dentro de este repositorio.
- Reutiliza y puede extender la capacidad existente `website-foundation`; no introduce backend, CMS, base de datos, cuentas, pagos propios, runtime de juegos ni dependencias de Múltiplo o Boxio.
- Consume las referencias locales `home-desktop`, `home-mobile`, `juegos-desktop`, `nosotros-desktop`, sus HTML de referencia e ilustraciones conceptuales, después de reconstruir la captura de Inicio escritorio con el script indicado.
- La verificación SHA-256 completa de los assets de marca aprobados, las URLs públicas de juego, el dominio final y la publicación permanecen sujetos a las fuentes/decisiones humanas correspondientes; no son inventados ni activados por este cambio.
