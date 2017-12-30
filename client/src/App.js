import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom'


import './App.scss';
import LinksContainer from './components/LinksContainer'
import LinksForm from './components/LinksForm'
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LinksContainer} />
        <Route path={routes.links.new} component={LinksForm} />
      </div>
    );
  }
}

export default App;
