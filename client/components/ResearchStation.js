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
    WebkitTransform: 'rotate(45deg) scale(0.8)',
    MozTransform: 'rotate(45deg) scale(0.8)',
    msTransform: 'rotate(45deg) scale(0.8)',
    OTransform: 'rotate(45deg) scale(0.8)',
    transform: 'rotate(45deg) scale(0.8)',
    width: '30px',
    height: '30px',
    float: 'left',
    margin: '6px',
    position: 'absolute'
  }
  return <div className="research-station" style={styles} />
}

export default ResearchStation
