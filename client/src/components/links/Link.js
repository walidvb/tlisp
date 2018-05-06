import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProgressBar from '../player/ProgressBar';

import { playTrack, pause } from '../../actions/playerActions';
import styles from './Link.scss';

const Link = ({ playTrack, pause, link, style }) => {
  const { thumbnail_url, title, width, height, provider, html, users, tag_list } = link;
  let inner;
  if(link.playing){
    inner = <div className={styles.playingLogo} style={{ height: "100%" }}> 
      <div onClick={pause} className={["fa fa-pause"].join(' ')}/>
      <ProgressBar />
    </div>;
  }
  else{
    const splittedTitle = title && title.split(/\||\-|\/| by /i);
    inner = (
      <div onClick={() => playTrack(link)} style={{height: "100%"}}>
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
    <div className={[styles.full_bg, (link.playing ? null : styles.fade)].join(' ')} style={{ backgroundImage: `url(${thumbnail_url})` }}>
      {inner}
      <div className={styles.tags}>
        <i className="fa fa-tags nouse-icon"></i>
        {tag_list.join(', ')}
      </div>
    </div>
  ); 
};

Link.propTypes = {
  link: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  pause: () => dispatch(pause()),
})

const mapStateToProps = (state, ownProps) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Link)
