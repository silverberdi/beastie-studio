# Design

## Context

El catálogo ya centraliza la información de Múltiplo y Boxio, pero sus URLs públicas permanecen nulas según la especificación vigente. El sitio es Astro estático y las fichas deben seguir siendo informativas, sin embebidos ni runtime compartido. La motivación y el contrato de comportamiento están en `proposal.md` y en las deltas de catálogo y fundación.

## Goals / Non-Goals

**Goals:**

- Mantener una única fuente declarativa para nombre, ficha y URL pública de cada juego.
- Derivar los CTAs «Jugar» de esos datos para evitar hardcoding disperso y conservar «Conocer» como enlace interno.
- Hacer que los destinos externos absolutos sean independientes de `base`/`site` de GitHub Pages.
- Producir pruebas de mapeo, build y navegador con evidencia suficiente para revisión humana y PR.

**Non-Goals:**

- Cambiar Múltiplo, Boxio, sus repositorios, hosting, workflows, autenticación, progreso o privacidad.
- Añadir iframe, proxy, API, backend, CMS, analítica o dependencia de servidor.
- Resolver el dominio final del sitio, pagos, despliegue o cualquier dependencia documental no relacionada.
- Rediseñar las superficies visuales incorporadas por #11.

## Decisions

1. **URL en el registro declarativo existente.** Se reemplazará el `publicUrl: null` de cada juego por la URL canónica confirmada. Las tarjetas, Inicio y fichas consumirán el mismo campo. Esto evita divergencia entre vistas; duplicar URLs en plantillas se considera una alternativa rechazada por riesgo de desalineación.

2. **Enlaces externos absolutos y navegación editorial separada.** «Jugar» usará el valor absoluto del registro y «Conocer» conservará la ruta interna de ficha. Si el componente abre una pestaña nueva, añadirá `target="_blank"`, `rel="noopener noreferrer"` y una indicación accesible; si no aporta utilidad, se mantendrá la navegación en la misma pestaña. No se usará concatenación con la base del sitio.

3. **Validación de disponibilidad en Apply/Verify.** El ejecutor configurado realizará HTTP y navegación real con el Chromium disponible, además de los smoke tests declarados. El registro de evidencia distinguirá la URL suministrada por el propietario de la respuesta observada; una falla temporal no autoriza cambiar el destino.

4. **Retiro seguro de la condición antigua.** Se inventariarán todos los lectores de `publicUrl` y la lógica que oculta «Jugar». La condición de ausencia se conservará para juegos futuros sin URL, pero se retirará la interpretación de Múltiplo y Boxio como pendientes y se actualizará la documentación que lo afirme.

5. **Compatibilidad con #11.** Antes de aplicar se inspeccionará el estado real de `main` y los componentes actuales, integrando solo los cambios de este registro y CTAs. No se editarán ni ampliarán artefactos del issue #11 fuera de resolver conflictos contra el estado integrado.

## Risks / Trade-offs

- **[La URL externa puede no responder durante Verify]** → Registrar `NO VERIFICADO` con fecha y resultado, conservar exactamente la URL autoritativa y dejar la decisión visible para revisión; no sustituirla por GitHub.
- **[Una plantilla puede volver relativo un destino externo]** → Añadir tests que comparen los `href` renderizados y revisar el build con `base` de GitHub Pages.
- **[Un CTA duplicado puede perder contexto]** → Derivar etiqueta, nombre accesible y URL desde el registro, y comprobar cada superficie en navegador.
- **[El cambio puede borrar mejoras visuales de #11]** → Revisar diff y capturas existentes antes/después, limitar el cambio a datos, renderizado de CTA, documentación y pruebas.
- **[La navegación en nueva pestaña puede ser inesperada]** → Preferir misma pestaña; si el diseño vigente exige pestaña nueva, documentar el comportamiento para tecnologías asistivas.

## Migration Plan

1. Inspeccionar el registro de juegos, consumidores de `publicUrl`, rutas, tests y documentación pendiente.
2. Implementar el registro y el renderizado derivado de CTAs, actualizando solo la documentación afectada.
3. Ejecutar tests, build, HTTP y navegador; guardar tabla y capturas/registros en la evidencia del PR.
4. Verificar con el prefijo/base real y revisar que las rutas internas, assets y cambios de #11 sigan intactos.
5. Si la revisión falla, revertir el commit del cambio o restaurar temporalmente `publicUrl` solo mediante un nuevo cambio OpenSpec; no tocar los repositorios de juegos ni desplegar manualmente.

## Open Questions

No quedan preguntas abiertas que cambien el alcance: las dos URLs canónicas fueron proporcionadas explícitamente por el propietario. El resultado HTTP/navegador se comprobará durante Apply o Verify y se documentará como evidencia, no como decisión de planificación.
