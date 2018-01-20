import React, { Component } from 'react';
import {
  Route, Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserDetails } from './actions/userActions';


import './App.scss';
/* eslint-disable */
import '!style-loader!css-loader!sass-loader!./generic_no_transform.scss';
import LinksContainer from './components/links/LinksContainer'
import LinksForm from './components/links/LinksForm';
import DDMenu from './components/DDMenu';
import NotificationsList from './components/notifications/NotificationsList';
import PlayerContainer from './components/player/PlayerContainer';
import routes from './routes';


class AppWrapper extends Component {

  render() {
    return (
      <div>
        {this.props.editing}
        <DDMenu />
        <LinksContainer />
        <NotificationsList />
        { this.props.editing ? <LinksForm asIFrame={false} id={this.props.editing} /> : null }
      </div>
    )
  }
}


class App extends Component {

  componentDidMount() {
    this.props.getUserDetails();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path={routes.links.new} component={LinksForm} />
          <Route path={"/"} component={() => <AppWrapper editing={this.props.editing}/>} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  editing: state.links.editing
})

const mapDispatchToProps = (dispatch) =>({
  getUserDetails: () => dispatch(getUserDetails()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
