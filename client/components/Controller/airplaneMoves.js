import React from 'react'
import {discardPlayerCard} from '../../funcs/utils'

export const AirplaneMoves = props => {
  return (
    <button
      disabled={props.restrict}
      style={{backgroundColor: props.color, borderRadius: '5%'}}
      className="playerCard"
      onClick={() => {
        props.move(props.name)
        discardPlayerCard(
          props.state.playerId,
          props.state.playerHand,
          props.name,
          props.state.playerDiscard
        )
      }}
    >
      <a>
        <b>{props.name}</b>
      </a>
      <img src="/airplane.png" />
    </button>
  )
}
