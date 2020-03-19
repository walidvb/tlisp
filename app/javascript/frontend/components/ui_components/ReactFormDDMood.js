import React from 'react';
import PropTypes from 'prop-types';
import { FormField} from 'react-form';

import DDMood from './DDMood';

const propTypes = {
    optionName: PropTypes.string.isRequired,
}


function ReactFormDDMood(props) {
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
    return (
        <DDMood value={opts.value} onChange={onChange} />
    )
}

ReactFormDDMood.propTypes = propTypes

export default FormField(ReactFormDDMood);
