import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable';

import Bookmarklet from './Bookmarklet';
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
    handlePanelPosition({ clientY }, { node }){
        const panelPosition = clientY + node.clientHeight < window.innerHeight - 250 ? 'top' : 'bottom';
        this.setState({
            panelPosition
        });
    }
    render() {
        const { panelOpen, panelPosition } = this.state;
        return (
            <Draggable handle=".handle" 
                onStop={() => this.setState({ dragging: false })}
                onStart={() => this.setState({ dragging: true })}
                onDrag={this.handlePanelPosition.bind(this)}
            >
                <div className={styles.container}>
                    <ul className={[styles.links_wrapper, styles[`panel__${panelPosition}`]].join(' ')}>
                        <li className={`handle fa fa-arrows ${styles.handle}`} onMouseUp={this.toggleMenus} />
                        <li>
                            <Link className={panelOpen === 'filters' ? styles.menu__active : ""} to={"/explore"} onClick={() => this.togglePanel('filters')}> Explore </Link>
                            <div className={[styles.panel, panelOpen==='filters' ? styles.panel__open : ""].join(' ')}>
                                <LinkUI />
                            </div>
                        </li>
                        <li>
                            <Link className={panelOpen === 'playlists' ? styles.menu__active : ""} to={"/me"} onClick={() => this.togglePanel('playlists')}> My Crates </Link>
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
                    <ul className={[styles.links_wrapper, styles.submenu].join(' ')}>
                        <a href="#" className={panelOpen === 'help' ? styles.menu__active : ""} onClick={() => this.togglePanel('help')}> Help </a>
                        <div className={[styles.panel, panelOpen === 'help' ? styles.panel__open : ""].join(' ')}>
                            <Bookmarklet />
                        </div>
                    </ul>
                </div>
            </Draggable>
        )
    }
}

export default DDMenu;