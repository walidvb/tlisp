import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Creatable from 'react-select/creatable';

import styles from './DDSelect.scss';
const propTypes = {
    optionName: PropTypes.string.isRequired,
}

function DDSelect({ value, creatable, options, optionName, multiple, ...restProps }) {

    const opts = {
        name:"form-field-name",
        value,
        isMulti: multiple,
        options: options,
        ...restProps,
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
                {creatable ? 
                    <Creatable {...opts} promptTextCreator={() => `${optionName}...`} /> : 
                    <Select {...opts} />
                }
            </div>
        )
    }

    return creatable || options.length > 1 ? renderAsSelect() : renderAsCheckBoxes();
}

DDSelect.propTypes = propTypes

export default DDSelect;
