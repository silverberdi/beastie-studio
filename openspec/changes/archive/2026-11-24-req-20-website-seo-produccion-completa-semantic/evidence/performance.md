# Medición de rendimiento

Medición real con Chromium (`puppeteer-core`), servidor HTTP estático local sobre `dist/`, viewport móvil `390x844`, 24 de noviembre de 2026:

```json
{"domContentLoaded":482,"load":557,"transferSize":12483,"firstContentfulPaint":820,"cls":0,"viewport":"390x844","reducedMotion":"not requested in this run"}
```

La E2E separada verificó además `prefers-reduced-motion: reduce`, sin prometer una puntuación Lighthouse ni medir INP cuando el entorno no expuso una interacción de larga duración.
