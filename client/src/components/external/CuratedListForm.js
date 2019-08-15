import React, { useState } from 'react'

import styles from '../static/NewsletterForm.scss'
import { withRouter } from 'react-router-dom';


const CuratedListForm = ({ history}) => {
  const [url, setUrl] = useState('')
  const [disabled, setDisabled] = useState(true)
  const destination = () => `/curated?url=${encodeURIComponent(url)}`
  const onSubmit = (e) => {
    e.preventDefault()
    history.push(destination())
  }
  const handleChange = ({ target: { value } }) => {
    setUrl(value)
    setDisabled(!isValidUrl(value))
  }
  return <form method="GET" className={styles.container} onSubmit={onSubmit}>
    <input placeholder="Enter a valid URL" type="text" className={styles.input} value={url} onChange={handleChange}/>
    <button type="submit" className="button button__border" disabled={disabled}>Listen</button>
  </form>
}

export default withRouter(CuratedListForm)

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}