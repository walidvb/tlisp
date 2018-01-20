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
import NewsletterPage from './components/static/NewsletterPage';
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
      </div>
    )
  }
}

class App extends Component {
  state = {
    loading: true
  }
  componentDidMount() {
    this.props.getUserDetails();
  }
  componentWillReceiveProps(props){
    let loggedIn = false;
    if(props.user.authenticated){
      loggedIn = true;
    }
    this.setState({
      loading: false,
      loggedIn,
    })

  }
  render() {
    const { loading, loggedIn } = this.state;
    return (
      <div className="App">
        { loading ? "LOADING" : (
          !loggedIn ? <NewsletterPage /> :
          <Switch>
            <Route path={routes.links.new} component={LinksForm} />
            <Route path={"/"} component={AppWrapper} />
          </Switch>)
        }
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>({
  getUserDetails: () => dispatch(getUserDetails()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
