import React, { Component } from 'react'
import { connect } from 'react-redux'

import Square from '../views/Square'
import { filterBy } from '../../actions/linkActions';
import styles from './PlaylistList.scss';

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
    renderSinglePlaylist(playlist){
        const activePlaylist = this.props.playlistId;
        return <div
            onClick={() => this.props.filterByPlaylist(playlist.id)}
            className={['checkbox only-on', activePlaylist === playlist.id ? 'active' : ''].join(' ')}
        >
            <Square className={styles.square}>
                <div className={styles.playlistWrapper}>
                    {playlist.links.map(({ thumbnail_url }) => <img alt="thumbnail" className={styles.thumb} src={thumbnail_url} />)}
                </div>
            </Square>
            <div className={styles.name}>{playlist.name}</div>
        </div>
    }
    render() {
        return (
            <div>
                <ul className="grid-square">
                    {this.state.playlists.map( pl => {
                        return <li style={{padding: '.5rem .5rem'}} key={pl.slug}>
                            {this.renderSinglePlaylist(pl)}
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