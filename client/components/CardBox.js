import React from 'react'

const CardBox = props => {
  let styles = {
    position: 'absolute',
    top: `${props.top}px`,
    left: `${props.left}px`,
    // background: 'red',
    // border: '2px solid purple',
    // textAlign: 'center',
    width: '252px',
    height: '202px'
  }

  return (
    <div className={props.outline} style={styles}>
      {props.children}
    </div>
  )
}

export default CardBox
