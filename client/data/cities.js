const cities = {
  Algiers: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [913, 475],
    neighbors: ['Madrid', 'Paris', 'Istanbul', 'Cairo'],
    didOutbreak: false
  },
  Atlanta: {
    color: 'blue',
    location: [390, 450],
    diseases: [0, 0, 0, 0],
    neighbors: ['Chicago', 'Washington', 'Miami'],
    researchStation: true,
    didOutbreak: false
  },
  Baghdad: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1149, 456],
    neighbors: ['Istanbul', 'Cairo', 'Tehran', 'Riyadh'],
    didOutbreak: false
  },
  Bangkok: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1409, 600],
    neighbors: [
      'Kolkata',
      'Hong-Kong',
      'Ho-Chi-Minh-City',
      'Jakarta',
      'Chennai'
    ],
    didOutbreak: false
  },
  Beijing: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1430, 360],
    neighbors: ['Seoul', 'Shanghai'],
    didOutbreak: false
  },
  Bogota: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [535, 657],
    neighbors: ['Miami', 'Mexico-City', 'Lima', 'Buenos-Aires', 'Sao-Paulo'],
    didOutbreak: false
  },
  'Buenos-Aires': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [630, 850],
    neighbors: ['Bogota', 'Sao-Paulo'],
    didOutbreak: false
  },
  Cairo: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1015, 515],
    neighbors: ['Algiers', 'Istanbul', 'Riyadh', 'Khartoum'],
    didOutbreak: false
  },
  Chennai: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1326, 660],
    neighbors: ['Mumbai', 'Delhi', 'Kolkata', 'Jakarta'],
    didOutbreak: false
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
    ],
    didOutbreak: false
  },
  Delhi: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1297, 472],
    neighbors: ['Kolkata', 'Chennai', 'Mumbai', 'Karachi', 'Tehran'],
    didOutbreak: false
  },
  Essen: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [975, 292],
    neighbors: ['St-Petersburg', 'Milan', 'Paris', 'London'],
    didOutbreak: false
  },
  'Ho-Chi-Minh-City': {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1490, 645],
    neighbors: ['Bangkok', 'Hong-Kong', 'Manila', 'Jakarta'],
    didOutbreak: false
  },
  'Hong-Kong': {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1450, 525],
    neighbors: [
      'Shanghai',
      'Taipei',
      'Manila',
      'Ho-Chi-Minh-City',
      'Bangkok',
      'Kolkata'
    ],
    didOutbreak: false
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
    ],
    didOutbreak: false
  },
  Jakarta: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1425, 680],
    neighbors: ['Chennai', 'Bangkok', 'Ho-Chi-Minh-City', 'Sydney'],
    didOutbreak: false
  },
  Johannesburg: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [1035, 820],
    neighbors: ['Kinshasa', 'Khartoum'],
    didOutbreak: false
  },
  Karachi: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1220, 525],
    neighbors: ['Tehran', 'Delhi', 'Mumbai', 'Riyadh'],
    didOutbreak: false
  },
  Khartoum: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [1045, 600],
    neighbors: ['Cairo', 'Lagos', 'Kinshasa', 'Johannesburg'],
    didOutbreak: false
  },
  Kinshasa: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [950, 735],
    neighbors: ['Lagos', 'Khartoum', 'Johannesburg'],
    didOutbreak: false
  },
  Kolkata: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1370, 535],
    neighbors: ['Delhi', 'Chennai', 'Bangkok', 'Hong-Kong'],
    didOutbreak: false
  },
  Lagos: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [905, 615],
    neighbors: ['Sao-Paulo', 'Khartoum', 'Kinshasa'],
    didOutbreak: false
  },
  Lima: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [480, 770],
    neighbors: ['Mexico-City', 'Bogota', 'Santiago'],
    didOutbreak: false
  },
  London: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [845, 340],
    neighbors: ['New-York', 'Madrid', 'Paris', 'Essen'],
    didOutbreak: false
  },
  'Los-Angeles': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [255, 450],
    neighbors: ['Sydney', 'Mexico-City', 'Chicago', 'San-Francisco'],
    didOutbreak: false
  },
  Madrid: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [815, 465],
    neighbors: ['New-York', 'London', 'Paris', 'Algiers', 'Sao-Paulo'],
    didOutbreak: false
  },
  Manila: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1615, 680],
    neighbors: ['Taipei', 'San-Francisco', 'Ho-Chi-Minh-City', 'Hong-Kong'],
    didOutbreak: false
  },
  'Mexico-City': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [345, 540],
    neighbors: ['Chicago', 'Miami', 'Bogota', 'Lima', 'Los-Angeles'],
    didOutbreak: false
  },
  Miami: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [475, 510],
    neighbors: ['Atlanta', 'Washington', 'Bogota', 'Mexico-City'],
    didOutbreak: false
  },
  Milan: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [1000, 400],
    neighbors: ['Paris', 'Essen', 'Istanbul'],
    didOutbreak: false
  },
  Montreal: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [465, 380],
    neighbors: ['Chicago', 'New-York', 'Washington'],
    didOutbreak: false
  },
  Moscow: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1150, 325],
    neighbors: ['St-Petersburg', 'Istanbul', 'Tehran'],
    didOutbreak: false
  },
  Mumbai: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1260, 587],
    neighbors: ['Karachi', 'Delhi', 'Chennai'],
    didOutbreak: false
  },
  'New-York': {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [535, 400],
    neighbors: ['Montreal', 'Washington', 'Madrid', 'London'],
    didOutbreak: false
  },
  Osaka: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1600, 470],
    neighbors: ['Tokyo', 'Taipei'],
    didOutbreak: false
  },
  Paris: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [920, 407],
    neighbors: ['London', 'Essen', 'Milan', 'Algiers', 'Madrid'],
    didOutbreak: false
  },
  Riyadh: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1125, 560],
    neighbors: ['Cairo', 'Baghdad', 'Karachi'],
    didOutbreak: false
  },
  'San-Francisco': {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [220, 360],
    neighbors: ['Tokyo', 'Manila', 'Los-Angeles', 'Chicago'],
    didOutbreak: false
  },
  Santiago: {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [480, 915],
    neighbors: ['Lima'],
    didOutbreak: false
  },
  'Sao-Paulo': {
    color: 'darkgoldenrod',
    diseases: [0, 0, 0, 0],
    location: [660, 750],
    neighbors: ['Buenos-Aires', 'Bogota', 'Madrid', 'Lagos'],
    didOutbreak: false
  },
  Seoul: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1575, 352],
    neighbors: ['Beijing', 'Shanghai', 'Tokyo'],
    didOutbreak: false
  },
  Shanghai: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1445, 440],
    neighbors: ['Beijing', 'Seoul', 'Tokyo', 'Taipei', 'Hong-Kong'],
    didOutbreak: false
  },
  'St-Petersburg': {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [1080, 285],
    neighbors: ['Essen', 'Istanbul', 'Moscow'],
    didOutbreak: false
  },
  Sydney: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1650, 835],
    neighbors: ['Jakarta', 'Manila', 'Los-Angeles'],
    didOutbreak: false
  },
  Taipei: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1535, 535],
    neighbors: ['Shanghai', 'Osaka', 'Hong-Kong', 'Manila'],
    didOutbreak: false
  },
  Tehran: {
    color: 'black',
    diseases: [0, 0, 0, 0],
    location: [1205, 400],
    neighbors: ['Moscow', 'Baghdad', 'Karachi', 'Delhi'],
    didOutbreak: false
  },
  Tokyo: {
    color: 'red',
    diseases: [0, 0, 0, 0],
    location: [1685, 425],
    neighbors: ['Seoul', 'Shanghai', 'Osaka', 'San-Francisco'],
    didOutbreak: false
  },
  Washington: {
    color: 'blue',
    diseases: [0, 0, 0, 0],
    location: [470, 455],
    neighbors: ['Atlanta', 'Montreal', 'New-York', 'Miami'],
    didOutbreak: false
  }
}

module.exports = cities
