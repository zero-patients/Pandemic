/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../../server/db'
import Header from './Header'
import Footer from './Footer'

const CURRENT_GAME = 'YzQ0qR6LZ7gxd8E03k1l'

class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerCity: '',
      playerCityNeighbors: [],
      researchStations: [],
      infectionDeck: [],
      infectionDiscard: []
    }

    this.game = db.collection('rooms').doc(CURRENT_GAME)
    this.userId = props.match.params.userId
    this.playerId = `player${this.userId}`

    this.isTurn = true
    this.remainingMoves = 4
    this.currentView = 'move'
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

  drawInfectionCard = async () => {
    // console.log('Draw a card')
    const [card] = this.state.infectionDeck.slice(-1)
    // console.log(card)
    // console.log('Discards : ', ...this.state.infectionDiscard)
    await this.game.set(
      {
        infectionDiscard: [...this.state.infectionDiscard, card],
        infectionDeck: [...this.state.infectionDeck.slice(0, -1)]
      },
      {merge: true}
    )
  }
  componentDidMount() {
    this.game.onSnapshot(async doc => {
      const data = await doc.data()
      // console.log(data)
      let playerInfo = data[`${this.playerId}Info`]
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      let playerCityNeighbors = playerCityInfo.neighbors
      let researchStations = data.researchStations
      let neighborCardColors = playerCityNeighbors.map(elem => {
        if (data.cities[elem].color === 'black') {
          return 'grey'
        } else if (data.cities[elem].color === 'darkgoldenrod') {
          return 'yellow'
        } else {
          return data.cities[elem].color
        }
      })
      let researchStationCardColors = researchStations.map(elem => {
        if (data.cities[elem].color === 'black') {
          return 'grey'
        } else if (data.cities[elem].color === 'darkgoldenrod') {
          return 'yellow'
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
        infectionDeck: data.infectionDeck,
        infectionDiscard: data.infectionDiscard
      })
      console.log('state', this.state)
    })
  }
  render() {
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
                    style={{backgroundColor: color, borderRadius: '5%'}}
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
                        style={{backgroundColor: color, borderRadius: '5%'}}
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
          <button
            className="controllerPanel"
            onClick={this.drawInfectionCard}
            disabled={this.state.infectionDeck.length === 0}
          >
            Draw Card
          </button>
        </div>
      </div>
    )
  }
}

export default MainView
