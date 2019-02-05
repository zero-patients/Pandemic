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
        <CardBox top={0} left={0} outline="infectionCardBox">
          <InfectionDeck top={1} left={1} />
        </CardBox>
        <CardBox top={0} left={300} outline="infectionCardBox">
          <InfectionDiscardDeck />
        </CardBox>
      </div>
    )
  }
}

export default InfectionCardsContainer
