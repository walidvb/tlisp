import React from 'react';
import PropTypes from 'prop-types';

const Link = ({link}) => {
  const { thumbnail_url, title, width, height, provider,  } = link;
  return (
    <div className="link item full-bg" style={{backgroundImage: `url(${thumbnail_url})`}}>
      <div className="item__thumbnail">
        <img width="100%" height="400" src={thumbnail_url} />
      </div>
        <div className="item__infos">
          <h3 className="item__title">
            { title }
          </h3>
          <div className="item__top">
            <div className="item__submitted">
              <i className="fa fa-user nouse-icon"></i>
               XXX
            </div>
          </div>
          <div className="item__bottom">
            <em>
              <i className="fa fa-tags nouse-icon"></i>
              {  }
            </em>
            <div className="item__controls">
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
