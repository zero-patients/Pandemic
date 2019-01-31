const playerCards = {
  Algiers: {
    type: 'city',
    color: '',
    population: 0
  },
  Atlanta: {
    type: 'city',
    color: '',
    population: 0
  },
  Baghdad: {
    type: 'city',
    color: '',
    population: 0
  },
  Bangkok: {
    type: 'city',
    color: '',
    population: 0
  },
  Beijing: {
    type: 'city',
    color: '',
    population: 0
  },
  Bogota: {
    type: 'city',
    color: '',
    population: 0
  },
  'Buenos Aires': {
    type: 'city',
    color: '',
    population: 0
  },
  Cairo: {
    type: 'city',
    color: '',
    population: 0
  },
  Chennai: {
    type: 'city',
    color: '',
    population: 0
  },
  Chicago: {
    type: 'city',
    color: '',
    population: 0
  },
  Delhi: {
    type: 'city',
    color: '',
    population: 0
  },
  Essen: {
    type: 'city',
    color: '',
    population: 0
  },
  'Ho Chi Minh City': {
    type: 'city',
    color: '',
    population: 0
  },
  'Hong Kong': {
    type: 'city',
    color: '',
    population: 0
  },
  Istanbul: {
    type: 'city',
    color: '',
    population: 0
  },
  Jakarta: {
    type: 'city',
    color: '',
    population: 0
  },
  Johannesburg: {
    type: 'city',
    color: '',
    population: 0
  },
  Karachi: {
    type: 'city',
    color: '',
    population: 0
  },
  Khartoum: {
    type: 'city',
    color: '',
    population: 0
  },
  Kinshasa: {
    type: 'city',
    color: '',
    population: 0
  },
  Kolkata: {
    type: 'city',
    color: '',
    population: 0
  },
  Lagos: {
    type: 'city',
    color: '',
    population: 0
  },
  Lima: {
    type: 'city',
    color: '',
    population: 0
  },
  London: {
    type: 'city',
    color: '',
    population: 0
  },
  'Los Angeles': {
    type: 'city',
    color: '',
    population: 0
  },
  Madrid: {
    type: 'city',
    color: '',
    population: 0
  },
  Manila: {
    type: 'city',
    color: '',
    population: 0
  },
  'Mexico City': {
    type: 'city',
    color: '',
    population: 0
  },
  Miami: {
    type: 'city',
    color: '',
    population: 0
  },
  Milan: {
    type: 'city',
    color: '',
    population: 0
  },
  Montreal: {
    type: 'city',
    color: '',
    population: 0
  },
  Moscow: {
    type: 'city',
    color: '',
    population: 0
  },
  Mumbai: {
    type: 'city',
    color: '',
    population: 0
  },
  'New York': {
    type: 'city',
    color: '',
    population: 0
  },
  Osaka: {
    type: 'city',
    color: '',
    population: 0
  },
  Paris: {
    type: 'city',
    color: '',
    population: 0
  },
  Riyadh: {
    type: 'city',
    color: '',
    population: 0
  },
  'San Francisco': {
    type: 'city',
    color: '',
    population: 0
  },
  Santiago: {
    type: 'city',
    color: '',
    population: 0
  },
  'Sao Paulo': {
    type: 'city',
    color: '',
    population: 0
  },
  Seoul: {
    type: 'city',
    color: '',
    population: 0
  },
  Shanghai: {
    type: 'city',
    color: '',
    population: 0
  },
  'St Petersburg': {
    type: 'city',
    color: '',
    population: 0
  },
  Sydney: {
    type: 'city',
    color: '',
    population: 0
  },
  Taipei: {
    type: 'city',
    color: '',
    population: 0
  },
  Tehran: {
    type: 'city',
    color: '',
    population: 0
  },
  Tokyo: {
    type: 'city',
    color: '',
    population: 0
  },
  Washington: {
    type: 'city',
    color: '',
    population: 0
  },
  'One Quiet Night': {
    type: 'event',
    description:
      'Play at any time. Not an action. Skip the next infect cities step (Do not flip over any infection cards).'
  },
  'Resilient Population': {
    type: 'event',
    description:
      'Play at any time. Not an action. Remove any 1 card in the infection discard pile from the game. You may play this between the infect and intensify steps of an epidemic.'
  },
  Forecast: {
    type: 'event',
    description:
      'Play at any time. Not an action. Draw, look at, and rearrange the top 6 cards of the infection deck. Put them back on top'
  },
  'Government Grant': {
    type: 'event',
    description:
      'Play at any time. Not an action. Add 1 research station to any city (No city card needed).'
  },
  Airlift: {
    type: 'event',
    description:
      "Play at any time. Not an action. Move any 1 pawn to any city. Get permission beore moving another player's pawn."
  },
  Epidemic: {
    type: 'epidemic',
    description:
      '1-INCREASE\nMove the infection rate marker forward 1 space.\n2-INFECT\nDraw the bottom card from the infection deck and put 3 infection cubes on that city. Discard that card.\n3-INTENSIFY\nShuffle the cards in the infection discard pile and put them on top of the infection discard deck.'
  }
}

module.exports = playerCards
