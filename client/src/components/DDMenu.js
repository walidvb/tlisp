import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Controls from './player/Controls'
import PlayerContainer from './player/PlayerContainer';
import PlaylistList from './playlists/PlaylistList';
import LinkUI from './links/LinkUI';

import styles from './DDMenu.scss';

class DDMenu extends Component {
    static propTypes = {
    }
    state = {
        panelsOn: false,
        currentIndex: 0
    }
    handlePanelToggle(index, lastIndex){
        this.setState({
            panelsOn: (index === lastIndex) && this.state.panelsOn ? false : true,
        })
    }
    render() {
        const panelsStyles = this.state.panelsOn ? {} : { display: 'none' }
        return (
            <div className={styles.container}>
                <Tabs onSelect={this.handlePanelToggle.bind(this)} disabledTabClassName={styles.disabled} >
                    <TabList className={styles.menuWrapper}>
                        {['explore', 'playlists', 'player'].map( menu => <Tab 
                            className={styles.menuItem}
                        >{menu}</Tab>)}
                    </TabList>
                    <div style={panelsStyles} className={styles.tabsWrapper}>
                        <TabPanel>
                            <LinkUI />
                        </TabPanel>
                        <TabPanel><PlaylistList /></TabPanel>
                        <TabPanel><PlayerContainer /></TabPanel>
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default DDMenu;