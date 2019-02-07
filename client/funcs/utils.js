/* eslint-disable complexity */
/* eslint-disable max-statements */
const infectionDeck = require('../data/infectionDeck')
const db = require('../../server/db')
const CURRENT_GAME = require('../../secrets')

const game = db.collection('rooms').doc(CURRENT_GAME)

const shuffle = arr => {
  let newArr = arr
  for (let i = 0; i < newArr.length; i++) {
    let rand = Math.floor(Math.random() * newArr.length)
    let temp = newArr[rand]
    newArr[rand] = newArr[i]
    newArr[i] = temp
  }
  return newArr
}

const generateGroups = (arr, size) => {
  let arrayList = []
  while (arr.length > 0) {
    arrayList.push(arr.slice(0, size))
    arr = arr.slice(size)
  }
  return arrayList
}
const addEpidemics = playerDeck => {
  // NEEDS REFACTOR!!!
  const epidemic = {
    name: 'Epidemic',
    type: 'epidemic',
    description:
      '1-INCREASE\nMove the infection rate marker forward 1 space.\n2-INFECT\nDraw the bottom card from the infection deck and put 3 infection cubes on that city. Discard that card.\n3-INTENSIFY\nShuffle the cards in the infection discard pile and put them on top of the infection discard deck.'
  }

  let pileLength = Math.ceil(playerDeck.length / 4)
  let smallPiles = generateGroups(playerDeck, pileLength)
  let finalShuffle = []

  smallPiles.map(pile => {
    pile.push(epidemic)
    finalShuffle = finalShuffle.concat(shuffle(pile))
  })

  return finalShuffle
}

const epidemicShuffle = (drawPile, discardPile) => {
  const drawPileCopy = drawPile
  const discardPileCopy = discardPile
  const bottomCard = drawPileCopy.shift()
  discardPileCopy.push(bottomCard)
  console.log('discard pile copy after pushing bottom card', discardPileCopy)
  shuffle(discardPile)
  const newPile = drawPileCopy.concat(discardPile)

  return [newPile, bottomCard]
}

const addInfection = async (city, color, c, is, ot) => {
  const infectionColors = {
    blue: 0,
    darkgoldenrod: 1,
    yellow: 1,
    black: 2,
    red: 3
  }

  let cureColor = ''
  if (color === 'darkgoldenrod') {
    cureColor = 'yellow'
  } else {
    cureColor = color
  }

  const docRef = await game.get()
  const data = await docRef.data()
  const neighbors = data.cities[city].neighbors
  const count = data.cities[city].diseases
  const infectionStatus = data.infectionStatus
  const outbreakTracker = data.outbreakTracker
  const cities = data.cities
  const didOutbreak = data.cities[city].didOutbreak

  const isCured = infectionStatus[cureColor].isCured

  const newCount = count

  if (!didOutbreak) {
    if (isCured && infectionStatus[cureColor].count === 0) {
      console.log('This disease has been eradicated')
    }

    if (newCount[infectionColors[color]] >= 3 && outbreakTracker < 8) {
      await outbreak(city, color)
    } else {
      newCount[infectionColors[color]]++
      infectionStatus[cureColor].count++

      await game.set(
        {
          cities: {[city]: {diseases: newCount}},
          infectionStatus
        },
        {merge: true}
      )
    }
    if (infectionStatus[cureColor].count > 24) {
      await game.set(
        {
          gameStatus: 'lost'
        },
        {merge: true}
      )
    }
  } else {
    console.log('No infection added, this city has already had an outbreak')
  }
}

const outbreak = async (city, color) => {
  const docRef = await game.get()
  const data = await docRef.data()
  const neighbors = data.cities[city].neighbors
  const outbreakTracker = data.outbreakTracker

  let newOutbreak = outbreakTracker + 1

  if (newOutbreak >= 8) {
    await game.set(
      {
        gameStatus: 'lost'
      },
      {merge: true}
    )
  }
  await game.set(
    {
      outbreakTracker: newOutbreak,
      cities: {[city]: {didOutbreak: true}}
    },
    {merge: true}
  )

  neighbors.map(async elem => {
    await addInfection(elem, color)
  })
}

