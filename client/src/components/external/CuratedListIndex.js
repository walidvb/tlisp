import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { routes } from '../../request';
import CuratedListSingle from './CuratedListSingle';


const CuratedListIndex = ({}) => {
  const [lists, setLists] = useState([])
  useEffect(()=> {
    (async () => {
      const { data: { curated_lists }} = await axios.get(routes.api.curatedPlaylists.index)
      setLists(curated_lists)
    })()
  }, [])
  return <div>
    <div className="mt-6 mb-10 text-2xl underline">RECENTLY HEARD ARTICLES</div>
    {lists.map(l => <CuratedListSingle key={l.id} {...l} />)}
  </div>
}

export default CuratedListIndex