import React, {Component} from 'react'
// import { isAbsolute } from 'path';
import db from '../../server/db'
import InfectionGroup from './InfectionGroup'
import ResearchStation from './ResearchStation'

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
      let researchStations = data.researchStations
      const isResearchStation = researchStations.includes(this.props.name)
      this.setState({
        location: cityInfo.location,
        color: cityInfo.color,
        blueInfections: cityInfo.diseases[0],
        yellowInfections: cityInfo.diseases[1],
        blackInfections: cityInfo.diseases[2],
        redInfections: cityInfo.diseases[3],
        isResearchStation
      })
    })
  }

  render() {
    let divStyles = {
      position: 'absolute',
      left: `${this.state.location[0]}px`,
      top: `${this.state.location[1]}px`,
      fontSize: '12px',
      color: `${this.state.color}`
    }

    return (
      <div style={divStyles}>
        <p className="city-label">{this.props.name}</p>
        <div className="jewel diamond" />
        {this.state.isResearchStation ? <ResearchStation /> : null}
        {this.state.blueInfections ? (
          <InfectionGroup
            color="blue"
            speed={0}
            count={this.state.blueInfections}
          />
        ) : null}
        {this.state.yellowInfections ? (
          <InfectionGroup
            color="yellow"
            speed={0.01}
            count={this.state.yellowInfections}
          />
        ) : null}
        {this.state.blackInfections ? (
          <InfectionGroup
            color="black"
            speed={0.02}
            count={this.state.blackInfections}
          />
        ) : null}
        {this.state.redInfections ? (
          <InfectionGroup
            color="red"
            speed={0.03}
            count={this.state.redInfections}
          />
        ) : null}
      </div>
    )
  }
}

export default CityMarker
