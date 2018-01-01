import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { play } from '../actions/playerActions';
import styles from './PlayerContainer.scss';

class PlayerContainer extends Component {
    static propTypes = {
        tracklist: PropTypes.array.isRequired,
        currentlyPlaying: PropTypes.object,
    }
    renderTrack(t, i){
        const isPlaying = this.props.currentlyPlaying && this.props.currentlyPlaying.id == t.id;
        return (<div key={i} className={styles.track} onClick={() => this.props.play(t)}>
            {isPlaying ? <div className="fa fa-play" /> : <div className="fa fa-pause" /> }{ t.title }
        </div>)
    }
    renderCurrentlyPlaying(){
        if (this.props.currentlyPlaying === undefined){
            return null;
        }
        const { title, html } = this.props.currentlyPlaying;
        return (<div>
            as{title}
            <div dangerouslySetInnerHTML={{
                __html: html
            }} />
        </div>)
    }
    render() {
        const { tracklist } = this.props;
        return (
            <div className={styles.container}>

                <div className={styles.tracklist}>
                    {tracklist.map(this.renderTrack.bind(this))}
                </div>
                { this.renderCurrentlyPlaying() }
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