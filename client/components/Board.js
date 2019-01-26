/* eslint-disable complexity */
/* eslint-disable max-statements */
import React from 'react'
import worldMap from './map.js'
// import WorldMap from '../../public/worldmap'

// const Board = () => {
//   // WorldMap({id: 'board', padding: 0})
//   const map = WorldMap({id: 'worldmap', padding: 0})
//   return (
//     <canvas
//       ref="canvas"
//       id="worldmap"
//       className="board"
//       width={1920}
//       height={1080}
//       onLoad={() => {
//         console.log(map)
//         WorldMap({
//           id: 'worldmap',
//           padding: 10
//         })
//         console.log('Executed map function')
//       }}
//     />
//   )
// }

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
    const sBorderColor = '#cdc9c9'
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    // console.log(width, height)
    // ctx.save()
    // ctx.beginPath()
    // ctx.clearRect(0, 0, width, height)
    // ctx.lineWidth = 1
    // ctx.translate(width / 2, height / 2)
    // ctx.rotate(0 * Math.PI / 180)
    // ctx.fillStyle = '#4397AC'
    // ctx.fillRect(10, 10, 100, 100)
    // ctx.restore()
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    const sZoom = 'ca,cl,us,ru'
    let iOffsetX = 0
    let iOffsetY = 0
    const aZoom = sZoom.split(',')
    let iMinX = worldMap[aZoom[0]][0][0][0]
    let iMaxX = worldMap[aZoom[0]][0][0][0]
    let iMinY = worldMap[aZoom[0]][0][0][1]
    let iMaxY = worldMap[aZoom[0]][0][0][1]

    for (let iCountry = 0; iCountry < aZoom.length; iCountry++) {
      for (let iPath = 0; iPath < worldMap[aZoom[iCountry]].length; iPath++) {
        for (
          let iCoord = 0;
          iCoord < worldMap[aZoom[iCountry]][iPath].length;
          iCoord++
        ) {
          iMinX = Math.min(iMinX, worldMap[aZoom[iCountry]][iPath][iCoord][0])
          iMaxX = Math.max(iMaxX, worldMap[aZoom[iCountry]][iPath][iCoord][0])
          iMinY = Math.min(iMinY, worldMap[aZoom[iCountry]][iPath][iCoord][1])
          iMaxY = Math.max(iMaxY, worldMap[aZoom[iCountry]][iPath][iCoord][1])
        }
      }
    }

    const iRatio = Math.min(
      (width - padding) / (iMaxX - iMinX),
      (height - padding) / (iMaxY = iMinY)
    )

    let iMidX = iMinX + (iMaxX - iMinX) / 2
    let iMidY = iMinY + (iMaxY - iMinY) / 2
    iOffsetX = iMidX * iRatio - width / 2
    iOffsetY = iMidY * iRatio - height / 2

    const Draw = (sCountry, sColor) => {
      const oCTX = ctx
      oCTX.fillStyle = sColor
      oCTX.strokeStyle = sBorderColor
      oCTX.beginPath()

      // loop through paths
      let bIE = navigator.userAgent.indexOf('MSIE') > -1
      for (let iPath = 0; iPath < worldMap[sCountry].length; iPath++) {
        oCTX.moveTo(
          worldMap[sCountry][iPath][0][0] * iRatio - iOffsetX,
          worldMap[sCountry][iPath][0][1] * iRatio - iOffsetY
        )
        for (
          let iCoord = 1;
          iCoord < worldMap[sCountry][iPath].length;
          iCoord++
        ) {
          oCTX.lineTo(
            worldMap[sCountry][iPath][iCoord][0] * iRatio - iOffsetX,
            worldMap[sCountry][iPath][iCoord][1] * iRatio - iOffsetY
          )
        }
        oCTX.closePath()
        oCTX.fill()

        // IE, again...
        if (bIE === true) {
          oCTX.beginPath()
          oCTX.moveTo(
            worldMap[sCountry][iPath][0][0] * iRatio - iOffsetX,
            worldMap[sCountry][iPath][0][1] * iRatio - iOffsetY
          )
          for (
            let iCoord = 1;
            iCoord < worldMap[sCountry][iPath].length;
            iCoord++
          ) {
            oCTX.lineTo(
              worldMap[sCountry][iPath][iCoord][0] * iRatio - iOffsetX,
              worldMap[sCountry][iPath][iCoord][1] * iRatio - iOffsetY
            )
          }
          oCTX.closePath()
        }
        oCTX.stroke()
      }

      // awful hack for Lesotho / South Africa (draw Lesotho again, kids!)
      if (sCountry === 'za') {
        // choose colour
        // if (oSettings.detail.ls) {
        //   oCTX.fillStyle = oSettings.detail.ls
        // } else {
        //   oCTX.fillStyle = sFGColor
        // }

        // loop through paths
        oCTX.beginPath()
        for (var iPath = 0; iPath < worldMap.ls.length; iPath++) {
          oCTX.moveTo(
            worldMap.ls[iPath][0][0] * iRatio - iOffsetX,
            worldMap.ls[iPath][0][1] * iRatio - iOffsetY
          )
          for (let iCoord = 1; iCoord < worldMap.ls[iPath].length; iCoord++) {
            oCTX.lineTo(
              worldMap.ls[iPath][iCoord][0] * iRatio - iOffsetX,
              worldMap.ls[iPath][iCoord][1] * iRatio - iOffsetY
            )
          }
          oCTX.closePath()
          oCTX.fill()
          oCTX.stroke()
        }
      }
    }

    for (let country in worldMap) {
      if (worldMap.hasOwnProperty(country)) {
        Draw(country, canvas.style.color)
      }
    }
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
