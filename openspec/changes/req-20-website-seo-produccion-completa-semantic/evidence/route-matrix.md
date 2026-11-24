# Matriz de rutas generadas

Configuración verificada: `PUBLIC_SITE_URL=https://beastie-studio.silverman.pro`.

| Ruta | Title/description | Canonical + OG/Twitter | Schema | Imagen | Enlaces |
|---|---|---|---|---|---|
| `/` | ✓ | ✓ | Organization + WebSite | logo + hero | ✓ |
| `/juegos` | ✓ | ✓ | metadata de página | logo + hero + capturas | ✓ |
| `/juegos/multiplo` | ✓ | ✓ | VideoGame + BreadcrumbList | captura real | ✓ externo + interno |
| `/juegos/boxio` | ✓ | ✓ | VideoGame + BreadcrumbList | captura real | ✓ externo + interno |
| `/novedades` | ✓ | ✓ | metadata de página | logo | ✓ |
| `/novedades/que-es-beastie-studio` | ✓ | ✓ | BlogPosting + BreadcrumbList | logo fallback | ✓ |
| `/novedades/por-que-creamos-multiplo` | ✓ | ✓ | BlogPosting + BreadcrumbList | logo fallback | ✓ |
| `/novedades/boxio-un-clasico-que-sigue-dando-juego` | ✓ | ✓ | BlogPosting + BreadcrumbList | logo fallback | ✓ |
| `/novedades/juegos-hechos-con-carino` | ✓ | ✓ | BlogPosting + BreadcrumbList | logo fallback | ✓ |
| `/nosotros` | ✓ | ✓ | metadata de página | logo | ✓ |
| `/apoyanos` | ✓ | ✓ | metadata de página | logo + ilustración | ✓ internos; canales pendientes |

Verificación: `npm test`, `npm run build` y `npm run test:browser` con salida 0.
