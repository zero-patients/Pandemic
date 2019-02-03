import React, {Component} from 'react'
import db from '../../server/db'
import CURRENT_GAME from '../../secrets'

const xShift = 5
const yShift = 19

class PlayerPawn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: '',
      fillStyle: '',
      strokeStyle: '',
      playerX: 0,
      playerY: 0
    }
  }

  componentDidMount() {
    const game = db.collection('rooms').doc(CURRENT_GAME)
    game.onSnapshot(async doc => {
      const data = await doc.data()
      // console.log('data', data)
      let playerInfo = data[`player${this.props.player}Info`]
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      let playerX = playerCityInfo.location[0] + playerInfo.offset[0] + xShift
      let playerY = playerCityInfo.location[1] + playerInfo.offset[1] + yShift

      this.setState({...playerInfo, playerX: playerX, playerY: playerY})
    })
  }

  render() {
    let styles = {
      position: 'absolute',
      top: `${this.state.playerY}px`,
      left: `${this.state.playerX}px`,
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
