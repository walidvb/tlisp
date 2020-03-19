import React from 'react';
import PropTypes from 'prop-types';
import { FormField} from 'react-form';

import Select from 'react-select';
import styles from './DDSelect.scss';
const propTypes = {
    optionName: PropTypes.string.isRequired,
}

function DDSelect(props) {
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
    const onChange = (e) => {
        setValue(e);
        if(onInput){
            onInput(e)
        }
    }
    const opts = {
        name:"form-field-name",
        value: getValue(),
        multi: props.multiple,
        onChange: onChange,
        options: options,
        ...rest,
    }
    function renderAsCheckBoxes(){
        const valueIds = opts.value ? opts.value.map(v => v.value) : [];
        return <div className={styles.checkboxContainer}>
            {options.map((elem, i) => {
                const isOn = valueIds.includes(elem.value);
                return <div 
                    className={['checkbox only-on', isOn ? 'active' : ''].join(' ')} 
                    key={i} 
                    onClick={() => {
                        !isOn ? setValue(opts.value.concat(elem)) : setValue(opts.value.filter(e => e.value != elem.value));
                    }
                }>
                    {elem.label}
                </div>
            })}
        </div>
    }
    function renderAsSelect(){
        return (
            <div>
                {creatable ? <Select.Creatable {...opts} promptTextCreator={() => `${props.optionName}...`} /> : <Select {...opts} />}
            </div>
        )
    }

    return creatable || options.length > 1 ? renderAsSelect() : renderAsCheckBoxes();
}

DDSelect.propTypes = propTypes

export default FormField(DDSelect);
