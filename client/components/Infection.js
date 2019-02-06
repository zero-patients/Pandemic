import React, {Component} from 'react'

const getX = (centerX, angle, radius) => centerX + Math.cos(angle) * radius
const getY = (centerY, angle, radius) => centerY + Math.sin(angle) * radius

const radius = 15
const speed = 0.05
const xShift = 16
const yShift = 36

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
          left: getX(
            0 + xShift,
            this.state.angle,
            radius + (this.props.addRadius || 0)
          ),
          top: getY(
            0 + yShift,
            this.state.angle,
            radius + (this.props.addRadius || 0)
          ),
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
      border: '1px solid #000',
      borderRadius: '50%',
      width: '10px',
      height: '10px'
    }
    return <div style={styles} />
  }
}

module.exports = {
  Infection
}
