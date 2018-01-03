import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PlayerContainer from './player/PlayerContainer';
import Controls from './player/Controls'

import styles from './DDMenu.scss';

class DDMenu extends Component {
    static propTypes = {

    }
    constructor(){
        super();
        this.state = {
            playerOpen: false,
        };
    }
    render() {
        const { playerOpen } = this.state;
        return (
            <div className={styles.container}>
                <ul className={styles.links_wrapper}>
                    <li>
                        <Controls togglePlayer={() => this.setState({playerOpen: !playerOpen})}/>
                        <div className={[styles.panel, playerOpen ? styles.panel__open : ""].join(' ')}>
                            <PlayerContainer />
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DDMenu;