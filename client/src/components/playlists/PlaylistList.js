import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { filterBy } from '../../actions/linkActions';
import {
    Link
} from 'react-router-dom'

import { request, routes } from '../../request';

class PlaylistList extends Component {
    static propTypes = {
    }
    state = {
        playlists: [],
    }
    componentDidMount(){
        request(routes.api.playlists.index).then( playlists => this.setState({ playlists }))
    }
    render() {
        const activePlaylist = this.props.playlistId;
        return (
            <div>
                <ul style={{display: 'flex', flexFlow: "row wrap"}}>
                    {this.state.playlists.map( pl => {
                        return <li style={{padding: '.5rem .5rem'}} key={pl.slug}>
                            <div 
                                onClick={() => this.props.filterByPlaylist(pl.id)}
                                className={['checkbox only-on', activePlaylist == pl.id ? 'active': ''].join(' ')}
                            > {pl.name}</div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = ({ links: { filters: { playlists } } }) => ({
    playlistId: playlists,
})
const mapDispatchToProps = (dispatch) => ({
    filterByPlaylist: (id) => dispatch(filterBy({ key: 'playlists', value: id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList)