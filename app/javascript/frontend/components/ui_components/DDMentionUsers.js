import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormField } from 'react-form';
import styles from './DDMentionUsers.scss';



const DDMentionUserSingle = ({user, onRemove}) => {
  const [hovered, setHovered] = useState(false)
  
  const close = hovered ? <span onClick={() => onRemove(user.value)} className={`fa fa-icon fa-times ${styles.close}`} /> : '@'
  return <span 
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className={[styles.userTag].join(' ')}>
    {close}{user.display}
  </span>;
}


function DDMentionUsers({mentions: users, setMentions}) {

  if(!users || users.length == 0){
    return null
  }

  const onRemove = (value) => {
    const newUsers = users.filter(u => u.value !== value);
    setMentions(newUsers);
  }
  return (<div className={styles.container}>
    <span className="hint"><span className="fa fa-inbox hint-icon"/>Sending notifications to: </span>
    {users.map(u => <DDMentionUserSingle user={u} onRemove={onRemove}/>)}
  </div>)
}
DDMentionUsers.propTypes = {}

export default DDMentionUsers