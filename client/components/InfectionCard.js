import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import cities from '../data/cities'

const InfectionCard = props => {
  const colorTranslations = {
    blue: 'royalblue',
    red: 'crimson',
    black: 'lightgrey',
    darkgoldenrod: 'gold'
  }

  const cardColor = {
    blue: 'blue',
    red: 'red',
    black: 'grey',
    darkgoldenrod: 'yellow'
  }
  let backgroundColor = 'white'
  const cityKey = props.city.replace(/\s/g, '-')
  if (cities[cityKey]) {
    backgroundColor = colorTranslations[cities[cityKey].color]
  }

  return props.city === 'Epidemic' ? (
    <Card fluid color="green">
      <Image src="images/epidemic.jpg" />
      <Card.Content style={{backgroundColor: 'lawngreen'}}>
        <Card.Header>EPIDEMIC</Card.Header>
      </Card.Content>
    </Card>
  ) : (
    <Card fluid color={cardColor[cities[props.city.replace(/\s/g, '-')].color]}>
      <Image src={`images/cities/${props.city.replace(/\s/g, '-')}.jpg`} />
      <Card.Content style={{backgroundColor}}>
        <Card.Header>{props.city}</Card.Header>
      </Card.Content>
    </Card>
  )
}

export default InfectionCard
