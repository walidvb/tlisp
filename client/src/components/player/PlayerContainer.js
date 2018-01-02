import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ReactPlayer from 'react-player'

import { play } from '../../actions/playerActions';
import styles from './PlayerContainer.scss';

class PlayerContainer extends Component {
    static propTypes = {
        tracklist: PropTypes.array.isRequired,
        currentlyPlaying: PropTypes.object,
    }
    playNext(i){
        const { currentlyPlaying, tracklist, play } = this.props;
        for (let i = 0; i < tracklist.length; i++) {
            const track = tracklist[i];
            if (currentlyPlaying.id == track.id && i < tracklist.length ){
                play(tracklist[i + 1])
            }
        }
        
    }
    renderTrack(t, i){
        const isPlaying = this.props.currentlyPlaying && this.props.currentlyPlaying.id == t.id;
        return (
            <div key={i} className={styles.track} onClick={() => this.props.play(t)}>
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
        return (<div>
            {title}
            <ReactPlayer url={url} 
                width="100%"
                style={{maxHeight: "200px"}}
                onProgress={console.log}
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

const mapStateToProps = ({ player: { tracklist, currentlyPlaying } }, ownProps) => ({
    tracklist,
    currentlyPlaying
})

const mapDispatchToProps = (dispatch) => ({
    play: (track) => dispatch(play(track))
})


export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);