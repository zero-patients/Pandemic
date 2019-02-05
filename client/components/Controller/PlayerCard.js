import React from 'react'
import {discardPlayerCard} from '../../funcs/utils'

export const PlayerCard = props => {
  return (
    <div className="playerCard">
      <h1>{props.cardName}</h1>
      <img src={props.image} />

      <button
        onClick={() => {
          discardPlayerCard(
            props.playerId,
            props.playerHand,
            props.cardName,
            props.playerDiscard
          )
        }}
      >
        Play
      </button>
    </div>
  )
}