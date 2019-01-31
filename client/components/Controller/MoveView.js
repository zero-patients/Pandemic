import React from 'react'
import {Moves} from './Moves'

export const MoveView = props => {
  return (
    <div className="controllerMiddle">
      <div className="cardContainer">
        {/* <div style={{display: 'flex', flexDirection: 'column'}}> */}
        <h4>Spend one action to go to neighboring city</h4>
        <div style={{display: 'flex', flexDirection: 'row', flex: 'wrap'}}>
          {props.state.playerCityNeighbors.map((elem, idx) => {
            const color = props.state.neighborCardColors[idx]
            return (
              <Moves
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
        <h4>Spend one action to move to another research station</h4>
        {props.state.researchStations.includes(props.state.playerCity)
          ? [...props.state.researchStations]
              .filter(elem => elem !== props.state.playerCity)
              .map((elem, idx) => {
                const color = props.state.researchStationCardColors[idx]
                return (
                  <Moves
                    key={idx}
                    move={props.goToCity}
                    color={color}
                    elem={elem}
                  />
                )
              })
          : null}
      </div>

      <div className="cardContainer" />
    </div>
  )
}
