const cities = {
  Algiers: {
    id: 100,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [933, 535],
    neighbors: ['Madrid', 'Paris', 'Istanbul', 'Cairo']
  },
  Atlanta: {
    id: 101,
    color: 'blue',
    location: [434, 490],
    diseases: [0, 0, 0, 0],
    neighbors: ['Chicago', 'Washington', 'Miami'],
    researchStation: true
  },
  Baghdad: {
    id: 102,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1149, 456],
    neighbors: ['Istanbul', 'Cairo', 'Tehran', 'Riyadh']
  },
  Bangkok: {
    id: 103,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1429, 619],
    neighbors: [
      'Kolkata',
      'Hong-Kong',
      'Ho-Chi-Minh-City',
      'Jakarta',
      'Chennai'
    ]
  },
  Beijing: {
    id: 104,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1530, 360],
    neighbors: ['Seoul', 'Shanghai']
  },
  Bogota: {
    id: 105,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [535, 657],
    neighbors: ['Miami', 'Mexico-City', 'Lima', 'Buenos-Aires', 'Sao-Paulo']
  },
  'Buenos-Aires': {
    id: 106,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [630, 850],
    neighbors: ['Bogota', 'Sao-Paulo', 'Santiago', 'Johannesburg']
  },
  Cairo: {
    id: 107,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1015, 515],
    neighbors: ['Algiers', 'Istanbul', 'Riyadh', 'Khartoum']
  },
  Chennai: {
    id: 108,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1326, 660],
    neighbors: ['Mumbai', 'Delhi', 'Kolkata', 'Jakarta']
  },
  Chicago: {
    id: 100,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [380, 370],
    neighbors: [
      'Montreal',
      'Atlanta',
      'Mexico-City',
      'Los-Angeles',
      'San-Francisco'
    ]
  },
  Delhi: {
    id: 109,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1297, 472],
    neighbors: ['Kolkata', 'Chennai', 'Mumbai', 'Karachi', 'Tehran']
  },
  Essen: {
    id: 110,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [975, 292],
    neighbors: ['St-Petersburg', 'Milan', 'Paris', 'London']
  },
  'Ho-Chi-Minh-City': {
    id: 111,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1490, 685],
    neighbors: ['Bangkok', 'Hong-Kong', 'Manila', 'Sydney', 'Jakarta']
  },
  'Hong-Kong': {
    id: 112,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1500, 555],
    neighbors: [
      'Shanghai',
      'Taipei',
      'Manila',
      'Ho-Chi-Minh-City',
      'Bangkok',
      'Kolkata'
    ]
  },
  Istanbul: {
    id: 113,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1105, 410],
    neighbors: [
      'Milan',
      'St-Petersburg',
      'Moscow',
      'Baghdad',
      'Cairo',
      'Algiers'
    ]
  },
  Jakarta: {
    id: 114,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1425, 660],
    neighbors: ['Chennai', 'Bangkok', 'Ho-Chi-Minh-City', 'Sydney']
  },
  Johannesburg: {
    id: 115,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [1035, 850],
    neighbors: ['Buenos-Aires', 'Kinshasa', 'Khartoum']
  },
  Karachi: {
    id: 116,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1220, 525],
    neighbors: ['Tehran', 'Delhi', 'Mumbai', 'Riyadh']
  },
  Khartoum: {
    id: 117,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [1045, 600],
    neighbors: ['Cairo', 'Lagos', 'Kinshasa', 'Johannesburg']
  },
  Kinshasa: {
    id: 118,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [950, 735],
    neighbors: ['Lagos', 'Khartoum', 'Johannesburg']
  },
  Kolkata: {
    id: 119,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1370, 535],
    neighbors: ['Delhi', 'Chennai', 'Bangkok', 'Hong-Kong']
  },
  Lagos: {
    id: 120,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [905, 655],
    neighbors: ['Sao-Paulo', 'Khartoum', 'Kinshasa']
  },
  Lima: {
    id: 121,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [480, 770],
    neighbors: ['Los-Angeles', 'Mexico-City', 'Bogota', 'Santiago']
  },
  London: {
    id: 122,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [845, 340],
    neighbors: ['New-York', 'Madrid', 'Paris', 'Essen']
  },
  'Los-Angeles': {
    id: 123,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [265, 505],
    neighbors: ['Sydney', 'Lima', 'Mexico-City', 'Chicago', 'San-Francisco']
  },
  Madrid: {
    id: 124,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [815, 465],
    neighbors: ['New-York', 'London', 'Paris', 'Algiers', 'Sao-Paulo']
  },
  Manila: {
    id: 125,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1615, 680],
    neighbors: [
      'Taipei',
      'San-Francisco',
      'Los-Angeles',
      'Ho-Chi-Minh-City',
      'Hong-Kong'
    ]
  },
  'Mexico-City': {
    id: 126,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [375, 570],
    neighbors: ['Chicago', 'Miami', 'Bogota', 'Lima', 'Los-Angeles']
  },
  Miami: {
    id: 127,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [505, 540],
    neighbors: ['Atlanta', 'Washington', 'Bogota', 'Mexico-City']
  },
  Milan: {
    id: 128,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [1000, 400],
    neighbors: ['Paris', 'Essen', 'Istanbul']
  },
  Montreal: {
    id: 129,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [465, 380],
    neighbors: ['Chicago', 'New-York', 'Washington']
  },
  Moscow: {
    id: 130,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1120, 355],
    neighbors: ['St-Petersburg', 'Istanbul', 'Tehran']
  },
  Mumbai: {
    id: 131,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1260, 587],
    neighbors: ['Karachi', 'Delhi', 'Chennai']
  },
  'New-York': {
    id: 132,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [481, 400],
    neighbors: ['Montreal', 'Washington', 'Madrid', 'London']
  },
  Osaka: {
    id: 133,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1570, 510],
    neighbors: ['Tokyo', 'Taipei']
  },
  Paris: {
    id: 134,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [920, 407],
    neighbors: ['London', 'Essen', 'Milan', 'Algiers', 'Madrid']
  },
  Riyadh: {
    id: 135,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1145, 600],
    neighbors: ['Cairo', 'Baghdad', 'Karachi']
  },
  'San-Francisco': {
    id: 136,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [220, 360],
    neighbors: ['Tokyo', 'Manila', 'Los-Angeles', 'Chicago']
  },
  Santiago: {
    id: 137,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [480, 915],
    neighbors: ['Lima', 'Buenos-Aires']
  },
  'Sao-Paulo': {
    id: 138,
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [660, 788],
    neighbors: ['Buenos-Aires', 'Bogota', 'Madrid', 'Lagos']
  },
  Seoul: {
    id: 139,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1575, 372],
    neighbors: ['Beijing', 'Shanghai', 'Tokyo']
  },
  Shanghai: {
    id: 140,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1465, 480],
    neighbors: ['Beijing', 'Seoul', 'Tokyo', 'Taipei', 'Hong-Kong']
  },
  'St-Petersburg': {
    id: 141,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [1080, 315],
    neighbors: ['Essen', 'Istanbul', 'Moscow']
  },
  Sydney: {
    id: 142,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1650, 835],
    neighbors: ['Jakarta', 'Manila', 'Los-Angeles']
  },
  Taipei: {
    id: 143,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1575, 555],
    neighbors: ['Shanghai', 'Osaka', 'Hong-Kong', 'Manila']
  },
  Tehran: {
    id: 144,
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1205, 435],
    neighbors: ['Moscow', 'Baghdad', 'Karachi', 'Delhi']
  },
  Tokyo: {
    id: 145,
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1705, 425],
    neighbors: ['Seoul', 'Shanghai', 'Osaka', 'San-Francisco']
  },
  Washington: {
    id: 146,
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [500, 500],
    neighbors: ['Atlanta', 'Montreal', 'New-York', 'Miami']
  }
}

module.exports = cities
