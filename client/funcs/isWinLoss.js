const db = require('../../server/db')
const CURRENT_GAME = require('../../secrets')

const checkInfection = async () => {
  try {
    await db
      .collection('rooms')
      .doc(CURRENT_GAME)
      .onSnapshot(doc => {
        const infectionCounter = doc.data().infectionCounter
        let dead = infectionCounter.some(elem => elem > 24) // dead true = loss
      })
  } catch (error) {
    console.error(error)
  }
}

const checkOutbreakCount = async () => {
  try {
    await db
      .collection('rooms')
      .doc(CURRENT_GAME)
      .onSnapshot(async doc => {
        const outbreakTracker = await doc.data().outbreakTracker
        const dead = outbreakTracker >= 8 // dead true = loss
      })
  } catch (err) {
    console.error(err)
  }
}

const checkPlayerDeckCount = async () => {
  try {
    await db
      .collection('rooms')
      .doc(CURRENT_GAME)
      .onSnapshot(async doc => {
        const playerDeck = await doc.data().playerDeck
        const dead = playerDeck <= 0 // dead true = loss
      })
  } catch (err) {
    console.error(err)
  }
}

const checkCured = async () => {
  try {
    await db
      .collection('rooms')
      .doc(CURRENT_GAME)
      .onSnapshot(async doc => {
        const data = await doc.data().infectionStatus
        let curedCount = 0
        for (color in data) {
          if (color.isCured) curedCount++
        }
        const survived = curedCount === 4 // survived true = win
      })
  } catch (err) {
    console.error(err)
  }
}
