# Identidad gráfica aprobada — contrato de integración

## Decisión final del propietario (22 nov 2026)
Se recibieron dos archivos aprobados por el propietario:
- **Logo horizontal**: `beastie-logo-approved.png`; composición: isotipo B terracota con ala solamente a la izquierda, ojo azul, texto completo BEASTIE en negro, STUDIO azul entre dos rayas terracota. **No sustituir la B de BEASTIE por el isotipo.**
- **Favicon**: `beastie-favicon-source-512.png`; símbolo B terracota con ojo azul, **sin ala**.

Los PNG originales proporcionados en conversación se preservaron en un paquete de identidad con tamaños web. **Incorporación verificada en GitHub (22 nov 2026):** los archivos de identidad se encuentran en las rutas de producción indicadas; su tamaño coincide con `public/assets/brand/manifest.json`. La validación SHA-256 completa debe ejecutarse sobre los binarios en una copia local.

## Destino obligatorio de archivos
- `public/assets/brand/beastie-logo-approved.png` — logo horizontal canónico
- `public/assets/brand/beastie-favicon-source-512.png` — fuente canónica del favicon
- `public/favicon.ico` — favicon navegador
- `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon-48x48.png`
- `public/favicon-192x192.png`, `public/favicon-512x512.png`
- `public/apple-touch-icon.png`
- `public/assets/brand/manifest.json` — manifiesto del paquete; no es necesariamente el web app manifest

## Verificación de integridad (SHA-256)
- `beastie-logo-approved.png`: `403d0aebd1cc94b5` (prefijo)
- `beastie-favicon-source-512.png`: `5b2ed4dd92820870` (prefijo)
El prefijo no sustituye el hash completo del paquete. No renombrar ni alterar los originales.

## Regla para Mini Me
1. Leer este documento junto a `docs/DESIGN.md` y `docs/design/references/README.md`.
2. Antes de sustituir placeholders, verificar la existencia real de los archivos indicados en GitHub.
3. Usar exactamente las imágenes aprobadas. No redibujar, vectorizar automáticamente ni crear otra propuesta de logo/favicon.
4. Si falta un binario, registrar bloqueo concreto y no declarar resuelta esa dependencia.
5. Conservar referencias visuales locales en `docs/design/references/`; no usar Stitch como fuente en ejecución.
6. Las imágenes del logo y favicon son assets de producción; las capturas de Stitch son solamente referencias visuales.

## Estado
**Aprobado gráficamente e incorporado a GitHub.** Los 9 binarios se encuentran en el árbol de `main` y coinciden en tamaño con el manifiesto. Pendiente únicamente la verificación SHA-256 completa durante la integración local.
