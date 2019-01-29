import React, {Component} from 'react'

const getX = (centerX, angle, radius) => centerX + Math.cos(angle) * radius
const getY = (centerY, angle, radius) => centerY + Math.sin(angle) * radius

const radius = 10
const speed = 0.05

class Infection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      angle: 0 + 2.0944 * this.props.rotation,
      left: 0,
      top: 0
    }
  }

  componentDidMount() {
    const orbit = () => {
      this.setState(
        {
          left: getX(0, this.state.angle, radius),
          top: getY(0, this.state.angle, radius),
          angle: (this.state.angle + speed + this.props.addSpeed) % 360
        },
        () => {
          window.requestAnimationFrame(orbit)
        }
      )
    }
    window.requestAnimationFrame(orbit)
  }

  render() {
    const {left, top} = this.state
    let styles = {
      position: 'absolute',
      left: left,
      top: top,
      fontSize: '10px',
      background: this.props.color,
      border: '1px solid #808080',
      borderRadius: '50%',
      width: '5px',
      height: '5px'
    }
    return <div style={styles} />
  }
}

module.exports = {
  Infection
}
