import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import request from '../../request';
import routes from '../../routes';
import { playTrack, pause } from '../../actions/playerActions';

import Link from '../links/Link';
import styles from './NotificationsList.scss';

class NotificationsList extends Component {
    static propTypes = {

    }
    state = {
        notifications: [],
        open: false,
    }
    componentDidMount(){
        request(routes.api.notifications.index)
        .then( (notifications) => this.setState({ notifications }) )
    }
    toggleNotifs(){
        this.setState({
            open: !this.state.open,
        })
    }
    markAsRead(id){
        request(routes.api.notifications.open(id), { method: 'POST' });
        const notifications = this.state.notifications.map((el) => el.id === id ? {...el, opened_at: "nowish"} : el);
        this.setState({
            notifications
        });
    }
    renderSingleNotification(notif, index){
        const link = notif.notifiable;
        const opened = notif.opened_at !== null;
        const onClick = () => {
            this.markAsRead(notif.id); 
            this.props.playTrack(link);
        }
        return (
            <div key={index} onClick={onClick} className={styles.singleRow}>
                <div className={styles.thumbnail}>
                    <img src={link.thumbnail_url} />
                </div>
                <div className={styles.text}>
                    <h3> {link.title} </h3>
                    { !notif.notifier ? null : 
                        <div className={styles.notifier}> from {notif.notifier.name} </div>
                    }
                </div>
                {
                    opened ? null : <div className={styles.status} />
                }
        </div>)
    }
    render() {
        const { notifications, open } = this.state
        return (
            <div className={styles.container}>
                <div onClick={this.toggleNotifs.bind(this)} className={[styles.trigger, "fa fa-inbox"].join(' ')} />
                <div className={[styles.drawer, open ? styles.open : styles.closed].join(' ')} >
                    <h4 className={styles.header}> Mentions </h4>
                    <div className={styles.notifsList}>
                        {notifications.map(this.renderSingleNotification.bind(this))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    playTrack: (track) => dispatch(playTrack(track)),
    pause: () => dispatch(pause()),
})

const mapStateToProps = (state, ownProps) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);