import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <Link to="/board">Board</Link>
      <Link to="/controller/1">Join as Player 1</Link>
      <Link to="/controller/2">Join as Player 2</Link>
      <Link to="/controller/3">Join as Player 3</Link>
      <Link to="/controller/4">Join as Player 4</Link>
    </div>
  )
}

export default HomePage
