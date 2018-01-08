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

const CONFIG = 'CONFIG';
let config = JSON.parse(localStorage.getItem(CONFIG)) || {
    displayType: 'horizontal',
    panelPlacement: 'under',
    x: 0,
    y: 0,
    showHelpOnStartup: true,
    panelOpen: 'help',
}
console.log(config);
class DDMenu extends Component {
    static propTypes = {

    }
    state = { 
        config: {
            ...config,
            panelOpen: config.showHelpOnStartup ? 'help' : config.panelOpen
        } 
    };
    togglePanel(panelName){
        this.setState({
            config: {
                ...this.state.config,
                panelOpen: this.state.config.panelOpen === panelName ? undefined : panelName,
            }
        })
    }
    handlePanelPlacement({ clientX, clientY }, { node }){
        const panelPlacement = this.state.config.displayType == 'vertical' ? 
            (clientX < 450 ? 'right' : 'left') : 
            (clientY + node.clientHeight < window.innerHeight - 250 ? 'under' : 'over');

        this.setState({
            config: {
                ...this.state.config,
                panelPlacement,
            }
        }, this.storeConfig.bind(this));
    }
    storeConfig(){
        localStorage.setItem(CONFIG, JSON.stringify(this.state.config))
    }
    toggleDisplayType() {
        const displayType = this.state.config.displayType == 'vertical' ? 'horizontal' : 'vertical'
        this.setState({
            config: {
                ...this.state.config,
                displayType,
                panelPlacement: displayType == 'vertical' ? 'left' : 'under',
            }
        }, this.storeConfig.bind(this));
        console.log(displayType)
        
    }
    handleDragStop(evt, { node }){
        if (node.style.transform.length){
            const [all, x, y] = /\((-?\d+)px, (\d+)px\)/.exec(node.style.transform);
            this.setState({
                config: {
                    ...this.state.config,
                    x: parseInt(x),
                    y: parseInt(y)
                }
            })
        }
        this.setState({ dragging: false });
    }
    render() {
        const { displayType, panelOpen, panelPlacement } = this.state.config;
        const defaultPosition = {
            x: Math.max(config.x, 0),
            y: Math.max(config.y, 0),
        }
        return (
            <div className={[styles.wrapper, styles[displayType]].join(' ')} >
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
                            <div className={`handle fa fa-arrows ${styles.handle} ${styles.move}`} />
                            <div className={`handle fa fa-window-minimize ${styles.handle}`} onMouseUp={this.toggleDisplayType.bind(this)} />
                        </div>
                        <div>
                            <ul className={[styles.links_wrapper, styles[displayType]].join(' ')}>
                                <li className={panelOpen === 'filters' ? styles.menu__open : ""}>
                                    <Link className="flex w-100" to={"/explore"} onClick={() => this.togglePanel('filters')}> 
                                        <span className={`fa fa-${panelOpen === 'filters' ? 'arrow-left' : 'group'} ${styles.icon}`} />
                                        <span className={styles.link_title} >Explore</span>
                                    </Link>
                                    <div className={[styles.panel].join(' ')}>
                                        <LinkUI displayType={displayType}/>
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
                            <div className={[styles.links_wrapper, styles.submenu, panelOpen === 'help' ? styles.menu__open : ""].join(' ')}>
                                <div className={styles.menu} onClick={() => this.togglePanel('help')}> Help </div>
                                <div className={[styles.panel].join(' ')}>
                                    <Bookmarklet showHelpOnStartup={config.showHelpOnStartup}/>
                                </div>
                            </div>
                        </div>
                        <div className={panelOpen === 'player' ? styles.menu__open : ""}>
                            <Controls displayType={displayType} togglePlayer={() => this.togglePanel('player')} />
                            <div className={[styles.panel].join(' ')}>
                                <PlayerContainer displayType={displayType} placement={panelPlacement} />
                            </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        )
    }
}

export default DDMenu;