import * as types from './actionTypes';

export const addPerson = (person) => {
  return {
    type: types.GET_LINKS,
    person
  };
}
