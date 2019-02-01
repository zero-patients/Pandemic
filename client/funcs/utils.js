const infectionDeck = require('../data/infectionDeck')
import db from '../../server/db'
let game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')

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

  let playerDeckNoEpidemics = infectionDeck.concat([
    'Sup',
    'We',
    'Are',
    'Event',
    'Placeholders'
  ]) // add placeholders to playerdeck
  let shuffledPDNE = shuffle(playerDeckNoEpidemics) //shuffle events in
  let cardsDealtToPlayers = [[], [], [], []] //deal 2 cards to each player
  for (let i = 0; i < 8; i++) {
    cardsDealtToPlayers[i % 4].push(shuffledPDNE.pop())
  }

  let pileLength = Math.ceil(shuffledPDNE.length / 4)
  let smallPiles = generateGroups(shuffledPDNE, pileLength)
  let finalShuffle = []

  smallPiles.map(pile => {
    pile.push('EPIDEMIC SUCKA!!')
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

const addInfection = (city, color, count) => {
  const infectionColors = {
    blue: 0,
    darkgoldenrod: 1,
    black: 2,
    red: 3
  }
  const newCount = count
  newCount[infectionColors[color]]++

  console.log(city, color, count)

  game.set({cities: {[city]: {diseases: newCount}}}, {merge: true})
}
const treatInfection = (city, color, count, isCured) => {
  const infectionColors = {
    blue: 0,
    darkgoldenrod: 1,
    black: 2,
    red: 3
  }

  const newCount = count

  if (newCount[infectionColors[color]] > 0 && !isCured) {
    newCount[infectionColors[color]]--
    console.log('isCured', isCured)
  }
  if (newCount[infectionColors[color]] > 0 && isCured) {
    newCount[infectionColors[color]] = 0
    console.log('isCured', isCured)
  }
  console.log(city, color, count)

  game.set({cities: {[city]: {diseases: newCount}}}, {merge: true})
}

module.exports = {
  shuffle,
  generateGroups,
  shufflePlayerDeck,
  epidemicShuffle,
  addInfection,
  treatInfection
}
