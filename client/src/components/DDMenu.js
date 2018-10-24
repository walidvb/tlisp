import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
        const { panelsOn } = this.state;
        const panelsStyles = panelsOn ? {} : { display: 'none' }
        return (
            <div className={styles.container}>
                <Tabs 
                    onSelect={this.handlePanelToggle.bind(this)}
                    disabledTabClassName={styles.disabled}
                >
                    <TabList className={styles.menuWrapper} style={{ borderBottom: `1px solid ${panelsOn ? '#f2f2f2' : 'transparent'}` }}>
                        {['explore', 'playlists', 'player'].map( menu => <Tab 
                            key={menu}
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