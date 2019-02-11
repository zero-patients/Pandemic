import React from 'react'
import {discardPlayerCard} from '../../funcs/utils'

export const AirplaneMoves = props => {
  const text = {
    color: 'white',
    textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
    padding: '3px'
  }
  return (
    <div>
      {!props.color === 'black' ? (
        <button
          type="button"
          disabled={props.restrict}
          style={{...text, backgroundColor: props.color, borderRadius: '5%'}}
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
          <a style={{...text}}>
            <b>{props.name}</b>
          </a>
          <img src="/airplane.png" />
        </button>
      ) : (
        <button
          type="button"
          disabled={props.restrict}
          style={{...text, backgroundColor: 'gray', borderRadius: '5%'}}
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
          <a style={{...text}}>
            <b>{props.name}</b>
          </a>
          <img src="/airplane.png" />
        </button>
      )}
    </div>
  )
}
