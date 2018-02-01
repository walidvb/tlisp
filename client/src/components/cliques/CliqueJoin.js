import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import LoginForm from '../user/LoginForm';
import Title from '../Title';

import styles from './CliqueJoin.scss';
import { routes, request } from '../../request';
class CliqueJoin extends Component {
    static propTypes = {

    }
    state = {
        displayForm: false,
        clique: {},
    }
    componentDidMount() {
        request(`${routes.api.cliques}/${this.props.match.params.name}`)
        .then(clique => {
            this.setState({
                clique
            })
        });
    }
    renderInvitation(){
        return (<div className={styles.container}>
            <h1 className={styles.title}>You've been invited to join a clique at </h1>
            <Title />
            <div className={styles.actionWrappers}>
                <div onClick={() => this.setState({ displayForm: true })} className="button button__border"> Sign up and Join </div>
                <div> {this.state.clique.name} </div>
            </div>
        </div>)
    }
    render() {
        return this.state.displayForm ? <LoginForm clique={this.state.clique} isSignUp={true} /> : this.renderInvitation()
    }
}

export default withRouter(CliqueJoin);