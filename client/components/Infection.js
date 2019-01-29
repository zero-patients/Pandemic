import React, {Component} from 'react'

const getX = (centerX, angle, radius) => centerX + Math.cos(angle) * radius
const getY = (centerY, angle, radius) => centerY + Math.sin(angle) * radius

class Infection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      angle: 0,
      left: 0,
      top: 0
    }
  }

  componentDidMount() {
    const orbit = () => {
      this.setState(
        {
          left: getX(this.props.left, this.state.angle, this.props.radius),
          top: getY(this.props.top, this.state.angle, this.props.radius),
          angle: (this.state.angle + this.props.speed) % 360
        },
        () => {
          window.requestAnimationFrame(orbit)
        }
      )
    }
    window.requestAnimationFrame(orbit)
  }

  render() {
    return <h1>Hello</h1>
  }
}

export default Infection
