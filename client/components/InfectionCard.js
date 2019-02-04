import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import cities from '../data/cities'

const InfectionCard = props => {
  let styles = {
    position: 'absolute',
    top: `${props.top}px`,
    left: `${props.left}px`,
    // background: 'red',
    // border: '2px solid purple',
    // textAlign: 'center',
    width: '250px',
    height: '200px'
  }

  let imgWidth = {
    width: '100%',
    margin: '0px',
    padding: '0px'
  }

  let cityStyles = {
    backgroundColor: 'whitesmoke',
    padding: '10px'
  }
  const colorTranslations = {
    blue: 'royalblue',
    red: 'crimson',
    black: 'lightgrey',
    darkgoldenrod: 'gold'
  }
  const backgroundColor =
    colorTranslations[cities[props.city.replace(/\s/g, '-')].color] || 'white'

  console.log(props.city)
  return (
    <Card fluid color="blue">
      <Image src={`images/cities/${props.city.replace(/\s/g, '-')}.jpg`} />
      <Card.Content style={{backgroundColor}}>
        <Card.Header>{props.city}</Card.Header>
      </Card.Content>
    </Card>
  )
}

export default InfectionCard
