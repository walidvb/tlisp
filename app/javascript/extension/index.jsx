import React from 'react'
import Like from './Like'
import styles from './index.scss';
import useAuthentication from '../shared/hooks/useAuthentication';
import SignIn from './SignIn';
import openIframe from './openIframe';
import { routes } from '../frontend/request';


export default () => {
  const { user } = useAuthentication()
  const content = () => {

    if(!user.authenticated){
      return <SignIn />
    }
    return <Like />
  }


  return (<div className={styles.container}>
    {content()}
    <div onClick={() => openIframe(routes.links.new, { url: window.location.href })}>Dig This!</div>
  </div>)
}