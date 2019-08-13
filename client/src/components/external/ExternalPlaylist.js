import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { request, routes } from '../../request';
import { getLinks, resetFilters } from '../../actions/linkActions';

import LinkFromSrc from './LinkFromSrc';
import { connect } from 'react-redux';
import { setTracklist, playTrack } from '../../actions/playerActions';
import PlayerContainer from '../player/PlayerContainer';
const qs = require('qs');

const propTypes = {
  
}


function ExternalPlaylist({ playTrack, setTracklist, location: { search }}) {

  useEffect(() => {
    const { iframe: urls } = qs.parse(search, { ignoreQueryPrefix: true })
    const links = urls.map(url => ({
      id: url,
      url: url,
      title: url,
    }))
    setTracklist(links)
    playTrack(links[0])
  }, [])

  return (
    <div className="container">
      <PlayerContainer noTracking />
    </div>
  )
}

ExternalPlaylist.propTypes = propTypes

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
    getLinks: (options) => dispatch(getLinks(options)),
    resetFilters: (filters) => dispatch(resetFilters(filters)),
    playTrack: (link) => dispatch(playTrack(link)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalPlaylist)
