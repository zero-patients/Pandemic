import React, {Component} from 'react'
import db from '../../server/db'

class OutbreakTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outbreakTracker: null,
      outbreakMarkers: [0, 1, 2, 3, 4, 5, 6, 7, 'X']
    }
  }

  componentDidMount() {
    const game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
    game.onSnapshot(async doc => {
      const data = await doc.data()
      const outbreakTracker = data.outbreakTracker
      this.setState({
        outbreakTracker: outbreakTracker
      })
    })
  }

  render() {
    const styles = {
      position: 'absolute',
      left: '50px',
      top: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
    const circles = {
      borderRadius: '50%',
      border: '1px solid #000',
      margin: '8px 0px',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '30px'
    }
    const circleDiv = {
      display: 'flex',
      flexDirection: 'column'
    }
    const text = {
      textAlign: 'center',
      color: 'white',
      textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
      margin: '4px 4px'
    }
    return (
      <div style={styles}>
        {this.state.outbreakMarkers.map((ele, idx) => {
          if (idx === this.state.outbreakTracker) {
            return (
              <div style={{...circles, background: 'red', ...text}} key={idx}>
                {ele}
              </div>
            )
          } else {
            return (
              <div style={{...circles, background: 'green', ...text}} key={idx}>
                {ele}
              </div>
            )
          }
        })}
        <h1 style={text}>Outbreak</h1>
        <h1 style={text}>Tracker</h1>
      </div>
    )
  }
}

export default OutbreakTracker
