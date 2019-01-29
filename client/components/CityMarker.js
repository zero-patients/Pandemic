import React, {Component} from 'react'
// import { isAbsolute } from 'path';
import db from '../../server/db'

class CityMarker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: [],
      color: ''
    }
  }

  componentDidMount() {
    const cityInfo = this.props.city

    this.setState({
      location: cityInfo.location,
      color: cityInfo.color
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
        <div className="jewel diamond" />
      </div>
    )
  }
}

export default CityMarker
