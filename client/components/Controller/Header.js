import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import db from '../../../server/db'
import CURRENT_GAME from '../../../secrets'

export const Header = props => {
  const playerColors = {
    player1: 'blue',
    player2: 'yellow',
    player3: 'red',
    player4: 'green'
  }
  return (
    <div style={{alignItems: 'center'}} className="controllerHeader">
      {props.isTurn === true && props.remainingMoves > 0 ? (
        <h3 style={{alignSelf: 'center'}} className="controllerPanel">
          Its your turn, the world is counting on you. You have{' '}
          {props.remainingMoves} moves left. Choose carefully.
        </h3>
      ) : (
        <h3 style={{alignSelf: 'center'}} className="controllerPanel">
          Its not your turn, be a good teammate
        </h3>
      )}
      <Button color="red" icon="help" onClick={() => props.toggle()} />
    </div>
  )
}
