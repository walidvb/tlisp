import React from 'react'

import { connect } from 'react-redux';
import { setTracklist, playTrack, addToTracklist } from '../../actions/playerActions';
import PlayerContainer from '../player/PlayerContainer';

import CuratedListForm from './CuratedListForm';
import useCuratedList from '../../store/useCuratedList';
const qs = require('qs');


function ExternalPlaylist({ playTrack, setTracklist, addToTracklist, location: { search }}) {
  
  const { url } = qs.parse(search, { ignoreQueryPrefix: true })
  const [{
    infos,
    loading
  }] = useCuratedList({ url, playTrack, setTracklist, addToTracklist })
  
  if(loading){
    return (<div className="container">
      LOADING {url}...
    </div>)
  }
  return (
    <div className="container pt-4">
      <CuratedListForm />
      <h1 style={{marginTop: "2rem"}}>{infos.title}</h1>
      <h2>{infos.description}</h2>
      <a href={infos.url} target="_blank">Read more...</a>
      <PlayerContainer noTracking />
    </div>
  )
}

function mapStateToProps({ links, user }, { match: { params: mainPath } }) {
  return {
    error: links.error,
    links: links.list,
    loading: links.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTracklist: (tracks) => dispatch(setTracklist(tracks)),
    playTrack: (link) => dispatch(playTrack(link)),
    addToTracklist: (link) => dispatch(addToTracklist(link)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalPlaylist)
