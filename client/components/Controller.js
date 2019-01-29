import React from 'react'
import db from '../../server/db'

const Controller = props => {
  const {userId} = props.match.params
  const style = `player${userId}`
  const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')

  const goToEurope = () => {
    game.set({[`${style}Info`]: {location: {X: 910, Y: 410}}}, {merge: true})
  }
  const goToAmerica = () => {
    game.set({[`${style}Info`]: {location: {X: 475, Y: 475}}}, {merge: true})
  }
  const goToSouthAmerica = () => {
    game.set({[`${style}Info`]: {location: {X: 650, Y: 750}}}, {merge: true})
  }
  const goToAsia = () => {
    game.set({[`${style}Info`]: {location: {X: 1500, Y: 515}}}, {merge: true})
  }

  return (
    <div className={style}>
      <button type="button" onClick={() => goToEurope()}>
        Europe
      </button>
      <button type="button" onClick={() => goToAmerica()}>
        America
      </button>
      <button type="button" onClick={() => goToSouthAmerica()}>
        South America
      </button>
      <button type="button" onClick={() => goToAsia()}>
        Asia
      </button>
    </div>
  )
}

export default Controller
