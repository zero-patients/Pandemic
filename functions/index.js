const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.updateUser = functions.firestore
  .document('rooms/frankRoom')
  .onUpdate((change, context) => {
    const playerAfter = change.after.data()

    const {player1Info, player2Info, player3Info, player4Info} = playerAfter
    if (player1Info.actions === 0) {
      return change.after.ref.set(
        {
          player1Info: {
            actions: -1,
            isTurn: false
          },
          player2Info: {
            actions: 4,
            isTurn: true
          },
          turnCounter: {
            currentTurn: 1
          }
        },
        {merge: true}
      )
    }

    if (player2Info.actions === 0) {
      return change.after.ref.set(
        {
          player2Info: {
            actions: -1,
            isTurn: false
          },
          player3Info: {
            actions: 4,
            isTurn: true
          },
          turnCounter: {
            currentTurn: 2
          }
        },
        {merge: true}
      )
    }

    if (player3Info.actions === 0) {
      return change.after.ref.set(
        {
          player3Info: {
            actions: -1,
            isTurn: false
          },
          player4Info: {
            actions: 4,
            isTurn: true
          },
          turnCounter: {
            currentTurn: 3
          }
        },
        {merge: true}
      )
    }

    if (player4Info.actions === 0) {
      return change.after.ref.set(
        {
          player4Info: {
            actions: -1,
            isTurn: false
          },
          player1Info: {
            actions: 4,
            isTurn: true
          },
          turnCounter: {
            currentTurn: 0
          }
        },
        {merge: true}
      )
    }

    return null
  })
