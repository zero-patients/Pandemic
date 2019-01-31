import React from 'react'
import CardBox from './CardBox'
import InfectionDeck from './InfectionDeck'
import InfectionDiscardDeck from './InfectionDiscardDeck'

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
      </div>
    )
  }
}

export default PlayerCardContainer
