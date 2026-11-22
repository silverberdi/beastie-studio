# Tasks

## 1. Auditoría y contratos visuales

- [x] 1.1 Ejecutar `python3 docs/design/references/restore-home-desktop.py`, comprobar las nueve referencias PNG/HTML y las tres ilustraciones conceptuales, y entregar una matriz inicial de diferencias por vista con estructura, imágenes, color, escala, espaciado, ornamentos, tipografía, responsive, header/footer y enlaces.
- [x] 1.2 Inventariar rutas, componentes, callers y estilos que producen `Placeholder`, el arte conceptual textual de `GameCard` o reglas globales aplanadoras, y verificar que la matriz distingue dependencias legítimas de sustituciones obsoletas.
- [x] 1.3 Verificar la existencia, dimensiones y SHA-256 completo de los binarios de logo/favicon contra `public/assets/brand/manifest.json`, y registrar cualquier discrepancia sin modificar los binarios.

## 2. Assets y sistema visual compartido

- [x] 2.1 Comprobar origen, correspondencia y autorización documentada de `illustration-boxio-concept.png`, `illustration-multiplo-editorial.png` e `illustration-apoyanos.png`; copiar solo los autorizados a una ruta pública estable y verificar que el build los incluye.
- [x] 2.2 Ajustar tokens, fuentes efectivamente cargadas, variantes de sección y reglas responsive compartidas para respetar el sistema «Warm Editorial Arcade»; verificar contra `docs/DESIGN.md`, `docs/design/references/README.md` y `src/layouts/BaseLayout.astro` que no se introduce un degradado o layout global que aplane las páginas.
- [x] 2.3 Mantener o corregir `BaseLayout`, navegación, footer y CTA flotante con base pública `/beastie-studio/`, foco visible, nombres accesibles y espacio seguro en móvil; verificar con navegación por teclado y enlaces internos reales.

## 3. Inicio, catálogo y páginas institucionales

- [x] 3.1 Recuperar el hero y las secciones completas de Inicio desktop usando `home-desktop.png`/HTML como referencia local, incluyendo catálogo, novedades, estudio, apoyo, header y footer; verificar la captura completa contra la referencia.
- [x] 3.2 Implementar la composición móvil específica de Inicio a partir de `home-mobile.png`, sin comprimir el layout desktop; verificar viewport aproximado de 390 px, ausencia de overflow y CTA sin obstrucción.
- [x] 3.3 Actualizar `GameCard` y las fichas de Múltiplo/Boxio para usar ilustraciones conceptuales autorizadas, alt contextual y estados sin CTA «Jugar» no verificado; verificar `/juegos`, `/juegos/multiplo` y `/juegos/boxio` con assets cargados.
- [x] 3.4 Corregir `/nosotros` según su referencia local, preservando el manifiesto y la firma aprobados; verificar jerarquía, espaciado, navegación y ausencia de datos institucionales inventados.

## 4. Novedades y artículo

- [x] 4.1 Recuperar índice de Novedades desktop y móvil con destacado, tarjetas, categorías, filtros observables y ritmo editorial de las referencias; verificar todas las categorías con contenido y el retorno al conjunto completo.
- [x] 4.2 Corregir la plantilla de detalle y el artículo de Múltiplo con cabecera, breadcrumb, lectura, relacionados, CTA al catálogo e imagen solo cuando esté aprobada; verificar slug, metadatos, enlaces y captura completa desktop.

## 5. Apóyanos y estados honestos

- [x] 5.1 Reemplazar la composición genérica de `/apoyanos` por la estructura desktop de referencia, incluyendo ilustración autorizada, canales, transparencia y compartir; verificar que ningún canal pendiente sea clicable o apunte a `#`, vacío o URL inventada.
- [x] 5.2 Implementar la adaptación móvil de Apóyanos con contenido completo y CTA sin ocultar controles; verificar viewport aproximado de 390 px, foco, contraste, alt y ausencia de overflow.

## 6. Retiro seguro y compatibilidad

- [x] 6.1 Retirar solo los bloques visuales textuales, degradados genéricos y placeholders injustificados sustituidos por componentes reales, conservar placeholders legítimos de dependencias no verificadas y verificar ausencia de callers muertos.
- [x] 6.2 Comprobar que no se modificaron logo/favicon, contenido aprobado, rutas públicas, artículos, filtros, CTA/footer, configuración SSG ni repositorios Múltiplo/Boxio; verificar diff acotado al Change y rutas internas con base pública.

## 7. Verificación automatizada y evidencia

- [x] 7.1 Ejecutar `npm run test` y `npm run build`; verificar salida estática, rutas producidas en `dist/`, assets sin 404, enlaces internos y ausencia de cambios de infraestructura.
- [x] 7.2 Configurar o extender el ejecutor browser declarado para correr `npm run test:browser` en desktop y móvil, comprobar navegación, menú, filtros, foco, alt, imágenes cargadas, overflow y CTA; conservar evidencia observable de resultados y no delegar navegación automatizable al operador o a `human_validation`.
- [x] 7.3 El ejecutor configurado debe capturar páginas completas del Astro real en aproximadamente 1440 px y 390 px para Inicio desktop/móvil, Juegos desktop, Nosotros desktop, Novedades desktop/móvil, artículo de Múltiplo desktop y Apóyanos desktop/móvil; entregar pares referencia→implementación y optimizar solo derivados de evidencia.
- [x] 7.4 El ejecutor debe completar la matriz final PASS/FAIL por cada vista y por hero/layout, imágenes, tarjetas, fondos/ornamentos, tipografía/espaciado, responsive, header/footer y enlaces; explicar cada diferencia intencional y dejar pendientes humanos separados de checks automatizables.

## 8. Cierre para revisión humana

- [x] 8.1 El ejecutor configurado debe repetir build, tests, smoke browser y capturas después del retiro seguro; verificar que no persisten simplificaciones injustificadas, 404, overflow, textos solapados ni controles obstruidos.
- [x] 8.2 Preparar el resumen del PR con matriz, capturas, comandos y dependencias pendientes para decisión humana, y dejar explícito que PR, merge, despliegue y activación de cobros no se ejecutan automáticamente.
