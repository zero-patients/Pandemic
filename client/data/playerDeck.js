const playerDeck = [
  {
    name: 'Algiers',
    type: 'city',
    color: 'black',
    population: 2946000
  },
  {
    name: 'Atlanta',
    type: 'city',
    color: 'blue',
    population: 4715000
  },
  {
    name: 'Baghdad',
    type: 'city',
    color: 'black',
    population: 6204000
  },
  {
    name: 'Bangkok',
    type: 'city',
    color: 'red',
    population: 7151000
  },
  {
    name: 'Beijing',
    type: 'city',
    color: 'red',
    population: 17311000
  },
  {
    name: 'Bogota',
    type: 'city',
    color: 'yellow',
    population: 8702000
  },
  {
    name: 'Buenos Aires',
    type: 'city',
    color: 'yellow',
    population: 13639000
  },
  {
    name: 'Cairo',
    type: 'city',
    color: 'black',
    population: 14718000
  },
  {
    name: 'Chennai',
    type: 'city',
    color: 'black',
    population: 8865000
  },
  {
    name: 'Chicago',
    type: 'city',
    color: 'blue',
    population: 9121000
  },
  {
    name: 'Delhi',
    type: 'city',
    color: 'black',
    population: 22242000
  },
  {
    name: 'Essen',
    type: 'city',
    color: 'blue',
    population: 575000
  },
  {
    name: 'Ho Chi Minh City',
    type: 'city',
    color: 'red',
    population: 8314000
  },
  {
    name: 'Hong Kong',
    type: 'city',
    color: 'red',
    population: 7106000
  },
  {
    name: 'Istanbul',
    type: 'city',
    color: 'black',
    population: 13576000
  },
  {
    name: 'Jakarta',
    type: 'city',
    color: 'red',
    population: 26063000
  },
  {
    name: 'Johannesburg',
    type: 'city',
    color: 'yellow',
    population: 3888000
  },
  {
    name: 'Karachi',
    type: 'city',
    color: 'black',
    population: 20711000
  },
  {
    name: 'Khartoum',
    type: 'city',
    color: 'yellow',
    population: 4887000
  },
  {
    name: 'Kinshasa',
    type: 'city',
    color: 'yellow',
    population: 9046000
  },
  {
    name: 'Kolkata',
    type: 'city',
    color: 'black',
    population: 14374000
  },
  {
    name: 'Lagos',
    type: 'city',
    color: 'yellow',
    population: 11547000
  },
  {
    name: 'Lima',
    type: 'city',
    color: 'yellow',
    population: 9121000
  },
  {
    name: 'London',
    type: 'city',
    color: 'blue',
    population: 8586000
  },
  {
    name: 'Los Angeles',
    type: 'city',
    color: 'yellow',
    population: 14900000
  },
  {
    name: 'Madrid',
    type: 'city',
    color: 'blue',
    population: 5427000
  },
  {
    name: 'Manila',
    type: 'city',
    color: 'red',
    population: 20767000
  },
  {
    name: 'Mexico City',
    type: 'city',
    color: 'yellow',
    population: 19463000
  },
  {
    name: 'Miami',
    type: 'city',
    color: 'yellow',
    population: 5582000
  },
  {
    name: 'Milan',
    type: 'city',
    color: 'blue',
    population: 5232000
  },
  {
    name: 'Montreal',
    type: 'city',
    color: 'blue',
    population: 3429000
  },
  {
    name: 'Moscow',
    type: 'city',
    color: 'black',
    population: 15512000
  },
  {
    name: 'Mumbai',
    type: 'city',
    color: 'black',
    population: 16910000
  },
  {
    name: 'New York',
    type: 'city',
    color: 'blue',
    population: 20464000
  },
  {
    name: 'Osaka',
    type: 'city',
    color: 'red',
    population: 2871000
  },
  {
    name: 'Paris',
    type: 'city',
    color: 'blue',
    population: 10755000
  },
  {
    name: 'Riyadh',
    type: 'city',
    color: 'black',
    population: 5037000
  },
  {
    name: 'San Francisco',
    type: 'city',
    color: 'blue',
    population: 5864000
  },
  {
    name: 'Santiago',
    type: 'city',
    color: 'yellow',
    population: 6015000
  },
  {
    name: 'Sao Paulo',
    type: 'city',
    color: 'yellow',
    population: 20186000
  },
  {
    name: 'Seoul',
    type: 'city',
    color: 'red',
    population: 22547000
  },
  {
    name: 'Shanghai',
    type: 'city',
    color: 'red',
    population: 13482000
  },
  {
    name: 'St Petersburg',
    type: 'city',
    color: 'blue',
    population: 4879000
  },
  {
    name: 'Sydney',
    type: 'city',
    color: 'red',
    population: 3785000
  },
  {
    name: 'Taipei',
    type: 'city',
    color: 'red',
    population: 8338000
  },
  {
    name: 'Tehran',
    type: 'city',
    color: 'black',
    population: 7419000
  },
  {
    name: 'Tokyo',
    type: 'city',
    color: 'red',
    population: 13189000
  },
  {
    name: 'Washington',
    type: 'city',
    color: 'blue',
    population: 4679000
  },
  {
    name: 'One Quiet Night',
    type: 'event',
    description:
      'Play at any time. Not an action. Skip the next infect cities step (Do not flip over any infection cards).'
  },
  {
    name: 'Resilient Population',
    type: 'event',
    description:
      'Play at any time. Not an action. Remove any 1 card in the infection discard pile from the game. You may play this between the infect and intensify steps of an epidemic.'
  },
  {
    name: 'Forecast',
    type: 'event',
    description:
      'Play at any time. Not an action. Draw, look at, and rearrange the top 6 cards of the infection deck. Put them back on top'
  },
  {
    name: 'Government Grant',
    type: 'event',
    description:
      'Play at any time. Not an action. Add 1 research station to any city (No city card needed).'
  },
  {
    name: 'Airlift',
    type: 'event',
    description:
      "Play at any time. Not an action. Move any 1 pawn to any city. Get permission beore moving another player's pawn."
  },
  {
    name: 'Epidemic',
    type: 'epidemic',
    description:
      '1-INCREASE\nMove the infection rate marker forward 1 space.\n2-INFECT\nDraw the bottom card from the infection deck and put 3 infection cubes on that city. Discard that card.\n3-INTENSIFY\nShuffle the cards in the infection discard pile and put them on top of the infection discard deck.'
  },
  {
    name: 'Epidemic',
    type: 'epidemic',
    description:
      '1-INCREASE\nMove the infection rate marker forward 1 space.\n2-INFECT\nDraw the bottom card from the infection deck and put 3 infection cubes on that city. Discard that card.\n3-INTENSIFY\nShuffle the cards in the infection discard pile and put them on top of the infection discard deck.'
  },
  {
    name: 'Epidemic',
    type: 'epidemic',
    description:
      '1-INCREASE\nMove the infection rate marker forward 1 space.\n2-INFECT\nDraw the bottom card from the infection deck and put 3 infection cubes on that city. Discard that card.\n3-INTENSIFY\nShuffle the cards in the infection discard pile and put them on top of the infection discard deck.'
  }
]

module.exports = playerDeck
