import React from 'react';
import PropTypes from 'prop-types';
import { FormField} from 'react-form';

import Gaussian from './Gaussian';
import styles from './DDMood.scss';

const propTypes = {
    optionName: PropTypes.string.isRequired,
}


function DDMood(props) {
    const {
        fieldApi,
        onInput,
        ...rest
      } = props;

    const {
        getValue,
        getError,
        getWarning,
        getSuccess,
        setValue,
        setTouched,
        addOption,
      } = fieldApi;
    
    const { creatable, options } = props;
    const onChange = ({ target: { value } }) => {
        setValue(value);
        if(onInput){
            onInput(value)
        }
    }
    const opts = {
        name:"form-field-name",
        value: getValue(),
        ...rest,
    }
    const value = opts.value;
    const blue = {
        r: 0, g: 116, b: 217
    }
    const red = {
        r: 255, g: 65, b: 54
    }

    const color = {
        r: getMean(red.r, blue.r, value),
        g: getMean(red.g, blue.g, value),
        b: getMean(red.b, blue.b, value),
    }
    function getMean(a,b, scale){
        return Math.abs(a-b)*scale/100 + Math.min(a,b)
    }
    return (
        <div className={styles.container}>
            {/* HACK: value is empty on form initialization */}
            <Gaussian  styles={styles} style={{left: `${opts.value || 50}%`}} />
            <input className={styles.input} type="range" min={0} max={100} value={opts.value} onChange={onChange}/>
            <div className={["hint", styles.hint].join(' ')}>
                <span style={{float: "left"}}>soft</span>
                <span style={{ float: "right" }}>hard</span>
            </div>
        </div>
    )
}

DDMood.propTypes = propTypes

export default FormField(DDMood);
