/* eslint-disable complexity */
/* eslint-disable max-statements */
import React from 'react'
import worldMap from './map.js'
import mapDetails from './mapDetails'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    console.log(canvas.style)
    console.log(worldMap)
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
    let sFGColor = oSettings.fgcolor || '#fffaf0'
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
        Draw(sCountry, oSettings.detail[sCountry])
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
        if (bIE == true) {
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

    const centerX = Math.floor(height / 2)
    const centerY = Math.floor(width / 2)
    const radius = 10

    //  Blue Player
    oCTX.beginPath()
    oCTX.arc(centerX + 800, centerY - 500, radius, 0, 2 * Math.PI)
    oCTX.fillStyle = 'royalblue'
    oCTX.fill()
    oCTX.lineWidth = 3
    oCTX.strokeStyle = 'black'
    oCTX.stroke()

    //  Yellow Player
    oCTX.beginPath()
    oCTX.arc(centerX - 200, centerY - 500, radius, 0, 2 * Math.PI)
    oCTX.fillStyle = 'gold'
    oCTX.fill()
    oCTX.lineWidth = 3
    oCTX.strokeStyle = 'black'
    oCTX.stroke()

    //  Red Player
    oCTX.beginPath()
    oCTX.arc(centerX + 550, centerY - 250, radius, 0, 2 * Math.PI)
    oCTX.fillStyle = 'crimson'
    oCTX.fill()
    oCTX.lineWidth = 3
    oCTX.strokeStyle = 'black'
    oCTX.stroke()

    //  Green Player
    oCTX.beginPath()
    oCTX.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    oCTX.fillStyle = 'green'
    oCTX.fill()
    oCTX.lineWidth = 3
    oCTX.strokeStyle = 'black'
    oCTX.stroke()
  }

  render() {
    // WorldMap({id: 'board', padding: 0})/
    return (
      <canvas
        id="board"
        className="board"
        ref={this.canvasRef}
        width={1920}
        height={1080}
      />
    )
  }
}

export default Board
