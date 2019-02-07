import React from 'react'
import {Moves} from './Moves'
import {CDCMoves} from './cdcMoves'
import {AirplaneMoves} from './airplaneMoves'

export const MoveView = props => {
  return (
    <div className="controllerMiddle">
      <div className="cardContainer">
        {/* <div style={{display: 'flex', flexDirection: 'column'}}> */}
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {props.state.playerCityNeighbors.map((elem, idx) => {
            const color = props.state.neighborCardColors[idx]
            return (
              <Moves
                restrict={!props.isTurn || props.actions < 1}
                className="cardContainer"
                key={idx}
                move={props.goToCity}
                color={color}
                elem={elem}
              />
            )
          })}
          {/* </div> */}
        </div>
      </div>

      <div className="cardContainer">
        {/* Render the cities with Research Stations onto the controller */}

        {props.state.researchStations.includes(props.state.playerCity)
          ? [...props.state.researchStations]
              .filter(elem => elem !== props.state.playerCity)
              .map((elem, idx) => {
                const color = props.state.researchStationCardColors[idx]
                return (
                  <CDCMoves
                    restrict={!props.isTurn || props.actions < 1}
                    key={idx}
                    move={props.goToCity}
                    color={color}
                    elem={elem}
                  />
                )
              })
          : null}
      </div>
      <div className="cardContainer">
        {/* Render the cities in the player's hand*/}
        <div />
        {props.state.playerHand.length
          ? [...props.state.playerHand].map((elem, idx) => {
              return (
                <AirplaneMoves
                  restrict={!props.isTurn || props.actions < 1}
                  key={idx}
                  move={props.goToCity}
                  color={elem.color}
                  name={elem.name}
                  state={props.state}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}
