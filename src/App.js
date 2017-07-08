import React, { Component } from 'react'
import { version } from '../package.json'
import firebase from 'firebase'
import firebaseConfig from '../firebase.js'
import Home from './home'
import Search from './search'
import Add from './add'
import './App.css'

class App extends Component {
  state = { synching: true, view: 'add' }

  componentDidMount = () => {
    firebase.initializeApp(firebaseConfig)
    firebase.database().ref().on('value', (snapshot) => {
      console.log('Received update: ', snapshot.val());
      this.setState({ data: snapshot.val(), synching: false })
    });
  }
 
  onUpdate = data => {
    console.log('Sending data: ', data)
    if (!data || !data.version) {
      data.version = version
    }
    firebase.database().ref().set(data);
  }
  
  render() {
    const { data = {}, synching, view = 'home' } = this.state
    if (synching) {
      return <div>Loading</div>
    }
    return (
      <div className="app">
        <Add
          view={view}
          data={data}
          onUpdate={this.onUpdate}
          onShowHome={() => this.setState({ view: 'home' })} />
        <Home
          view={view}
          data={data}
          onupdate={this.onupdate}
          onShowAdd={() => this.setState({ view: 'add'})} />
        <Search
          view={view}
          data={data} />
      </div>
    )
  }
}

export default App
