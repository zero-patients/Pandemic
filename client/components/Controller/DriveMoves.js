import React from 'react'

export const DriveMoves = props => {
  return (
    <button
      style={{backgroundColor: props.color, borderRadius: '5%'}}
      className="playerCard"
      onClick={() => {
        props.goToCity(props.elem)
      }}
    >
      <a>{props.elem}</a>
      <a>Card Image</a>
      <a>
        <b>Move one Space to this City</b>
      </a>
    </button>
  )
}
