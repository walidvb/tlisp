import React, { useState } from 'react'

import styles from '../static/NewsletterForm.scss'
import { Link } from 'react-router-dom';


const CuratedListForm = ({}) => {
  const [url, setUrl] = useState('')

  return <div className={styles.container}>
    <input placeholder="Paste a link here to see the page as a playlist" type="text" className={styles.input} value={url} onChange={({target: { value } } ) => setUrl(value)}/>
    <Link to={`/curated?url=${encodeURIComponent(url)}`}> See all embeds</Link>
  </div>
}

export default CuratedListForm