/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../server/db'

class Controller extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerCity: '',
      playerCityNeighbors: []
    }

    this.game = db.collection('rooms').doc('YzQ0qR6LZ7gxd8E03k1l')
    this.userId = props.match.params.userId
    this.playerId = `player${this.userId}`

    this.isTurn = true
    this.remainingMoves = 4
    this.currentView = 'move'
    this.playerCards = [1, 2]
  }
  goToAtlanta = () => {
    this.game.set(
      {[`${this.playerId}Info`]: {location: 'Atlanta'}},
      {merge: true}
    )
  }
  goToParis = () => {
    this.game.set(
      {[`${this.playerId}Info`]: {location: 'Paris'}},
      {merge: true}
    )
  }
  goToBogota = () => {
    this.game.set(
      {[`${this.playerId}Info`]: {location: 'Bogota'}},
      {merge: true}
    )
  }
  goToShanghai = () => {
    this.game.set(
      {[`${this.playerId}Info`]: {location: 'Shanghai'}},
      {merge: true}
    )
  }
  goToNeighbor = city => {
    this.game.set({[`${this.playerId}Info`]: {location: city}}, {merge: true})
  }

  buildResearchStation = city => {
    // this.game.set({ 'cities': { [`${city}`] : {researchStation: true}}}, {merge: true})
    console.log(this.game.researchStations)
    this.game.set(
      {researchStations: [...this.game.researchStations, city]},
      {merge: true}
    )
  }

  componentDidMount() {
    this.game.onSnapshot(async doc => {
      const data = await doc.data()
      let playerInfo = data[`${this.playerId}Info`]
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      let playerCityNeighbors = playerCityInfo.neighbors
      this.setState({
        ...playerInfo,
        playerCity: playerCity,
        playerCityNeighbors: playerCityNeighbors
      })
      // console.log('state', this.state)
    })
  }

  render() {
    let styles = {}
    return (
      <div id="controller" className={this.playerId}>
        {this.isTurn && this.remainingMoves > 0 ? (
          <div className="controllerBookend">
            <p className="controllerPanel">
              Its your turn, the world is counting on you. You have{' '}
              {this.remainingMoves} moves left. Choose carefully.
            </p>
          </div>
        ) : (
          <div className="controllerBookend">
            <p className="controllerPanel">
              Its not your turn, be a good teammate
            </p>
          </div>
        )}

        <div className="controllerMiddle">
          <div className="cardContainer">
            {/* Render the neighboring cities onto the controller */}
            {this.state.playerCityNeighbors.map((elem, idx) => {
              return (
                <div key={idx}>
                  <button
                    className="playerCard"
                    onClick={() => {
                      this.goToNeighbor(elem)
                    }}
                  >
                    <a>{elem}</a>
                    <a>Card Image</a>
                    <a>
                      <b>Move one Space to this City</b>
                    </a>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="cardContainer" />
          <div className="cardContainer" />
        </div>

        <div className="controllerBookend">
          <button
            className="controllerPanel"
            onClick={() => {
              this.buildResearchStation(this.state.playerCity)
            }}
          >
            {' '}
            MOVE/ go to Paris
          </button>
          <button
            className="controllerPanel"
            onClick={() => {
              this.goToShanghai()
            }}
          >
            {' '}
            HAND/ go to Shanghai
          </button>
          <button
            className="controllerPanel"
            onClick={() => {
              this.goToAtlanta()
            }}
          >
            {' '}
            BUILD/ go to Atlanta
          </button>
          <button
            className="controllerPanel"
            onClick={() => {
              this.goToBogota()
            }}
          >
            {' '}
            CURE/ go to Bogota
          </button>
          <button className="controllerPanel"> EVENT</button>
          <button className="controllerPanel"> SPECIALS</button>
        </div>
      </div>
    )
  }
}

export default Controller
