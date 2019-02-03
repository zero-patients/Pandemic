import React, {Component} from 'react'
import db from '../../server/db'
import CURRENT_GAME from '../../secrets'

class InfectionRate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infectionRate: [2, 2, 2, 3, 3, 4, 4],
      infectionIdx: null
    }
  }

  componentDidMount() {
    const game = db.collection('rooms').doc(CURRENT_GAME)
    game.onSnapshot(async doc => {
      const data = await doc.data()
      const infectionIdx = data.infectionIdx
      this.setState({
        infectionIdx: infectionIdx
      })
    })
  }

  // for (let i = 0; i < props.epidemicCounter; i++) {
  render() {
    const styles = {
      position: 'absolute',
      left: '600px',
      top: '150px',
      display: 'flex',
      flexDirection: 'column'
    }
    const circles = {
      borderRadius: '50%',
      border: '1px solid #000',
      margin: '0px 8px',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '30px'
    }
    const circleDiv = {
      display: 'flex',
      flexDirection: 'row'
    }
    const text = {
      margin: '4px 4px',
      textAlign: 'center',
      color: 'white',
      textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000'
    }
    return (
      <div style={styles}>
        <div style={circleDiv}>
          {this.state.infectionRate.map((ele, idx) => {
            if (idx === this.state.infectionIdx) {
              return (
                <div style={{...circles, background: 'red', ...text}} key={idx}>
                  {ele}
                </div>
              )
            } else {
              return (
                <div
                  style={{...circles, background: 'green', ...text}}
                  key={idx}
                >
                  {ele}
                </div>
              )
            }
          })}
        </div>
        <h1 style={text}>Infection Rate Tracker</h1>
      </div>
    )
  }
}

export default InfectionRate
