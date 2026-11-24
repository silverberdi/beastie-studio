export const games = [
  {
    slug: 'multiplo',
    name: 'Múltiplo',
    title: 'Aprender multiplicación jugando.',
    summary: 'Un juego educativo que convierte la práctica de la multiplicación en desafíos visuales y una experiencia amable para los más pequeños.',
    story: 'Múltiplo nació de una necesidad sencilla: ayudar a un niño de seis años a aprender a multiplicar de una manera más cercana al juego que a la obligación. Combina retos breves, claridad visual y ganas de intentarlo de nuevo.',
    primaryScreenshot: '/assets/v5/screenshots/multiplo/multiplo-pregunta-1.webp',
    primaryScreenshotAlt: 'Captura de Múltiplo con una pregunta de multiplicación.',
    gallery: [
      { src: '/assets/v5/screenshots/multiplo/multiplo-demo-inicial.webp', alt: 'Pantalla inicial de Múltiplo.' },
      { src: '/assets/v5/screenshots/multiplo/multiplo-respuesta-correcta.webp', alt: 'Respuesta correcta en Múltiplo.' },
      { src: '/assets/v5/screenshots/multiplo/multiplo-pregunta-2.webp', alt: 'Otra pregunta de multiplicación en Múltiplo.' },
    ],
    publicUrl: 'https://multiplo.silverman.pro/',
  },
  {
    slug: 'boxio',
    name: 'Boxio',
    title: 'Estrategia sencilla, decisiones interesantes.',
    summary: 'Una versión digital de Puntos y Cajas: dibuja líneas, completa cuadrados y piensa bien cada turno.',
    story: 'Boxio toma un clásico de reglas fáciles de entender y lo transforma en una experiencia digital para compartir, competir y descubrir nuevas estrategias.',
    primaryScreenshot: '/assets/v5/screenshots/boxio/boxio-partida-local.webp',
    primaryScreenshotAlt: 'Captura de una partida local de Boxio.',
    gallery: [
      { src: '/assets/v5/screenshots/boxio/boxio-menu-modos.webp', alt: 'Menú de modos de Boxio.' },
      { src: '/assets/v5/screenshots/boxio/boxio-partida-multibot.webp', alt: 'Partida multibot de Boxio.' },
    ],
    publicUrl: 'https://boxio.silverman.pro/',
  },
];

export function getGame(slug) {
  return games.find((game) => game.slug === slug);
}
