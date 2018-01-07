import React from 'react';
import PropTypes from 'prop-types';

import Gaussian from './Gaussian';
import styles from './DDMood.scss';

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.integer
}


function DDMood(props) {

    return (
        <div className={[styles.container, props.className].join(' ')}>
            {/* HACK: value is empty on form initialization */}
            <Gaussian  styles={styles} style={{left: `${props.value || 50}%`}} />
            <input className={styles.input} type="range" min={0} max={100} value={props.value} onChange={props.onChange}/>
            <div className={["hint", styles.hint].join(' ')}>
                <span style={{float: "left"}}>soft</span>
                <span style={{ float: "right" }}>hard</span>
            </div>
        </div>
    )
}

DDMood.propTypes = propTypes

export default DDMood;
