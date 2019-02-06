const player1Info = {
  fillStyle: 'royalblue',
  strokeStyle: 'blue',
  hand: [],
  location: 'Atlanta',
  role: {description: '', name: ''},
  offset: [0, -10],
  actions: 4,
  isTurn: true
}
const player2Info = {
  fillStyle: 'gold',
  strokeStyle: 'orange',
  hand: [],
  location: 'Atlanta',
  role: {description: '', name: ''},
  offset: [10, 0],
  actions: 0,
  isTurn: false
}
const player3Info = {
  fillStyle: 'crimson',
  strokeStyle: 'black',
  hand: [],
  location: 'Atlanta',

  role: {description: '', name: ''},
  offset: [0, 10],
  actions: 0,
  isTurn: false
}
const player4Info = {
  fillStyle: 'green',
  strokeStyle: 'greenyellow',
  hand: [],
  location: 'Atlanta',

  role: {description: '', name: ''},
  offset: [-10, 0],
  actions: 0,
  isTurn: false
}

module.exports = {player1Info, player2Info, player3Info, player4Info}
