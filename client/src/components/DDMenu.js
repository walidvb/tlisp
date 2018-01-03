import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import Controls from './player/Controls'
import PlayerContainer from './player/PlayerContainer';
import PlaylistList from './playlists/PlaylistList';
import LinkUI from './links/LinkUI';

import styles from './DDMenu.scss';

class DDMenu extends Component {
    static propTypes = {

    }
    state = {
        panelOpen: undefined,
    };
    togglePanel(panelName){
        this.setState({
            panelOpen: this.state.panelOpen === panelName ? undefined : panelName,
        })
    }
    render() {
        const { panelOpen } = this.state;
        return (
            <div className={styles.container}>
                <ul className={styles.links_wrapper}>
                    <li>
                        <Link to={"/explore"} onClick={() => this.togglePanel('filters')}> Explore </Link>
                        <div className={[styles.panel, panelOpen==='filters' ? styles.panel__open : ""].join(' ')}>
                            <LinkUI />
                        </div>
                    </li>
                    <li>
                        <Link to={"/me"} onClick={() => this.togglePanel('playlists')}> My Crates </Link>
                        <div className={[styles.panel, panelOpen === 'playlists' ? styles.panel__open : ""].join(' ')}>
                            <PlaylistList />
                        </div>
                    </li>
                    <li>
                        <Controls togglePlayer={() => this.togglePanel('player')}/>
                        <div className={[styles.panel, panelOpen==='player' ? styles.panel__open : ""].join(' ')}>
                            <PlayerContainer />
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DDMenu;