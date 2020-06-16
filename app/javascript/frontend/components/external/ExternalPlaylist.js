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
  const hidePlayer = !url && !curatedListID
  return (
    <div className="container pt-4 pb-4">
      <div className="lg:w-4/6 mx-auto">
        { loading && <div className="mb-6">Loading {url}...</div>}
        {(!hidePlayer && !loading) && <div>
          <div className="mb-6">
            <h1 className="text-2xl mt-6 mb-2">{infos.title}</h1>
            <h2 className="mb-2 text-xl">{infos.description}</h2>
            <a className="text-gray-600 text-sm" href={infos.url} target="_blank">Read more on {infos.site_name}...</a>
          </div>
          <PlayerContainer noTracking />
          <div className="border-gray-500 border-b-2 border-solid w-100 my-8"/>
        </div>
        }
        <div>
          Ever felt as happy to find someone who curated a list of great tracks,
          as annoyed that you had to get back to that page to play the next one?
          <br />
          Enter the url of that page here, and let the magic happen
          <br />
          <span className="text-sm text-gray-600">PS: try the <a href="https://chrome.google.com/webstore/detail/diggersdelights/mfpedieakkfpjgaahkjiicmgnmhpbpop" rel="noopener noreferrer" target="_blank">extension</a> if this page doesn't work</span>
        </div>
        <CuratedListIndex />
        <div className="text-2xl underline mt-10 mb-4">CREATE YOUR OWN</div>
        <CuratedListForm />
        <div className={styles.triggerWrapper}>
          <DDTooltip trigger={<div className={[styles.trigger, "fa fa-question"].join(' ')} />}>
            <Bookmarklet />
          </DDTooltip>
        </div>
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
