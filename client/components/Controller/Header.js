import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import db from '../../../server/db'

const toggle = async () => {
  const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
  const docRef = await game.get()
  const {showRules} = docRef.data()

  game.set({showRules: !showRules}, {merge: true})
}

export const Header = props => {
  const playerColors = {
    player1: 'blue',
    player2: 'yellow',
    player3: 'red',
    player4: 'green'
  }
  return (
    <div className="controllerBookend">
      {props.isTurn && props.remainingMoves > 0 ? (
        <p className="controllerPanel">
          Its your turn, the world is counting on you. You have{' '}
          {props.remainingMoves} moves left. Choose carefully.
        </p>
      ) : (
        <p className="controllerPanel">Its not your turn, be a good teammate</p>
      )}
      <Button
        color={playerColors[props.playerId]}
        icon="help"
        onClick={() => toggle()}
      />
    </div>
  )
}
