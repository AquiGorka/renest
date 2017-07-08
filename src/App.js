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
      /*
      firebase.database().ref().set({
        version: '1.0.0',
        items: [
          { id: '001', label: 'Begin packing', priority: -1, status: false },
          { id: '002', label: 'Book professional movers', priority: -1, status: false },
          { id: '003', label: 'Prepare the house', priority: -1, status: false },
          { id: '004', label: 'Review moving plans', priority: -1, status: false },
          { id: '005', label: 'Prepare for payment', priority: -1, status: false },
          { id: '006', label: 'Pack an essentials box', priority: -1, status: false },
          { id: '007', label: 'Prepare appliances', priority: -1, status: false },
          { id: '008', label: 'Measure furniture and doorways', priority: -1, status: false },
          { id: '009', label: 'Do a change of address', priority: -1, status: false },
          { id: '010', label: 'Take measurements', priority: -1, status: false },
          { id: '011', label: 'Order supplies', priority: -1, status: false }
        ]
      })
      */
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
    const { items } = data
    const options = items.filter(x => x.priority === -1)
    return (
      <div className="app">
        <Add
          view={view}
          items={options}
          onUpdate={this.onUpdate}
          onShowHome={() => this.setState({ view: 'home' })} />
        <Home
          view={view}
          items={items}
          onupdate={this.onupdate}
          onShowAdd={() => this.setState({ view: 'add'})} />
        <Search
          view={view}
          data={items} />
      </div>
    )
  }
}

export default App
