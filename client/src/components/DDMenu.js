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

const showHelpOnStartup = (localStorage.getItem('dont-show-help-on-startup') !== "true")
let panelPositionOnStartup = JSON.parse(localStorage.getItem('panelPositionOnStartup')) || {
    panelPlacement: 'under',
    x: 0,
    y: 0,
}

console.log(panelPositionOnStartup)
class DDMenu extends Component {
    static propTypes = {

    }
    state = {
        panelOpen: showHelpOnStartup ? 'help' : undefined,
        panelPlacement: 'under',
    };
    togglePanel(panelName){
        this.setState({
            panelOpen: this.state.panelOpen === panelName ? undefined : panelName,
        })
    }
    handlePanelPlacement({ clientY }, { node }){
        const panelPlacement = clientY + node.clientHeight < window.innerHeight - 250 ? 'under' : 'over';

        this.setState({
            panelPlacement
        });
        panelPositionOnStartup.panelPlacement = panelPlacement;
        localStorage.setItem('panelPositionOnStartup', JSON.stringify(panelPositionOnStartup))
    }
    handleDragStop(evt, { node }){
        if (node.style.transform.length){
            const [all, x, y] = /\((-?\d+)px, (\d+)px\)/.exec(node.style.transform);
            panelPositionOnStartup.x = parseInt(x);
            panelPositionOnStartup.y = parseInt(y)
            localStorage.setItem('panelPositionOnStartup', JSON.stringify(panelPositionOnStartup))
        }
    }
    render() {
        const { panelOpen, panelPlacement } = this.state;
        return (
            <Draggable handle=".handle" 
                onStop={this.handleDragStop.bind(this)}
                onStart={() => this.setState({ dragging: true })}
                onDrag={this.handlePanelPlacement.bind(this)}
                defaultPosition={panelPositionOnStartup}
            >
                <div onScroll={(e) => e.stopPropagation()} className={[styles.container, styles[`panel__${panelPlacement}`]].join(' ')}>
                    <div className={`handle fa fa-arrows ${styles.handle}`} onMouseUp={this.toggleMenus} />
                    <div>
                        <ul className={styles.links_wrapper}>
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
                        </ul>
                        <div className={[styles.links_wrapper, styles.submenu].join(' ')}>
                            <a href="#" className={panelOpen === 'help' ? styles.menu__active : ""} onClick={() => this.togglePanel('help')}> Help </a>
                            <div className={[styles.panel, panelOpen === 'help' ? styles.panel__open : ""].join(' ')}>
                                <Bookmarklet showHelpOnStartup={showHelpOnStartup}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Controls togglePlayer={() => this.togglePanel('player')} />
                        <div className={[styles.panel, panelOpen === 'player' ? styles.panel__open : ""].join(' ')}>
                            <PlayerContainer placement={panelPlacement} />
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

export default DDMenu;