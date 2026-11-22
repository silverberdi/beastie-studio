export const games = [
  {
    slug: 'multiplo',
    name: 'Múltiplo',
    title: 'Aprender multiplicación jugando.',
    summary: 'Un juego educativo que convierte la práctica de la multiplicación en desafíos visuales y una experiencia amable para los más pequeños.',
    story: 'Múltiplo nació de una necesidad sencilla: ayudar a un niño de seis años a aprender a multiplicar de una manera más cercana al juego que a la obligación. Combina retos breves, claridad visual y ganas de intentarlo de nuevo.',
    illustrationAlt: 'Ilustración conceptual de Múltiplo, no una captura del juego.',
    publicUrl: null,
  },
  {
    slug: 'boxio',
    name: 'Boxio',
    title: 'Estrategia sencilla, decisiones interesantes.',
    summary: 'Una versión digital de Puntos y Cajas: dibuja líneas, completa cuadrados y piensa bien cada turno.',
    story: 'Boxio toma un clásico de reglas fáciles de entender y lo transforma en una experiencia digital para compartir, competir y descubrir nuevas estrategias.',
    illustrationAlt: 'Ilustración conceptual de Boxio, no una captura del juego.',
    publicUrl: null,
  },
];

export function getGame(slug) {
  return games.find((game) => game.slug === slug);
}
