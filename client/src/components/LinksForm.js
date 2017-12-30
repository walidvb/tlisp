import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import routes from '../routes';
import request from '../request';

const qs = require('qs');

class LinksForm extends Component {
    constructor(){
        super()
        this.state = {
            oembed: {}
        }
    }
    static propTypes = {

    }
    
    componentDidMount() {
        const params = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        request(routes.api.links.oembed(params.url))
            .then(res => res.json())
            .then(res => this.setState({
                oembed: res.link.oembed
            }))
    }
    
    render() {
        const { oembed } = this.state;
        return (
            <div>
                {oembed.thumbnail_url}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
});

const mapDispatchToProps = (dispatch) =>  ({
    
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinksForm));