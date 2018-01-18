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
        unread: 0,
        showCount: true,
    }
    componentDidMount(){
        request(routes.api.notifications.index)
        .then( (notifications) => {
            const unread = notifications.reduce((prev, curr) => prev + (curr.opened_at === null ? 1 : 0), 0);
            console.log(unread)
            this.setState({ notifications, unread })
        })
    }
    toggleNotifs(){
        this.setState({
            open: !this.state.open,
            showCount: false,
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
        const { notifications, open, showCount, unread } = this.state
        return (
            <div className={styles.container}>
                <div onClick={this.toggleNotifs.bind(this)} className={[styles.trigger, "fa fa-inbox"].join(' ')} />
                { showCount && unread !== 0 ?  <div className={styles.counter}>{unread}</div> : null }
                <div className={[styles.drawer, open ? styles.open : styles.closed].join(' ')} >
                    <h4 className={styles.header}> Mentions  ({notifications.length}) </h4>
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