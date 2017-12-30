import React, { Component } from 'react'
import PropTypes from 'prop-types'

import request from '../request';
import routes from '../routes';

import styles from './LinkUI.scss';

export default class LinkUI extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    }
  }
  static propTypes = {

  }
  componentDidMount() {
    request(routes.links.filters).then(res => res.json()).then(data => {
      this.setState({...data, ready: true})
    })
  }
  render() {
    const { users } = this.state;
    return (
      <div className={styles.container}>
        {!this.state.ready ? null : 
          users.map( u => u.name )
        }
      </div>
    )
  }
}

