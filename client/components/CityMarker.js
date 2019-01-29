import React, {Component} from 'react'

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
      fontSize: '12px',
      color: `${this.state.color}`
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
