import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

import { Segment, List, Loader, Button } from 'semantic-ui-react'

import { getWeatherData } from '../actions/weatherData.actions'

class WeatherVisor extends Component {
  constructor (props) {
    super(props)

    // for a single button with a single state
    // we also can use withState function from recompose library
    this.state = {
      unit: 'metric'
    }
  }

  handleButtonClick (unit) {
    this.setState({ ...this.state, unit })
    this.props.getWeatherData(unit)
  }

  render () {
    const { unit } = this.state
    const { weatherData } = this.props
    const { city, temp, pressure, humidity, temp_max, temp_min, loading = false } = weatherData

    const isMetric = unit === 'metric'

    return (
      <Segment inverted>
        <Button.Group>
          <Button positive={isMetric} onClick={() => this.handleButtonClick('metric')}>Celsius</Button>
          <Button.Or />
          <Button positive={!isMetric} onClick={() => this.handleButtonClick('imperial')}>Fahrenheit</Button>
        </Button.Group>
        <Loader active={loading} />
        <List divided inverted relaxed>
          <List.Item>
            <List.Content>
              <List.Header>City</List.Header>
              { city }
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Temperature</List.Header>
              { temp }
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Pressure</List.Header>
              { pressure }
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Humidity</List.Header>
              { humidity }
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Max Temperature</List.Header>
              { temp_max }
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Min Temperature</List.Header>
              { temp_min }
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  weatherData: state.weatherData
})

const mapDispatchToProps = dispatch => ({
  getWeatherData: unit => dispatch(getWeatherData(undefined, unit))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeatherVisor)
