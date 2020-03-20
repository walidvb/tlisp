/* global chrome */

import React, { useEffect } from 'react'
import styles from './Like.scss'
import { routes } from '../frontend/request';
console.log("Like styles", styles)

const request = async (url, method, body = {}) => {
  
}

export default () => {
  const onClick = () => {
    request(routes.api.links.like(window.location.href), 'POST')
  }
  useEffect(() => {
    console.log(localStorage.getItem('key'))
  }, []);
  return <div onClick={onClick} className={styles.container}>DD loaded</div>
}