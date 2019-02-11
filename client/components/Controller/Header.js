import React from 'react'
import {Button} from 'semantic-ui-react'

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const Header = props => {
  return (
    <div style={{alignItems: 'center'}} className="controllerHeader">
      {props.isTurn === true && props.remainingMoves > 0 ? (
        <h3
          style={{...flexCenter, alignSelf: 'center'}}
          className="controllerPanel"
        >
          Its your turn, the world is counting on you. You have{' '}
          {props.remainingMoves} moves left. Choose carefully.
        </h3>
      ) : (
        <h3
          style={{...flexCenter, alignSelf: 'center'}}
          className="controllerPanel"
        >
          Its not your turn, be a good teammate
        </h3>
      )}
      <Button color="red" icon="help" onClick={() => props.toggle()} />
    </div>
  )
}
