import * as types from './actionTypes';

export const getLinks = (filters) => {
  return {
    type: types.GET_LINKS,
    filters,
    payload: 2,
  };
}
