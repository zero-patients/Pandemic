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

const addInfection = (city, color, count, infectionStatus, outbreakTracker) => {
  const infectionColors = {
    blue: 0,
    darkgoldenrod: 1,
    black: 2,
    red: 3
  }

  let cureColor = ''
  if (color === 'darkgoldenrod') {
    cureColor = 'yellow'
  } else {
    cureColor = color
  }
  const isCured = infectionStatus[cureColor].isCured

  const newCount = count
  if (isCured && infectionStatus[cureColor].count === 0) {
    console.log('This disease has been eradicated')
  }

  if (newCount[infectionColors[color]] >= 3) {
    let newOutbreak = outbreakTracker + 1
    game.set(
      {
        outbreakTracker: newOutbreak
      },
      {merge: true}
    )
  } else {
    newCount[infectionColors[color]]++
    infectionStatus[cureColor].count++

    game.set(
      {
        cities: {[city]: {diseases: newCount}},
        infectionStatus
      },
      {merge: true}
    )
  }

  if (outbreakTracker >= 7) {
    game.set(
      {
        gameStatus: 'lost'
      },
      {merge: true}
    )
  }

  if (infectionStatus[cureColor].count > 24) {
    game.set(
      {
        gameStatus: 'lost'
      },
      {merge: true}
    )
  }
}

const treatInfection = (city, color, count, infectionStatus) => {
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

  game.set(
    {
      cities: {[city]: {diseases: newCount}},
      infectionStatus: newStatus
    },
    {merge: true}
  )
}

const discardPlayerCard = (playerId, hand, card, playerDiscard) => {
  const newHand = hand.filter(elem => elem.name !== card)

  game.set(
    {
      playerDiscard: [...playerDiscard, card],
      [playerId]: {hand: newHand}
    },
    {merge: true}
  )
}

const researchCure = (playerId, hand, playerDiscard, infectionStatus) => {
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

  game.set(
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
    game.set(
      {
        gameStatus: 'win'
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
  researchCure
}
