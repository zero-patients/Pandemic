/* eslint-disable complexity */
/* eslint-disable max-statements */
import React from 'react'
import worldMap from '../data/map.js'
import mapDetails from '../data/mapDetails'
import PlayerPawn from './PlayerPawn'
import cities from '../data/cities'
import CityMarker from './CityMarker'
import InfectionCardsContainer from './InfectionCardsContainer'
import PlayerCardContainer from './PlayerCardContainer'
import InfectionRate from './InfectionRate'
import OutbreakTracker from './OutbreakTracker'
import StatusBar from './StatusBar'

import db from '../../server/db'
import CURRENT_GAME from '../../secrets'

const locations = Object.keys(cities)

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {showRules: false}
  }

  handleOpen = () => {
    this.setState({showRules: true})
  }

  handleClose = () => {
    this.setState({showRules: false})
  }

  componentDidUpdate() {
    console.log('The board was updated')
    console.log(this.state.showRules)
  }

  show = dimmer => () => this.setState({dimmer, showRules: true})
  close = () => this.setState({showRules: false})

  componentDidMount() {
    const game = db.collection('rooms').doc(CURRENT_GAME)
    game.onSnapshot(async doc => {
      const data = await doc.data()
      this.setState({
        showRules: data.showRules
      })
    })
    console.log('Show Rules is set to: ')
    console.log(this.state.showRules)

    const canvas = this.canvasRef.current

    canvas.style.backgroundColor = '#87cefa'
    canvas.style.color = '#fffaf0'
    const padding = 20
    canvas.style.padding = padding
    // const sBorderColor = '#cdc9c9'
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1

    let oSettings = {}
    oSettings.detail = mapDetails
    let sBGColor = oSettings.bgcolor || '#87cefa'
    let sFGColor = oSettings.fgcolor || '#ccebc5' //'#fffaf0'
    let sBorderColor = oSettings.bordercolor || '#cdc9c9'
    let iPadding = (oSettings.padding || 10) * 2
    let sZoom = oSettings.zoom || 'ca,cl,us,ru'
    let iOffsetX = 0
    let iOffsetY = 0

    let oCanvas = this.canvasRef.current
    let iCanvasWidth = oCanvas.width
    let iCanvasHeight = oCanvas.height
    oCanvas.style.backgroundColor = sBGColor

    // create drawing area
    let oCTX = oCanvas.getContext('2d')
    oCTX.clearRect(0, 0, iCanvasWidth, iCanvasHeight)
    oCTX.lineWidth = oSettings.borderwidth || 1
    const oWorldMap = worldMap

    // calculate zoom: create variables
    let aZoom = sZoom.split(',')
    let iMinX = oWorldMap[aZoom[0]][0][0][0]
    let iMaxX = oWorldMap[aZoom[0]][0][0][0]
    let iMinY = oWorldMap[aZoom[0]][0][0][1]
    let iMaxY = oWorldMap[aZoom[0]][0][0][1]

    // calculate zoom: find map range
    for (let iCountry = 0; iCountry < aZoom.length; iCountry++) {
      for (let iPath = 0; iPath < oWorldMap[aZoom[iCountry]].length; iPath++) {
        for (
          let iCoord = 0;
          iCoord < oWorldMap[aZoom[iCountry]][iPath].length;
          iCoord++
        ) {
          iMinX = Math.min(iMinX, oWorldMap[aZoom[iCountry]][iPath][iCoord][0])
          iMaxX = Math.max(iMaxX, oWorldMap[aZoom[iCountry]][iPath][iCoord][0])
          iMinY = Math.min(iMinY, oWorldMap[aZoom[iCountry]][iPath][iCoord][1])
          iMaxY = Math.max(iMaxY, oWorldMap[aZoom[iCountry]][iPath][iCoord][1])
        }
      }
    }

    // calculate zoom ratio
    let iRatio = Math.min(
      (iCanvasWidth - iPadding) / (iMaxX - iMinX),
      (iCanvasHeight - iPadding) / (iMaxY - iMinY)
    )

    // calculate zoom offsets
    let iMidX = iMinX + (iMaxX - iMinX) / 2
    let iMidY = iMinY + (iMaxY - iMinY) / 2
    iOffsetX = iMidX * iRatio - iCanvasWidth / 2
    iOffsetY = iMidY * iRatio - iCanvasHeight / 2

    // draw "plain" countries
    for (let sCountry in oWorldMap) {
      if (oWorldMap.hasOwnProperty(sCountry)) {
        Draw(sCountry, sFGColor)
      }
    }

    // draw "details" countries
    for (let sCountry in oSettings.detail) {
      if (oWorldMap[sCountry]) {
        // Draw(sCountry, oSettings.detail[sCountry])
      }
    }

    // private draw function
    function Draw(sCountry, sColor) {
      oCTX.fillStyle = sColor
      oCTX.strokeStyle = sBorderColor
      oCTX.beginPath()

      // loop through paths
      let bIE = navigator.userAgent.indexOf('MSIE') > -1
      for (let iPath = 0; iPath < oWorldMap[sCountry].length; iPath++) {
        oCTX.moveTo(
          oWorldMap[sCountry][iPath][0][0] * iRatio - iOffsetX,
          oWorldMap[sCountry][iPath][0][1] * iRatio - iOffsetY
        )
        for (
          let iCoord = 1;
          iCoord < oWorldMap[sCountry][iPath].length;
          iCoord++
        ) {
          oCTX.lineTo(
            oWorldMap[sCountry][iPath][iCoord][0] * iRatio - iOffsetX,
            oWorldMap[sCountry][iPath][iCoord][1] * iRatio - iOffsetY
          )
        }
        oCTX.closePath()
        oCTX.fill()

        // IE, again...
        if (bIE === true) {
          oCTX.beginPath()
          oCTX.moveTo(
            oWorldMap[sCountry][iPath][0][0] * iRatio - iOffsetX,
            oWorldMap[sCountry][iPath][0][1] * iRatio - iOffsetY
          )
          for (
            let iCoord = 1;
            iCoord < oWorldMap[sCountry][iPath].length;
            iCoord++
          ) {
            oCTX.lineTo(
              oWorldMap[sCountry][iPath][iCoord][0] * iRatio - iOffsetX,
              oWorldMap[sCountry][iPath][iCoord][1] * iRatio - iOffsetY
            )
          }
          oCTX.closePath()
        }
        oCTX.stroke()
      }

      // awful hack for Lesotho / South Africa (draw Lesotho again, kids!)
      if (sCountry === 'za') {
        // choose colour
        if (oSettings.detail.ls) {
          oCTX.fillStyle = oSettings.detail.ls
        } else {
          oCTX.fillStyle = sFGColor
        }

        // loop through paths
        oCTX.beginPath()
        for (let iPath = 0; iPath < oWorldMap.ls.length; iPath++) {
          oCTX.moveTo(
            oWorldMap.ls[iPath][0][0] * iRatio - iOffsetX,
            oWorldMap.ls[iPath][0][1] * iRatio - iOffsetY
          )
          for (let iCoord = 1; iCoord < oWorldMap.ls[iPath].length; iCoord++) {
            oCTX.lineTo(
              oWorldMap.ls[iPath][iCoord][0] * iRatio - iOffsetX,
              oWorldMap.ls[iPath][iCoord][1] * iRatio - iOffsetY
            )
          }
          oCTX.closePath()
          oCTX.fill()
          oCTX.stroke()
        }
      }
    }

    ctx.strokeStyle = '#AAA'
    // all but pacific paths
    for (let city in cities) {
      if (cities.hasOwnProperty(city)) {
        cities[city].neighbors.forEach(neighbor => {
          if (
            !(
              (city === 'San-Francisco' && neighbor === 'Tokyo') ||
              (city === 'San-Francisco' && neighbor === 'Manila') ||
              (city === 'Los-Angeles' && neighbor === 'Sydney') ||
              (city === 'Tokyo' && neighbor === 'San-Francisco') ||
              (city === 'Manila' && neighbor === 'San-Francisco') ||
              (city === 'Sydney' && neighbor === 'Los-Angeles')
            )
          ) {
            ctx.beginPath()
            ctx.moveTo(
              cities[city].location[0] + 17,
              cities[city].location[1] + 33
            )
            ctx.lineTo(
              cities[neighbor].location[0] + 17,
              cities[neighbor].location[1] + 33
            )
            ctx.stroke()
          }
        })

        // LA to Sydney
        ctx.beginPath()
        ctx.moveTo(
          cities['Los-Angeles'].location[0] + 17,
          cities['Los-Angeles'].location[1] + 33
        )
        ctx.lineTo(0, 670)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(
          cities.Sydney.location[0] + 17,
          cities.Sydney.location[1] + 33
        )
        ctx.lineTo(1920, 670)
        ctx.stroke()

        // SF to Tokyo
        ctx.beginPath()
        ctx.moveTo(
          cities['San-Francisco'].location[0] + 17,
          cities['San-Francisco'].location[1] + 31
        )
        ctx.lineTo(0, 440)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(cities.Tokyo.location[0] + 17, cities.Tokyo.location[1] + 31)
        ctx.lineTo(1920, 450)
        ctx.stroke()

        // SF to Manila
        ctx.beginPath()
        ctx.moveTo(
          cities['San-Francisco'].location[0] + 17,
          cities['San-Francisco'].location[1] + 31
        )
        ctx.lineTo(0, 550)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(
          cities.Manila.location[0] + 17,
          cities.Manila.location[1] + 31
        )
        ctx.lineTo(1920, 600)
        ctx.stroke()
      }
    }
  }

  render() {
    return (
      <div>
        <canvas
          id="board"
          className="board"
          ref={this.canvasRef}
          width={1916}
          height={1076}
        />
        {locations.map((elem, idx) => {
          return (
            <div key={idx}>
              <CityMarker name={elem} city={cities[elem]} />
            </div>
          )
        })}

        <InfectionCardsContainer top={50} left={1200} />
        <PlayerCardContainer top={850} left={1000} />

        <PlayerPawn player={1} />
        <PlayerPawn player={2} />
        <PlayerPawn player={3} />
        <PlayerPawn player={4} />
        <InfectionRate />
        <OutbreakTracker />
        <StatusBar />
      </div>
    )
  }
}

export default Board
