const player1Info = {
  fillStyle: 'royalblue',
  strokeStyle: 'blue',
  hand: [],
  location: 'Atlanta',
  role: {description: '', name: ''},
  offset: [6, 4],
  actions: 4,
  isTurn: true
}
const player2Info = {
  fillStyle: 'gold',
  strokeStyle: 'orange',
  hand: [],
  location: 'Atlanta',
  role: {description: '', name: ''},
  offset: [16, 14],
  actions: -1,
  isTurn: false
}
const player3Info = {
  fillStyle: 'crimson',
  strokeStyle: 'black',
  hand: [],
  location: 'Atlanta',

  role: {description: '', name: ''},
  offset: [6, 24],
  actions: -1,
  isTurn: false
}
const player4Info = {
  fillStyle: 'green',
  strokeStyle: 'greenyellow',
  hand: [],
  location: 'Atlanta',

  role: {description: '', name: ''},
  offset: [-4, 14],
  actions: -1,
  isTurn: false
}

module.exports = {player1Info, player2Info, player3Info, player4Info}
