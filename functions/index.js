const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const CURRENT_GAME = require('../secrets.js')
// const db = require('../server/db')

// console.log(db)
// console.log(CURRENT_GAME)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  const message = 'Hello from Firebase! - ' + new Date().toISOString()
  response.send(message)
})

exports.updateUser = functions.firestore
  .document('rooms/frankRoom')
  // .document(`rooms/${CURRENT_GAME}`)
  .onUpdate((change, context) => {
    const playerBefore = change.before.data()
    const playerAfter = change.after.data()

    const {player1Info, player2Info, player3Info, player4Info} = playerAfter
    // console.log(playerBefore.player1Info)
    // console.log(playerAfter.player1Info)
    // console.log(change)
    // console.log(context)
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

// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     return res.redirect(303, snapshot.ref.toString());
//   });
// });

// exports.updateInfectionTracker = functions.https.onRequest((req, response) => {
//   const docRef = db.collection('rooms').doc(CURRENT_GAME)
//   docRef
//     .get()
//     .then(doc => {
//       const data = doc.data()
//       response.send(data)
//       return 'fin'
//     })
//     .catch(err => response.send(err))
//   // const doc = docRef.get()
//   // const data = await doc.data()
//   // docRef.set({infectionIdx: 3}, {merge: true})
// })
