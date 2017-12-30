import * as types from '../actions/actionTypes';

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case types.GET_LINKS:
      return {
        ...state,
        links: action.links,
      };
    default:
      return state;
  }
};
