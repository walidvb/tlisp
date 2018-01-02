import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom'


import './App.scss';
import LinksContainer from './components/links/LinksContainer'
import LinksForm from './components/links/LinksForm';
import DDMenu from './components/DDMenu';
import PlayerContainer from './components/player/PlayerContainer';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DDMenu />
        <Route exact path="/" component={LinksContainer} />
        <Route path={routes.links.new} component={LinksForm} />
      </div>
    );
  }
}

export default App;
