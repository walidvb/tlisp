import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MentionsInput, Mention } from 'react-mentions'
import fuzzysearch from 'fuzzysearch';
import styles from './DDMentions.scss';

import { request, routes } from '../../request';

const propTypes = {
    
}

const parse = (string_, type) => {
    const generateRegexp = (type) => `\\[([\\d\\w ?]+)\\]\\(${type}:([\\d\\w ?]+)\\)`
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

function DDMention({ value, setValue, addMentions, setTags, mentions, tags }) {
    
    useEffect(() => {
      const users = parse(value, 'users')
      users.length && addMentions(users)
      const tags = parse(value, 'tags')
      tags.length && setTags(tags)
      setValue(value.replace(/@\[[\w ]+\]\(users:\d+\)/g, ''));
    }, [value])

    const getUsersSuggestions = (s, cb) => {
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
        let existing = tags.map(t => ({
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
                value={value || ''} 
                className={styles.container}
                onChange={({target: { value }}) => setValue(value)}
                style={defaultStyles()}
                markup="@[__display__](__type__:__id__)"
                allowSpaceInQuery={true}
                placeholder="Write a few words about the track, send it to a @friend, tag the #artist and #genre..."
                >
                <Mention 
                    markup='@[__display__](users:__id__)'
                    trigger="@"
                    data={getUsersSuggestions}
                    style={{ backgroundColor: '#FECE08', color: 'transparent'}}
                    appendSpaceOnAdd={false}
                    />
                <Mention
                    markup='@[__display__](tags:__id__)'
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

export default DDMention



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