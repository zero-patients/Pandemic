import React from 'react'
import {treatInfection} from '../../funcs/utils'
import db from '../../../server/db'
import CURRENT_GAME from '../../../secrets'

const game = db.collection('rooms').doc(CURRENT_GAME)

const decrementActions = (player, remainingActions) => {
  game.set(
    {
      [player]: {actions: remainingActions - 1}
    },
    {merge: true}
  )
}

export const TreatView = props => {
  return (
    <div className="controllerMiddle">
      <button
        style={{backgroundColor: '#42c5f4'}}
        className="treatContainer"
        disabled={
          props.playerCityInfo.diseases[0] === 0 ||
          props.playerInfo.actions === 0
        }
        onClick={() => {
          treatInfection(
            props.playerCity,
            'blue',
            props.playerCityInfo.diseases,
            props.infectionStatus
          )
          decrementActions(props.playerId, props.playerInfo.actions)
        }}
      >
        TREAT
        <img src="/syringe.png" />
      </button>
      <button
        style={{backgroundColor: '#f4eb41'}}
        className="treatContainer"
        disabled={
          props.playerCityInfo.diseases[1] === 0 ||
          props.playerInfo.actions === 0
        }
        onClick={() => {
          treatInfection(
            props.playerCity,
            'darkgoldenrod',
            props.playerCityInfo.diseases,
            props.infectionStatus
          )
          decrementActions(props.playerId, props.playerInfo.actions)
        }}
      >
        TREAT
        <img src="/syringe.png" />
      </button>
      <button
        style={{backgroundColor: '#6b6d6c'}}
        className="treatContainer"
        disabled={
          props.playerCityInfo.diseases[2] === 0 ||
          props.playerInfo.actions === 0
        }
        onClick={() => {
          treatInfection(
            props.playerCity,
            'black',
            props.playerCityInfo.diseases,
            props.infectionStatus
          )
          decrementActions(props.playerId, props.playerInfo.actions)
        }}
      >
        TREAT
        <img src="/syringe.png" />
      </button>
      <button
        style={{backgroundColor: '#d84141'}}
        className="treatContainer"
        disabled={
          props.playerCityInfo.diseases[3] === 0 ||
          props.playerInfo.actions === 0
        }
        onClick={() => {
          treatInfection(
            props.playerCity,
            'red',
            props.playerCityInfo.diseases,
            props.infectionStatus
          )
          decrementActions(props.playerId, props.playerInfo.actions)
        }}
      >
        TREAT
        <img src="/syringe.png" />
      </button>
    </div>
  )
}
