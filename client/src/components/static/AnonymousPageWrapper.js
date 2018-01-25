import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { request, routes } from '../../request';

import ScrollingList from './ScrollingList';
import styles from './AnonymousPageWrapper.scss';

const ReactRotatingText = require('react-rotating-text');

export default class AnonymousPageWrapper extends Component {
    static propTypes = {

    }
    state = {
        by: Math.random() > .5 ? 'friends' : 'diggers',
        for: Math.random() > .5 ? 'friends' : 'diggers',
    }
    componentDidMount() {
        this.randomize('by');
        setTimeout(() => this.randomize('for'), 1000);
    }
    randomize(key) {
        const timeout = () => {
            setTimeout(() => {
                let state = {}
                state[key] = Math.random() > .5 ? 'friends' : 'diggers';
                this.setState(state);
                timeout();
            }, 2000)
        }
        timeout();
    }
    render() {
        return (
            <div>
                <ScrollingList />
                <h3 className={styles.container_header}>Welcome back to how it all started</h3>
                <div className={styles.container}>
                    <div className={styles.slogan}>Digging, by &nbsp;
                                    <ReactRotatingText style={{ minWidth: '7ch', display: 'inline-block', textAlign: 'left' }} items={['friends', 'diggers']} cursor={false} eraseMode="erase" pause={Math.random() * 2000 + 1000} /> 
                                     for&nbsp;
                                     <ReactRotatingText style={{ minWidth: '7ch', display: 'inline-block', textAlign: 'left' }} items={['friends', 'diggers']} cursor={false} eraseMode="erase" pause={Math.random()*2000+1000} /> 
                                     </div>
                    <div className={styles.center}>
                        {this.props.children}
                    </div>
                </div>
                <div className={styles.container_header} style={{ textAlign: 'right' }}>By <span style={{ fontWeight: 'bold' }}>walidvb</span></div>
            </div>
        )
    }
}
