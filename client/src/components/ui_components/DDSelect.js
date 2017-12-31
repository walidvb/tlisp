import React from 'react';
import PropTypes from 'prop-types';
import {FormField} from 'react-form';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const styles = require('react-select/dist/react-select.css');

const propTypes = {
    
}

function DDSelect(props) {
    console.log(props)
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
      } = fieldApi;
    console.log(getValue())
    const onChange = (e) => {
        console.log(e);
        setValue(e.map(v => v.value));
        if(onInput){
            onInput(e)
        }
    }
    return (
        <div>
            <style>{styles}</style>
            <Select
                name="form-field-name"
                value={getValue()}
                multi={props.multiple}
                onChange={onChange}
                options={props.options}
            />
        </div>
    )
}

DDSelect.propTypes = propTypes

export default FormField(DDSelect);
