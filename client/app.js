import React from 'react'

import Routes from './routes'
import db from '../server/db'

const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
game.onSnapshot(doc => {
  const data = doc.data()
  console.log('count: ', data.count)
  // document.querySelector('#counter').innerHTML = 'count: ' + data.count
})

const googleLogin = async function() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await firebase.auth().signInWithPopup(provider)
    const user = result.user
    document.write(`Hello ${user.displayName}`)
    console.log('user', user)
  } catch (error) {
    console.log(error)
  }
}

async function updateCount() {
  const doc = await game.get()
  const data = doc.data()
  game.update({count: data.count + 1})
}

const App = () => {
  return (
    <div>
      <Routes />
      <button type="button" onClick={updateCount}>
        Click
      </button>
    </div>
  )
}

export default App
