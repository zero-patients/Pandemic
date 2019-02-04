const infectionDeck = require('../data/infectionDeck')
import db from '../../server/db'
import CURRENT_GAME from '../../secrets'

let game = db.collection('rooms').doc(CURRENT_GAME)

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
const shufflePlayerDeck = () => {
  // NEEDS REFACTOR!!!

  let playerDeckNoEpidemics = shuffle()
  const epidemic = {
    name: 'Epidemic',
    type: 'epidemic',
    description:
      '1-INCREASE\nMove the infection rate marker forward 1 space.\n2-INFECT\nDraw the bottom card from the infection deck and put 3 infection cubes on that city. Discard that card.\n3-INTENSIFY\nShuffle the cards in the infection discard pile and put them on top of the infection discard deck.'
  }

  let cardsDealtToPlayers = [[], [], [], []] //deal 2 cards to each player
  for (let i = 0; i < 8; i++) {
    cardsDealtToPlayers[i % 4].push(playerDeckNoEpidemics.pop())
  }

  let pileLength = Math.ceil(playerDeckNoEpidemics.length / 4)
  let smallPiles = generateGroups(playerDeckNoEpidemics, pileLength)
  let finalShuffle = []

  smallPiles.map(pile => {
    pile.push(epidemic)
    finalShuffle = finalShuffle.concat(shuffle(pile))
  })

  return {finalShuffle, cardsDealtToPlayers}
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

const addInfection = (city, color, count, infectionStatus) => {
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
}
const treatInfection = (city, color, count, infectionStatus) => {
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

  const newCount = count
  const isCured = infectionStatus[cureColor].isCured

  if (newCount[infectionColors[color]] > 0 && !isCured) {
    newCount[infectionColors[color]]--
  }
  if (newCount[infectionColors[color]] > 0 && isCured) {
    newCount[infectionColors[color]] = 0
  }

  game.set({cities: {[city]: {diseases: newCount}}}, {merge: true})
}

const discardPlayerCard = (playerId, hand, card, playerDiscard) => {
  console.log('playerId', playerId)
  console.log('hand', hand)
  console.log('card', card)
  console.log('playerDiscard', playerDiscard)

  const newHand = hand.filter(elem => elem.name !== card)

  game.set(
    {
      playerDiscard: [...playerDiscard, card],
      [playerId]: {hand: newHand}
    },
    {merge: true}
  )
}

module.exports = {
  shuffle,
  generateGroups,
  shufflePlayerDeck,
  epidemicShuffle,
  addInfection,
  treatInfection,
  discardPlayerCard
}
