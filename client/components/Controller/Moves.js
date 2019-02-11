import React from 'react'

export const Moves = props => {
  const text = {
    color: 'white',
    textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
    padding: '3px'
  }
  return (
    <button
      type="button"
      disabled={props.restrict}
      style={{...text, backgroundColor: props.color, borderRadius: '5%'}}
      className="playerCard"
      onClick={() => {
        props.move(props.elem)
      }}
    >
      <a style={{...text}}>
        <b>{props.elem}</b>
      </a>
      <img src="/car.png" />
    </button>
  )
}
