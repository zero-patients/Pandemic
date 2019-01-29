import React, {Component} from 'react'
// import { isAbsolute } from 'path';
import db from '../../server/db'
import InfectionGroup from './InfectionGroup'

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
        {this.state.blueInfections ? (
          <InfectionGroup
            color="blue"
            radius={0}
            count={this.state.blueInfections}
          />
        ) : null}
        {this.state.yellowInfections ? (
          <InfectionGroup
            color="yellow"
            radius={1}
            count={this.state.yellowInfections}
          />
        ) : null}
        {this.state.blackInfections ? (
          <InfectionGroup
            color="black"
            radius={2}
            count={this.state.blackInfections}
          />
        ) : null}
        {this.state.redInfections ? (
          <InfectionGroup
            color="red"
            radius={3}
            count={this.state.redInfections}
          />
        ) : null}
      </div>
    )
  }
}

export default CityMarker
