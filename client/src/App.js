import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LinksContainer from './components/LinksContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <LinksContainer />
      </div>
    );
  }
}

export default App;
