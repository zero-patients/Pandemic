import React, {Component} from 'react'
import {Infection} from './Infection'

const InfectionGroup = props => {
  let {color, count, speed} = props
  if (color === 'blue') {
    color = '#2196F3'
  }
  return (
    <div>
      {count === 1 ? (
        <Infection color={color} rotation={0} addSpeed={speed} />
      ) : null}

      {count === 2 ? (
        <div>
          <Infection color={color} rotation={0} addSpeed={speed} />
          <Infection color={color} rotation={1.5} addSpeed={speed} />
        </div>
      ) : null}

      {count > 2 ? (
        <div>
          <Infection color={color} rotation={0} addSpeed={speed} />
          <Infection color={color} rotation={1} addSpeed={speed} />
          <Infection color={color} rotation={2} addSpeed={speed} />
        </div>
      ) : null}

      {count > 3 ? (
        <div
          style={{
            position: 'absolute',
            left: '13px',
            top: '28px',
            fontSize: '10px',
            background: color,
            border: '1px solid #000',
            borderRadius: '50%',
            width: '5px',
            height: '5px'
          }}
        >
          {count}
        </div>
      ) : null}
    </div>
  )
}

export default InfectionGroup
