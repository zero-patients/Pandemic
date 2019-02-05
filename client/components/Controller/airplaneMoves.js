import React from 'react'

export const AirplaneMoves = props => {
  return (
    <button
      disabled={props.restrict}
      style={{backgroundColor: props.color, borderRadius: '5%'}}
      className="playerCard"
      onClick={() => {
        props.move(props.name)
      }}
    >
      <a>
        <b>{props.name}</b>
      </a>
      <img src="/airplane.png" />
    </button>
  )
}
