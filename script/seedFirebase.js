const db = require('../server/db')
const cities = require('../client/data/cities')
const infectionDeck = require('../client/data/infectionDeck')
const infectionDiscard = require('../client/data/infectionDiscard')
const infectionStatus = require('../client/data/infectionStatus')
const researchStations = require('../client/data/researchStations')
const roles = require('../client/data/roles')
const playerCards = require('../client/data/playerCards')
const {
  player1Info,
  player2Info,
  player3Info,
  player4Info
} = require('../client/data/playerInfo')

const infectionIdx = 0
const infectionRate = [2, 2, 2, 3, 3, 4, 4]
const outbreakTracker = 0

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
      playerCards,
      infectionIdx,
      infectionRate,
      infectionStatus,
      outbreakTracker,
      researchStations,
      roles
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
