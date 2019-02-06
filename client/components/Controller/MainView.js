/* eslint-disable react/no-unused-state */
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
import {shuffle, addEpidemics} from '../../funcs/utils'
import OutbreakTracker from '../OutbreakTracker'
import {TreatView} from './TreatView'
import {Modal, Button} from 'semantic-ui-react'
import {Header as SemanticHeader} from 'semantic-ui-react'

class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerInfo: {},
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
      gameStarted: false,
      outbreakTracker: 0,
      cities: [],
      epidemicInfection: false,
      epidemicCity: '',
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
      console.log(playerInfo)
      const card = shuffledPlayerDeck.pop()
      const hand = await playerInfo.hand
      console.log(hand)
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
          location: city,
          actions: this.state.playerInfo.actions - 1
        }
      },
      {merge: true}
    )
    this.turnShouldChange(this.state.playerInfo, `${this.state.playerId}`)
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
    this.turnShouldChange(this.state.playerInfo, `${this.state.playerId}`)
  }

  drawPlayerCard = async () => {
    const [card] = this.state.playerDeck.slice(-1)

    if (card !== undefined) {
      if (card.toLowerCase() === 'epidemic') this.executeEpidemic()

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

  // drawInfectionCard = async () => {
  //   // blue, yellow, black red
  //   const colorIndexes = {
  //     blue: 0,
  //     yellow: 1,
  //     darkgoldenrod: 1,
  //     black: 2,
  //     red: 3
  //   }
  //   const [topCard] = this.state.infectionDeck.slice(-1)
  //   const [bottomCard] = this.state.infectionDeck.slice(0, 1)
  //   const topCardCity = topCard.replace(/ /g, '-')
  //   const bottomCardCity = bottomCard.replace(/ /g, '-')
  //   const docRef = await this.game.get()

  //   console.log(`Top City => ${topCardCity}\tBottom City => ${bottomCardCity}`)

  //   if (topCardCity.toLowerCase().trim() === 'epidemic') {
  //     let {
  //       cities: {[bottomCardCity]: {diseases, color}},
  //       infectionStatus,
  //       outbreakTracker,
  //       infectionIdx
  //     } = await docRef.data()

  //     if (infectionIdx < 6) {
  //       diseases[colorIndexes[color]] = 3
  //       // console.log('The bottom card is', bottomCard)
  //       await this.game.set(
  //         {
  //           infectionIdx: infectionIdx + 1,
  //           infectionDiscard: [...this.state.infectionDiscard, bottomCard],
  //           infectionDeck: [...this.state.infectionDeck.slice(1)],
  //           cities: {[bottomCardCity]: {diseases}}
  //         },
  //         {merge: true}
  //       )
  //       await this.setState(prevState => ({
  //         //   infectionDiscard: [...prevState.infectionDiscard, bottomCard],
  //         //   infectionDeck: [...prevState.infectionDeck.slice(1)],
  //         epidemicInfection: true,
  //         epidemicCity: bottomCardCity
  //       }))
  //     }
  //   } else {
  //     let {
  //       cities: {[topCardCity]: {diseases, color}},
  //       infectionStatus,
  //       outbreakTracker,
  //       infectionIdx
  //     } = await docRef.data()

  //     color = color === 'darkgoldenrod' ? 'yellow' : color
  //     addInfection(
  //       topCardCity,
  //       color,
  //       diseases,
  //       infectionStatus,
  //       outbreakTracker
  //     )
  //   }

  //   await this.game.set(
  //     {
  //       infectionDiscard: [...this.state.infectionDiscard, topCard],
  //       infectionDeck: [...this.state.infectionDeck.slice(0, -1)]
  //     },
  //     {merge: true}
  //   )
  // }

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
    const dbData = await this.getFirestoreData()
    const {infectionIdx} = dbData

    if (infectionIdx < 6) {
      await this.game.set({infectionIdx: infectionIdx + 1})
    }
  }

  drawBottomInfectionCard = async () => {
    const dbData = await this.getFirestoreData()
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
    const dbData = await this.getFirestoreData()
    const {cities} = dbData
    const {color, diseases} = cities[cityName]

    diseases[colorIndexes[color]] = 3
    addInfection(cityName, color)

    // await this.game.set(
    //   {
    //     cities: {
    //       [cityName]: {
    //         diseases
    //       },
    //       didOutbreak: true
    //     }
    //   },
    //   {merge: true}
    // )
  }

  intensifyEpidemic = async () => {
    const dbData = await this.getFirestoreData()
    const {infectionDeck, infectionDiscard} = dbData

    const shuffledDiscards = shuffle(infectionDiscard)

    await this.game.set({
      infectionDeck: [...infectionDeck, ...shuffledDiscards],
      infectionDiscard: []
    })
  }

  turnShouldChange = async (playerObj, playerName) => {
    console.log('got to turnShouldChange,')
    //assume currPlayer is the db object player1Info{}
    let remainingActions = playerObj.actions
    let turn = playerObj.isTurn
    console.log(remainingActions, turn, 'remaining actions and turn ')
    const turnCounter = this.state.turnCounter
    const nextPlayer = turnCounter.players[turnCounter.currentTurn + 1 % 4]

    if (remainingActions === 1 && turn === true) {
      console.log('got here')
      this.drawInfectionCard()
      this.drawInfectionCard()
      this.drawPlayerCard()
      this.drawPlayerCard()
      this.game.set(
        {
          [playerName]: {
            isTurn: false
          },
          [nextPlayer]: {
            isTurn: true,
            actions: 4
          }
        },
        {merge: true}
      )

      this.game.set(
        {
          turnCounter: {
            currentTurn: this.game.currentTurn + 1
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
      // console.log(playerHand, 'playerHand')
      let playerCity = playerInfo.location
      let playerCityInfo = data.cities[playerCity]
      let playerDeck = data.playerDeck
      let playerDiscard = data.playerDiscard
      let playerCityNeighbors = playerCityInfo.neighbors
      let researchStations = data.researchStations
      let turnCounter = data.turnCounter
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
        cities,
        turnCounter
      })
      console.log(this.state)
    })
  }

  // componentDidUpdate(prevProps,prevState) {
  //   console.log('got to component did update, but like, actually')
  //   this.game.onSnapshot(async doc => {
  //     const data = await doc.data()
  //     let playerName = `player${this.userId}Info`
  //     let currentPlayer = data[`player${this.userId}Info`]
  //     if (currentPlayer.actions === 0 && currentPlayer.isTurn) {

  //       this.turnShouldChange(currentPlayer, playerName)
  //     }

  //   })
  // }

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
              nextTurn={this.turnShouldChange}
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
            //temporary
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
