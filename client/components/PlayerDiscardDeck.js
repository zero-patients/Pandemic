import React from 'react'
import db from '../../server/db'

class PlayerDiscardDeck extends React.Component {
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
      .doc('YzQ0qR6LZ7gxd8E03k1l')
      .onSnapshot(async doc => {
        const data = await doc.data()
        this.setState({cards: data.playerDiscard})
      })
  }

  render() {
    const styles = {
      position: 'absolute',
      top: `${this.state.top}px`,
      left: `${this.state.left}px`,
      width: '250px',
      height: '200px'
    }
    return this.state.cards.length === 0 ? null : (
      <img
        src={`/images/cities/${
          this.state.cards[this.state.cards.length - 1]
        }.jpg`}
        style={styles}
      />
    )
  }
}

export default PlayerDiscardDeck