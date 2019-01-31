import React, {Component} from 'react'
import db from '../../../server/db'

export const Header = props => {
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
    </div>
  )
}
