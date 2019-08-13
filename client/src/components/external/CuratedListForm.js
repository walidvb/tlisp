import React, { useState } from 'react'

import styles from '../static/NewsletterForm.scss'


const CuratedListForm = ({}) => {
  const [url, setUrl] = useState('')

  return <div className={styles.container}>
    <input placeholder="Paste a link here to see the page as a playlist" type="text" className={styles.input} value={url} onChange={({target: { value } } ) => setUrl(value)}/>
    <a href={`/curated?source=${encodeURIComponent(url)}`}> See all embeds</a>
  </div>
}

export default CuratedListForm