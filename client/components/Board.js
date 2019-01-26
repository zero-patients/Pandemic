import React from 'react'
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
    // console.log('Component mounted')
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    // console.log(width, height)
    ctx.save()
    ctx.beginPath()
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    ctx.translate(width / 2, height / 2)
    ctx.rotate(0 * Math.PI / 180)
    ctx.fillStyle = '#4397AC'
    ctx.fillRect(10, 10, 100, 100)
    ctx.restore()
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
