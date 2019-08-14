import { useState, useEffect } from 'react'
import axios from 'axios'
import { routes } from '../request';
import appCable from '../utils/appCable';

const useCuratedList = (props) => {
  const { url, playTrack, setTracklist, addToTracklist } = props
  const [loading, setLoading] = useState(true)
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
    (async () => {
      setTracklist([])
      setLoading(true)
      try {
        const { data: { links, curated_list: { id, ...infos} } } = await axios.get(`${routes.api.curatedPlaylists.show}?url=${encodeURIComponent(url)}`)
        if(links && links.length > 0){
          setTracklist(links)
          playTrack(links[0])
        }
        else{
          appCable.subscriptions.create({ channel: 'CuratedListChannel', id }, cableHandlers)
        }
        setInfos(infos)
      } catch (error) {
        console.error(error)
        setInfos({
          title: 'ERROR',
          description: "oops, looks like we couldn't scrape this page.. sorry!"
        })
      }
      setLoading(false)
    })()
  }, [url])

  return [{
    loading,
    infos
  }]
}

export default useCuratedList