import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
    color: 'white',
    textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
    margin: '4px 4px'
  }
  return (
    <div style={styles}>
      <h1>PANDEMIC</h1>
      <hr
        style={{
          border: '5px solid lightgrey',
          borderRadius: '5px',
          width: '350px'
        }}
      />
      <p>
        <Link to="/board">View the Board</Link>
      </p>
      <hr
        style={{
          border: '5px solid lightgrey',
          borderRadius: '5px',
          width: '350px'
        }}
      />
      <div>
        <Link to="/controller/1" style={{color: 'royalblue'}}>
          Join as Player 1
        </Link>
        <br />
        <br />
        <Link to="/controller/2" style={{color: 'gold'}}>
          Join as Player 2
        </Link>
        <br />
        <br />
        <Link to="/controller/3" style={{color: 'crimson'}}>
          Join as Player 3
        </Link>
        <br />
        <br />
        <Link to="/controller/4" style={{color: 'green'}}>
          Join as Player 4
        </Link>
      </div>
    </div>
  )
}

export default HomePage
