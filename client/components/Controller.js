import React from 'react'

const Controller = props => {
  const {userId} = props.match.params
  const style = `player${userId}`

  return (
    <div className={style}>
      <button type="button">London</button>
      <button type="button">Mexico City</button>
      <button type="button">Riyadh</button>
      <button type="button">Seoul</button>
    </div>
  )
}

export default Controller
