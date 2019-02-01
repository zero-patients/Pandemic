const infectionDeck = require('../data/infectionDeck')

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

export default {shuffle}
