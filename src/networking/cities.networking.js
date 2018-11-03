//
import axios from 'axios'
import cities from '../data/city.list.json'
import { OPENWEATHER_MAP_APPID } from '../config/default.json'

export const getCities = () => {
  return cities
}

export const getWeatherData = async (cityId, units) => {
  try {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${OPENWEATHER_MAP_APPID}&units=${units}`)
    return data
  } catch (ex) {
    throw ex
  }
}
