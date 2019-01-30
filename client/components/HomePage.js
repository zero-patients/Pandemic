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
      <Link to="/board">View the Board</Link>
      <Link to="/controller/1">Join as Player 1</Link>
      <Link to="/controller/2">Join as Player 2</Link>
      <Link to="/controller/3">Join as Player 3</Link>
      <Link to="/controller/4">Join as Player 4</Link>
    </div>
  )
}

export default HomePage
