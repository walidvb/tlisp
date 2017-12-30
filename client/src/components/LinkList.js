import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

const LinkList = ({links}) => {
  return (
    <div>
      {links.map((link) =>
        <Link key={link.id} link={link} />
      )}
    </div>
  );
};

LinkList.propTypes = {
  links: PropTypes.array.isRequired
};

export default LinkList;
