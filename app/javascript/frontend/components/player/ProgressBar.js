import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as playerActions from '../../actions/playerActions';
import { ProgressBar } from 'react-player-controls'

import styles from './Controls.scss';
const ProgressBar_ = (props) => {
    return null
    return (
        <ProgressBar
            className={[styles.progress, "ProgressBar"].join(' ')}
            totalTime={100}
            currentTime={props.progress * 100}
            isSeekable={true}
            onSeek={props.onSeek}
        // onSeekStart={seekTime => { /* perhaps freeze a video frame? */ }}
        // onSeekEnd={seekTime => { /* perform seek: */ audioEl.currentTime = seekTime }}
        // onIntent={seekTime => { /* f.i. update intended time marker */ }}
        />
    )
}

const mapStateToProps = ({ player }, ownProps) => ({ ...player })
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(playerActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar_)
