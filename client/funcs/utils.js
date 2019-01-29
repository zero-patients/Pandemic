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
