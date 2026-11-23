# Inventario de referencias visuales — Beastie Studio

Este directorio es la **fuente de referencia visual local para Mini Me**. Durante la ejecución **NO abrir Stitch ni usar enlaces externos a Stitch**. Los archivos `.html` son capturas de código de referencia para estudiar layout/tokens, **no código de producción**. Los `.png` son capturas de pantallas o ilustraciones conceptuales, **no necesariamente assets autorizados para producción**.

## Recuperación de Inicio escritorio

El PNG original de Stitch de **2560 × 8710** fue recuperado sin modificación. Por el límite de tamaño del conector GitHub, está versionado como 13 archivos Base64 en `source/home-desktop.png.b64.part-*`. Antes de consumir referencias visuales, ejecutar **una sola vez** desde la raíz del repositorio:

```bash
python3 docs/design/references/restore-home-desktop.py
```

Esto reconstruye el PNG original en `docs/design/references/home-desktop.png`. La operación es local, no requiere Stitch ni conectividad y valida cantidad de fragmentos, longitud, formato y dimensiones. Los fragmentos son fuente de referencia, **no assets de producción**.

## Pantallas exportadas
| Pantalla | Imagen de referencia | HTML referencial |
|---|---|---|
| Inicio escritorio | `home-desktop.png` (reconstruir desde chunks versionados) | `home-desktop.html` |
| Inicio móvil | `home-mobile.png` | `home-mobile.html` |
| Juegos escritorio | `juegos-desktop.png` | `juegos-desktop.html` |
| Nosotros escritorio | `nosotros-desktop.png` | `nosotros-desktop.html` |
| Novedades escritorio | `novedades-desktop.png` | `novedades-desktop.html` |
| Novedades móvil | `novedades-mobile.png` | `novedades-mobile.html` |
| Artículo Múltiplo escritorio | `articulo-multiplo-desktop.png` | `articulo-multiplo-desktop.html` |
| Apóyanos escritorio | `apoyanos-desktop.png` | `apoyanos-desktop.html` |
| Apóyanos móvil | `apoyanos-mobile.png` | `apoyanos-mobile.html` |

## Ilustraciones exportadas de diseño
- `illustration-boxio-concept.png`
- `illustration-multiplo-editorial.png`
- `illustration-apoyanos.png`

Estas ilustraciones son **conceptuales**: no deben presentarse como pantallazos de juegos reales. Comprobar la coherencia y los derechos de uso antes de moverlas a `public/assets/`.

## Verificación de incorporación (22 de noviembre de 2026)

Las nueve referencias de pantallas (Inicio escritorio reconstruible desde 13 fragmentos, las otras ocho en PNG) y las tres ilustraciones conceptuales están versionadas. El commit `be8c901fdeb2d6d1669e4604c26791b72039d434` incorporó los seis PNG faltantes. **Actualización posterior (22 nov 2026):** logo y favicon de producción ya están versionados en `public/assets/brand/` y `public/`; tamaños contrastados con el manifiesto.

## Logo final
La marca horizontal aprobada está incorporada como asset de producción en `public/assets/brand/beastie-logo-approved.png`, **no en este directorio de referencias**. Utilizar el archivo aprobado, sin regenerarlo ni reinterpretarlo. El isotipo tiene una B terracota con ojo azul y un ala izquierda; a su derecha el texto COMPLETO BEASTIE en negro y STUDIO en azul con adornos terracota. Favicon sin ala. El archivo fuente ya está versionado en GitHub; verificar SHA-256 contra `public/assets/brand/manifest.json` durante la integración.

## Consumo por issues
- #1: ejecutar `restore-home-desktop.py`, después usar `home-desktop.png`, `home-mobile.png`, `home-desktop.html` y las demás pantallas para header/footer; logo fuente en `public/assets/brand/beastie-logo-approved.png`.
- #2: ejecutar `restore-home-desktop.py`, después usar `home-desktop.png`, `juegos-desktop.png`, `nosotros-desktop.png`, `home-mobile.png`, `home-desktop.html` e ilustraciones de juegos.
- #3: `novedades-desktop.png`, `novedades-mobile.png`, `articulo-multiplo-desktop.png`.
- #4: `apoyanos-desktop.png`, `apoyanos-mobile.png`, `illustration-apoyanos.png`.

## Precedencia
Contrato de producto/contenido en `docs/` prevalece sobre texto improvisado en pantallas generadas. El logo aprobado prevalece sobre cualquier logotipo inventado en capturas. No inventar fechas, premios, features, enlaces de pago o disponibilidad pública.
