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
  const isTurn = true
  const remainingMoves = 4
  const currentView = 'move'
  const playerCards = [1, 2]
  return (
    <div id="controller" className={style}>
      {isTurn && remainingMoves > 0 ? (
        <div className="controllerBookend">
          <p className="controllerPanel">
            Its your turn, the world is counting on you. You have{' '}
            {remainingMoves} moves left. Choose carefully.
          </p>
        </div>
      ) : (
        <div className="controllerBookend">
          <p className="controllerPanel">
            Its not your turn, be a good teammate
          </p>
        </div>
      )}

      <div className="controllerMiddle">
        <div className="cardContainer">
          <button className="playerCard">
            <a>Card Name</a>
            <a>Card Image</a>
            <a>
              <b>Move one Space to this City</b>
            </a>
          </button>
          <button className="playerCard">
            <a>Card Name</a>
            <a>Card Image</a>
            <a>
              <b>Move one Space to this City</b>
            </a>
          </button>
          <button className="playerCard">
            <a>Card Name</a>
            <a>Card Image</a>
            <a>
              <b>Move one Space to this City</b>
            </a>
          </button>
          <button className="playerCard">
            <a>Card Name</a>
            <a>Card Image</a>
            <a>
              <b>Move one Space to this City</b>
            </a>
          </button>
          <button className="playerCard">
            <a>Card Name</a>
            <a>Card Image</a>
            <a>
              <b>Move one Space to this City</b>
            </a>
          </button>
          <button className="playerCard">
            <a>Card Name</a>
            <a>Card Image</a>
            <a>
              <b>Move one Space to this City</b>
            </a>
          </button>
          <button className="playerCard">
            <a>Card Name</a>
            <a>Card Image</a>
            <a>
              <b>Move one Space to this City</b>
            </a>
          </button>
        </div>

        <div className="cardContainer" />
        <div className="cardContainer" />
      </div>

      <div className="controllerBookend">
        <button className="controllerPanel"> MOVE</button>
        <button className="controllerPanel"> HAND</button>
        <button className="controllerPanel"> BUILD</button>
        <button className="controllerPanel"> CURE</button>
        <button className="controllerPanel"> EVENT</button>
        <button className="controllerPanel"> SPECIALS</button>
      </div>
    </div>
  )
}

export default Controller
