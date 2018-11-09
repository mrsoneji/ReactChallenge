import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactMapGL from 'react-map-gl'

import { MAPBOX_TOKEN_ID } from '../config/default.json'

class WeatherVisor extends Component {
  state = {
    loading: false,
    results: [],
    viewport: {
      width: 600,
      height: 400,
      latitude: -34.61,
      longitude: -58.38,
      zoom: 8
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.weatherData !== undefined) {
      const { lat = -34.61, lon = -58.38 } = nextProps.weatherData

      this.setState({
        ...this.state,
        viewport: {
          width: 600,
          height: 400,
          latitude: lat,
          longitude: lon,
          zoom: 10
        }
      })
    }
  }

  render () {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN_ID}
        onViewportChange={(viewport) => this.setState({ viewport })}
      />
    )
  }
}

const mapStateToProps = state => ({
  weatherData: state.weatherData
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WeatherVisor)
