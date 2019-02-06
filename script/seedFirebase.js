const db = require('../server/db')
const cities = require('../client/data/cities')
const infectionDeck = require('../client/data/infectionDeck')
const infectionDiscard = require('../client/data/infectionDiscard')
const infectionStatus = require('../client/data/infectionStatus')
const researchStations = require('../client/data/researchStations')
const roles = require('../client/data/roles')
let playerDeck = require('../client/data/playerDeck')
const playerDiscard = require('../client/data/playerDiscard')
const {
  player1Info,
  player2Info,
  player3Info,
  player4Info
} = require('../client/data/playerInfo')
const CURRENT_GAME = require('../secrets')
const {shuffle, addEpidemics} = require('../client/funcs/utils')

const infectionIdx = 0
const infectionRate = [2, 2, 2, 3, 3, 4, 4]
const outbreakTracker = 0
const epidemicInfection = false
const epidemicCity = ''
const gameStarted = false
const gameStatus = 'inPlay'

const gameSession = CURRENT_GAME
const showRules = true

const shuffledPlayerDeck = shuffle(playerDeck)
const shuffledInfectionDeck = shuffle(infectionDeck)
const turnCounter = {
  players: ['player1Info', 'player2Info', 'player3Info', 'player4Info'],
  currentTurn: 0
}

const players = [player1Info, player2Info, player3Info, player4Info]
for (let i = 0; i < 8; i++) {
  let player = players[i % 4]
  const card = shuffledPlayerDeck.pop()

  player.hand.push(card)
}

playerDeck = addEpidemics(shuffledPlayerDeck)

// console.log(player1Info)

const seedFirestore = async () => {
  const game = db.collection('rooms').doc(gameSession)
  await game.set(
    {
      cities,
      epidemicCity,
      epidemicInfection,
      infectionDeck: shuffledInfectionDeck,
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
      turnCounter,
      gameStarted,
      showRules,
      gameStatus
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
