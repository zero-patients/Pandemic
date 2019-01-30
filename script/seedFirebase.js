const db = require('../server/db')
const cities = require('../client/data/cities')
const infectionDeck = require('../client/data/infectionDeck')
const {
  player1Info,
  player2Info,
  player3Info,
  player4Info
} = require('../client/data/playerInfo')

const infectionIdx = 0
const infectionRate = [2, 2, 2, 3, 3, 4, 4]
const outbreakTracker = 0
const researchStations = ['Atlanta']

const gameSession = 'YzQ0qR6LZ7gxd8E03k1l'

const seedFirestore = async () => {
  const game = db.collection('rooms').doc(gameSession)
  await game.set(
    {
      cities,
      infectionDeck,
      player1Info,
      player2Info,
      player3Info,
      player4Info,
      infectionIdx,
      infectionRate,
      outbreakTracker,
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
