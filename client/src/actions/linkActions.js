import * as types from './actionTypes';
import request from '../request';
import routes from '../routes';

export const getLinks = (filters = {}) => {
  return {
    type: types.GET_LINKS,
    filters,
    payload: new Promise(resolve => {
      request(routes.api.links.index, { qs: filters })
        .then(resolve)
        .catch(error => console.log(error))
    }),
  };
}

export const filterBy = (filters) => {
  return {
    type: types.FILTER_BY,
    filters,
    payload: new Promise(resolve => {
      request(routes.api.links.index)
        .then(response => resolve(response.json(), filters))
        .catch(error => console.log(error))
    }),
  };
}

export const submitLink = (payload) => ({
  type: types.SUBMIT_LINK,
  payload: new Promise(resolve => {
    request(routes.api.links.create, {...payload})
      .then(response => resolve(response.json(),))
      .catch(error => console.log(error))
  }),
})