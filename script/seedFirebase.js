const db = require('../server/db')
const cities = require('../client/data/cities')
const infectionDeck = require('../client/data/infectionDeck')

// console.log(cities)
;(async () => {
  const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
  await game.set({cities, infectionDeck}, {merge: true})
})()