import React from 'react'
import styles from './Title.scss'

const logo = require('../assets/images/logo.svg');
function Title({ large }) {
    return (
        <h1 className={[styles.site_name, large ? styles.large : styles.normal].join(' ')}>
            <img src={logo} />
        </h1>
    )
}

export default Title
