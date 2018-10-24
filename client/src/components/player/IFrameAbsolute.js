import React from 'react'
import ReactPlayer from 'react-player'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as playerActions from '../../actions/playerActions';

function IFrameAbsolute({ url, html, isSet, 
  playing, play, onProgress, pause, onEnded}) {
  if(!isSet){
    return null;
  }
  const canPlay = ReactPlayer.canPlay(url);
  return (
      <div id="player-placeholder" style={{ position: 'fixed', zIndex: 3000 }}>
        {canPlay ?
          <ReactPlayer
            url={url}
            width="100%"
            controls={true}
            style={{ maxHeight: "200px", height: '200px' }}
            playing={playing}
            onReady={() => playing ? play() : null}
            onStart={(d) => play(d)}
            onPlay={(d) => play(d)}
            onProgress={(d) => onProgress(d)}
            onPause={(d) => pause(d)}
            onEnded={(d) => onEnded(d)}
          /> :
          <div style={{ height: "100%" }} dangerouslySetInnerHTML={{
            __html: html
          }} />
        }
    </div>
  )
}

const mapStateToProps = ({ player }) => {
  if(player && player.currentlyPlaying){
    return {
      url: player.currentlyPlaying.url,
      html: player.currentlyPlaying.html,
      playing: player.playing,
      seek: player.seek,
      isSet: true,
    }
  }
  else{
    return {
      url: undefined,
      html: undefined,
      isSet: false,
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(playerActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(IFrameAbsolute)
