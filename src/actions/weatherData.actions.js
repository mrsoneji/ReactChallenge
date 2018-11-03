import { getWeatherData as callGetWeatherData } from '../networking/cities.networking'

export const GET_WEATHER_DATA = 'GET_WEATHER_DATA'
export const LOADING_WEATHER_DATA = 'LOADING_WEATHER_DATA'
export const ERROR_WEATHER_DATA = 'ERROR_WEATHER_DATA'

export const getWeatherData = (cityId, unit) => async (dispatch, getState) => {
  dispatch({
    type: LOADING_WEATHER_DATA
  })

  const { weatherData = {} } = getState()

  if (cityId === undefined) { cityId = weatherData.cityId }
  if (unit === undefined) { unit = weatherData.unit }

  try {
    const data = await callGetWeatherData(cityId, unit)

    data.unit = unit

    dispatch({
      type: GET_WEATHER_DATA,
      data
    })
  } catch (error) {
    dispatch({
      type: ERROR_WEATHER_DATA,
      data: error
    })
  }
}
