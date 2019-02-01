const db = require('../../server/db')

const checkInfection = async () => {
  try {
    let diseases = []
    await db
      .collection('rooms')
      .doc('YzQ0qR6LZ7gxd8E03k1l')
      .onSnapshot(doc => {
        const data = doc.data().infectionCounter
        data.some(elem => elem > 24)
      })
  } catch (error) {
    console.error(error)
  }
}
checkInfection()
