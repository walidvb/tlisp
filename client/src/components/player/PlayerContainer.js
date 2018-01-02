import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player'

import * as playerActions from '../../actions/playerActions';
import styles from './PlayerContainer.scss';

class PlayerContainer extends Component {
    static propTypes = {
        tracklist: PropTypes.array.isRequired,
        currentlyPlaying: PropTypes.object,
    }
    componentWillReceiveProps({ seek }){
        if(seek !== this.props.seek && this.player){
            console.log(seek)
            this.player.seekTo(seek);
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
            <div key={i} className={styles.track} onClick={() => this.props.playTrack(t)}>
                {t.title}
                {!isPlaying ? <div className="fa fa-play" /> : 
                    (<div>
                        <div className="fa fa-pause" />
                    </div>)
                }
                
            </div>
        )
    }
    renderCurrentlyPlaying(){
        if (this.props.currentlyPlaying === undefined){
            return null;
        }
        const { title, html, url } = this.props.currentlyPlaying;
        const { playing } = this.props;
        return (<div>
            {title}
            <ReactPlayer 
                ref={(player) => this.player = player}
                url={url} 
                width="100%"
                controls={true}
                style={{maxHeight: "200px"}}
                playing={playing}
                onStart={this.props.play}
                onProgress={this.props.onProgress}
                onPause={this.props.pause}
                onEnded={this.playNext.bind(this)}
            />
        </div>);
    }
    render() {
        const { tracklist } = this.props;
        return (
            <div className={styles.container}>
                { this.renderCurrentlyPlaying() }
                <div className={styles.tracklist}>
                    {tracklist.map(this.renderTrack.bind(this))}
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