# Proposal

## Why

El sitio Astro publicado conserva la navegación y el contenido base, pero perdió la fidelidad visual de las nueve vistas aprobadas: hero, ilustraciones, composición editorial, fondos, ritmo, tarjetas y la página de apoyo fueron reducidos a texto, degradados o placeholders. Este cambio corrige esa regresión visual comprobando cada ruta contra las referencias locales versionadas, sin rediseñar la marca ni convertir las capturas en assets de producción.

## What Changes

- Auditar antes de implementar las nueve referencias PNG/HTML locales, reconstruyendo `home-desktop.png`, y registrar por página las diferencias de layout, imágenes, color, escala, espaciado, ornamentos, tipografía, responsive, header/footer y enlaces.
- Recuperar la composición completa de Inicio en desktop y móvil: hero, catálogo, novedades, estudio, apoyo, header y footer, con el tratamiento «Warm Editorial Arcade» y los tokens documentados.
- Sustituir tarjetas y bloques simplificados del catálogo por componentes visuales mantenibles que carguen las ilustraciones conceptuales autorizadas de Múltiplo, Boxio y Apóyanos con alt contextual, sin presentarlas como gameplay real.
- Corregir `/juegos`, `/juegos/multiplo`, `/juegos/boxio` y `/nosotros` siguiendo sus referencias y conservando contenido, navegación y ausencia de URLs de juego no verificadas.
- Corregir `/novedades`, su adaptación móvil y el detalle de artículo de Múltiplo con el destacado, tarjetas, filtros, lectura y relacionados de las referencias, manteniendo el modelo editorial estático.
- Reemplazar la composición genérica de `/apoyanos` por la página diseñada en desktop y móvil; mostrar canales pendientes como no accionables cuando falten URL, QR o destinatario verificado.
- Preservar el logo, favicon, rutas, CTA flotante, footer, metadatos y base pública de GitHub Pages; verificar assets y enlaces con el prefijo configurado.
- Añadir evidencia auditable: capturas completas del Astro real en desktop/móvil para las nueve vistas de la matriz (incluidas `/juegos` y las fichas de juego como extensión del sistema de catálogo), pares comparables con las referencias, matriz PASS/FAIL por página y resultados de `npm run test`, `npm run build` y `npm run test:browser` cuando el entorno lo permita.
- Retirar dentro del alcance las sustituciones visuales que el cambio reemplace, incluyendo el arte conceptual textual y placeholders injustificados, sin eliminar placeholders legítimos de dependencias no verificadas.

## Capabilities

### New Capabilities

Ninguna. El cambio restaura y precisa requisitos de capacidades ya existentes.

### Modified Capabilities

- `website-foundation`: la fundación visual compartida, navegación responsive, integridad de assets y verificación de navegador deben cubrir la composición aprobada sin aplanar las páginas, manteniendo SSG y accesibilidad.
- `website-catalog-and-institutional-pages`: Inicio, catálogo, fichas y Nosotros deben incluir la composición referencial y las ilustraciones conceptuales autorizadas, con diferencias registradas y sin confundirlas con capturas reales.
- `website-editorial-news`: índice, filtros, detalle de artículo y responsive deben recuperar el ritmo editorial y los tratamientos visuales de las referencias locales sin alterar el modelo de contenido ni inventar fechas o imágenes.
- `website-support-and-publication-readiness`: `/apoyanos` debe recuperar su diseño completo en ambos viewports, conservar canales honestamente pendientes y aportar evidencia transversal de rutas, enlaces, accesibilidad y base pública.

## Impact

- Código afectado: layout global, páginas de Inicio, Juegos, fichas, Nosotros, Novedades y Apóyanos, componentes compartidos de tarjetas/CTA/footer y estilos Astro/CSS.
- Assets afectados: solo se evaluarán y, si están autorizadas, se copiarán las tres ilustraciones conceptuales a una ruta pública; los binarios de logo/favicon se conservarán y se comprobarán contra su manifiesto.
- Verificación afectada: inventario visual local, capturas del sitio ejecutado, pruebas declaradas y comprobaciones de rutas/assets con la base `/beastie-studio/`; el navegador configurado será el ejecutor de checks automatizables.
- No se introducen APIs, servidor, CMS, base de datos, pagos, tracking, dependencias visuales nuevas ni cambios en los repositorios Múltiplo o Boxio. El merge, despliegue y activación de canales de apoyo siguen requiriendo control humano.
- Dependencias pendientes: autorización concreta de uso de cada ilustración conceptual si la documentación no la resuelve, URLs/datos de apoyo no verificados, base URL definitiva y cualquier limitación del entorno browser; cada una deberá quedar registrada sin bloquear artificialmente las correcciones independientes.
