import React, { Component } from 'react';
import {
  Route, Switch
} from 'react-router-dom'


import './App.scss';
/* eslint-disable */
import '!style-loader!css-loader!sass-loader!./generic_no_transform.scss';
import LinksContainer from './components/links/LinksContainer'
import LinksForm from './components/links/LinksForm';
import DDMenu from './components/DDMenu';
import PlayerContainer from './components/player/PlayerContainer';
import routes from './routes';


class AppWrapper extends Component {
  render() {
    return (
      <div>
        <DDMenu />
        <LinksContainer />
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path={routes.links.new} component={LinksForm} />
          <Route path={"/"} component={AppWrapper} />
        </Switch>
      </div>
    );
  }
}

export default App;
