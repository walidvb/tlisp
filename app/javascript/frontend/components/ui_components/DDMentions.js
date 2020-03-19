import React from 'react'
import PropTypes from 'prop-types'
import { MentionsInput, Mention } from 'react-mentions'
import { FormField } from 'react-form';
import fuzzysearch from 'fuzzysearch';
import styles from './DDMentions.scss';

import { request, routes } from '../../request';

const propTypes = {
    
}

function DDMention(props) {
    const {
        fieldApi,
        formApi,
      } = props;

    const {
        getValue,
        setValue,
      } = fieldApi;
    
    const generateRegexp = (type) => `\\[([\\d\\w ?]+)\\]\\(${type}:([\\d\\w ?]+)\\)`

    const parseMentions = (string_, type) => {
        let result;
        const regexp = new RegExp(generateRegexp(type), 'gmi');
        const matches = []
        result = regexp.exec(string_)
        while ( result != null){
            matches.push({
                display: result[1],
                value: result[2],
            })
            result = regexp.exec(string_);
        }
        return matches;
        
    }
    const handleMentionChange = (evt) => {
        // set the description field
        let str = evt.target.value;
        
        // add tags to the form
        const detectedTags = parseMentions(str, 'tag');
        formApi.setValue("tag_list", [...new Set(detectedTags)]);
        const detectedUsers = parseMentions(str, 'users');
        detectedUsers.forEach(u => formApi.addValue("mentions", u));

        str = str.replace(/@\[[\w ]+\]\(users:\d+\)/g, '')
        setValue(str);
    }

    const getUsersSuggestions = (s, cb) => {
        const mentions = formApi.values.mentions || [];
        request(routes.api.users.index).then(({ users }) => {
            cb(
                users.map(u => ({
                    id: u.id,
                    display: u.name || u.initials || "N/A",
                }))
                .filter(u => fuzzysearch(s.toLowerCase(), u.display.toLowerCase()))
                .filter(u => mentions.map( u => parseInt(u.value, 10) ).indexOf(u.id) < 0)
            )
        })
    }

    const getTagsSuggestions = (s, cb) => {
        let existing = props.tags.map(t => ({
            id: t,
            display: t,
        })).filter(t => fuzzysearch(s,t.display));
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
                placeholder="Write a few words about the track, send it to a @friend, tag the #artist and #genre..."
                >
                <Mention 
                    type='users'
                    trigger="@"
                    data={getUsersSuggestions}
                    style={{ backgroundColor: '#FECE08', color: 'transparent'}}
                    appendSpaceOnAdd={false}
                />
                <Mention
                    type='tag'
                    trigger="#"
                    data={getTagsSuggestions}
                    style={{ backgroundColor: '#FFBF3B', color: 'transparent' }}
                    appendSpaceOnAdd={true}
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