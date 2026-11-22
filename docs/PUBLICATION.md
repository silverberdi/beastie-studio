# Preparación de publicación estática

El sitio se genera como Astro SSG sin servidor, CMS, base de datos, cuentas, analítica, cookies de seguimiento ni pasarela de pago propia.

## Comandos

```bash
npm install
npm run test
npm run test:browser
npm run build
```

`PUBLIC_SITE_URL` es opcional durante el desarrollo. Solo se acepta un dominio HTTPS explícito y verificado. Sin esa variable, el build no genera `dist/sitemap.xml` y deja la dependencia pendiente; nunca se inventa un dominio. Con la variable válida, se genera el sitemap de las rutas estáticas reales.

## Dependencias humanas antes de publicar

- Confirmar y configurar los destinos reales de Patreon, Ko-fi y PayPal.
- Confirmar destinatarios o QR legítimos de Nequi y Daviplata.
- Confirmar si existe una campaña Vaki activa y su URL aprobada.
- Verificar las URLs públicas de Múltiplo y Boxio si deben añadirse.
- Decidir el dominio, hosting y autorización de publicación.
- Hacer la revisión editorial y visual final.

Hasta resolver esas dependencias, las tarjetas de apoyo permanecen pendientes y no accionables. No hay cobros activos ni despliegue realizado por este cambio.
