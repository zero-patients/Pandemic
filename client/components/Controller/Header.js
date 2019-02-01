import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'

export const Header = props => {
  console.log('Header:')
  console.log(props)
  console.log(typeof props.playerId)
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
      <Button color={playerColors[props.playerId]} icon="help" />
    </div>
  )
}
