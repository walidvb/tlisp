import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player'

import IFramePlaceholder from './IFramePlaceholder';

import trackPlay from '../../analytics/trackPlay';
import * as playerActions from '../../actions/playerActions';
import styles from './PlayerContainer.scss';
import Embed from './Embed';

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
            if (currentlyPlaying.id === track.id && i < tracklist.length ){
                play(tracklist[i + 1])
                return;
            }
        }
        this.props.pause();
    }
    renderTrack(t, i){
        const isPlaying = this.props.currentlyPlaying && this.props.currentlyPlaying.id == t.id;
        return (
            <div key={i} className={["flex", styles.track, isPlaying ? styles.playing : null].join(' ')} onClick={() => this.props.playTrack(t)}>
                <div className="w-8 mr-2">
                    <img alt="thumbnail" src={t.thumbnail_url}/>
                </div>
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
        if(this.props.floatingPlayer){
            return (
                <div style={{flexGrow: 2}}>
                    <div className={[styles.currentlyPlaying, 'flex-grow'].join(' ')}>
                        <IFramePlaceholder />
                    </div>
                    <h2 className={styles.title__playing}>{canPlay ? null : <span className="fa fa-warning" />} &nbsp;{title}</h2>
                </div>
            )
        }

        return <div style={{flex: 2}}>
            <div className={"sticky top-0 mr-2"}>
                <Embed />
            </div>
        </div>
    }
    render() {
        const { tracklist, placement, displayType } = this.props;
        return (
            <div className={[styles.container, 'flex'].join(' ')}>
                { this.renderCurrentlyPlaying() }
                <div className="flex-shrink">
                    <div className={styles.tracklist} >NEXT UP:</div>
                    <div className={[styles.tracklist, styles[`${placement}`], styles[displayType]].join(' ')}>
                        {tracklist.map(this.renderTrack.bind(this)).reverse()}
                    </div>
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