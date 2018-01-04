import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

import styles from './LinkList.scss';

const LinkList = ({ links }) => {
  if(!links){
    return null;
  }
  return (
    <div className={styles.container__grid}>
      {links.map((link) =>
        <div key={link.id} className={styles.item__grid}>
          <Link link={link} />
        </div>
      )}
    </div>
  );
};

LinkList.propTypes = {
  links: PropTypes.array.isRequired
};

export default LinkList;
