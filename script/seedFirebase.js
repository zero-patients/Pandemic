const db = require('../server/db')
const cities = require('../client/data/cities')
const infectionDeck = require('../client/data/infectionDeck')
const infectionDiscard = require('../client/data/infectionDiscard')
const infectionStatus = require('../client/data/infectionStatus')
const researchStations = require('../client/data/researchStations')
const roles = require('../client/data/roles')
const playerDeck = require('../client/data/playerDeck')
const playerDiscard = require('../client/data/playerDiscard')
const {
  player1Info,
  player2Info,
  player3Info,
  player4Info
} = require('../client/data/playerInfo')
const CURRENT_GAME = require('../secrets')

const infectionIdx = 0
const infectionRate = [2, 2, 2, 3, 3, 4, 4]
const outbreakTracker = 0

const gameSession = CURRENT_GAME

const seedFirestore = async () => {
  const game = db.collection('rooms').doc(gameSession)
  const showRules = false
  await game.set(
    {
      cities,
      infectionDeck,
      infectionDiscard,
      player1Info,
      player2Info,
      player3Info,
      player4Info,
      playerDeck,
      playerDiscard,
      infectionIdx,
      infectionRate,
      infectionStatus,
      outbreakTracker,
      researchStations,
      roles,
      showRules
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
