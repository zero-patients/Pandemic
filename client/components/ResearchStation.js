import React from 'react'

const ResearchStation = () => {
  let styles = {
    background: '#FFFFFF',
    borderWidth: '6px',
    borderStyle: 'solid',
    borderRadius: '6px',
    borderTopColor: '#444',
    borderLeftColor: '#000',
    borderRightColor: '#444',
    borderBottomColor: '#000',
    '-webkit-transform': 'rotate(45deg) scale(0.8)',
    '-moz-transform': 'rotate(45deg) scale(0.8)',
    '-ms-transform': 'rotate(45deg) scale(0.8)',
    '-o-transform': 'rotate(45deg) scale(0.8)',
    transform: 'rotate(45deg) scale(0.8)',
    width: '10px',
    height: '10px',
    float: 'left',
    margin: '6px',
    position: 'absolute'
  }
  return <div className="research-station" style={styles} />
}

export default ResearchStation
