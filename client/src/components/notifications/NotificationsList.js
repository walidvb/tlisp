import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import { request, routes } from '../../request';
import { playTrack, pause } from '../../actions/playerActions';

import DDTooltip from '../ui_components/DDTooltip';
import Link from '../links/Link';
import styles from './NotificationsList.scss';
import triggerStyles from '../../App.scss';

const OPENED = 'opened',
    UNOPENED = 'unopened';

class NotificationsList extends Component {
    static propTypes = {
    }
    state = {
        notifications: [],
        open: false,
        showCount: true,
        loading: true,
        displayState: UNOPENED
    }
    componentDidMount(){
        this.fetchNotifications();
    }
    fetchNotifications(){
        request(`${routes.api.notifications.index}?filter=${this.state.displayState}`)
        .then((notifications) => {
            this.setState({ notifications, loading: false })
        })
    }
    toggleDisplayState(){
        this.setState({
            displayState: this.state.displayState == UNOPENED ? OPENED : UNOPENED,
        }, this.fetchNotifications)
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
        if(!link){
            console.error("Error displaying link", notif, index)
            return <div key={index}>oops</div>
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
        const { displayState, notifications, open, showCount, unread } = this.state
        const hasUnread = notifications.length > 0 && displayState == UNOPENED;
        const count = notifications.length;
        return (
            <DDTooltip 
                ref={(tooltip) => this.tooltip = tooltip}
                trigger={[
                    <div key="notif-trigs" onClick={this.toggleNotifs.bind(this)} className={[hasUnread ? styles.withCounter : null, triggerStyles.trigger, "fa fa-inbox"].join(' ')} />,
                    showCount && hasUnread ? <div key="notis-count" className={styles.counter}>{unread}</div> : null 
                ]}
            >
                <div className={styles.container}>
                    <div>
                        <h4  className={styles.header}> 
                            Mentions  { count ? `(${count})` : null }
                            <div className="flex">
                                <div className={styles.stateToggler} onClick={this.toggleDisplayState.bind(this)} > {displayState == OPENED ? 'new' : "past"}  </div>
                                <div className="fa fa-close" onClick={() => this.tooltip.toggleDisplay()} style={{cursor: 'pointer'}}/>
                            </div>
                        </h4>
                        <div className={styles.notifsList}>
                            {count === 0 ? <div className={styles.noMentions}> You have no new mentions 🤷‍♂️</div>:
                                notifications.map(this.renderSingleNotification.bind(this))
                            }
                        </div>
                    </div>
                </div>
            </DDTooltip>
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