import * as types from './actionTypes';
import request from '../request';
import routes from '../routes';

export const getLinks = (filters) => {
  return {
    type: types.GET_LINKS,
    filters,
    payload: new Promise(resolve => {
      request(routes.links.index)
        .then(response => resolve(response.json(), { filters }))
        .catch(error => console.log(error))
    }),
  };
}

export const filterBy = (filters) => {
  return {
    type: types.FILTER_BY,
    filters,
    payload: new Promise(resolve => {
      request(routes.links.index)
        .then(response => resolve(response.json(), filters))
        .catch(error => console.log(error))
    }),
  };
}