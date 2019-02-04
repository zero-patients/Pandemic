import React from 'react'
import db from '../../server/db'
import CURRENT_GAME from '../../secrets'
import InfectionCard from './InfectionCard'

class InfectionDiscardDeck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }
  }

  async componentDidMount() {
    await db
      .collection('rooms')
      .doc(CURRENT_GAME)
      .onSnapshot(async doc => {
        const data = await doc.data()
        this.setState({cards: data.infectionDiscard})
      })
  }

  render() {
    const positioning = {
      width: '250px',
      height: '200px'
    }

    return this.state.cards.length === 0 ? null : (
      <InfectionCard
        city={this.state.cards[this.state.cards.length - 1]}
        cityColor=""
      />
    )
  }
}

export default InfectionDiscardDeck
