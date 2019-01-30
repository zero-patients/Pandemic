/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../server/db'

class Controller extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerCity: '',
      playerCityNeighbors: [],
      researchStations: [],
      infectionDeck: []
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
  goToCity = city => {
    this.game.set({[`${this.playerId}Info`]: {location: city}}, {merge: true})
  }

  buildResearchStation = city => {
    if (
      !this.state.researchStations.includes(city) &&
      this.state.researchStations.length < 6
    ) {
      this.game.set(
        {researchStations: [...this.state.researchStations, city]},
        {merge: true}
      )
    }
    if (
      !this.state.researchStations.includes(city) &&
      this.state.researchStations.length > 5
    ) {
      const temp = this.state.researchStations
      temp.shift()
      this.game.set({researchStations: [...temp, city]}, {merge: true})
    }
  }

  drawInfectionCard = () => {
    console.log('Draw a card')
  }

  componentDidMount() {
    this.game.onSnapshot(async doc => {
      const data = await doc.data()
      console.log(data)
      let playerInfo = data[`${this.playerId}Info`]
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      let playerCityNeighbors = playerCityInfo.neighbors
      let researchStations = data.researchStations
      let neighborCardColors = playerCityNeighbors.map(elem => {
        if (data.cities[elem].color === 'black') {
          return 'grey'
        } else {
          return data.cities[elem].color
        }
      })
      let researchStationCardColors = researchStations.map(elem => {
        if (data.cities[elem].color === 'black') {
          return 'grey'
        } else {
          return data.cities[elem].color
        }
      })

      this.setState({
        ...playerInfo,
        playerCity: playerCity,
        playerCityNeighbors: playerCityNeighbors,
        researchStations: researchStations,
        neighborCardColors: neighborCardColors,
        researchStationCardColors: researchStationCardColors,
        infectionDeck: data.infectionDeck
      })
      console.log('state', this.state)
    })
  }

  render() {
    let styles = {
      backgroundColor: 'lightsalmon'
    }
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
              const color = this.state.neighborCardColors[idx]
              return (
                <div key={idx}>
                  <button
                    style={{backgroundColor: color}}
                    className="playerCard"
                    onClick={() => {
                      this.goToCity(elem)
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

          <div className="cardContainer">
            {/* Render the cities with Research Stations onto the controller */}
            {this.state.researchStations.includes(this.state.playerCity)
              ? this.state.researchStations.map((elem, idx) => {
                  const color = this.state.researchStationCardColors[idx]
                  return (
                    <div key={idx}>
                      <button
                        style={{backgroundColor: color}}
                        className="playerCard"
                        onClick={() => {
                          this.goToCity(elem)
                        }}
                      >
                        <a>{elem}</a>
                        <a>Card Image</a>
                        <a>
                          <b>Move one Space to this Research Station</b>
                        </a>
                      </button>
                    </div>
                  )
                })
              : null}
          </div>

          <div className="cardContainer" />
        </div>

        <div className="controllerBookend">
          <button
            className="controllerPanel"
            onClick={() => {
              this.goToParis()
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
              // this.goToAtlanta()
              this.buildResearchStation(this.state.playerCity)
            }}
          >
            {' '}
            BUILD
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
          <button className="controllerPanel" onClick={this.drawInfectionCard}>
            Draw Card
          </button>
        </div>
      </div>
    )
  }
}

export default Controller
