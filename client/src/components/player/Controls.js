import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import * as playerActions from '../../actions/playerActions';

import { ProgressBar, PlaybackControls } from 'react-player-controls'
/* eslint-disable */
import '!style-loader!css-loader!./Controls.css';
import styles from  './Controls.scss';
const Controls = (props) => {
    return (
        <div className={styles.container}>
            <div className={`fa fa-list ${styles.player_toggler}`} onClick={props.togglePlayer}>
            </div>
            <PlaybackControls
                isPlayable={props.tracklist.length > 0}
                isPlaying={props.playing}
                onPlaybackChange={props.playing ? props.pause : props.play}
                showPrevious={false}
                // hasPrevious={currentSong > 0}
                onPrevious={props.prev}
                showNext={true}
                hasNext={true}
                onNext={props.next}
                className={[styles.controls, "PlaybackControls"].join(' ')}
            />
            <ProgressBar
                className={[styles.progress, "ProgressBar"].join(' ')}
                totalTime={100}
                currentTime={props.progress*100}
                isSeekable={true}
                onSeek={props.onSeek}
                // onSeekStart={seekTime => { /* perhaps freeze a video frame? */ }}
                // onSeekEnd={seekTime => { /* perform seek: */ audioEl.currentTime = seekTime }}
                // onIntent={seekTime => { /* f.i. update intended time marker */ }}
            />
            {!props.currentlyPlaying ? null : 
                <div className={styles.track_info}>
                    {props.currentlyPlaying.title}
                </div>
            }
        </div>
    )
}

const mapStateToProps = ({ player }, ownProps) => ({ ...player })
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(playerActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(Controls)
