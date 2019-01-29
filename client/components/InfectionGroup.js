import React, {Component} from 'react'
import {Infection} from './Infection'

const InfectionGroup = props => {
  const {color, count, radius} = props

  return (
    <div>
      {count === 1 ? (
        <Infection color={color} rotation={0} addRadius={radius} />
      ) : null}

      {count === 2 ? (
        <div>
          <Infection color={color} rotation={0} addRadius={radius} />
          <Infection color={color} rotation={1.5} addRadius={radius} />
        </div>
      ) : null}

      {count === 3 ? (
        <div>
          <Infection color={color} rotation={0} addRadius={radius} />
          <Infection color={color} rotation={1} addRadius={radius} />
          <Infection color={color} rotation={2} addRadius={radius} />
        </div>
      ) : null}
    </div>
  )
}

export default InfectionGroup
