import React from 'react';
import PropTypes from 'prop-types';
import { FormField } from 'react-form';

import DDMood from './DDMood';

const propTypes = {
    value: PropTypes.number,
}


function ReactFormDDMood({ value, onChange }) {

    const onChange_ = ({ target: { value } }) => {
        onChange(parseInt(value));
    }
    return (
        <DDMood value={value} onChange={onChange_} />
    )
}

ReactFormDDMood.propTypes = propTypes

export default ReactFormDDMood;
