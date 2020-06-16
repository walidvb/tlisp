import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './DDTooltip.scss';

export default class DDTooltip extends Component {
    static propTypes = {

    }
    state= {
        open: false,
    }
    toggleDisplay() {
        this.setState({
            open: !this.state.open,
            showCount: false,
        })
    }
    render() {
        const { open } = this.state;
        return (
            <div style={{position: 'relative'}}>
                <div className={[styles.drawer, open ? styles.open : styles.closed, styles.container].join(' ')}>
                    { this.props.children }
                </div>
                <div onClick={this.toggleDisplay.bind(this)}>
                { this.props.trigger }
                </div>
            </div>
        )
    }
}
