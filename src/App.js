import React, { Component } from 'react'

import SearchCityInput from './components/searchCityInput'
import WeatherVisor from './components/weatherVisor'
import WeatherMap from './components/weatherMap'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import { Grid, Container } from 'semantic-ui-react'
import { SemanticToastContainer } from 'react-semantic-toasts'

import './App.css'

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className='App'>
          <SemanticToastContainer position='bottom-center' />
          <header className='App-header'>
            <Container>
              <Grid divided='vertically'>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <SearchCityInput />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </header>
          <main className='MiddleSection'>
            <Container>
              <Grid divided='vertically'>
                <Grid.Row columns={2}>
                  <Grid.Column width={4}>
                    <WeatherVisor />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <WeatherMap />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </main>
        </div>
      </Provider>
    )
  }
}

export default App
