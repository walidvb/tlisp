import * as types from './actionTypes';
import { request, routes } from '../request';

export const getLinks = ({ filters, page, }) => {
  return {
    type: types.GET_LINKS,
    payload: new Promise(resolve => {
      const url = filters.mineOnly ? routes.api.links.myLinks : routes.api.links.explore
      request(url, { qs: {
        ...filters, 
        users: filters.users.map(u=>u.id),
        cliques: filters.cliques.map(c => c.id),
        page
      } })
        .then(resolve)
        .catch(error => console.log(error))
    }),
  };
}

export const filterBy = (filter) => {
  return {
    type: types.FILTER_BY,
    payload: filter,
  };
}
export const resetFilters = (filters = {}) => ({
  type: types.RESET_FILTERS,
  payload: filters
})

export const submitLink = (payload) => ({
  type: types.SUBMIT_LINK,
  payload: new Promise(resolve => {
    request(routes.api.links.create, {...payload})
      .then(response => resolve(response.json(),))
      .catch(error => console.log(error))
  }),
})