import React from 'react'
import {researchCure} from '../../funcs/utils'

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5%'
}

export const Footer = props => {
  return (
    <div className="controllerFooter">
      <button
        type="button"
        disabled={props.actions < 1 || !props.isTurn}
        className="controllerPanel"
        style={{...flexCenter}}
        onClick={() => props.onClick('move')}
      >
        MOVE
      </button>

      <button
        type="button"
        style={{...flexCenter}}
        className="controllerPanel"
        onClick={() => props.onClick('hand')}
      >
        HAND
      </button>

      <button
        type="button"
        className="controllerPanel"
        style={{...flexCenter}}
        onClick={() => props.buildResearchStation(props.playerCity)}
        disabled={props.actions < 1 || !props.isTurn}
      >
        BUILD
      </button>

      <button
        type="button"
        style={{...flexCenter}}
        className="controllerPanel"
        onClick={() => props.onClick('treat')}
      >
        TREAT
      </button>

      <button
        type="button"
        style={{...flexCenter}}
        className="controllerPanel"
        onClick={() =>
          researchCure(
            props.playerId,
            props.playerHand,
            props.playerDiscard,
            props.infectionStatus
          )
        }
        disabled={props.infectionDeck.length === 0}
      >
        CURE
      </button>
    </div>
  )
}
