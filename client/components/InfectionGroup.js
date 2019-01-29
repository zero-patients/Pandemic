import React, {Component} from 'react'
import {Infection} from './Infection'

const InfectionGroup = props => {
  const {color, count, speed} = props

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

      {count === 3 ? (
        <div>
          <Infection color={color} rotation={0} addSpeed={speed} />
          <Infection color={color} rotation={1} addSpeed={speed} />
          <Infection color={color} rotation={2} addSpeed={speed} />
        </div>
      ) : null}
    </div>
  )
}

export default InfectionGroup
