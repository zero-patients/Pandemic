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
      <a>
        <b>{props.elem}</b>
      </a>
      <img src="/car.png" />
    </button>
  )
}
