import React, { Component } from 'react'

export default class IFramePlaceholder extends Component {
  rePlace = this.rePlace.bind(this)
  placeTarget(off = false, placeTop = true){
    const { left, top, width } = this.container.getBoundingClientRect();
    const target = document.getElementById('player-placeholder');
    target.style.position = 'fixed';
    target.style.top = off && placeTop ? '-200%' : `${top}px`;
    target.style.left = left + 'px';
    target.style.width = width+'px';
  }
  rePlace(){
    this.placeTarget(true, false)
  }
  componentDidMount( ){
    this.placeTarget();
    window.addEventListener('resize', this.rePlace, true) 
  }
  componentWillUnmount(){
    this.placeTarget(true)
    window.removeEventListener('resize', this.rePlace, true)
  }
  render() {
    return (
      <div ref={(container) => this.container = container } />
    )
  }
}
