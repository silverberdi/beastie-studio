# Proposal

## Why

Beastie Studio necesita una página `/apoyanos` clara para adultos y un cierre transversal de calidad antes de considerar la publicación, sin activar cobros ni presentar destinos no verificados como reales. Este cambio completa la preparación estática del sitio con controles reproducibles, dependencias humanas visibles y una política explícita de privacidad y protección de menores.

## What Changes

- Crear `/apoyanos` con narrativa voluntaria para adultos, opciones Patreon, Ko-fi, PayPal, Nequi y Daviplata, y Vaki únicamente si existe una campaña activa.
- Configurar los canales declarativamente con estado de verificación, destino aprobado y representación pendiente no accionable cuando falten datos; no inventar URLs, QR, destinatarios ni beneficios.
- Añadir «También puedes ayudar compartiendo» con enlaces internos a juegos y conservar el CTA flotante y la invitación del footer sin redundancia innecesaria.
- Aplicar una revisión transversal de SEO, metadatos, sitemap condicionado a una base URL verificada, imágenes, responsive, foco, teclado, alt, enlaces y accesibilidad crítica, sin tracking ni recolección de datos infantiles.
- Documentar la publicación estática, variables necesarias y un informe de dependencias que requiera decisión humana sobre canales de pago, URLs de juegos, dominio y hosting.
- Mantener la identidad gráfica aprobada, verificar los binarios y sus SHA-256 completos contra el manifiesto, y usar únicamente las referencias visuales locales autorizadas.
- Preparar checks de build, rutas, enlaces internos y navegador real mediante los comandos declarados, sin desplegar, publicar ni abrir cobros.

## Capabilities

### New Capabilities

- `website-support-and-publication-readiness`: Página de apoyo voluntario, configuración segura de canales, revisión transversal de calidad, privacidad y preparación documental de publicación estática.

### Modified Capabilities

- `website-foundation`: ampliar los requisitos de entrega estática y verificación transversal para exigir sitemap condicionado a base URL verificada, integridad de marca y evidencia de checks sin tracking ni datos infantiles.

## Impact

- Afecta páginas y componentes Astro compartidos, configuración declarativa de canales, metadatos y generación de sitemap.
- Afecta documentación de publicación y dependencias pendientes; no añade backend, CMS, base de datos, autenticación, analítica ni pasarela de pagos.
- Depende de los assets locales de `docs/design/references/`, de los binarios de `public/assets/brand/` y `public/`, y de decisiones humanas posteriores sobre destinos de apoyo, URLs públicas de juegos, dominio y hosting.
- Los checks de navegador se ejecutarán por el ejecutor configurado durante Apply o Verify; no se asignan al operador ni a validación humana.
