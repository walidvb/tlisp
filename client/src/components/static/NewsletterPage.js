import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { request, routes } from '../../request';

import NewsletterForm from './NewsletterForm';
import ScrollingList from './ScrollingList';
import Title from '../Title';
import styles from './NewsletterPage.scss';
import listStyles from '../links/LinkList.scss';
import CuratedListForm from '../external/CuratedListForm';
export default class NewsletterPage extends Component {
    render() {
        return (
            <div>
                <Title large={true} />
                <CuratedListForm />
                <NewsletterForm />
            </div>
        )
    }
}
