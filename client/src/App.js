import React, { Component } from 'react';
import {
  Route, Switch, withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserDetails } from './actions/userActions';


import  styles from './App.scss';
/* eslint-disable */
import '!style-loader!css-loader!sass-loader!./generic_no_transform.scss';
import LinksContainer from './components/links/LinksContainer'
import LinksForm from './components/links/LinksForm';
import DDMenu from './components/DDMenu';
import NewsletterPage from './components/static/NewsletterPage';
import NotificationsList from './components/notifications/NotificationsList';
import PlayerContainer from './components/player/PlayerContainer';
import Title from './components/Title'

import routes from './routes';


class AppWrapper extends Component {

  render() {
    return (
      <div>
        <DDMenu />
        <LinksContainer />
        <NotificationsList />
      </div>
    )
  }
}

class App extends Component {
  state = {
    loading: true,
    logginedIn: true,
  }
  componentDidMount() {
    this.props.getUserDetails();
  }
  componentWillReceiveProps(props){
    let loggedIn = false;
    if(props.user.authenticated){
      loggedIn = false;
    }
    this.setState({
      loading: false,
      loggedIn,
    })

  }
  renderLoading(){
    return <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}><Title /></div>
  }
  render() {
    const { loading, loggedIn } = this.state;
    console.log(styles)
    return (
      <div className={[styles.app, styles.appear].join(' ')} >
        { loading ? this.renderLoading() : (
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
