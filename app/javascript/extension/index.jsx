import React from 'react'
import Like from './Like'
import styles from './index.scss';
import useAuthentication from '../shared/hooks/useAuthentication';
import SignIn from './SignIn';
import openIframe from './openIframe';
import { routes } from '../frontend/request';


export default () => {
  // const { user } = useAuthentication()
  const content = () => {

    if(!user.authenticated){
      return <SignIn />
    }
    return <Like />
  }

  const contStyle = {
    position: "fixed",
    fontSize: "14px",
    bottom: "1em",
    left: "1em",
    backgroundColor: "#20c997",
    border: "1px solid rgba(102, 102, 102, 1)",
    display: "flex",
    padding: "0 0",
    borderRadius: "4px",
    color: "white",
  }
  return (<div className={styles.container} style={contStyle}>
    {/* <div className={styles.section}>{content()}</div> */}
    <div className={[styles.section, styles.pointer].join(' ')} onClick={() => openIframe(routes.links.new, { url: window.location.href })}>Dig This!</div>
  </div>)
}