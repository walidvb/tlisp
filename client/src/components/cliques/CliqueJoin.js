import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import LoginForm from '../user/LoginForm';
import Title from '../Title';

import styles from './CliqueJoin.scss';

class CliqueJoin extends Component {
    static propTypes = {

    }
    state = {
        displayForm: false,
    }
    renderInvitation(){
        return (<div>
            <h1 className={styles.title}>You've been invited to join a clique at </h1>
            <Title />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div onClick={() => this.setState({ displayForm: true })} className="button button__border"> Sign up and Join </div>
                <div> THE ALPHAS </div>
            </div>
        </div>)
    }
    render() {
        const cliqueSlug = this.props.match.params.name;
        return (
            <div>
                { this.state.displayForm ? <LoginForm cliqueSlug={cliqueSlug} /> : this.renderInvitation() }
            </div>
        )
    }
}

export default withRouter(CliqueJoin);