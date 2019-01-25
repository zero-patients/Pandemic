const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyC_be_HurO66NNFNffkvrtOUSwoh3g20AY',
  authDomain: 'pandemic-clone.firebaseapp.com',
  databaseURL: 'https://pandemic-clone.firebaseio.com',
  projectId: 'pandemic-clone',
  storageBucket: 'pandemic-clone.appspot.com',
  messagingSenderId: '414108898313'
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})

module.exports = db
