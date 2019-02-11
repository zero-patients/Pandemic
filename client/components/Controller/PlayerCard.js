import React from 'react'

export const PlayerCard = props => {
  const text = {
    color: 'white',
    textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
    padding: '3px'
  }
  return (
    <div
      className="playerCardInHand"
      style={{...text, backgroundColor: props.color}}
    >
      <h3 style={{position: 'absolute', alignSelf: 'flex-start'}}>
        {props.cardName}
      </h3>
      <img className="playerCardImage" src={props.image} />
    </div>
  )
}
