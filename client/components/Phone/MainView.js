/* eslint-disable complexity */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../../server/db'
// import {Header} from './Header'
// import {Footer} from './Footer'
import {MoveView} from './MoveView'
import {PlayerHand} from './PlayerHand'
import {Rules} from './Rules'
import CURRENT_GAME from '../../../secrets'
import {shuffle, addEpidemics} from '../../funcs/utils'
// import OutbreakTracker from '../OutbreakTracker'
import {TreatView} from './TreatView'
import {
  addInfection,
  treatInfection,
  researchCure,
  resetDidOutbreak
} from '../../funcs/utils'

class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerInfo: {},
      playerNo: 0,
      playerId: 0,
      playerCity: '',
      playerCityInfo: {},
      playerCityNeighbors: [],
      playerHand: [],
      playerDeck: [],
      playerDiscard: [],
      researchStations: [],
      infectionDeck: [],
      infectionDiscard: [],
      currentView: 'home',
      infectionStatus: {},
      gameStarted: false,
      outbreakTracker: 0,
      cities: [],
      showRules: false
    }

    this.game = db.collection('rooms').doc(CURRENT_GAME)
    this.userId = props.match.params.userId
    this.playerId = `player${this.userId}`
    this.specificPlayer = `player${this.userId}Info`
    this.turnShouldChange = this.turnShouldChange.bind(this)
    this.buildResearchStation = this.buildResearchStation.bind(this)
    this.drawInfectionCard = this.drawInfectionCard.bind(this)
    this.goToCity = this.goToCity.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
    this.toggleRules = this.toggleRules.bind(this)
    this.drawPlayerCard = this.drawPlayerCard.bind(this)
  }

  initializeGame = async () => {
    const game = await this.game.get()
    const gameData = game.data()

    const shuffledPlayerDeck = shuffle(this.state.playerDeck)
    const shuffledInfectionDeck = shuffle(this.state.infectionDeck)

    this.game.set({gameStarted: true}, {merge: true})

    for (let i = 0; i < 8; i++) {
      const playerInfo = await gameData[`player${i % 4 + 1}Info`]
      // console.log(playerInfo)
      const card = shuffledPlayerDeck.pop()
      const hand = await playerInfo.hand
      // console.log(hand)
      await this.game.set(
        {
          [`player${i % 4 + 1}Info`]: {hand: [...hand, card]}
        },
        {merge: true}
      )
    }
    const playerDeck = addEpidemics(shuffledPlayerDeck)

    this.game.set(
      {
        playerDeck: playerDeck,
        infectionDeck: shuffledInfectionDeck,
        gameStarted: true
      },
      {merge: true}
    )
  }

  handleOpen = () => {
    this.setState({showRules: true})
  }

  handleClose = () => {
    this.setState({showRules: false})
  }

  toggleRules = () => {
    const toggle = this.state.showRules
    this.setState({showRules: !toggle})
  }

  show = dimmer => () => this.setState({dimmer, showRules: true})
  close = () => this.setState({showRules: false})

  goToCity = city => {
    this.game.set(
      {
        [`${this.playerId}Info`]: {
          location: city,
          actions: this.state.playerInfo.actions - 1
        }
      },
      {merge: true}
    )
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
    this.game.set(
      {
        [`${this.playerId}Info`]: {
          actions: this.state.playerInfo.actions - 1
        }
      },
      {merge: true}
    )
    this.turnShouldChange(
      this.state.playerInfo,
      `player${this.state.playerId}Info`
    )
  }

  drawPlayerCard = async () => {
    const [card] = this.state.playerDeck.slice(-1)

    if (card !== undefined) {
      await this.game.set(
        {
          [`${this.playerId}Info`]: {hand: [...this.state.playerHand, card]},
          playerDeck: [...this.state.playerDeck.slice(0, -1)]
        },
        {merge: true}
      )
    } else {
      await this.game.set(
        {
          gameStatus: 'lost'
        },
        {merge: true}
      )
    }
  }

  drawInfectionCard = async () => {
    // blue, yellow, black red
    const [card] = this.state.infectionDeck.slice(-1)
    const city = card.replace(/ /g, '-')
    const docRef = await this.game.get()

    if (city.toLowerCase().trim() === 'epidemic') {
      console.log('Epidemic')
      const {infectionIdx} = await docRef.data()
      if (infectionIdx < 6) {
        await this.game.set({infectionIdx: infectionIdx + 1}, {merge: true})
      }
    } else {
      let {
        cities: {[city]: {diseases, color}},
        infectionStatus,
        outbreakTracker
      } = await docRef.data()
      color = color === 'darkgoldenrod' ? 'yellow' : color
      addInfection(city, color, diseases, infectionStatus, outbreakTracker)
    }

    await this.game.set(
      {
        infectionDiscard: [...this.state.infectionDiscard, card],
        infectionDeck: [...this.state.infectionDeck.slice(0, -1)]
      },
      {merge: true}
    )
  }

  turnShouldChange = async (playerObj, playerName) => {
    console.log('got to turnShouldChange,')
    //assume currPlayer is the db object player1Info{}
    let remainingActions = playerObj.actions
    let turn = playerObj.isTurn
    console.log(remainingActions, turn, 'remaining actions and turn ')

    if (remainingActions < 1 && turn === true) {
      await this.drawInfectionCard()
      await this.drawInfectionCard()
      await this.drawPlayerCard()
      await this.drawPlayerCard()
      await this.game.set(
        {
          [playerName]: {
            isTurn: false,
            actions: 4
          }
        },
        {merge: true}
      )
    }
  }

  componentDidMount() {
    this.game.onSnapshot(async doc => {
      const data = await doc.data()
      const {cities} = data.cities
      let playerInfo = data[`${this.playerId}Info`]
      // console.log(playerInfo, 'playerInfo')
      let playerHand = playerInfo.hand
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      let playerDeck = data.playerDeck
      let playerDiscard = data.playerDiscard
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
      let infectionStatus = data.infectionStatus
      let outbreakTracker = data.outbreakTracker

      this.setState({
        playerInfo,
        playerNo: this.playerId,
        playerId: `${this.playerId}Info`,
        playerCity: playerCity,
        playerCityInfo: playerCityInfo,
        playerHand: playerHand,
        playerDeck: playerDeck,
        playerDiscard: playerDiscard,
        playerCityNeighbors: playerCityNeighbors,
        researchStations: researchStations,
        neighborCardColors: neighborCardColors,
        researchStationCardColors: researchStationCardColors,
        infectionDeck: data.infectionDeck,
        infectionDiscard: data.infectionDiscard,
        infectionStatus: infectionStatus,
        outbreakTracker: outbreakTracker,
        cities
      })
    })
  }

  handleViewChange = newView => {
    this.setState({
      currentView: newView
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <button
          onClick={() => {
            this.setState({currentView: 'home'})
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            this.setState({currentView: 'rules'})
          }}
        >
          Rules
        </button>
        {this.state.currentView !== 'rules' ? (
          <div>
            <div>{`Current player: ${this.state.playerNo}`}</div>
            <div>{`Remaining Actions: ${this.state.playerInfo.actions}`}</div>
            <div>{`Current Location: ${this.state.playerCity}`}</div>
          </div>
        ) : null}
        {this.state.currentView === 'home' ? (
          <div>
            <button
              onClick={() => {
                this.setState({currentView: 'hand'})
              }}
            >
              Hand
            </button>
            <button
              onClick={() => {
                this.setState({currentView: 'moves'})
              }}
            >
              Move
            </button>
            <button
              onClick={() => {
                this.setState({currentView: 'treat'})
              }}
            >
              Treat Infection
            </button>
            <button
              onClick={() => {
                researchCure(
                  this.state.playerId,
                  this.state.playerHand,
                  this.state.playerDiscard,
                  this.state.infectionStatus
                )
              }}
              disabled={this.state.infectionDeck.length === 0}
            >
              Research Cure
            </button>
            <button
              onClick={() => {
                this.buildResearchStation(this.state.playerCity)
              }}
            >
              Build
            </button>
            <button
              onClick={() => {
                this.setState({currentView: 'pass'})
              }}
            >
              Pass
            </button>
            <button
              onClick={() => {
                this.setState({currentView: 'info'})
              }}
            >
              Info
            </button>
          </div>
        ) : null}
        {this.state.currentView === 'hand' ? (
          <div>
            <PlayerHand
              playerId={this.state.playerId}
              playerDiscard={this.state.playerDiscard}
              playerHand={this.state.playerHand}
              goToCity={this.goToCity}
            />
            <button
              onClick={() => {
                this.drawPlayerCard()
              }}
            >
              Draw
            </button>
          </div>
        ) : null}
        {this.state.currentView === 'moves' ? (
          <MoveView
            isTurn={this.state.playerInfo.isTurn}
            state={this.state}
            goToCity={this.goToCity}
            actions={this.state.playerInfo.actions}
          />
        ) : null}
        {this.state.currentView === 'treat' ? (
          <TreatView
            playerCityInfo={this.state.playerCityInfo}
            playerCity={this.state.playerCity}
            count={this.state.playerCityInfo.diseases}
            infectionStatus={this.state.infectionStatus}
            playerInfo={this.state.playerInfo}
            playerId={this.state.playerId}
          />
        ) : null}
        {this.state.currentView === 'cure' ? <h1>cure</h1> : null}
        {this.state.currentView === 'build' ? <h1>build</h1> : null}
        {this.state.currentView === 'pass' ? <h1>pass</h1> : null}
        {this.state.currentView === 'rules' ? (
          <Rules
            show={this.show}
            open={this.state.showRules}
            onClose={this.close}
          />
        ) : null}
        {this.state.currentView === 'info' ? <h1>info</h1> : null}
      </div>
    )
  }
}

export default MainView
