import * as types from '../actions/actionTypes';

const initialState = {
  tracklist: [],
  progress: 0,
  playing: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PLAY_TRACK:
      return {
        ...state,
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
      const { currentlyPlaying, tracklist } = state;
      for (let i = 0; i < tracklist.length; i++) {
        const track = tracklist[i];
        if(i >= tracklist.length){
          return {
            ...state,
            currentlyPlaying: undefined,
            playing: false,
          }
        }
        else if (state.currentlyPlaying.id == track.id) {
          return {
            ...state,
            currentlyPlaying: tracklist[i + 1],
            playing: true,
            progress: 0,
          }
        }
      }
    case types.PLAY:
      return {
        ...state,
        playing: true,
        currentlyPlaying: state.currentlyPlaying ? state.currentlyPlaying : state.tracklist[0]
      }
    case types.PAUSE:
      return {
        ...state,
        playing: false
      }
    case types.PROGRESS:
      return {
        ...state,
        progress: action.payload.played
      }
    case types.SEEK:
      return {
        ...state,
        seek: action.payload/100
      }
    default:
      return state;
  }
};
