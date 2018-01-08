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

const PANEL_POSITION_ON_STARTUP = 'panelPositionOnStartup';
const showHelpOnStartup = (localStorage.getItem('dont-show-help-on-startup') !== "true")
let panelPositionOnStartup = JSON.parse(localStorage.getItem(PANEL_POSITION_ON_STARTUP)) || {
    panelPlacement: 'under',
    x: 0,
    y: 0,
}

class DDMenu extends Component {
    static propTypes = {

    }
    state = {
        panelOpen: showHelpOnStartup ? 'help' : undefined,
        panelPlacement: 'left',
        displayType: 'vertical',
    };
    togglePanel(panelName){
        this.setState({
            panelOpen: this.state.panelOpen === panelName ? undefined : panelName,
        })
    }
    handlePanelPlacement({ clientX, clientY }, { node }){
        const panelPlacement = this.state.displayType == 'vertical' ? 
            (clientX < 450 ? 'right' : 'left') : 
            (clientY + node.clientHeight < window.innerHeight - 250 ? 'under' : 'over');

        this.setState({
            panelPlacement
        });
        panelPositionOnStartup.panelPlacement = panelPlacement;
        localStorage.setItem(PANEL_POSITION_ON_STARTUP, JSON.stringify(panelPositionOnStartup))
    }
    toggleDisplayType() {
        this.setState({
            displayType: this.state.displayType == 'vertical' ? 'horizontal' : 'vertical',
        });
    }
    handleDragStop(evt, { node }){
        if (node.style.transform.length){
            const [all, x, y] = /\((-?\d+)px, (\d+)px\)/.exec(node.style.transform);
            panelPositionOnStartup.x = parseInt(x);
            panelPositionOnStartup.y = parseInt(y)
            localStorage.setItem(PANEL_POSITION_ON_STARTUP, JSON.stringify(panelPositionOnStartup))
        }
    }
    render() {
        const { panelOpen, panelPlacement } = this.state;
        const defaultPosition = {
            x: Math.max(panelPositionOnStartup.x, 0),
            y: Math.max(panelPositionOnStartup.y, 0),
        }
        return (
            <div className={[styles.wrapper, styles[this.state.displayType]].join(' ')} >
                <div className={styles.backdrop} /> 
                <Draggable 
                    handle={`.${styles.handles}`} 
                    onStop={this.handleDragStop.bind(this)}
                    onStart={() => this.setState({ dragging: true })}
                    onDrag={this.handlePanelPlacement.bind(this)}
                    defaultPosition={defaultPosition}
                >
                    <div 
                        onScroll={(e) => e.stopPropagation()} 
                        className={[styles.container, styles[`panel__${panelPlacement}`]].join(' ')}
                    >
                        <div className={styles.handles}>
                            <div className={`handle fa fa-arrows ${styles.handle}`} />
                            <div className={`handle fa fa-window-minimize ${styles.handle}`} onMouseUp={this.toggleDisplayType.bind(this)} />
                        </div>
                        <div>
                            <ul className={[styles.links_wrapper, styles[this.state.displayType]].join(' ')}>
                                <li className={panelOpen === 'filters' ? styles.menu__open : ""}>
                                    <Link className="flex w-100" to={"/explore"} onClick={() => this.togglePanel('filters')}> 
                                        <span className={`fa fa-${panelOpen === 'filters' ? 'arrow-left' : 'group'} ${styles.icon}`} />
                                        <span className={styles.link_title} >Cliques </span>
                                    </Link>
                                    <div className={[styles.panel].join(' ')}>
                                        <LinkUI />
                                    </div>
                                </li>
                                <li className={panelOpen === 'playlists' ? styles.menu__open : ""}>
                                    <Link className="flex w-100" to={"/me"} onClick={() => this.togglePanel('playlists')}> 
                                        <span className={`fa fa-${panelOpen === 'playlists' ? 'arrow-left' : 'hand-peace-o'} ${styles.icon}`} />
                                        <span className={styles.link_title} >My Digs</span>
                                    </Link>
                                    <div className={[styles.panel].join(' ')}>
                                        <PlaylistList />
                                    </div>
                                </li>
                            </ul>
                            <div className={[styles.links_wrapper, styles.submenu].join(' ')}>
                                <div className={panelOpen === 'help' ? `${styles.menu__active} ${styles.menu}` : styles.menu} onClick={() => this.togglePanel('help')}> Help </div>
                                <div className={[styles.panel, panelOpen === 'help' ? styles.panel__open : ""].join(' ')}>
                                    <Bookmarklet showHelpOnStartup={showHelpOnStartup}/>
                                </div>
                            </div>
                        </div>
                        <div className={panelOpen === 'player' ? styles.menu__open : ""}>
                            <Controls displayType={this.state.displayType} togglePlayer={() => this.togglePanel('player')} />
                            <div className={[styles.panel].join(' ')}>
                                <PlayerContainer displayType={this.state.displayType} placement={panelPlacement} />
                            </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        )
    }
}

export default DDMenu;