import React, { Component } from 'react'
import PropTypes from 'prop-types'

let playerInterval;

export default class Marquee extends Component {
    static propTypes = {

    }
    static defaultProps = {
        text: "REPLACE ME REPLACE ME REPLACE ME REPLACE ME",
        delay: 1000,
        speed: 100,
    }
    state = {
        x: 0,
    }
    start(){
        const { speed } = this.props;
        playerInterval = setInterval(() => {
            const offset = this.textContainer ? this.textContainer.clientWidth : 0;
            this.setState({
                x: this.state.x - 1 < -offset ? 0 : this.state.x - 1,
            });
            clearInterval(playerInterval);
            setTimeout(this.start.bind(this), this.props.delay);
        }, speed)
    }
    componentWillReceiveProps(props){
        if(props.text !== this.props.text){
            this.setState({x: 0});
            clearInterval(playerInterval);
            setTimeout(this.start.bind(this), this.props.delay);
        }
    }
    componentDidMount() {
        setTimeout(this.start.bind(this), this.props.delay);
    }
    
    render() {
        return (
            <div ref={(div) => this.textContainer = div} className={this.props.className} style={{ overflow: 'hidden', width: '100%' }}>
                <div style={{transform: `translateX(${this.state.x}px)`, whiteSpace: "nowrap", transition: "transform .1"}}>
                    {this.props.text}
                </div>
            </div>
        )
    }
}
