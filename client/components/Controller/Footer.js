import React, {Component} from 'react'
import db from '../../../server/db'

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
        onClick={() => {
          props.buildResearchStation(props.playerCity)
        }}
      >
        BUILD
      </button>

      <button className="controllerPanel"> CURE</button>

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
