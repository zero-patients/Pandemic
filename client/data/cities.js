const cities = {
  Algiers: {
    color: 'black',
    neighbors: ['Madrid', 'Paris', 'Istanbul', 'Cairo']
  },
  Atlanta: {
    color: 'blue',
    neighbors: ['Chicago', 'Washington', 'Miami'],
    researchStation: true
  },
  Baghdad: {
    color: 'black',
    neighbors: ['Istanbul', 'Cairo', 'Tehran', 'Riyadh']
  },
  Bangkok: {
    color: 'red',
    neighbors: [
      'Kolkata',
      'Hong-Kong',
      'Ho-Chi-Minh-City',
      'Jakarta',
      'Chennai'
    ]
  },
  Beijing: {color: 'red', neighbors: ['Seoul', 'Shanghai']},
  Bogota: {
    color: 'yellow',
    neighbors: ['Miami', 'Mexico-City', 'Lima', 'Buenos-Aires', 'Sao-Paulo']
  },
  'Buenos-Aires': {
    color: 'yellow',
    neighbors: ['Bogota', 'Sao-Paulo', 'Santiago', 'Johannesburg']
  },
  Cairo: {
    color: 'black',
    neighbors: ['Algiers', 'Istanbul', 'Riyadh', 'Khartoum']
  },
  Chennai: {
    color: 'black',
    neighbors: ['Mumbai', 'Delhi', 'Kolkata', 'Jakarta']
  },
  Chicago: {
    color: 'blue',
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
    neighbors: ['Kolkata', 'Chennai', 'Mumbai', 'Karachi', 'Tehran']
  },
  Essen: {
    color: 'blue',
    neighbors: ['St-Petersburg', 'Milan', 'Paris', 'London']
  },
  'Ho-Chi-Minh-City': {
    color: 'red',
    neighbors: ['Bangkok', 'Hong-Kong', 'Manila', 'Sydney', 'Jakarta']
  },
  'Hong-Kong': {
    color: 'red',
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
    neighbors: ['Chennai', 'Bangkok', 'Ho-Chi-Minh-City', 'Sydney']
  },
  Johannesburg: {
    color: 'yellow',
    neighbors: ['Buenos-Aires', 'Kinshasa', 'Khartoum']
  },
  Karachi: {color: 'black', neighbors: ['Tehran', 'Delhi', 'Mumbai', 'Riyadh']},
  Khartoum: {
    color: 'yellow',
    neighbors: ['Cairo', 'Lagos', 'Kinshasa', 'Johannesburg']
  },
  Kinshasa: {color: 'yellow', neighbors: ['Lagos', 'Khartoum', 'Johannesburg']},
  Kolkata: {
    color: 'black',
    neighbors: ['Delhi', 'Chennai', 'Bangkok', 'Hong-Kong']
  },
  Lagos: {color: 'yellow', neighbors: ['Sao-Paulo', 'Khartoum', 'Kinshasa']},
  Lima: {
    color: 'yellow',
    neighbors: ['Los-Angeles', 'Mexico-City', 'Bogota', 'Santiago']
  },
  London: {color: 'blue', neighbors: ['New-York', 'Madrid', 'Paris', 'Essen']},
  'Los-Angeles': {
    color: 'yellow',
    neighbors: ['Sydney', 'Lima', 'Mexico-City', 'Chicago', 'San-Francisco']
  },
  Madrid: {
    color: 'blue',
    neighbors: ['New-York', 'London', 'Paris', 'Algiers', 'Sao-Paulo']
  },
  Manila: {
    color: 'red',
    neighbors: [
      'Taipei',
      'San-Francisco',
      'Los-Angeles',
      'Ho-Chi-Minh-City',
      'Hong-Kong'
    ]
  },
  'Mexico-City': {
    color: 'yellow',
    neighbors: ['Chicago', 'Miami', 'Bogota', 'Lima', 'Los-Angeles']
  },
  Miami: {
    color: 'yellow',
    neighbors: ['Atlanta', 'Washington', 'Bogota', 'Mexico-City']
  },
  Milan: {color: 'blue', neighbors: ['Paris', 'Essen', 'Istanbul']},
  Montreal: {color: 'blue', neighbors: ['Chicago', 'New-York', 'Washington']},
  Moscow: {color: 'black', neighbors: ['St-Petersburg', 'Istanbul', 'Tehran']},
  Mumbai: {color: 'black', neighbors: ['Karachi', 'Delhi', 'Chennai']},
  'New-York': {
    color: 'blue',
    neighbors: ['Montreal', 'Washington', 'Madrid', 'London']
  },
  Osaka: {color: 'red', neighbors: ['Tokyo', 'Taipei']},
  Paris: {
    color: 'blue',
    neighbors: ['London', 'Essen', 'Milan', 'Algiers', 'Madrid']
  },
  Riyadh: {color: 'black', neighbors: ['Cairo', 'Baghdad', 'Karachi']},
  'San-Francisco': {
    color: 'blue',
    neighbors: ['Tokyo', 'Manila', 'Los-Angeles', 'Chicago']
  },
  Santiago: {color: 'yellow', neighbors: ['Lima', 'Buenos-Aires']},
  'Sao-Paulo': {
    color: 'yellow',
    neighbors: ['Buenos-Aires', 'Bogota', 'Madrid', 'Lagos']
  },
  Seoul: {color: 'red', neighbors: ['Beijing', 'Shanghai', 'Tokyo']},
  Shanghai: {
    color: 'red',
    neighbors: ['Beijing', 'Seoul', 'Tokyo', 'Taipei', 'Hong-Kong']
  },
  'St-Petersburg': {color: 'blue', neighbors: ['Essen', 'Istanbul', 'Moscow']},
  Sydney: {color: 'red', neighbors: ['Jakarta', 'Manila', 'Los-Angeles']},
  Taipei: {
    color: 'red',
    neighbors: ['Shanghai', 'Osaka', 'Hong-Kong', 'Manila']
  },
  Tehran: {
    color: 'black',
    neighbors: ['Moscow', 'Baghdad', 'Karachi', 'Delhi']
  },
  Tokyo: {
    color: 'red',
    neighbors: ['Seoul', 'Shanghai', 'Osaka', 'San-Francisco']
  },
  Washington: {
    color: 'blue',
    neighbors: ['Atlanta', 'Montreal', 'New-York', 'Miami']
  }
}

export default cities
