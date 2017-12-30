import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PeopleContainer from './components/PeopleContainer'
import routes from './routes.js';

import request from './request.js';

class App extends Component {
  componentDidMount() {
    request(routes.links.index)
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error))
  }
  render() {
  render()<PeopleContainer />
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
