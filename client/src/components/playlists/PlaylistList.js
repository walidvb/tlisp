import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Link
} from 'react-router-dom'

import request from '../../request';
import routes from '../../routes';

export default class PlaylistList extends Component {
    static propTypes = {
    }
    state = {
        playlists: [],
    }
    componentDidMount(){
        request(routes.api.playlists.index).then( playlists => this.setState({ playlists }))
    }
    render() {
        return (
            <div>
                <ul style={{display: 'flex', flexFlow: "row wrap"}}>
                    {this.state.playlists.map( pl => {
                        return <li style={{padding: '.5rem .5rem'}} key={pl.slug}><Link to={`${routes.playlists.show}/${pl.slug}`}> {pl.name}</Link></li>
                    })}
                </ul>
            </div>
        )
    }
}
