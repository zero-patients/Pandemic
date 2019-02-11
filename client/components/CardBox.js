import React from 'react'

const CardBox = props => {
  let styles = {
    position: 'absolute',
    top: `${props.top}px`,
    left: `${props.left}px`,
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
