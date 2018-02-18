import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

import styles from './LinkList.scss';

const LinkList = ({ links }) => {
  if(!links){
    return null;
  }
};

LinkList.propTypes = {
  links: PropTypes.array.isRequired
};

export default LinkList;
