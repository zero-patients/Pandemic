import React from 'react'
import {PlayerCard} from './PlayerCard'

export const PlayerHand = props => {
  return (
    <div
      className="controllerMiddle"
      style={{width: '100vw', justifyContent: 'space-evenly'}}
    >
      {props.playerHand.map(card => {
        if (card.type === 'city') {
          return (
            <PlayerCard
              // className="playerCardInHand"
              key={card.name}
              playerId={props.playerId}
              playerHand={props.playerHand}
              cardName={card.name}
              color={card.color}
              image={`/images/cities/${card.name.split(' ').join('-')}.jpg`}
              playerDiscard={props.playerDiscard}
            />
          )
        } else if (card.type === 'event') {
          return (
            <PlayerCard
              key={card.name}
              playerId={props.playerId}
              playerHand={props.playerHand}
              cardName={card.name}
              image="/images/cities/event.png"
              playerDiscard={props.playerDiscard}
            />
          )
        }
      })}
    </div>
  )
}
