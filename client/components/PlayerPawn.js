import React, {Component} from 'react'
// import { isAbsolute } from 'path';
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
      hand: [],
      strokeStyle: ''
    }
  }

  componentDidMount() {
    const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
    game.onSnapshot(async doc => {
      const data = await doc.data()
      let playerInfo = data[`player${this.props.player}Info`]

      // this.setState({x: playerInfo.location.X, y: playerInfo.location.Y})
      this.setState({...playerInfo})
      // console.log('playerInfo', playerInfo)
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
      width: '10px',
      height: '10px'
    }

    return <div style={styles}>{/* <p>Player {this.props.player}</p> */}</div>
  }
}

export default PlayerPawn
