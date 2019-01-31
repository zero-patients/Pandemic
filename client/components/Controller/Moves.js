import React from 'react'

export const Moves = props => {
  return (
    <button
      style={{backgroundColor: props.color, borderRadius: '5%'}}
      className="playerCard"
      onClick={() => {
        props.move(props.elem)
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
