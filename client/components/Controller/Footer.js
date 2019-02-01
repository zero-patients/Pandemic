/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../../server/db'
import {addInfection, treatInfection} from '../../funcs/utils'

export const Footer = props => {
  return (
    <div className="controllerBookend">
      <button className="controllerPanel" onClick={() => props.onClick('move')}>
        MOVE
      </button>

      <button className="controllerPanel" onClick={() => props.onClick('hand')}>
        HAND
      </button>

      <button
        className="controllerPanel"
        onClick={() => props.buildResearchStation(props.playerCity)}
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
            props.infectionStatus
          )
        }
      >
        INFECT
      </button>
      <button
        className="controllerPanel"
        onClick={() =>
          treatInfection(
            props.playerCity,
            'blue',
            props.count,
            props.infectionStatus
          )
        }
      >
        TREAT BLUE
      </button>
      <button
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
            'blue',
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
      </button>

      <button
        className="controllerPanel"
        onClick={() => props.drawInfectionCard()}
        disabled={props.infectionDeck.length === 0}
      >
        Draw Card
      </button>
    </div>
  )
}
