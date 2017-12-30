import * as types from '../actions/actionTypes';

const initialState = {
  tracklist: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PLAY:
      return {
        ...state,
        currentlyPlaying: action.payload,
      };
    case `${types.GET_LINKS}_FULFILLED`:
    return {
      ...state,
      tracklist: action.payload,
    }
    default:
      return state;
  }
};
