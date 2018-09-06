import React from 'react'
import PropTypes from 'prop-types'
import { FormField } from 'react-form';
import styles from './DDMentionUsers.scss';

function User({ user, onRemove }){
  return <span className={[styles.userTag, 'hint'].join(' ')}>@{user.display}<span onClick={() => onRemove(user.value)}className={`fa fa-icon fa-times ${styles.close}`} /></span>;
}

function DDMentionUsers(props) {
  const {
    fieldApi,
  } = props;

  const {
    getValue,
    setValue,
  } = fieldApi;

  const users = getValue();
  if(!users || users.length == 0){
    return (<div className={"hint"}>
      <div className="fa fa-info" />
      Mention @friends, add #tags and describe your content
      </div>)
  }

  const onRemove = (value) => {
    const newUsers = users.filter(u => u.value !== value);
    setValue(newUsers);
  }
  return (<div className={styles.container}>{users.map(u => <User user={u} onRemove={onRemove}/>)}</div>)
}
DDMentionUsers.propTypes = {}

export default FormField(DDMentionUsers)