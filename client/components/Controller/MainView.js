import React, {Component} from 'react'
import db from '../../../server/db'
import {Header} from './Header'
import {Footer} from './Footer'
import {MoveView} from './MoveView'
import {PlayerHand} from './PlayerHand'
import {Rules} from './Rules'
import CURRENT_GAME from '../../../secrets'
import {
  shuffle,
  addEpidemics,
  addInfection,
  resetDidOutbreak,
  updateBoardStatus
} from '../../funcs/utils' //updateActions
import {TreatView} from './TreatView'
import {Modal, Button, Header as SemanticHeader} from 'semantic-ui-react'

class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerInfo: {},
      playerId: 0,
      playerCity: '',
      playerCityInfo: {},
      // playerCityNeighbors: [],
      playerHand: [],
      playerDeck: [],
      playerDiscard: [],
      researchStations: [],
      infectionDeck: [],
      // infectionDiscard: [],
      currentView: 'hand',
      infectionStatus: {},
      // gameStarted: false,
      outbreakTracker: 0,
      // cities: [],
      epidemicInfection: false,
      epidemicCity: '',
      showRules: false
    }

    this.game = db.collection('rooms').doc(CURRENT_GAME)
    this.userId = props.match.params.userId
    this.playerId = `player${this.userId}`
    this.specificPlayer = `player${this.userId}Info`
    // this.turnShouldChange = this.turnShouldChange.bind(this)
    this.buildResearchStation = this.buildResearchStation.bind(this)
    this.drawInfectionCard = this.drawInfectionCard.bind(this)
    this.goToCity = this.goToCity.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
    this.toggleRules = this.toggleRules.bind(this)
    this.drawPlayerCard = this.drawPlayerCard.bind(this)
    this.updateActions = this.updateActions.bind(this)
  }

  initializeGame = async () => {
    const game = await this.game.get()
    const gameData = game.data()

    const shuffledPlayerDeck = shuffle(this.state.playerDeck)
    const shuffledInfectionDeck = shuffle(this.state.infectionDeck)

    this.game.set({gameStarted: true}, {merge: true})

    for (let i = 0; i < 8; i++) {
      const playerInfo = await gameData[`player${i % 4 + 1}Info`]
      const card = shuffledPlayerDeck.pop()
      const hand = await playerInfo.hand
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

  close = () =>
    this.setState({
      showRules: false,
      epidemicInfection: false,
      epidemicCity: ''
    })

  goToCity = async city => {
    await this.game.set(
      {
        [`${this.playerId}Info`]: {
          location: city
          // actions: this.state.playerInfo.actions - 1
        }
      },
      {merge: true}
    )
    // this.turnShouldChange(this.state.playerInfo, `${this.state.playerId}`)
    this.updateActions(`${this.playerId}Info`)
  }

  buildResearchStation = async city => {
    if (
      !this.state.researchStations.includes(city) &&
      this.state.researchStations.length < 6
    ) {
      await this.game.set(
        {
          researchStations: [...this.state.researchStations, city],
          [`${this.playerId}Info`]: {
            actions: this.state.playerInfo.actions - 1
          }
        },
        {merge: true}
      )
    }
    if (
      !this.state.researchStations.includes(city) &&
      this.state.researchStations.length > 5
    ) {
      const temp = this.state.researchStations
      temp.shift()
      await this.game.set(
        {
          researchStations: [...temp, city],
          [`${this.playerId}Info`]: {
            actions: this.state.playerInfo.actions - 1
          }
        },
        {merge: true}
      )
    }
    // this.turnShouldChange(this.state.playerInfo, `${this.state.playerId}`)
    this.updateActions(`${this.playerId}Info`)
  }

  drawPlayerCard = async () => {
    const [card] = this.state.playerDeck.slice(-1)

    if (card !== undefined) {
      if (card.name.toLowerCase() === 'epidemic') this.executeEpidemic()

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
    //  Get data from database
    const docRef = await this.game.get()
    const dbData = await docRef.data()
    //  Get relevant cards
    const {infectionDeck, infectionDiscard, cities} = dbData
    const [topCard] = infectionDeck.slice(-1)

    await this.game.set(
      {
        infectionDeck: [...infectionDeck.slice(0, -1)],
        infectionDiscard: [...infectionDiscard, topCard]
      },
      {merge: true}
    )

    addInfection(topCard, cities[topCard].color)
  }

  executeEpidemic = async () => {
    await this.increaseInfectionRate()
    const bottomCard = await this.drawBottomInfectionCard()
    await this.createEpidemic(bottomCard)
    await this.intensifyEpidemic()
  }

  getFirestoreData = async () => {
    const docRef = await this.game.get()
    const dbData = await docRef.data()

    return dbData
  }

  increaseInfectionRate = async () => {
    const docRef = await this.game.get()
    const dbData = await docRef.data()
    let infectionIdx = dbData.infectionIdx
    infectionIdx++

    if (infectionIdx < 6) {
      await this.game.set(
        {
          infectionIdx
        },
        {merge: true}
      )
    }
  }

  drawBottomInfectionCard = async () => {
    const docRef = await this.game.get()
    const dbData = await docRef.data()
    const {infectionDeck, infectionDiscard} = dbData

    const [bottomCard] = infectionDeck.slice(0, 1)
    await this.game.set(
      {
        infectionDeck: [...infectionDeck.slice(1)],
        infectionDiscard: [...infectionDiscard, bottomCard]
      },
      {merge: true}
    )

    return bottomCard
  }

  createEpidemic = async cityName => {
    const colorIndexes = {
      blue: 0,
      yellow: 1,
      darkgoldenrod: 1,
      black: 2,
      red: 3
    }
    const docRef = await this.game.get()
    const dbData = await docRef.data()
    const {cities} = dbData
    const {color, diseases} = cities[cityName]

    if (diseases[colorIndexes[color]] > 0) {
      diseases[colorIndexes[color]] = 3
      await this.game.set(
        {
          cities: {
            [cityName]: {
              diseases
            }
          }
        },
        {merge: true}
      )
      await addInfection(cityName, color)
    } else {
      diseases[colorIndexes[color]] = 3
      await this.game.set(
        {
          cities: {
            [cityName]: {
              diseases
            }
          }
        },
        {merge: true}
      )
    }
  }

  intensifyEpidemic = async () => {
    const docRef = await this.game.get()
    const dbData = await docRef.data()
    const {infectionDeck, infectionDiscard} = dbData

    const shuffledDiscards = shuffle(infectionDiscard)

    await this.game.set(
      {
        infectionDeck: [...infectionDeck, ...shuffledDiscards],
        infectionDiscard: []
      },
      {merge: true}
    )
  }

  turnShouldChange = async playerObj => {
    let remainingActions = playerObj.actions
    let turn = playerObj.isTurn

    if (remainingActions === 1 && turn === true) {
      await this.drawInfectionCard()
      await this.drawInfectionCard()
      await this.drawPlayerCard()
      await this.drawPlayerCard()
    }
  }

  updateActions = async player => {
    const docRef = await this.game.get()
    const data = await docRef.data()

    const whoIsNext = {
      player1Info: 'player2Info',
      player2Info: 'player3Info',
      player3Info: 'player4Info',
      player4Info: 'player1Info'
    }

    const currentPlayerInfo = data[player]
    const nextPlayer = whoIsNext[player]
    const nextPlayerInfo = data[nextPlayer]

    if (currentPlayerInfo.actions > 1 && currentPlayerInfo.isTurn === true) {
      currentPlayerInfo.actions--
      await this.game.set(
        {
          [player]: currentPlayerInfo
        },
        {merge: true}
      )
    } else if (
      currentPlayerInfo.actions <= 1 &&
      currentPlayerInfo.isTurn === true
    ) {
      currentPlayerInfo.actions = 0
      currentPlayerInfo.isTurn = false
      nextPlayerInfo.actions = 4
      nextPlayerInfo.isTurn = true

      await this.game.set(
        {
          [player]: currentPlayerInfo,
          [nextPlayer]: nextPlayerInfo
        },
        {merge: true}
      )

      await this.drawPlayerCard()
      await this.drawPlayerCard()
      await this.drawInfectionCard()
      await this.drawInfectionCard()

      await resetDidOutbreak()
      await updateBoardStatus()
    }
  }

  componentDidMount() {
    let container = document.getElementById('container')

    function openFullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if (container.mozRequestFullScreen) {
        /* Firefox */
        container.mozRequestFullScreen()
      } else if (container.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        container.webkitRequestFullscreen()
      } else if (container.msRequestFullscreen) {
        /* IE/Edge */
        container.msRequestFullscreen()
      } else {
        // Do nothing
      }
    }

    openFullscreen()

    let lockOrientationUniversal = arg => {
      if (screen.lockOrientation) {
        screen.lockOrientation(arg)
      }

      if (screen.mozLockOrientation) {
        screen.mozLockOrientation(arg)
      }

      if (screen.msLockOrientation) {
        screen.msLockOrientation(arg)
      }

      if (screen.orientation.lock) {
        screen.orientation.lock(arg)
      }
    }

    lockOrientationUniversal('landscape')

    this.game.onSnapshot(async doc => {
      const data = await doc.data()
      let playerInfo = data[`${this.playerId}Info`]
      let playerHand = playerInfo.hand
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      let playerDeck = data.playerDeck
      let playerDiscard = data.playerDiscard
      let playerCityNeighbors = playerCityInfo.neighbors
      let researchStations = data.researchStations

      playerCityNeighbors.map(elem => {
        if (data.cities[elem].color === 'black') {
          return 'grey'
        } else if (data.cities[elem].color === 'darkgoldenrod') {
          return 'yellow'
        } else {
          return data.cities[elem].color
        }
      })

      researchStations.map(elem => {
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
        playerId: `${this.playerId}Info`,
        playerCity: playerCity,
        playerCityInfo: playerCityInfo,
        playerHand: playerHand,
        playerDeck: playerDeck,
        playerDiscard: playerDiscard,
        researchStations: researchStations,
        infectionDeck: data.infectionDeck,
        infectionStatus: infectionStatus,
        outbreakTracker: outbreakTracker
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
      <div id="container">
        {this.state.showRules ? (
          <Rules
            show={this.show}
            open={this.state.showRules}
            onClose={this.close}
          />
        ) : null}
        {this.state.epidemicInfection ? (
          <Modal
            dimmer="blurring"
            open={this.state.epidemicInfection}
            onClose={this.close}
          >
            <Modal.Actions>
              <Button icon="close" />
            </Modal.Actions>
            <Modal.Header>Epidemic Infection</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <SemanticHeader>
                  A city from the deck has been infected.
                </SemanticHeader>
                <ul>
                  <li>
                    The infection level of{' '}
                    <span style={{fontWeight: 'bold'}}>
                      {this.state.epidemicCity}
                    </span>{' '}
                    has been set to the maximum level.
                  </li>
                  <li>The infection tracker has been increased</li>
                  <li>
                    The infection discard pile is being shuffled and added back
                    to the infection deck
                  </li>
                </ul>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        ) : null}
        <div id="controller" className={this.playerId}>
          <Header
            className="controllerBookend"
            isTurn={this.state.playerInfo.isTurn}
            remainingMoves={this.state.playerInfo.actions}
            color={this.state.playerInfo.fillStyle}
            toggle={this.toggleRules}
          />

          {this.state.currentView === 'move' && (
            <MoveView
              isTurn={this.state.playerInfo.isTurn}
              state={this.state}
              goToCity={this.goToCity}
              actions={this.state.playerInfo.actions}
            />
          )}

          {this.state.currentView === 'hand' && (
            <PlayerHand
              playerHand={this.state.playerHand}
              playerId={this.state.playerId}
              playerDiscard={this.state.playerDiscard}
            />
          )}
          {this.state.currentView === 'treat' && (
            <TreatView
              playerCityInfo={this.state.playerCityInfo}
              playerCity={this.state.playerCity}
              count={this.state.playerCityInfo.diseases}
              infectionStatus={this.state.infectionStatus}
              playerInfo={this.state.playerInfo}
              playerId={this.state.playerId}
              updateActions={this.updateActions}
            />
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
            color={this.state.playerCityInfo.color}
            count={this.state.playerCityInfo.diseases}
            infectionStatus={this.state.infectionStatus}
            outbreakTracker={this.state.outbreakTracker}
            playerId={this.state.playerId}
            playerHand={this.state.playerHand}
            drawPlayerCard={this.drawPlayerCard}
            playerDiscard={this.state.playerDiscard}
            actions={this.state.playerInfo.actions}
            isTurn={this.state.playerInfo.isTurn}
          />
        </div>
      </div>
    )
  }
}

export default MainView
