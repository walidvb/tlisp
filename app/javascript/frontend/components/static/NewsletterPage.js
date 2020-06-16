import React, { Component } from 'react'

import NewsletterForm from './NewsletterForm';
import Title from '../Title';
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
