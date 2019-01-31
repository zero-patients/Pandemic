const roles = {
  Dispatcher: {
    color: 'plum',
    description: `- Move another player's pawn as if it were your own
  - As an action, move any pawn to a city with another pawn`
  },
  Medic: {
    color: 'orange',
    description: `- Remove all cubes of one color when doing Treat Disease
  - Automatically remove cubes of cured diseases from the city you are in (and prevent them from being placed there)`
  },
  'Operations Expert': {
    color: 'lightgreen',
    description: `- As an action, build a research station in the city you are in (no City card needed).
  - Once per turn as an action, move from a research station to any city by discarding any City card`
  },
  'Quarantine Specialist': {
    color: 'forestgreen',
    description: `- Prevent disease cube placements (and outbreaks) in the city you are in and all cities connected to it.`
  },
  Researcher: {
    color: 'sienna',
    description: `- You may give any 1 of your City cards when you Share Knowledge. It need not match your city. A player who Shares Knowledge with you on their turn can take any 1 of your City cards.`
  },
  Scientist: {
    color: 'mintcream',
    description: `- You need only 4 cards of the same color to do the Discover a Cure action.`
  },
  'Contingency Planner': {
    color: 'lightskyblue',
    description: `- As an action, take any discarded Event card and store it on this card.
  - When you play the stored Event card, remove it from the game.
  Limit: 1 Event card on this card at a time, which is not part of your hand`
  }
}

module.exports = roles
