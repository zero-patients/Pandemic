import React from 'react'
import {discardPlayerCard} from '../../funcs/utils'

export const PlayerCard = props => {
  return (
    <div className="playerCardInHand" style={{backgroundColor: props.color}}>
      <h3 style={{position: 'absolute', alignSelf: 'flex-start'}}>
        {props.cardName}
      </h3>
      <img className="playerCardImage" src={props.image} />

      {/* <button
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
      </button> */}
    </div>
  )
}