const resetDidOutbreak = async () => {
  const docRef = await game.get()
  const data = await docRef.data()
  const cities = data.cities

  Object.keys(cities).forEach(city => {
    cities[city].didOutbreak = false
  })

  await game.set(
    {
      cities
    },
    {merge: true}
  )
}

const treatInfection = async (city, color, count, infectionStatus) => {
  const infectionColors = {
    blue: 0,
    darkgoldenrod: 1,
    yellow: 1,
    black: 2,
    red: 3
  }

  let cureColor = ''
  if (color === 'darkgoldenrod') {
    cureColor = 'yellow'
  } else {
    cureColor = color
  }

  const newCount = count
  const isCured = infectionStatus[cureColor].isCured
  const newStatus = infectionStatus

  if (newCount[infectionColors[color]] > 0 && !isCured) {
    newStatus[cureColor].count--
    newCount[infectionColors[color]]--
  }
  if (newCount[infectionColors[color]] > 0 && isCured) {
    newStatus[cureColor].count =
      newStatus[cureColor].count - newCount[infectionColors[color]]
    newCount[infectionColors[color]] = 0
  }

  await game.set(
    {
      cities: {[city]: {diseases: newCount}},
      infectionStatus: newStatus
    },
    {merge: true}
  )
}

const discardPlayerCard = async (playerId, hand, card, playerDiscard) => {
  const newHand = hand.filter(elem => elem.name !== card)

  await game.set(
    {
      playerDiscard: [...playerDiscard, card],
      [playerId]: {hand: newHand}
    },
    {merge: true}
  )
}

const researchCure = async (playerId, hand, playerDiscard, infectionStatus) => {
  const colorCounts = {}
  hand.map(card => {
    if (card.type === 'city') {
      if (!colorCounts[card.color]) {
        colorCounts[card.color] = 1
      } else if (colorCounts[card.color]) {
        colorCounts[card.color]++
      }
    }
  })
  const maxColor = Object.keys(colorCounts).reduce(
    (acc, curr) => (colorCounts[acc] > colorCounts[curr] ? acc : curr)
  )

  let discardedCards = []
  let newInfectionStatus = infectionStatus
  if (colorCounts[maxColor] >= 5) {
    discardedCards = hand.filter(card => card.color === maxColor).slice(0, 5)
    newInfectionStatus[maxColor].isCured = true
  }
  let newHand = hand.filter(card => !discardedCards.includes(card))

  await game.set(
    {
      playerDiscard: [...playerDiscard, ...discardedCards],
      [playerId]: {hand: newHand},
      infectionStatus: newInfectionStatus
    },
    {merge: true}
  )

  if (
    newInfectionStatus.blue.isCured &&
    newInfectionStatus.yellow.isCured &&
    newInfectionStatus.black.isCured &&
    newInfectionStatus.red.isCured
  ) {
    await game.set(
      {
        gameStatus: 'win'
      },
      {merge: true}
    )
  }
}

const updateActions = async player => {
  const docRef = await game.get()
  const data = await docRef.data()

  const whoIsNext = {
    player1Info: 'player2Info',
    player2Info: 'player3Info',
    player3Info: 'player4Info',
    player4Info: 'player1Info'
  }

  const currentPlayerInfo = data[player]
  const nextPlayer = whoIsNext[player]
  const nextPlayerInfo = data[nextPlayer]

  if (currentPlayerInfo.actions > 1 && currentPlayerInfo.isTurn === true) {
    currentPlayerInfo.actions--
    await game.set(
      {
        [player]: currentPlayerInfo
      },
      {merge: true}
    )
  }
  if (currentPlayerInfo.actions <= 1) {
    currentPlayerInfo.actions = 0
    currentPlayerInfo.isTurn = false
    nextPlayerInfo.actions = 4
    nextPlayerInfo.isTurn = true

    await game.set(
      {
        [player]: currentPlayerInfo,
        [nextPlayer]: nextPlayerInfo
      },
      {merge: true}
    )
  }
}

module.exports = {
  shuffle,
  generateGroups,
  epidemicShuffle,
  addInfection,
  treatInfection,
  discardPlayerCard,
  addEpidemics,
  researchCure,
  resetDidOutbreak,
  updateActions
}
