import React from 'react'

const InfectionCard = props => {
  let styles = {
    position: 'absolute',
    top: `${props.top}px`,
    left: `${props.left}px`,
    // background: 'red',
    // border: '2px solid purple',
    // textAlign: 'center',
    width: '250px',
    height: '200px'
  }

  let imgWidth = {
    width: '100%',
    margin: '0px',
    padding: '0px'
  }

  let cityStyles = {
    backgroundColor: 'whitesmoke',
    padding: '10px'
  }

  return props.left === 1200 ? (
    <img src="/playingCardRed.jpg" style={styles} />
  ) : (
    <div className="polaroid" style={styles}>
      <img src="/light.jpg" alt="Norway" style={imgWidth} />
    </div>
  )
}

export default InfectionCard
