import React, { Component } from 'react';
import {
  Route, Switch, withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux'
import { getUserDetails } from './actions/userActions';

import styles from './App.scss';
import tooltipStyles from './components/ui_components/DDTooltip.scss';
/* eslint-disable */
import '!style-loader!css-loader!sass-loader!./generic_no_transform.scss';
import AnonymousPageWrapper from './components/static/AnonymousPageWrapper';
import Bookmarklet from './components/Bookmarklet';
import CliqueJoin from './components/cliques/CliqueJoin';
import DDMenu from './components/DDMenu';
import DDTooltip from './components/ui_components/DDTooltip';
import IFrameAbsolute from './components/player/IFrameAbsolute';
import ForgotPassword from './components/user/ForgotPassword';
import LinksContainer from './components/links/LinksContainer'
import LinksForm from './components/links/LinksForm';
import LoginForm from './components/user/LoginForm';
import NewsletterPage from './components/static/NewsletterPage';
import NotificationsList from './components/notifications/NotificationsList';
import ExternalPlaylist from './components/external/ExternalPlaylist'
import Title from './components/Title'

import routes from './routes';

class AppWrapper extends Component {

  render() {
    return (
      <div>
        <DDMenu />
        <LinksContainer {...this.props}/>
        <div className={styles.triggerWrapper}>
          <NotificationsList />
        </div>
      </div>
    )
  }
}

class App extends Component {
  state = {
    loading: true,
  }
  componentDidMount() {
    this.props.getUserDetails();
    this.setState({loading: false})
  }
  componentWillReceiveProps(props){
    const { user, history, location: { pathname }  } = props;
    // automatically redirect the user on auth
    console.log("props", props)
    if (this.state.loading && pathname == '/'){
      if(user.authenticated){
        history.replace(routes.links.explore);
      }
      else{
        history.replace(routes.newsletter);
      }
    }
    this.setState({
      loading: false,
    })
  }
  renderLoading(){
    return <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}><Title /></div>
  }
  renderAuthenticatedRoutes(){
    return <Switch>
      <Route path={routes.links.new} component={LinksForm} />
      <Route path={"/:mainPath?"} component={AppWrapper} />
    </Switch>
  }
  renderAnonymousRoutes(){
    return (
    <AnonymousPageWrapper>
      <Switch>
        <Route exact path={routes.newsletter} component={NewsletterPage} />
        <Route path={'/cliques/:name/join'} component={CliqueJoin} />
        <Route path={routes.user.forgotPassword} render={() => <ForgotPassword />} />
        <Route path={'/'} render={() => <LoginForm isSignUp={false} />} />
      </Switch>
    </AnonymousPageWrapper>)
  }
  render() {
    const { loading } = this.state;
    return (
      <div className={[styles.app, styles.appear].join(' ')} >
        { loading ? this.renderLoading() : this.renderAll() }
        <IFrameAbsolute />
        <DDTooltip trigger={<div className={[styles.trigger, "fa fa-question"].join(' ')} />}>
          <Bookmarklet />
        </DDTooltip>
      </div>
    );
  }
  renderAll(){
    return <Switch>
      <Route path="/curated/:curatedListID?" component={ExternalPlaylist} />
      {this.props.user.authenticated ? this.renderAuthenticatedRoutes() : this.renderAnonymousRoutes()}
    </Switch>
  }
}


const mapStateToProps = (state, ) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>({
  getUserDetails: () => dispatch(getUserDetails()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
