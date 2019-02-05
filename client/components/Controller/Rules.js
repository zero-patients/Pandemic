import React from 'react'
import {Button, Header, Modal} from 'semantic-ui-react'

export const Rules = props => {
  return (
    <div>
      <Button onClick={props.show(true)}>Default</Button>
      <Button onClick={props.show('inverted')}>Inverted</Button>
      <Button onClick={props.show('blurring')}>Blurring</Button>

      <Modal dimmer="blurring" open={props.open} onClose={props.onClose}>
        <Modal.Header>Game Rules</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>
              Pandemic is a cooperative game. The players all win or lose
              together. Turn your device to landscape orientation for an
              optimized interface.
            </Header>
            <p>The goal is to discover cures for all 4 disieases</p>
            <p>The Players lose if:</p>
            <ol>
              <li>8 outbreaks occur (a worldwide panic happens)</li>
              <li>
                not enough disease cubes are available when needed (a disease
                spreads too much)
              </li>
              <li>
                not enough player cards are left when needed (your team runs out
                of time)
              </li>
            </ol>
            <p>Intitial setup</p>
            <ol>
              <li>
                Each player is dealt 2 cards from the player deck and then the
                "epidemic" cards are shuffled into the player deck
              </li>
              <li>
                9 cards are drawn from the infection deck. 3 disease cubes are
                placed on the first 3 cites, 2 on the second 3 cities and 1 on
                the third 3 cities
              </li>
            </ol>
            <p>Player Turn:</p>
            <ul>
              <li>You may do up to 4 actions each turn</li>
              <ul>
                <li>You can move to other cities in 4 ways:</li>
                <ul>
                  <li>
                    Drive/Ferry: Move to a city connected by a white line to the
                    one you are in.
                  </li>
                  <li>
                    Direct Flight: Discard a City card to move to the city named
                    on the card.
                  </li>
                  <li>
                    Charter Flight: Discard the City card that matches the city
                    you are in to move to any city.
                  </li>
                  <li>
                    Shuttle Flight: Move from a city with a research station to
                    any other city that has a research station.
                  </li>
                </ul>
                <li>Other actions:</li>
                <ul>
                  <li>
                    Build a Research Station: Discard the City card that matches
                    the city you are in to place a research station there. Take
                    the research station from the pile next to the board. If all
                    6 research stations have been built, take a research station
                    from anywhere on the board.
                  </li>
                  <li>
                    Treat Disease: Remove 1 disease cube from the city you are
                    in, placing it in the cube supply next to the board. If this
                    disease color has been cured (see Discover a Cure below),
                    remove all cubes of that color from the city you are in. If
                    the last cube of a cured disease is removed from the board,
                    this disease is eradicated. Flip its cure marker from its
                    “vial” side to its “ ” side.
                  </li>
                  <li>
                    Share Knowledge: You can do this action in two ways: give
                    the City card that matches the city you are in to another
                    player, or take the City card that matches the city you are
                    in from another player. The other player must also be in the
                    city with you. Both of you need to agree to do this. If the
                    player who gets the card now has more than 7 cards, that
                    player must immediately discard a card or play an Event card{' '}
                  </li>
                  <li>
                    Discover a Cure: At any research station, discard 5 City
                    cards of the same color from your hand to cure the disease
                    of that color. Move the disease’s cure marker to its Cure
                    Indicator. If no cubes of the cured disease are on the
                    board, the disease is now eradicated and cities can no
                    longer be infected by this disease
                  </li>
                </ul>
              </ul>
              <li>
                Draw 2 player cards from the player deck, discarding when
                necessary
              </li>
              <li>
                Infect cities: draw the number of infection cards equal to the
                number on the infection rate tracker. This will cause each city
                drawn to gain an infection cube.
              </li>
            </ul>
            <p>Outbreaks:</p>
            <ul>
              <li>
                Outbreaks occur when a city would have a 4th disease cube of the
                same color placed on it
              </li>
              <li>
                Instead, each neighboring city gets a disease cube of that color
                placed on it
              </li>
              <li>
                Outbreaks can occur in multiple cities for each event, but only
                one outbreak per city, per event
              </li>
            </ul>
            <p>Epidemic cards:</p>
            <ul>
              <li>When an epidemic card is drawn, 3 things happen</li>
              <ol>
                <li>The infection counter is moved up one space</li>
                <li>
                  The bottom card is drawn from the infection deck, 3 disease
                  cubes are placed on that city, and the card is placed on the
                  infection discard pile
                </li>
                <li>
                  The infection discard pile is shuffled and placed on top of
                  the infection deck
                </li>
              </ol>
            </ul>
            <br />
            <p>
              <strong>
                Mass extinction of the human species will be the result of your
                failure...no pressure.
              </strong>
            </p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}
