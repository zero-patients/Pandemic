import React from 'react'
import db from '../../server/db'

const Controller = props => {
  const {userId} = props.match.params
  const playerId = `player${userId}`
  const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
  const cities = game.cities

  const goToAtlanta = () => {
    game.set({[`${playerId}Info`]: {location: 'Atlanta'}}, {merge: true})
  }
  const goToParis = () => {
    game.set({[`${playerId}Info`]: {location: 'Paris'}}, {merge: true})
  }
  const goToBogota = () => {
    game.set({[`${playerId}Info`]: {location: 'Bogota'}}, {merge: true})
  }
  const goToShanghai = () => {
    game.set({[`${playerId}Info`]: {location: 'Shanghai'}}, {merge: true})
  }

  const isTurn = true
  const remainingMoves = 4
  const currentView = 'move'
  const playerCards = [1, 2]
  return (
    <div id="controller" className={playerId}>
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
        <button
          className="controllerPanel"
          onClick={() => {
            goToParis()
          }}
        >
          {' '}
          MOVE/ go to Paris
        </button>
        <button
          className="controllerPanel"
          onClick={() => {
            goToShanghai()
          }}
        >
          {' '}
          HAND/ go to Shanghai
        </button>
        <button
          className="controllerPanel"
          onClick={() => {
            goToAtlanta()
          }}
        >
          {' '}
          BUILD/ go to Atlanta
        </button>
        <button
          className="controllerPanel"
          onClick={() => {
            goToBogota()
          }}
        >
          {' '}
          CURE/ go to Bogota
        </button>
        <button className="controllerPanel"> EVENT</button>
        <button className="controllerPanel"> SPECIALS</button>
      </div>
    </div>
  )
}

export default Controller
