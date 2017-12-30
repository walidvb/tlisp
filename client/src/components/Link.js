import React from 'react';
import PropTypes from 'prop-types';

const Link = ({link}) => {
  return (
    <div>
      {link.id}
    </div>
  );
};

Link.propTypes = {
  link: PropTypes.object.isRequired
};

export default Link;
