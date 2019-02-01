import React from 'react'

export const PlayerCard = props => {
  return (
    <div className="playerCard">
      <h1>{props.name}</h1>
      <img src={props.image} />
    </div>
  )
}
