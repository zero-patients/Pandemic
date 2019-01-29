import React, {Component} from 'react'
// import { isAbsolute } from 'path';
import db from '../../server/db'
import Infection from './Infection'

class CityMarker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: [],
      color: ''
    }
  }

  componentDidMount() {
    const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
    game.onSnapshot(async doc => {
      const data = await doc.data()
      let cityInfo = data.cities[this.props.name]
      this.setState({
        location: cityInfo.location,
        color: cityInfo.color,
        blueInfections: cityInfo.diseases[0],
        yellowInfections: cityInfo.diseases[1],
        blackInfections: cityInfo.diseases[2],
        redInfections: cityInfo.diseases[3]
      })
    })
  }

  render() {
    let divStyles = {
      position: 'absolute',
      left: `${this.state.location[0]}px`,
      top: `${this.state.location[1]}px`,
      fontSize: '10px'
    }
    let cityStyles = {
      background: `${this.state.color}`,
      border: '4px solid #808080',
      width: '20px',
      height: '20px'
    }

    return (
      <div style={divStyles}>
        <p>{this.props.name}</p>
        <div style={cityStyles} />
        {/* <Infection color='blue' left={this.state.location[0]} top={this.state.location[1]} counter={1} /> */}
        {/* <Infection left={this.state.location[0]} top={this.state.location[1]} radius={80} speed={0.03}/> */}
      </div>
    )
  }
}

export default CityMarker
