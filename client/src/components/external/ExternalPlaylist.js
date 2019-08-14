import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { request, routes } from '../../request';
import { getLinks, resetFilters } from '../../actions/linkActions';

import LinkFromSrc from './LinkFromSrc';
import { connect } from 'react-redux';
import { setTracklist, playTrack } from '../../actions/playerActions';
import PlayerContainer from '../player/PlayerContainer';
import axios from 'axios'

import styles from '../links/LinksContainer.scss'
import CuratedListForm from './CuratedListForm';
const qs = require('qs');


function ExternalPlaylist({ playTrack, setTracklist, location: { search }}) {
  const [loading, setLoading] = useState(true)
  const [infos, setInfos] = useState({})
  const { url } = qs.parse(search, { ignoreQueryPrefix: true })

  useEffect(() => {
    (async () => {
      try{
        const { data: { infos, iframes }} = await axios.get(`${routes.api.curatedPlaylists.show}?url=${encodeURIComponent(url)}`)
        const links = iframes.map(url => ({
          id: url,
          url: url,
          title: url,
        }))
        
        setTracklist(links)
        setInfos(infos)
        playTrack(links[0])
      }catch(error){
        console.error(error)
        setInfos({
          title: 'ERROR',
          description: "oops, looks like we couldn't scrape this page.. sorry!"
        })
      }
      setLoading(false)
    })()
  }, [])
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
    getLinks: (options) => dispatch(getLinks(options)),
    resetFilters: (filters) => dispatch(resetFilters(filters)),
    playTrack: (link) => dispatch(playTrack(link)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalPlaylist)
