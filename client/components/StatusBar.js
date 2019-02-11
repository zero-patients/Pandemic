import React, {Component} from 'react'
import db from '../../server/db'
import CURRENT_GAME from '../../secrets'

class StatusBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infectionStatus: {},
      researchStations: 0,
      playerIndex: null
    }
  }

  componentDidMount() {
    const game = db.collection('rooms').doc(CURRENT_GAME)
    game.onSnapshot(async doc => {
      const data = await doc.data()
      const infectionStatus = data.infectionStatus
      const researchStations = data.researchStations.length
      const counterNumber = data.turnCounter.currentTurn
      const playerIndex = counterNumber % 4 + 1

      this.setState({
        infectionStatus,
        researchStations,
        playerIndex
      })
    })
  }

  render() {
    const styles = {
      position: 'absolute',
      left: '785px',
      top: '0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'grey',
      borderRadius: '5%',
      border: '1px solid #000',
      padding: '8px 8px',
      width: '350px'
    }
    const text = {
      color: 'white',
      textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
      padding: '3px'
    }

    return (
      <div style={styles}>
        <div>
          <span style={{...text, marginRight: '24px', fontSize: '18px'}}>
            Player <b>{this.state.playerIndex}</b>'s Turn
          </span>
        </div>
        {Object.entries(this.state.infectionStatus).map(([key, val], idx) => {
          return (
            <div key={key} styles={{color: key}}>
              {!val.isCured ? (
                <i style={{color: key}} className="fas fa-cube" />
              ) : val.count === 0 ? (
                <i style={{color: key}} className="fas fa-ban" />
              ) : (
                <i
                  style={{color: key}}
                  className="fas fa-prescription-bottle-alt"
                />
              )}
              {<span style={text}> {val.count}</span>}
            </div>
          )
        })}
        <div>
          <i
            style={{
              color: 'white',
              textShadow:
                '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000'
            }}
            className="fas fa-home"
          />
          <span style={text}> {this.state.researchStations}</span>
        </div>
      </div>
    )
  }
}

export default StatusBar
