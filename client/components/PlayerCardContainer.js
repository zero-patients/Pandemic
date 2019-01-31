import React from 'react'
import CardBox from './CardBox'
import PlayerDeck from './PlayerDeck'
import PlayerDiscardDeck from './PlayerDiscardDeck'

class PlayerCardContainer extends React.Component {
  render() {
    const {top, left} = this.props

    const positioning = {
      position: 'absolute',
      top,
      left
    }

    return (
      <div style={positioning}>
        <CardBox top={0} left={0} outline="playerCardBox" />
        <CardBox top={0} left={300} outline="playerCardBox" />
        <PlayerDeck top={1} left={1} />
        <PlayerDiscardDeck top={1} left={301} />
      </div>
    )
  }
}

export default PlayerCardContainer
