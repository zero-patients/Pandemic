import React from 'react'
import Routes from './routes'

// const googleLogin = async function() {
//   try {
//     const provider = new firebase.auth.GoogleAuthProvider()
//     const result = await firebase.auth().signInWithPopup(provider)
//     const user = result.user
//     document.write(`Hello ${user.displayName}`)
//     console.log('user', user)
//   } catch (error) {
//     console.log(error)
//   }
// }

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  )
}

export default App
