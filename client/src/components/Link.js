import React from 'react';
import PropTypes from 'prop-types';

import styles from './Link.scss';

const Link = ({link}) => {
  const { thumbnail_url, title, width, height, provider,  } = link;
  return (
    <div className="link item full-bg" style={{backgroundImage: `url(${thumbnail_url})`}}>
      <div className={styles.thumbnail}>
        <img width="100%" height="400" src={thumbnail_url} />
      </div>
        <div className={styles.infos}>
          <h3 className={styles.title}>
            { title }
          </h3>
          <div className={styles.top}>
            <div className={styles.submitted}>
              <i className="fa fa-user nouse-icon"></i>
               XXX
            </div>
          </div>
          <div className={styles.bottom}>
            <em>
              <i className="fa fa-tags nouse-icon"></i>
              {  }
            </em>
            <div className={styles.controls}>
              <a target="_blank" href="https://soundcloud.com/intimatesilence/intimate-silence-radio-016-juho-kusti"><i className="fa fa-soundcloud"></i></a>
              <a href="#"><i className="fa fa-play"></i></a>
            </div>
          </div>
        </div>
      </div>
  );
};

Link.propTypes = {
  link: PropTypes.object.isRequired
};

export default Link;
