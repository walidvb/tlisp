import * as types from './actionTypes';
import { request, routes } from '../request';

export const getLinks = ({ pathname, filters}) => {
  if(/help/.test(pathname)){
    pathname = "/";
  }
  let path = pathname ? (pathname === '/' ? routes.api.links.explore : routes.api.links[pathname.slice(1)]) 
    : routes.api.links.explore;
  if(/playlists/.test(pathname)){
    path = `/api${pathname}`;
  }
  return {
    type: types.GET_LINKS,
    payload: new Promise(resolve => {
      request(path, { qs: filters })
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