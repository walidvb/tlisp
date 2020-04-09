import React from 'react'

import styles from './LinkDetails.scss';

function LinkDetails({ link: { cliques, playlists, mood, tags, title, published, is_a_set } }) {
    return (
        <div className={styles.container}>
            <h2> All set! </h2>
            { cliques.length < 1 ? null : <p><em>{title}</em> will be available to {cliques.map(c=>c.name).join(', ')}</p> }
            {playlists.length < 1 ? null : <p>It has been added to your playlists {playlists.map(c => c.name).join(', ')}</p> }
        </div>
    )
}

export default LinkDetails
