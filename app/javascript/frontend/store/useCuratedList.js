import { useState, useEffect } from 'react'
import axios from 'axios'
import { routes } from '../request';
import appCable from '../utils/appCable';

const useCuratedList = (props) => {
  const { curatedListID, url, playTrack, setTracklist, addToTracklist } = props
  const [loading, setLoading] = useState(false)
  const [infos, setInfos] = useState({})
  let hasStarted = false
  const cableHandlers = {
    received: ({ code, error_message, ...link}) => {
      if(code === 'error'){
        setInfos({
          ...infos,
          description: `Error fetching the tracks: ${error_message}`,
        })
        return
      }
      addToTracklist(link)
      if(!hasStarted){
        playTrack(link)
        hasStarted = true
      }
    }
  }
  useEffect(() => {
    if(!url && !curatedListID){
      return
    }
    (async () => {
      setTracklist([])
      setLoading(true)
      try {
        const fetchURLBase = `${routes.api.curatedPlaylists.show}`
        const fetchURL = curatedListID ? `${fetchURLBase}/${curatedListID}` : `${fetchURLBase}/by-url/?url=${encodeURIComponent(url)}`
        const res = await axios.get(fetchURL)
        const { data: { links, curated_list: { id, ...infos } } }  = res
        appCable.subscriptions.create({ channel: 'CuratedListChannel', id }, cableHandlers)
        if(links && links.length > 0){
          setTracklist(links)
          playTrack(links[0])
        }
        setInfos(infos)
      } catch (err) {
        try{
          const { response: { data: { error } } } = err
          setInfos({
            title: 'ERROR',
            description: error
          })
        }
        catch(err){
          console.error(err)
          setInfos({
            title: 'ERROR',
            description: "Oops, looks like we couldn't scrape that page. Maybe try with the extension?"
          })
        }
      }
      setLoading(false)
    })()
  }, [url, curatedListID])

  return [{
    loading,
    infos
  }]
}

export default useCuratedList