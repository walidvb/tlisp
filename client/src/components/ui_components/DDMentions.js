import React from 'react'
import PropTypes from 'prop-types'
import { MentionsInput, Mention } from 'react-mentions'
import { FormField } from 'react-form';

import styles from './DDMentions.scss';

import request from '../../request';
import routes from '../../routes';

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
    
    const readMentions = (string_, type) => {
        let result;
        const regexp = new RegExp(`\\(${type}:([\\d\\w ?]+)\\)`, 'gmi');
        const matches = []
        result = regexp.exec(string_)
        while ( result != null){
            matches.push(result[1])
            result = regexp.exec(string_);
        }
        return matches;
        
    }

    const handleMentionChange = (evt) => {
        // set the description field
        setValue(evt.target.value);
        
        // add tags to the form
        const detectedTags = readMentions(evt.target.value, 'tag');
        props.formApi.setValue("tag_list", [... new Set(detectedTags)]);
    }

    const getUsersSuggestions = (s, cb) => {
        request(routes.api.users).then(({ users }) => {
            cb(
                users.map(u => ({
                    id: u.id,
                    display: u.name,
                }))
            )
        })
    }

    const getTagsSuggestions = (s, cb) => {
        let existing = props.tags.map(t => ({
            id: t,
            display: t,
        }));
        // add non existing tag to list
        const newTag = s.length < 1 ? [] : [{
            id: s,
            display: s
        }];
        if(newTag){
            existing = newTag.concat(existing);
        }
        cb(existing);
    }
    return (
        <div style={{color: "black"}}>
            <MentionsInput 
                value={getValue() || ''} 
                className={styles.container}
                onChange={handleMentionChange}
                style={defaultStyles()}
                markup="@[__display__](__type__:__id__)"
                allowSpaceInQuery={true}
                >
                <Mention 
                    type='users'
                    trigger="@"
                    data={getUsersSuggestions}
                    style={{ backgroundColor: '#FECE08', color: 'transparent'}}
                    appendSpaceOnAdd={true}
                />
                <Mention
                    type='tag'
                    trigger="#"
                    data={getTagsSuggestions}
                    style={{ backgroundColor: '#FFBF3B', color: 'transparent' }}
                    appendSpaceOnAdd={true}
                />
            </MentionsInput>
            <div className={"hint"}> 
                <div className="fa fa-info" />
                Mention @friends, add #tags and describe your content (notification system coming ASAP :) )
            </div>
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