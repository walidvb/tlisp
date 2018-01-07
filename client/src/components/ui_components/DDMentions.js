import React from 'react'
import PropTypes from 'prop-types'
import { MentionsInput, Mention } from 'react-mentions'
import { FormField } from 'react-form';

import styles from './DDMentions.scss';

const propTypes = {
    
}

function DDMention(props) {
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
    
    const handleMentionChange = (evt) => {
        setValue(evt.target.value);
        props.formApi.setValue("clique_ids", [])
    }

    const getCliquesSuggestions = (s, cb) => {
        cb(props.cliques.map(c => ({
            id: `${c.id}`,
            display: c.name,
        })))
    }
    return (
        <div style={{color: "black"}}>
            <MentionsInput 
                value={getValue()} 
                className={styles.container}
                onChange={handleMentionChange}
                style={defaultStyles()}
                markup="@[__display__](__type__:__id__)"
                onRemove={console.log}
                >
                <Mention 
                    type='clique'
                    trigger="@"
                    data={getCliquesSuggestions}
                    style={{ backgroundColor: '#FECE08', color: 'transparent'}}
                    onAdd={console.log}
                    onRemove={console.log}
                />
            </MentionsInput>
        </div>
    )
}

DDMention.propTypes = propTypes

export default FormField(DDMention)



function defaultStyles () {
    return {
        control: {
            backgroundColor: '#fff',

            fontSize: 12,
            fontWeight: 'normal',
        },

        input: {
            margin: 0,
        },

        '&singleLine': {
            control: {
                display: 'inline-block',

                width: 130,
            },

            highlighter: {
                padding: 1,
                border: '2px inset transparent',
            },

            input: {
                padding: 1,

                border: '2px inset',
            },
        },

        '&multiLine': {
            control: {
                resize: ''
            },

            highlighter: {
                padding: 9,
            },

            input: {
                padding: 9,
                minHeight: 63,
                outline: 0,
                border: 0,
            },
        },

        suggestions: {
            list: {
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.15)',
                fontSize: 10,
            },

            item: {
                padding: '5px 15px',
                borderBottom: '1px solid rgba(0,0,0,0.15)',

                '&focused': {
                    backgroundColor: '#cee4e5',
                },
            },
        },
    }
}