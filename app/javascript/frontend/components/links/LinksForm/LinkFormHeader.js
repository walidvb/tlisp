import React from 'react'

const LinksFormHeader = ({ loaded, styles, url, oembed}) => {
  const oembeddable = typeof (oembed) === "object" && Object.keys(oembed).length > 0
  if (!loaded) {
    return (<div className={styles.header}>
      <div className="fa fa-cog fa-spin" style={{ padding: "0 1.5rem", fontSize: '1.5rem' }} />
      <div>
        <h3>Fetching details...</h3>
      </div>
    </div>)
  }
  if (!oembeddable) {
    return (<div className={styles.header}>
      <div className="fa fa-user-astronaut" style={{ padding: "0 1.5rem", fontSize: '1.5rem' }} />
      <div>
        <h3>Oops, we can't seem to find details for this link. ({url})</h3>
        <p> You can still save it, only it will likely not be playable on Diggers' Delights (yet). </p>
        <div className={styles.url}>
          Think this is a mistake? You can leave us a note <a href="/contact" target="_blank">here</a> and we will check it out.
        </div>
      </div>
    </div>)
  }
  return (
    <div className={styles.header}>
      <img alt="thumbnail" className={styles.thumbnail} src={oembed.thumbnail_url || oembed.image} />
      <div>
        <h3 className={styles.title}>{oembed.title}</h3>
        <div className={styles.url}>{url}</div>
      </div>
    </div>
  )
}

export default LinksFormHeader