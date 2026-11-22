# Design

## Context

El estado actual es un Astro SSG con layout y componentes compartidos, pero varias vistas sustituyen composiciones aprobadas por estilos simplificados, rótulos o `Placeholder`. La fuente visual exclusiva es `docs/design/references/`; el proposal define la motivación y las specs delta definen el comportamiento exigible. El repositorio debe seguir siendo estático, con contenido autorizado, sin tocar Múltiplo/Boxio ni activar pagos.

## Goals / Non-Goals

**Goals:**

- Derivar una auditoría visual verificable de las nueve vistas y convertirla en una matriz de diferencias que guíe la implementación y la revisión.
- Recuperar composición, jerarquía, ilustración, fondos, ornamentos, ritmo editorial, tipografía y responsive mediante componentes Astro/CSS simples y reutilizables.
- Integrar únicamente ilustraciones conceptuales cuya autorización y correspondencia con el diseño estén documentadas; mantener estados pendientes honestos para URLs, QR y datos de apoyo.
- Probar el resultado real servido con base `/beastie-studio/`, incluyendo rutas, assets, navegación, foco, alt, overflow y capturas completas comparables.
- Retirar el comportamiento visual reemplazado y conservar los contratos de contenido, navegación, SEO, SSG y CTA.

**Non-Goals:**

- Rediseñar logo, favicon, identidad, copy aprobado o arquitectura Astro.
- Pegar capturas de wireframes como banners o reconstruir pantallas de juego reales.
- Añadir framework visual, servidor, CMS, base de datos, pagos, tracking, analítica o dependencias externas.
- Inventar URLs públicas, datos de pago, fechas, screenshots, funcionalidades de juegos o contenido institucional.
- Desplegar, abrir PR, fusionar o modificar los repositorios Múltiplo y Boxio.

## Decisions

### 1. Auditoría local como contrato de implementación

Se ejecutará una sola vez el restaurador de `home-desktop.png` y se verificará la matriz completa antes de editar código. Para cada página se registrarán diferencias de estructura, escala, color, imágenes, espaciado, adornos, tipografía, responsive, header/footer y enlaces. Se usará el HTML únicamente para estudiar tokens y estructura, no para copiar CSS indiscriminadamente.

**Alternativa descartada:** implementar desde una lectura general de la referencia o desde Stitch; contradice la fuente visual local y no deja evidencia comparable.

### 2. Sistema visual compartido por composición, no por aplanamiento global

Se conservará `BaseLayout` para navegación, metadatos, footer y CTA, pero se separarán tratamientos por sección mediante componentes y clases de página/variante. `GameCard`, tarjetas editoriales, hero, bloques de estudio/apoyo y estados de canal compartirán estructura y tokens sin forzar un único degradado o escala global. Los tokens se contrastarán con `docs/DESIGN.md` y las referencias locales; la verificación de la integración compartida usará el layout existente y las salidas renderizadas, sin depender de un inventario de capacidades de un archivo CSS específico. Los tokens serán variables CSS para marfil, terracota, azul, verde, mostaza, tinta y las fuentes efectivamente cargadas.

**Alternativa descartada:** duplicar una página por screenshot o copiar el HTML exportado completo; ambos caminos degradan mantenibilidad y accesibilidad.

### 3. Assets conceptuales con clasificación explícita

Se comprobarán los tres PNG conceptuales contra la documentación local y se dejará constancia de origen/uso. Solo los autorizados se copiarán a `public/assets/illustrations/` con nombres estables y se referenciarán desde componentes reales con alt que indique «ilustración conceptual». Si uno no puede autorizarse, se conserva un estado no accionable y se registra la dependencia sin bloquear el resto del cambio.

Los logo/favicon existentes se verificarán por SHA-256 completo contra `public/assets/brand/manifest.json`; no se regeneran ni se sustituyen.

### 4. Base pública y validación de navegador

La implementación mantendrá la configuración de Astro/GitHub Pages y resolverá imágenes, fuentes, favicon y navegación usando la base pública configurada, no rutas raíz asumidas. El ejecutor configurado correrá los checks de navegador declarados en `package.json`, incluyendo viewports aproximados de 1440 y 390 px, menú, enlaces, foco, alt, imágenes cargadas, overflow y capturas completas. Las comprobaciones físicas o decisiones de publicación quedan separadas como pendientes humanas; navegación, viewport, asincronía y capturas no se asignan a operador ni a `human_validation`.

**Alternativa descartada:** validar solo con `npm run build` o pedir al operador/humano que ejecute navegación automatizable; no demuestra fidelidad ni comportamiento real.

### 5. Sustitución y retiro seguro

Se inventariarán callers y estilos de `Placeholder`, el bloque conceptual textual de `GameCard` y reglas globales que aplanen secciones. Se migrarán sus consumidores a los componentes visuales aprobados, se retirará solo el código demostrado obsoleto y se repetirán build, smoke y capturas después del retiro. Los placeholders legítimos de dependencias no verificadas permanecen con estado visible y no accionable.

## Risks / Trade-offs

- [Riesgo] Las capturas de referencia pueden exigir assets no incluidos o autorizaciones no resueltas → [Mitigación] registrar cada archivo y dependencia exacta; no presentar un placeholder injustificado como PASS ni fabricar sustitutos.
- [Riesgo] Una imagen de 2560×8710 puede aumentar consumo de memoria durante auditoría → [Mitigación] usarla solo como referencia local, no versionar derivados nuevos ni servirla en producción; optimizar únicamente evidencia, no fuentes.
- [Riesgo] El prefijo `/beastie-studio/` puede romper enlaces o imágenes que funcionaban en dev → [Mitigación] servir `dist/` con la configuración real y comprobar las URLs producidas, incluyendo detalle de juegos y artículos.
- [Riesgo] Ajustes CSS globales pueden producir regresiones entre rutas → [Mitigación] centralizar tokens, usar variantes explícitas, revisar las nueve vistas y repetir el smoke browser tras cada retiro.
- [Riesgo] Canales de apoyo pendientes pueden parecer activos → [Mitigación] usar estados declarativos no accionables, sin `#`, URL vacía, QR o destinatario inventado.
- [Riesgo] La evidencia visual puede ocultar problemas fuera del primer pliegue → [Mitigación] capturar páginas completas en ambos viewports solicitados y conservar pares referencia→Astro junto a la matriz PASS/FAIL.

## Migration Plan

1. Crear inventario/auditoría visual y comprobar referencias, ilustraciones, marca y configuración de base pública.
2. Ajustar tokens/layout/componentes y páginas por grupos: Inicio/catálogo/institucional, Novedades/artículo y Apóyanos, manteniendo navegación y contenido.
3. Integrar o dejar registradas las ilustraciones conceptuales según autorización, y retirar sustituciones visuales demostradas como obsoletas.
4. Ejecutar `npm run test`, `npm run build`, `npm run test:browser` y checks adicionales de rutas/assets; generar capturas completas, pares y matriz.
5. Si una validación falla, revertir el grupo visual afectado en el candidato y corregir antes de PR; no desplegar ni modificar producción. La publicación seguirá el pipeline existente después del merge humano.

## Open Questions

- Ninguna decisión abierta cambia el contrato o el enfoque. La autorización concreta de cada ilustración, las URLs de apoyo y la base de dominio se tratarán como dependencias explícitas en la evidencia y no se inventarán.
