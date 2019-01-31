import React from 'react'
import CardBox from './CardBox'
import InfectionDeck from './InfectionDeck'
import InfectionDiscardDeck from './InfectionDiscardDeck'

class InfectionCardsContainer extends React.Component {
  render() {
    const {top, left} = this.props

    const positioning = {
      position: 'absolute',
      top,
      left
    }
    return (
      <div style={positioning}>
        <CardBox top={0} left={0} />
        <CardBox top={0} left={300} />
        <InfectionDeck top={1} left={1} />
        <InfectionDiscardDeck top={1} left={301} />
      </div>
    )
  }
}

export default InfectionCardsContainer
