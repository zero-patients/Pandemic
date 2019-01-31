const playerCards = {
  Algiers: {
    type: 'city',
    color: 'black',
    population: 2946000
  },
  Atlanta: {
    type: 'city',
    color: 'blue',
    population: 4715000
  },
  Baghdad: {
    type: 'city',
    color: 'black',
    population: 6204000
  },
  Bangkok: {
    type: 'city',
    color: 'red',
    population: 7151000
  },
  Beijing: {
    type: 'city',
    color: 'red',
    population: 17311000
  },
  Bogota: {
    type: 'city',
    color: 'yellow',
    population: 8702000
  },
  'Buenos Aires': {
    type: 'city',
    color: 'yellow',
    population: 13639000
  },
  Cairo: {
    type: 'city',
    color: 'black',
    population: 14718000
  },
  Chennai: {
    type: 'city',
    color: 'black',
    population: 8865000
  },
  Chicago: {
    type: 'city',
    color: 'blue',
    population: 9121000
  },
  Delhi: {
    type: 'city',
    color: 'black',
    population: 22242000
  },
  Essen: {
    type: 'city',
    color: 'blue',
    population: 575000
  },
  'Ho Chi Minh City': {
    type: 'city',
    color: 'red',
    population: 8314000
  },
  'Hong Kong': {
    type: 'city',
    color: 'red',
    population: 7106000
  },
  Istanbul: {
    type: 'city',
    color: 'black',
    population: 13576000
  },
  Jakarta: {
    type: 'city',
    color: 'red',
    population: 26063000
  },
  Johannesburg: {
    type: 'city',
    color: 'yellow',
    population: 3888000
  },
  Karachi: {
    type: 'city',
    color: 'black',
    population: 20711000
  },
  Khartoum: {
    type: 'city',
    color: 'yellow',
    population: 4887000
  },
  Kinshasa: {
    type: 'city',
    color: 'yellow',
    population: 9046000
  },
  Kolkata: {
    type: 'city',
    color: 'black',
    population: 14374000
  },
  Lagos: {
    type: 'city',
    color: 'yellow',
    population: 11547000
  },
  Lima: {
    type: 'city',
    color: 'yellow',
    population: 9121000
  },
  London: {
    type: 'city',
    color: 'blue',
    population: 8586000
  },
  'Los Angeles': {
    type: 'city',
    color: 'yellow',
    population: 14900000
  },
  Madrid: {
    type: 'city',
    color: 'blue',
    population: 5427000
  },
  Manila: {
    type: 'city',
    color: 'red',
    population: 20767000
  },
  'Mexico City': {
    type: 'city',
    color: 'yellow',
    population: 19463000
  },
  Miami: {
    type: 'city',
    color: 'yellow',
    population: 5582000
  },
  Milan: {
    type: 'city',
    color: 'blue',
    population: 5232000
  },
  Montreal: {
    type: 'city',
    color: 'blue',
    population: 3429000
  },
  Moscow: {
    type: 'city',
    color: 'black',
    population: 15512000
  },
  Mumbai: {
    type: 'city',
    color: 'black',
    population: 16910000
  },
  'New York': {
    type: 'city',
    color: 'blue',
    population: 20464000
  },
  Osaka: {
    type: 'city',
    color: 'red',
    population: 2871000
  },
  Paris: {
    type: 'city',
    color: 'blue',
    population: 10755000
  },
  Riyadh: {
    type: 'city',
    color: 'black',
    population: 5037000
  },
  'San Francisco': {
    type: 'city',
    color: 'blue',
    population: 5864000
  },
  Santiago: {
    type: 'city',
    color: 'yellow',
    population: 6015000
  },
  'Sao Paulo': {
    type: 'city',
    color: 'yellow',
    population: 20186000
  },
  Seoul: {
    type: 'city',
    color: 'red',
    population: 22547000
  },
  Shanghai: {
    type: 'city',
    color: 'red',
    population: 13482000
  },
  'St Petersburg': {
    type: 'city',
    color: 'blue',
    population: 4879000
  },
  Sydney: {
    type: 'city',
    color: 'red',
    population: 3785000
  },
  Taipei: {
    type: 'city',
    color: 'red',
    population: 8338000
  },
  Tehran: {
    type: 'city',
    color: 'black',
    population: 7419000
  },
  Tokyo: {
    type: 'city',
    color: 'red',
    population: 13189000
  },
  Washington: {
    type: 'city',
    color: 'blue',
    population: 4679000
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
