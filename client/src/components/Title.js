import React from 'react'
import styles from './Title.scss'   
function Title() {
    return (
        <h1 className={styles.site_name}>
            <div className={styles.top}>DI<span>G</span><span>G</span>ERS'</div> 
            <div className={styles.bottom}>DELIGHTS</div>
        </h1>
    )
}

export default Title
