# Spec Delta

## MODIFIED Requirements

### Requirement: Las rutas iniciales son placeholders explícitos y sustituibles

La fundación SHALL incluir páginas renderizadas para Inicio, Juegos, Novedades, Nosotros y Apóyanos, además de las rutas de apoyo necesarias al layout. Las rutas cubiertas por este cambio (`/`, `/juegos` y `/nosotros`) SHALL mostrar contenido editorial aprobado; `/juegos/multiplo` y `/juegos/boxio` SHALL ser fichas informativas; las dependencias aún no verificadas SHALL permanecer visibles como placeholders explícitos y no accionables, sin presentar placeholders como contenido final ni inventar artículos, fechas, disponibilidad, enlaces de juego o datos de pago.

#### Scenario: Comprobación de rutas base
- **DADO** una salida estática construida
- **CUANDO** se solicitan `/`, `/juegos`, `/juegos/multiplo`, `/juegos/boxio`, `/novedades`, `/nosotros` y `/apoyanos`
- **ENTONCES** cada ruta responde con una página renderizada, conserva el layout compartido y distingue el contenido aprobado de cualquier dependencia pendiente

#### Scenario: Dependencia no verificada
- **DADO** que falta una URL pública, dato de pago, asset o contenido final
- **CUANDO** se renderiza la sección que lo necesitaría
- **ENTONCES** se muestra una dependencia visible no accionable o placeholder, sin fabricar el valor ni afirmar disponibilidad productiva
