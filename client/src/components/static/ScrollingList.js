import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { request, routes } from '../../request';

import styles from './ScrollingList.scss';
import listStyles from '../links/LinksContainer.scss';

export default class ScrollingList extends Component {
    static propTypes = {

    }
    state = {
        loading: true,
        covers: []
    }
    componentDidMount(){
        request(routes.api.covers)
        .then(({ covers }) => {
            this.setState({ covers, loading: false });
            this.startScrolling();
        })
    }
    startScrolling(){
        var direction = -1;
        const scrollTo = () => {
            //  Ref breaks during hot module reloading
            if (!this.coversContainer){
                return;
            }
            var newY = this.coversContainer.scrollTop + direction;
            this.coversContainer.scrollTop = newY;
            if (newY >= this.coversContainer.scrollHeight - window.innerHeight || newY <= 0) {
                direction = -direction;
            }
        }
        if(this.coversContainer){
            this.coversContainer.scrollTop = this.coversContainer.scrollHeight - (window.innerHeight + 200);
        }
        setInterval(scrollTo, 50);
    }
    renderBackground(){
        const { covers, loading } = this.state;
        const animationDelay = (i) => (covers.length-i) * 10;
        return <div 
            ref={(coversContainer) => {this.coversContainer = coversContainer}}
            className={[listStyles.container__grid, styles.links_container,].join(' ')}>
                {covers.map(({thumbnail_url, provider}, i) => (
                    <div key={i} className={[listStyles.item__grid, listStyles.no__spacing, styles.thumb].join(' ')} style={{animationDelay: `${animationDelay(i)}ms`}}>
                        <div>
                        <img src={thumbnail_url} /> 
                            <div className={[`fa fa-${provider.toLowerCase()}`, styles.provider].join(' ')}/>
                        </div>
                    </div>))}
            </div>
    }
    render() {
        const { covers, loading} = this.state;
        return (
            <div>
                {this.renderBackground()}
            </div>
        )
    }
}
