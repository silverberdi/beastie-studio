# Tasks

## 1. Inventario y contrato de datos

- [x] 1.1 Revisar la implementación compartida de layout, CTA flotante, footer, metadatos y rutas existentes; registrar en el cambio los callers y consumidores que se conservarán o sustituirán, verificando que no se amplía el alcance fuera de `/apoyanos` y calidad transversal.
- [x] 1.2 Crear la configuración declarativa de canales con nombre, estado, tipo de destino y valor aprobado opcional; verificar mediante test que estados pendientes no producen enlaces, botones de pago ni QR accionables.
- [x] 1.3 Integrar los binarios de marca existentes sin modificarlos y validar presencia, tamaños y SHA-256 completo contra `public/assets/brand/manifest.json`; verificar que el hash coincide para todos los archivos declarados.

## 2. Página de apoyo y navegación contextual

- [x] 2.1 Implementar `/apoyanos` con la narrativa voluntaria para adultos, Patreon, Ko-fi, PayPal, Nequi y Daviplata, mostrando Vaki solo cuando la configuración indique campaña activa verificada; verificar el texto renderizado y la ausencia de Vaki en estado inactivo.
- [x] 2.2 Renderizar tarjetas pendientes y habilitadas desde la configuración, con destino exacto solo para canales verificados; verificar que no existen `href` genéricos, vacíos o ficticios ni controles clicables sin destino.
- [x] 2.3 Añadir «También puedes ayudar compartiendo» con enlaces internos a `/juegos/multiplo` y `/juegos/boxio`, y ajustar el CTA flotante/footer para conservar `/apoyanos` sin repetir la narrativa; verificar todos los destinos con el smoke test interno.
- [x] 2.4 Aplicar las referencias locales `apoyanos-desktop.png`, `apoyanos-mobile.png` e `illustration-apoyanos.png`, con alt que identifique la ilustración conceptual; verificar responsive, foco, contraste, teclado y ausencia de overflow horizontal.

## 3. Calidad estática, privacidad y publicación

- [x] 3.1 Centralizar metadatos SEO/Open Graph y configurar la base URL únicamente desde una variable explícita verificada; verificar que sin base URL no se generan URLs de dominio ficticias.
- [x] 3.2 Implementar la regla de sitemap condicionado a base URL verificada y documentar el comportamiento pendiente; verificar ambas ramas inspeccionando la salida estática.
- [x] 3.3 Revisar imágenes, alt, enlaces externos, cookies, tracking y rutas para confirmar que no se recolectan datos infantiles ni se añade analítica; verificar mediante inspección automatizada de salida y dependencias.
- [x] 3.4 Documentar build/publicación estática, variables necesarias y el informe de dependencias humanas para canales de apoyo, URLs de juegos, dominio y hosting; verificar que el documento no afirma despliegue ni cobros activos.

## 4. Evidencia y entrega revisable

- [x] 4.1 Reconstruir una sola vez Home desktop con `python3 docs/design/references/restore-home-desktop.py` y comparar visualmente usando únicamente las referencias locales autorizadas; verificar dimensiones 2560×8710 y registrar cualquier dependencia visual.
- [x] 4.2 Ejecutar `npm run test`, `npm run test:browser` y el build documentado; verificar que se conservan salidas observables de build, rutas y checks declarados.
- [x] 4.3 Ejecutar los checks de navegador real en Apply o Verify para desktop y móvil, menú, foco, enlaces, metadatos, alt y overflow; verificar evidencia observable por ruta sin delegar navegación asíncrona o viewport a la persona operadora.
- [x] 4.4 Revisar el diff final contra proposal, specs y design, confirmar que no hay código duplicado o rutas sustituidas sin retirar, y dejar el PR listo para merge humano sin desplegar ni publicar; verificar el estado Git y el informe de dependencias antes de la revisión.
