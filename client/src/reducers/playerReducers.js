import * as types from '../actions/actionTypes';

const initialState = {
  tracklist: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PLAY:
      return {
        ...state,
        currentState: 'PLAY',
        currentlyPlaying: action.payload,
      };

    
    case types.SET_PLAYLIST:
    return {
      ...state,
      tracklist: action.payload,
    }
    default:
      return state;
  }
};
