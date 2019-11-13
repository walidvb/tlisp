import React, { Component } from 'react'

export default class IFramePlaceholder extends Component {
  rePlace = this.rePlace.bind(this)
  placeTarget(off = false, placeTop = true){
    const { left, top, width, height } = this.container.getBoundingClientRect();
    if(top + height < 0){
      return
    }
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
    window.addEventListener('scroll', this.rePlace, true) 
  }
  componentWillUnmount(){
    this.placeTarget(true)
    window.removeEventListener('resize', this.rePlace, true)
    window.removeEventListener('scroll', this.rePlace, true)
  }
  render() {
    return (
      <div ref={(container) => this.container = container } />
    )
  }
}
