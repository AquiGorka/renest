import React, { Component } from 'react'
import { version } from '../package.json'
import firebase from 'firebase'
import firebaseConfig from '../firebase.js'
import Home from './home'
import Search from './search'
import Add from './add'
import './App.css'

class App extends Component {
  state = { synching: true }

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
    const { data = {}, synching } = this.state
    if (synching) {
      return <div>Loading</div>
    }
    return (
      <div className="app">
      
        <Add data={data} onUpdate={this.onUpdate} />
        <Home data={data} onupdate={this.onupdate} />
        <Search data={data} />

      </div>
    )
  }
}

export default App
