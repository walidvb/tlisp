import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { playTrack } from '../../actions/playerActions';
import styles from './Link.scss';

const Link = ({ playTrack, link }) => {
  const { thumbnail_url, title, width, height, provider, html, users } = link;
  let inner;
  if(link.playing){
    inner = <div dangerouslySetInnerHTML={{
      __html: html
    }}/>;
  }
  else{
    const splittedTitle = title && title.split(/\||\-|\/| by /i);
    inner = (
      <div>
        <div className={styles.thumbnail}>
          <img style={{visibility: 'hidden'}}width="100%" height="400" src={thumbnail_url} />
        </div>
        <div className={styles.infos}>
          <div>
            <h3 className={styles.title}>
              {title && splittedTitle.length == 2 ? <span>{splittedTitle[0].trim()} < br /> {splittedTitle[1].trim()}</span> : title  }
            </h3>
            <div className={styles.submitted}>
              <i className={["fa fa-user",styles.user_icon].join(' ')}></i>
              {users.map(u => u.initials).join(', ')}
            </div>
          </div>
          {/* <div className={styles.top}>
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
          </div> */}
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => playTrack(link)} className={[styles.full_bg]} style={{ backgroundImage: `url(${thumbnail_url})` }}>
      {inner}
    </div>
  ); 
};

Link.propTypes = {
  link: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track))
})

const mapStateToProps = (state, ownProps) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Link)
