import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { request, routes } from '../../request';

import ScrollingList from './ScrollingList';
import Title from '../Title';
import styles from './NewsletterPage.scss';
import listStyles from '../links/LinkList.scss';
export default class NewsletterPage extends Component {
    static propTypes = {

    }
    state = {
        by: Math.random() > .5 ? 'friends' : 'diggers',
        for: Math.random() > .5 ? 'friends' : 'diggers',
    }
    renderForm(){
        return "THE FORM";
    }
    componentDidMount() {
        this.randomize('by');
        this.randomize('for');
    }
    randomize(key){
        const timeout = () => {
            setTimeout( () => {
                let state = {}
                state[key] = Math.random() > .5 ? 'friends' : 'diggers';
                this.setState(state);
                timeout();
            }, Math.random()*1000+2000)
        }
        timeout();
    }
    render() {
        return (
            <div>
                <ScrollingList />
                <h3 className={styles.container_header}>Welcome back to how it all started</h3>
                <div className={styles.container}>
                    <div className={styles.slogan}>Digging, by {this.state.by} for {this.state.for}</div>
                    <div className={styles.center}>
                        <Title />
                        {/* {this.renderForm()} */}
                    </div>
                    {/* <div className={styles.supported}>
                        <div className={styles.title}>
                            Supported Services
                        </div>
                        <ul>
                            <li>Soundcloud</li>
                            <li>Bandcamp</li>
                            <li>Youtube</li>
                            <li>Mixcloud</li>
                            <li>And many more...</li>
                        </ul>
                    </div> */}
                </div>
                <div className={styles.container_header} style={{textAlign: 'right'}}>By a friend</div>
            </div>
        )
    }
}
