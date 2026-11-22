# Proposal

## Why

Múltiplo y Boxio ya tienen URLs públicas confirmadas por el propietario, pero el catálogo de Beastie Studio aún las trata como no verificadas y no ofrece un acceso directo coherente. Este cambio habilita el descubrimiento y el inicio de cada juego desde Inicio, catálogo y ficha, preservando la presentación editorial y la separación entre el sitio y los repositorios de los juegos.

## What Changes

- Registrar exactamente `https://multiplo.silverman.pro/` y `https://boxio.silverman.pro/` en la fuente declarativa central de juegos.
- Añadir CTAs accesibles «Jugar» en las superficies aplicables de `/`, `/juegos`, `/juegos/multiplo` y `/juegos/boxio`, manteniendo «Conocer» como navegación editorial interna.
- Garantizar que los enlaces externos sean absolutos, apunten al juego correcto y conserven navegación interna, base de GitHub Pages, accesibilidad y diseño existente.
- Comprobar técnicamente ambas URLs con HTTP y navegador, y conservar una tabla de evidencia con URL, fuente, resultado y fecha.
- Actualizar la documentación que todavía declare estas URLs como pendientes, sin eliminar dependencias reales de dominio, pagos, publicación u otros datos no verificados.
- Añadir o ajustar tests de mapeo de URLs, rutas y navegación de los CTAs, incluyendo las comprobaciones de navegador configuradas para Apply/Verify.
- No incrustar juegos, modificar sus repositorios, compartir autenticación/progreso, crear proxy/API ni desplegar producción.

## Capabilities

### New Capabilities

- Ninguna. El cambio extiende capacidades existentes del catálogo y de la verificación del sitio.

### Modified Capabilities

- `website-catalog-and-institutional-pages`: las tarjetas y fichas deben mostrar «Jugar» cuando la URL pública exacta del juego está verificada, manteniendo «Conocer» como CTA interno y mapeando cada destino al juego correcto.
- `website-foundation`: la verificación del sitio debe cubrir enlaces externos absolutos, navegación bajo la base desplegada, comprobaciones HTTP/navegador de las URLs públicas y evidencia reproducible de los CTAs.

## Impact

- Afecta `src/data/games.js`, los componentes/páginas que renderizan tarjetas y fichas, y los tests existentes del sitio Astro.
- Afecta documentación de estado de URLs y la evidencia del cambio; no modifica los repositorios `multiplo` ni `boxio`, ni sus hosting o workflows.
- No introduce APIs, dependencias de servidor, CMS, autenticación, base de datos, pagos ni cambios de branding.
- La URL base del sitio y cualquier dependencia de publicación o pagos permanece fuera de este cambio salvo su conservación explícita en la documentación.
