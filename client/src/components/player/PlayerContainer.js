import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player'

import IFramePlaceholder from './IFramePlaceholder';

import trackPlay from '../../analytics/trackPlay';
import * as playerActions from '../../actions/playerActions';
import styles from './PlayerContainer.scss';

class PlayerContainer extends Component {
    static propTypes = {
        tracklist: PropTypes.array.isRequired,
        currentlyPlaying: PropTypes.object,
        noTracking: PropTypes.bool
    }
    static defaultProps = {
        noTracking: false
    }
    componentWillReceiveProps({ noTracking, seek, currentlyPlaying }){
        if (!noTracking && currentlyPlaying !== this.props.currentlyPlaying){
            trackPlay(currentlyPlaying);
        }
    }
    playNext(i){
        const { currentlyPlaying, tracklist, play } = this.props;
        for (let i = 0; i < tracklist.length; i++) {
            const track = tracklist[i];
            if (currentlyPlaying.id == track.id && i < tracklist.length ){
                play(tracklist[i + 1])
                return;
            }
        }
        this.props.pause();
    }
    renderTrack(t, i){
        const isPlaying = this.props.currentlyPlaying && this.props.currentlyPlaying.id == t.id;
        return (
            <div key={i} className={[styles.track, isPlaying ? styles.playing : null].join(' ')} onClick={() => this.props.playTrack(t)}>
                {t.title}
            </div>
        )
    }
    renderCurrentlyPlaying(){
        if (this.props.currentlyPlaying === undefined){
            return null;
        }
        const { title, url } = this.props.currentlyPlaying;
        const canPlay = ReactPlayer.canPlay(url);
        return (
            <div>
                <div className={styles.currentlyPlaying}>
                    <IFramePlaceholder />
                </div>
                <h2 className={styles.title__playing}>{canPlay ? null : <span className="fa fa-warning" />} &nbsp;{title}</h2>
            </div>
        )
    }
    render() {
        const { tracklist, placement, displayType } = this.props;
        return (
            <div className={styles.container}>
                { this.renderCurrentlyPlaying() }
                <div className={styles.tracklist} >NEXT UP:</div>
                <div className={[styles.tracklist, styles[`${placement}`], styles[displayType]].join(' ')}>
                    {tracklist.map(this.renderTrack.bind(this)).reverse()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ player }, ownProps) => ({
    ...player
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(playerActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);