import { useState, useEffect } from 'react'
import axios from 'axios'
import { routes } from '../request';
import appCable from '../utils/appCable';

const useCuratedList = (props) => {
  const { url, playTrack, setTracklist, addToTracklist } = props
  const [loading, setLoading] = useState(true)
  const [infos, setInfos] = useState({})

  const cableHandlers = {
    received: addToTracklist
  }
  useEffect(() => {
    (async () => {
      try {
        const { data: { id, infos, iframes } } = await axios.get(`${routes.api.curatedPlaylists.show}?url=${encodeURIComponent(url)}`)
        appCable.subscriptions.create({ channel: 'CuratedListChannel', id }, cableHandlers)

        const links = iframes.map(url => ({
          id: url,
          url: url,
          title: url,
        }))

        setTracklist(links)
        setInfos(infos)
        playTrack(links[0])
      } catch (error) {
        console.error(error)
        setInfos({
          title: 'ERROR',
          description: "oops, looks like we couldn't scrape this page.. sorry!"
        })
      }
      setLoading(false)
    })()
  }, [])

  return [{
    loading,
    infos
  }]
}

export default useCuratedList