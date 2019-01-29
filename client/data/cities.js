const cities = {
  Algiers: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [933, 535],
    neighbors: ['Madrid', 'Paris', 'Istanbul', 'Cairo']
  },
  Atlanta: {
    color: 'blue',
    location: [434, 490],
    diseases: [0, 0, 0, 0],
    neighbors: ['Chicago', 'Washington', 'Miami'],
    researchStation: true
  },
  Baghdad: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1149, 456],
    neighbors: ['Istanbul', 'Cairo', 'Tehran', 'Riyadh']
  },
  Bangkok: {
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
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1530, 360],
    neighbors: ['Seoul', 'Shanghai']
  },
  Bogota: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [535, 657],
    neighbors: ['Miami', 'Mexico-City', 'Lima', 'Buenos-Aires', 'Sao-Paulo']
  },
  'Buenos-Aires': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [630, 850],
    neighbors: ['Bogota', 'Sao-Paulo', 'Santiago', 'Johannesburg']
  },
  Cairo: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1015, 515],
    neighbors: ['Algiers', 'Istanbul', 'Riyadh', 'Khartoum']
  },
  Chennai: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1326, 660],
    neighbors: ['Mumbai', 'Delhi', 'Kolkata', 'Jakarta']
  },
  Chicago: {
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
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1297, 472],
    neighbors: ['Kolkata', 'Chennai', 'Mumbai', 'Karachi', 'Tehran']
  },
  Essen: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [975, 292],
    neighbors: ['St-Petersburg', 'Milan', 'Paris', 'London']
  },
  'Ho-Chi-Minh-City': {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1490, 685],
    neighbors: ['Bangkok', 'Hong-Kong', 'Manila', 'Sydney', 'Jakarta']
  },
  'Hong-Kong': {
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
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1425, 660],
    neighbors: ['Chennai', 'Bangkok', 'Ho-Chi-Minh-City', 'Sydney']
  },
  Johannesburg: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [1035, 850],
    neighbors: ['Buenos-Aires', 'Kinshasa', 'Khartoum']
  },
  Karachi: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1220, 525],
    neighbors: ['Tehran', 'Delhi', 'Mumbai', 'Riyadh']
  },
  Khartoum: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [1045, 600],
    neighbors: ['Cairo', 'Lagos', 'Kinshasa', 'Johannesburg']
  },
  Kinshasa: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [950, 735],
    neighbors: ['Lagos', 'Khartoum', 'Johannesburg']
  },
  Kolkata: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1370, 535],
    neighbors: ['Delhi', 'Chennai', 'Bangkok', 'Hong-Kong']
  },
  Lagos: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [905, 655],
    neighbors: ['Sao-Paulo', 'Khartoum', 'Kinshasa']
  },
  Lima: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [480, 770],
    neighbors: ['Los-Angeles', 'Mexico-City', 'Bogota', 'Santiago']
  },
  London: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [845, 340],
    neighbors: ['New-York', 'Madrid', 'Paris', 'Essen']
  },
  'Los-Angeles': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [265, 505],
    neighbors: ['Sydney', 'Lima', 'Mexico-City', 'Chicago', 'San-Francisco']
  },
  Madrid: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [815, 465],
    neighbors: ['New-York', 'London', 'Paris', 'Algiers', 'Sao-Paulo']
  },
  Manila: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1615, 680],
    neighbors: ['Taipei', 'San-Francisco', 'Ho-Chi-Minh-City', 'Hong-Kong']
  },
  'Mexico-City': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [375, 570],
    neighbors: ['Chicago', 'Miami', 'Bogota', 'Lima', 'Los-Angeles']
  },
  Miami: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [505, 540],
    neighbors: ['Atlanta', 'Washington', 'Bogota', 'Mexico-City']
  },
  Milan: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [1000, 400],
    neighbors: ['Paris', 'Essen', 'Istanbul']
  },
  Montreal: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [465, 380],
    neighbors: ['Chicago', 'New-York', 'Washington']
  },
  Moscow: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1120, 355],
    neighbors: ['St-Petersburg', 'Istanbul', 'Tehran']
  },
  Mumbai: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1260, 587],
    neighbors: ['Karachi', 'Delhi', 'Chennai']
  },
  'New-York': {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [525, 435],
    neighbors: ['Montreal', 'Washington', 'Madrid', 'London']
  },
  Osaka: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1570, 510],
    neighbors: ['Tokyo', 'Taipei']
  },
  Paris: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [920, 407],
    neighbors: ['London', 'Essen', 'Milan', 'Algiers', 'Madrid']
  },
  Riyadh: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1145, 600],
    neighbors: ['Cairo', 'Baghdad', 'Karachi']
  },
  'San-Francisco': {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [220, 360],
    neighbors: ['Tokyo', 'Manila', 'Los-Angeles', 'Chicago']
  },
  Santiago: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [480, 915],
    neighbors: ['Lima', 'Buenos-Aires']
  },
  'Sao-Paulo': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [660, 788],
    neighbors: ['Buenos-Aires', 'Bogota', 'Madrid', 'Lagos']
  },
  Seoul: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1575, 372],
    neighbors: ['Beijing', 'Shanghai', 'Tokyo']
  },
  Shanghai: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1465, 480],
    neighbors: ['Beijing', 'Seoul', 'Tokyo', 'Taipei', 'Hong-Kong']
  },
  'St-Petersburg': {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [1080, 315],
    neighbors: ['Essen', 'Istanbul', 'Moscow']
  },
  Sydney: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1650, 835],
    neighbors: ['Jakarta', 'Manila', 'Los-Angeles']
  },
  Taipei: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1575, 555],
    neighbors: ['Shanghai', 'Osaka', 'Hong-Kong', 'Manila']
  },
  Tehran: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1205, 435],
    neighbors: ['Moscow', 'Baghdad', 'Karachi', 'Delhi']
  },
  Tokyo: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1705, 425],
    neighbors: ['Seoul', 'Shanghai', 'Osaka', 'San-Francisco']
  },
  Washington: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [500, 500],
    neighbors: ['Atlanta', 'Montreal', 'New-York', 'Miami']
  }
}

module.exports = cities
