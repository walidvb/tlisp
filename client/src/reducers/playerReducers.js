import ReactGA from 'react-ga';
import * as types from '../actions/actionTypes';

const initialState = {
  tracklist: [],
  progress: 0,
  playing: false,
  history: [],
}

let nextProgressToTrack = 1; // used to track discrete progress, 1-10 (converted in the call)

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PLAY_TRACK:
      ReactGA.event({
        category: 'PLAYER',
        action: 'play_track',
      })
      nextProgressToTrack = 1;
      return {
        ...state,
        history: [state.currentlyPlaying, ...state.history],
        currentlyPlaying: action.payload,
        playing: true,
        progress: 0,
      };
    case types.SET_PLAYLIST:
    return {
      ...state,
      tracklist: action.payload,
    }
    case types.NEXT:
    case types.ENDED:
      if(action.type == types.NEXT){
        ReactGA.event({
          category: 'PLAYER',
          action: 'next',
        })
      }
      else{
        ReactGA.event({
          category: 'PLAYER',
          action: 'ended',
        })
      }
      const { currentlyPlaying, tracklist } = state;
      for (let i = 0; i < tracklist.length; i++) {
        const track = tracklist[i];
        if(i >= tracklist.length){
          return {
            ...state,
            history: [currentlyPlaying, ...state.history],
            currentlyPlaying: undefined,
            playing: false,
          }
        }
        else if (state.currentlyPlaying.id == track.id) {
          nextProgressToTrack = 1;
          return {
            ...state,
            history: [currentlyPlaying, ...state.history],
            currentlyPlaying: tracklist[i + 1],
            playing: true,
            progress: 0,
          }
        }
      }
      break;
    case types.PLAY:
      ReactGA.event({
        category: 'PLAYER',
        action: 'play',
      })
      return {
        ...state,
        playing: true,
        currentlyPlaying: state.currentlyPlaying ? state.currentlyPlaying : state.tracklist[0]
      }
    case types.PAUSE:
      ReactGA.event({
        category: 'PLAYER',
        action: 'pause',
      })
      return {
        ...state,
        playing: false
      }
    case types.PROGRESS:
      const progress = action.payload.played
      trackProgressMaybe(progress);
      return {
        ...state,
        progress
      }
    case types.SEEK:
      ReactGA.event({
        category: 'PLAYER',
        action: 'seek',
      })
      return {
        ...state,
        seek: action.payload/100
      }
    default:
      return state;
  }
};

const trackProgressMaybe = (prog) => {
  // use 1-10 instead of 1-100, much easier to track :)
  const progress = Math.floor(10*prog);
  for (let threshold = 1; threshold < 10; threshold++) {
    if (progress == threshold && nextProgressToTrack == threshold){
      nextProgressToTrack = threshold+1;
      ReactGA.event({
        category: 'PLAYER',
        action: 'progress',
        label: `${threshold*10}%`
      });
      break;
    } 
  };

}