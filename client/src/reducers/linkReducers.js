import * as types from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_LINKS:
      return [...state, Object.assign({}, action.person)];
    default:
      return state;
  }
};
