import * as types from '../actions/actionTypes';

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LINKS:
      return {
        ...state,
        list: action.payload,
      };
    case `${types.GET_LINKS}_PENDING`:
      return {
        ...state,
        loading: true,
      }
    case `${types.GET_LINKS}_REJECTED`:
    case `${types.GET_LINKS}_FULFILLED`:
    return {
      ...state,
      list: action.payload,
      loading: false
    }
    case `${types.PLAY}`:
      let newList = state.list.map(l => ({
        ...l,
        playing: l.id == action.payload.id,
      }))
      return {
        ...state,
        list: newList
      }
    case `${types.PAUSE}`:
      let newList_ = state.list.map(l => ({
        ...l,
        playing: false,
      }))
      return {
        ...state,
        list: newList_
      }
    default:
      return state;
  }
};
