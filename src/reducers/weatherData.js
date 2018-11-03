const weatherData = (state = [], action) => {
  switch (action.type) {
    case 'LOADING_WEATHER_DATA':

      return {
        ...state,
        error: undefined,
        loading: true
      }

    case 'GET_WEATHER_DATA':
      const { name: city, main, id: cityId, unit, coord } = action.data
      const { temp, pressure, humidity, temp_max, temp_min } = main

      return {
        ...state,
        ...main,
        ...coord,
        unit,
        cityId,
        city,
        error: undefined,
        loading: false
      }

    case 'ERROR_WEATHER_DATA':
      console.log('firing reducer')
      return {
        ...state,
        error: action.data,
        loading: false
      }

    default:

      return {
        ...state,
        temp,
        pressure,
        humidity,
        temp_max,
        temp_min,
        error: undefined,
        unit: 'metric',
        cityId: 0,
        city: '',
        loading: false
      }
  }
}

export default weatherData
