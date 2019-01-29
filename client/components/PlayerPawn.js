import React, {Component} from 'react'
import db from '../../server/db'

class PlayerPawn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: {
        X: 0,
        Y: 0
      },
      fillStyle: '',
      strokeStyle: ''
    }
  }

  componentDidMount() {
    const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
    game.onSnapshot(async doc => {
      const data = await doc.data()
      let playerInfo = data[`player${this.props.player}Info`]

      this.setState({...playerInfo})
    })
  }

  render() {
    let styles = {
      position: 'absolute',
      top: `${this.state.location.Y}px`,
      left: `${this.state.location.X}px`,
      background: this.state.fillStyle,
      border: '2px solid ' + this.state.strokeStyle,
      borderRadius: '50%',
      textAlign: 'center',
      width: '20px',
      height: '20px'
    }

    return <div style={styles}>{this.props.player}</div>
  }
}

export default PlayerPawn
