import React from 'react'
import {PlayerCard} from './PlayerCard'

export const PlayerHand = props => {
  return (
    <div className="controllerMiddle" style={{width: '100vw'}}>
      {props.playerHand.map(card => {
        if (card.type === 'city') {
          return (
            <PlayerCard
              name={card.name}
              color={card.color}
              image={`/images/cities/${card.name.split(' ').join('-')}.jpg`}
            />
          )
        } else if (card.type === 'event') {
          return (
            <PlayerCard name={card.name} image="/images/cities/event.png" />
          )
        }
      })}
    </div>
  )
}
