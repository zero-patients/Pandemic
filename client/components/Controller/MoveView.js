import React from 'react'

export const MoveView = props => {
  return (
    <div className="controllerMiddle">
      <div className="cardContainer">
        {/* Render the neighboring cities onto the controller */}
        {props.state.playerCityNeighbors.map((elem, idx) => {
          const color = props.state.neighborCardColors[idx]
          return (
            <div key={idx}>
              <button
                style={{backgroundColor: color, borderRadius: '5%'}}
                className="playerCard"
                onClick={() => {
                  props.goToCity(elem)
                }}
              >
                <a>{elem}</a>
                <a>Card Image</a>
                <a>
                  <b>Move one Space to this City</b>
                </a>
              </button>
            </div>
          )
        })}
      </div>

      <div className="cardContainer">
        {/* Render the cities with Research Stations onto the controller */}
        {props.state.researchStations.includes(props.state.playerCity)
          ? props.state.researchStations.map((elem, idx) => {
              const color = props.state.researchStationCardColors[idx]
              return (
                <div key={idx}>
                  <button
                    style={{backgroundColor: color, borderRadius: '5%'}}
                    className="playerCard"
                    onClick={() => {
                      props.goToCity(elem)
                    }}
                  >
                    <a>{elem}</a>
                    <a>Card Image</a>
                    <a>
                      <b>Move one Space to props Research Station</b>
                    </a>
                  </button>
                </div>
              )
            })
          : null}
      </div>

      <div className="cardContainer" />
    </div>
    // <>
    // {/* {props.state.currentView === 'move' ? (
    //   <div onClick={()=>props.onClick('Not move')}> State is 'move'</div>
    // ) : (<div onClick={()=>props.onClick('move')}> State is !'move'</div>)} */}
    // </>
  )
}
