const db = require('../../server/db')

const checkInfection = async () => {
  try {
    await db
      .collection('rooms')
      .doc('YzQ0qR6LZ7gxd8E03k1l')
      .onSnapshot(doc => {
        const data = doc.data().infectionCounter
        let dead = data.some(elem => elem > 24)
      })
  } catch (error) {
    console.error(error)
  }
}

const checkOutbreakCount = async () => {
  try {
    await db
      .collection('rooms')
      .doc('YzQ0qR6LZ7gxd8E03k1l')
      .onSnapshot(async doc => {
        const data = await doc.data().outbreakTracker
        const dead = data >= 8
      })
  } catch (err) {
    console.error(err)
  }
}

const checkPlayerDeckCount = async () => {
  try {
    await db
      .collection('rooms')
      .doc('YzQ0qR6LZ7gxd8E03k1l')
      .onSnapshot(async doc => {
        const data = await doc.data().playerDeck
        const dead = data <= 0
      })
  } catch (err) {
    console.error(err)
  }
}
