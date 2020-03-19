import React from 'react'
import { bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import { PlaybackControls } from 'react-player-controls'

import Marquee from './Marquee';
import ProgressBar from './ProgressBar';

import * as playerActions from '../../actions/playerActions';


/* eslint-disable */
import '!style-loader!css-loader!./Controls.css';
import styles from  './Controls.scss';
const Controls = (props) => {
    return (
        <div className={[styles.container, props.displayType == 'vertical' ? styles.vertical : null].join(' ')}>
            <div className={styles.controls}>
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
                <ProgressBar />
            </div>
            <div onClick={props.togglePlayer} className={styles.track_info} style={{display: "flex"}}>
                <div className={`fa fa-list ${styles.player_toggler}`}>
                </div>
                {!props.currentlyPlaying ? null : 
                    <div className= { styles.track_name }>
                        <Marquee  text={props.currentlyPlaying.title} />
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ player }, ownProps) => ({ ...player })
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(playerActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(Controls)
