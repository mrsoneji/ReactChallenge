import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Search, Header, Button, Icon } from 'semantic-ui-react'

import { getCities } from '../networking/cities.networking'
import { getWeatherData } from '../actions/weatherData.actions'

import { toast } from 'react-semantic-toasts'
import PropTypes from 'prop-types'

class SearchCityInput extends Component {
  state = {
    loading: false,
    open: false,
    results: []
  }
  
  componentDidMount() {
    this.loadLatestSearch()
  }

  componentWillReceiveProps (nextProps) {

    // using store for error management 
    if (nextProps.weatherData !== undefined) {
      if (nextProps.weatherData.error !== undefined) {
        toast(
          {
            title: 'Info Toast',
            type: 'error',
            icon:'envelope',
            description: 'An error has occurred'
          }
        )
      }
    }
  }

  loadLatestSearch = () => {
    // get latest search cities from localStorage
    let latest = JSON.parse(localStorage.getItem('latest'))
    latest && latest.push({id: 'CLEAR', name:'Clear history'})

    this.setState({
      ...this.state,
      results: latest
    })
  }

  onClearHistory = () => {
    localStorage.clear()

    this.setState({
      ...this.state,
      open: false,
      results: []
    })
  }

  onResultSelect = (evt, { result }) => { 

    if (result.id === 'CLEAR') {
      this.onClearHistory()
      return
    }

    // get weather data from openweather service
    // we use result object as a destructired assignment coming
    // from parameters
    this.props.getWeatherData( result.id )

    // obtain latest searched cities and put it them again with this search
    let latest = JSON.parse(localStorage.getItem('latest')) || []

    // check if value doesn't exists before insert it on the array
    const alreadyInserted = (result, latest) => latest.some(e => e.name === result.name)
    const updateLocalStorage = (result, latest) => { 
      // only keep 5 entries limit
      latest.splice(4)
      // insert in first position
      latest.unshift(result) 

      localStorage.setItem('latest', JSON.stringify(latest)) 
    }

    alreadyInserted(result, latest) || updateLocalStorage(result, latest)

    // set value state in order to fill search input with city's name
    this.setState({ ...this.state, value: result.name, open: false }) 
  }

  onSearchChange = (evt, { value }) => {
    this.setState({...this.state, value}, () => {
      // clear search criteria and reload latest search terms
      if (this.state.value.length === 0) this.
        loadLatestSearch()

      // grab city list from data/city.list.json and filter it
      if (this.state.value.length > 3) {
        const re = new RegExp(value, 'i')
        const isMatch = result => re.test(result.name)
        const results = getCities().filter(isMatch).slice(0, 8)

        this.setState({
          ...this.state,
          isLoading: false,
          results
        })
      }
      
    }) // setState is an asynchronous process
  }

  render () {
    return (
      <Search
        open={this.state.open}
        onFocus={() => { this.setState({...this.state, open: true})}}
        loading={this.state.loading}
        onSearchChange={this.onSearchChange}
        onResultSelect={this.onResultSelect}
        results={this.state.results}
        value={this.state.value}
        resultRenderer={resultRenderer}
        input={{fluid:true}}
      />
    )
  }
}
  
const resultRenderer = ({ id, name, country }) => <Header key={id} as='h5'>{name}{country && ', '} {country}</Header>
resultRenderer.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  country: PropTypes.string,
}

const mapStateToProps = state => ({
  weatherData: state.weatherData
})

const mapDispatchToProps = dispatch => ({
  getWeatherData: cityId => dispatch(getWeatherData(cityId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchCityInput)
