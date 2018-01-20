import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { request, routes } from '../../request';

import ScrollingList from './ScrollingList';

import styles from './NewsletterPage.scss';
import listStyles from '../links/LinkList.scss';
export default class NewsletterPage extends Component {
    static propTypes = {

    }
    state = {
    }
    renderForm(){
        return "THE FORM";
    }
    render() {
        return (
            <div>
                <ScrollingList />
                <h3 className={styles.container_header}>Welcome back to digging 1.0</h3>
                <div className={styles.container}>
                    <div className={styles.slogan}>By friends, for friends</div>
                    <div className={styles.center}>
                        <h1 className={styles.site_name}><div className={styles.top}>DIGGERS'</div> DELIGHTS</h1>
                        {this.renderForm()}
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
