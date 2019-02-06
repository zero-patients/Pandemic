/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../../server/db'
import {
  addInfection,
  treatInfection,
  researchCure,
  resetDidOutbreak
} from '../../funcs/utils'

export const Footer = props => {
  return (
    <div className="controllerFooter">
      <button
        disabled={props.actions < 1 || !props.isTurn}
        className="controllerPanel"
        onClick={() => props.onClick('move')}
      >
        MOVE
      </button>

      <button className="controllerPanel" onClick={() => props.onClick('hand')}>
        HAND
      </button>

      <button
        className="controllerPanel"
        onClick={() => props.buildResearchStation(props.playerCity)}
        disabled={props.actions < 1 || !props.isTurn}
      >
        BUILD
      </button>

      <button
        className="controllerPanel"
        onClick={() =>
          addInfection(
            props.playerCity,
            props.color,
            props.count,
            props.infectionStatus,
            props.outbreakTracker
          )
        }
      >
        INFECT
      </button>
      {/* <button
        className="controllerPanel"
        onClick={() => props.drawPlayerCard()}
      >
        DRAW PLAYER CARD
      </button> */}
      <button
        className="controllerPanel"
        onClick={() => props.onClick('treat')}
      >
        TREAT
      </button>
      {/* <button
        className="controllerPanel"
        onClick={() =>
          treatInfection(
            props.playerCity,
            'darkgoldenrod',
            props.count,
            props.infectionStatus
          )
        }
      >
        TREAT YELLOW
      </button>
      <button
        className="controllerPanel"
        onClick={() =>
          treatInfection(
            props.playerCity,
            'black',
            props.count,
            props.infectionStatus
          )
        }
      >
        TREAT BLACK
      </button>
      <button
        className="controllerPanel"
        onClick={() =>
          treatInfection(
            props.playerCity,
            'red',
            props.count,
            props.infectionStatus
          )
        }
      >
        TREAT RED
      </button>

      <button
        className="controllerPanel"
        onClick={() => props.onClick('event')}
      >
        EVENT
      </button>

      <button
        className="controllerPanel"
        onClick={() => props.onClick('special')}
      >
        SPECIALS
      </button> */}

      <button
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
        Research Cure
      </button>

      <button
        className="controllerPanel"
        onClick={() => props.drawInfectionCard()}
        disabled={props.infectionDeck.length === 0}
      >
        Draw Infection Card
      </button>

      <button
        className="controllerPanel"
        onClick={() => resetDidOutbreak()}
        disabled={props.infectionDeck.length === 0}
      >
        Reset DidOutbreak
      </button>
    </div>
  )
}
