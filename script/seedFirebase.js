const db = require('../server/db')
const cities = require('../client/data/cities')
const infectionDeck = require('../client/data/infectionDeck')
const infectionDiscard = require('../client/data/infectionDiscard')
const researchStations = require('../client/data/researchStations')
const {
  player1Info,
  player2Info,
  player3Info,
  player4Info
} = require('../client/data/playerInfo')

// console.log(cities)
const gameSession = 'YzQ0qR6LZ7gxd8E03k1l'

const seedFirestore = async () => {
  const game = db.collection('rooms').doc(gameSession)
  await game.set(
    {
      cities,
      infectionDeck,
      infectionDiscard,
      player1Info,
      player2Info,
      player3Info,
      player4Info,
      researchStations
    },
    {merge: true}
  )
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seedFirestore()
    console.log('success!')
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    await process.exit()
  }
}

runSeed()
