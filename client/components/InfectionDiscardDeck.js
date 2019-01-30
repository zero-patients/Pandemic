import React from 'react'

class InfectionDiscardDeck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      top: props.top,
      left: props.left,
      cards: []
    }
  }

  render() {
    return (
      <div>
        <p>Deck</p>
      </div>
    )
  }
}

export default InfectionDiscardDeck
