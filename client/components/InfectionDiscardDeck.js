import React from 'react'
import db from '../../server/db'

class InfectionDiscardDeck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      top: props.top,
      left: props.left,
      cards: []
    }
  }

  async componentDidMount() {
    await db
      .collection('rooms')
      .doc('frankRoom')
      .onSnapshot(async doc => {
        const data = await doc.data()
        this.setState({cards: data.infectionDiscard})
      })
  }

  render() {
    const styles = {
      position: 'absolute',
      top: `${this.state.top}px`,
      left: `${this.state.left}px`,
      // background: 'red',
      // border: '2px solid purple',
      // textAlign: 'center',
      width: '250px',
      height: '200px'
    }
    return this.state.cards.length === 0 ? null : (
      <img
        src={`/${this.state.cards[this.state.cards.length - 1]}.jpg`}
        style={styles}
      />
    )
  }
}

export default InfectionDiscardDeck
