import React from 'react'
import {Moves} from './Moves'
import {CDCMoves} from './cdcMoves'
import {AirplaneMoves} from './airplaneMoves'

console.log('update disable on footer')
export const MoveView = props => {
  return (
    <div className="controllerMiddle">
      <div className="cardContainer">
        {/* <div style={{display: 'flex', flexDirection: 'column'}}> */}
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <p className="playerCard">
            Spend one action to go to neighboring city
          </p>
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
        <h4>
          <b>Spend one action to move to another research station</b>
        </h4>
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
        <h4>
          <b>
            DISCARD this city card from your hand and spend 1 ACTION to fly to
            this city
          </b>
        </h4>
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

      <div className="cardContainer" />
    </div>
  )
}
