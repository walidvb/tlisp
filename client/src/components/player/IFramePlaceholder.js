import React, { Component } from 'react'

export default class IFramePlaceholder extends Component {
  placeTarget(){
    const { left, top, width, height } = this.container.getBoundingClientRect();
    console.log(left, top, width, height);
    const target = document.getElementById('player-placeholder');
    target.style.position = 'fixed';
    target.style.top = top + 'px';
    target.style.left = left + 'px';
  }
  componentWillReceiveProps(){
    this.placeTarget();
  }
  componentDidMount( ){
    this.placeTarget();
  }
  render() {
    return (
      <div ref={(container) => this.container = container }>
        This is the placeholder for the iframe
    </div>
    )
  }
}
