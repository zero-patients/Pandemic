import React from 'react'
import db from '../../server/db'
import CURRENT_GAME from '../../secrets'

class PlayerDeck extends React.Component {
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
      .doc(CURRENT_GAME)
      .onSnapshot(async doc => {
        const data = await doc.data()
        this.setState({cards: data.playerDeck})
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
      <img src="/playingCardBlue.png" style={styles} />
    )
  }
}

export default PlayerDeck
