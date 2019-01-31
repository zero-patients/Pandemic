/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../../server/db'
import {Header} from './Header'
import {Footer} from './Footer'

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
    })
  }
  render() {
    return (
      <div id="controller" className={this.playerId}>
        <Header
          className="controllerBookend"
          isTurn={this.isTurn}
          remainingMoves={this.remainingMoves}
        />

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

        <Footer
          playerCity={this.state.playerCity}
          buildResearchStation={this.buildResearchStation}
          drawInfectionCard={this.drawInfectionCard}
          infectionDeck={this.state.infectionDeck}
        />
      </div>
    )
  }
}

export default MainView
