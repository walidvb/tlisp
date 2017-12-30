import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play } from '../actions/playerActions';
import styles from './Link.scss';

const Link = ({play, link }) => {
  const { thumbnail_url, title, width, height, provider, html } = link;
  
  if(link.playing){
    return html;
  }
  else{
    return (
      <div onClick={() => play(link)} className="link item full-bg" style={{backgroundImage: `url(${thumbnail_url})`}}>
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
  }
};

Link.propTypes = {
  link: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  play: (track) => dispatch(play(track))
})

const mapStateToProps = (state, ownProps) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Link)
