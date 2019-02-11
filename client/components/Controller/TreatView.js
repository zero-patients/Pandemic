import React from 'react'
import {treatInfection} from '../../funcs/utils' //, updateActions

export const TreatView = props => {
  return (
    <div className="controllerMiddle">
      <button
        type="button"
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

          props.updateActions(props.playerId)
        }}
      >
        TREAT <img src="/syringe.png" />
      </button>
      <button
        type="button"
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

          props.updateActions(props.playerId)
        }}
      >
        TREAT{/* */}
        <img src="/syringe.png" />
      </button>
      <button
        type="button"
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

          props.updateActions(props.playerId)
        }}
      >
        TREAT<img src="/syringe.png" />
      </button>
      <button
        type="button"
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

          props.updateActions(props.playerId)
        }}
      >
        TREAT{/* */}
        <img src="/syringe.png" />
      </button>
    </div>
  )
}
