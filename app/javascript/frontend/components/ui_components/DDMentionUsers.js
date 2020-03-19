import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormField } from 'react-form';
import styles from './DDMentionUsers.scss';

class User extends Component {
  state = {
    hovered: false
  }
  toggleHover(){
    this.setState({ hovered: !this.state.hovered})
  }
  render() {
    const { user, onRemove } = this.props;
    const close = this.state.hovered ? <span onClick={() => onRemove(user.value)} className={`fa fa-icon fa-times ${styles.close}`} /> : '@'
    return <span 
      onMouseEnter={this.toggleHover.bind(this)} 
      onMouseLeave={this.toggleHover.bind(this)} 
      className={[styles.userTag].join(' ')}>
      {close}{user.display}
    </span>;
  }
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
    return null
  }

  const onRemove = (value) => {
    const newUsers = users.filter(u => u.value !== value);
    setValue(newUsers);
  }
  return (<div className={styles.container}>
    <span className="hint"><span className="fa fa-inbox hint-icon"/>Sending notifications to: </span>
    {users.map(u => <User user={u} onRemove={onRemove}/>)}
  </div>)
}
DDMentionUsers.propTypes = {}

export default FormField(DDMentionUsers)