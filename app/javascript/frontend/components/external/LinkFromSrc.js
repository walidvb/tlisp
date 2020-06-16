import React from 'react'
import { connect } from 'react-redux';
import { pause, playTrack } from '../../actions/playerActions';

const LinkFromSrc = ({ link, playTrack }) => {
  const play = () => {
    playTrack(link)
  }
  return <div onClick={play}>
    {link.src}
  </div>
}
const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  pause: () => dispatch(pause()),
})

const mapStateToProps = (state, ownProps) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(LinkFromSrc)