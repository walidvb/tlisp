import React from 'react'

import { connect } from 'react-redux';
import { setTracklist, playTrack, addToTracklist } from '../../actions/playerActions';
import PlayerContainer from '../player/PlayerContainer';

import CuratedListForm from './CuratedListForm';
import useCuratedList from '../../store/useCuratedList';
import CuratedListIndex from './CuratedListIndex';
import DDTooltip from '../ui_components/DDTooltip';
import Bookmarklet from '../Bookmarklet';

import styles from '../../App.scss';

const qs = require('qs');


function ExternalPlaylist({ playTrack, setTracklist, addToTracklist, location: { search }, match: { params: { curatedListID }}}) {
  
  const { url } = qs.parse(search, { ignoreQueryPrefix: true })
  const [{
    infos,
    loading
  }] = useCuratedList({ curatedListID, url, playTrack, setTracklist, addToTracklist })
  
  if(loading){
    return (<div className="container">
      LOADING {url}...
    </div>)
  }
  if(!url && !curatedListID){
    return (
      <div className="container pt-4">
        <CuratedListForm />
        <CuratedListIndex />
      </div>)
  }
  return (
    <div className="container pt-4">
      <CuratedListForm />
      <div className="mb-6">
        <h1 className="text-xl mt-6 mb-2">{infos.title}</h1>
        <h2 className="mb-2">{infos.description}</h2>
        <a className="text-gray-600 text-sm" href={infos.url} target="_blank">Read more on {infos.site_name}...</a>
      </div>
      <PlayerContainer noTracking />

      <div className={styles.triggerWrapper}>
        <DDTooltip trigger={<div className={[styles.trigger, "fa fa-question"].join(' ')} />}>
          <Bookmarklet />
        </DDTooltip>
      </div>

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
