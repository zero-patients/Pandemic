/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import db from '../../../server/db'
import {Header} from './Header'
import {Footer} from './Footer'
import {MoveView} from './MoveView'
import {PlayerHand} from './PlayerHand'
import {addInfection} from '../../funcs/utils'
import {Rules} from './Rules'
import CURRENT_GAME from '../../../secrets'

class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
      currentView: 'hand',
      infectionStatus: {},
      showRules: false
    }

    this.game = db.collection('rooms').doc(CURRENT_GAME)
    this.userId = props.match.params.userId
    this.playerId = `player${this.userId}`

    this.isTurn = true
    this.remainingMoves = 4
    this.buildResearchStation = this.buildResearchStation.bind(this)
    this.drawInfectionCard = this.drawInfectionCard.bind(this)
    this.goToCity = this.goToCity.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
    this.toggleRules = this.toggleRules.bind(this)
    this.drawPlayerCard = this.drawPlayerCard.bind(this)
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

  drawPlayerCard = async () => {
    const [card] = this.state.playerDeck.slice(-1)

    await this.game.set(
      {
        [`${this.playerId}Info`]: {hand: [...this.state.playerHand, card]},
        playerDeck: [...this.state.playerDeck.slice(0, -1)]
      },
      {merge: true}
    )
  }

  drawInfectionCard = async () => {
    // blue yellow, black red
    const [card] = this.state.infectionDeck.slice(-1)
    const city = card.replace(/ /g, '-')
    const docRef = await this.game.get()
    let {
      cities: {[city]: {diseases, color}},
      infectionStatus
    } = await docRef.data()
    color = color === 'darkgoldenrod' ? 'yellow' : color
    // infectionStatus[color].count++

    addInfection(city, color, diseases, infectionStatus)

    await this.game.set(
      {
        infectionDiscard: [...this.state.infectionDiscard, card],
        infectionDeck: [...this.state.infectionDeck.slice(0, -1)]
        // infectionStatus
      },
      {merge: true}
    )
  }

  componentDidMount() {
    this.game.onSnapshot(async doc => {
      const data = await doc.data()
      const citiesData = data.cities
      let playerInfo = data[`${this.playerId}Info`]
      let playerHand = playerInfo.hand
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      console.log('playerCityInfop', playerCityInfo)
      let playerDeck = data.playerDeck
      console.log('playerDeck', playerDeck)
      console.log('playerHand', playerHand)
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

      this.setState({
        playerId: `${this.playerId}Info`,
        ...playerInfo,
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
        infectionStatus: infectionStatus
      })
    })
  }

  handleViewChange = newView => {
    this.setState({
      currentView: newView
    })
  }

  render() {
    return (
      <div>
        {this.state.showRules ? (
          <Rules
            show={this.show}
            open={this.state.showRules}
            onClose={this.close}
          />
        ) : null}
        <div id="controller" className={this.playerId}>
          <Header
            className="controllerBookend"
            isTurn={this.isTurn}
            remainingMoves={this.remainingMoves}
            playerId={this.playerId}
            toggle={this.toggleRules}
          />

          {this.state.currentView === 'move' && (
            <MoveView state={this.state} goToCity={this.goToCity} />
          )}

          {this.state.currentView === 'hand' && (
            <div className="controllerMiddle">VIEW IS HAND</div>
          )}
          {this.state.currentView === 'event' && (
            <div className="controllerMiddle">YOUR EVENTS</div>
          )}
          {this.state.currentView === 'special' && (
            <div className="controllerMiddle">SPECIAL MOVES</div>
          )}

          <Footer
            playerCity={this.state.playerCity}
            buildResearchStation={this.buildResearchStation}
            drawInfectionCard={this.drawInfectionCard}
            infectionDeck={this.state.infectionDeck}
            onClick={this.handleViewChange}
            //temporary
            color={this.state.playerCityInfo.color}
            count={this.state.playerCityInfo.diseases}
            infectionStatus={this.state.infectionStatus}
          />
        </div>
      </div>
    )
  }
}

export default MainView
