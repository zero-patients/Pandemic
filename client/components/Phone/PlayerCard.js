/* eslint-disable react/button-has-type */
import React from 'react'
import {discardPlayerCard, goToCity} from '../../funcs/utils'

export const PlayerCard = props => {
  const discardThenMove = () => {
    discardPlayerCard(
      props.playerId,
      props.playerHand,
      props.cardName,
      props.playerDiscard
    )
    goToCity(props.playerId, props.cardName)
  }
  console.log('props.playerId, props.cardName', props.playerId, props.cardName)
  return (
    <div className="playerCard">
      <h1>{props.cardName}</h1>
      <img src={props.image} />

      <button
        onClick={() => {
          discardThenMove()
        }}
      >
        Play
      </button>
    </div>
  )
}
