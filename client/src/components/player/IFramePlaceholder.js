import React, { Component } from 'react'

export default class IFramePlaceholder extends Component {
  placeTarget(off){
    const { left, top, width, height } = this.container.getBoundingClientRect();
    const target = document.getElementById('player-placeholder');
    target.style.position = 'fixed';
    target.style.top = off ? '-200%' : `${top}px`;
    target.style.left = left + 'px';
    target.style.width = width+'px';
  }
  // componentWillReceiveProps(){
  //   this.placeTarget();
  // }
  componentDidMount( ){
    this.placeTarget();
  }
  componentWillUnmount(){
    this.placeTarget(true)
  }
  render() {
    return (
      <div ref={(container) => this.container = container } />
    )
  }
}
