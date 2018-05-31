import ReactGA from 'react-ga';
import * as types from '../actions/actionTypes';
let filters = JSON.parse(localStorage.getItem('dd-filters')) || {};
filters = {
    users: [],
    cliques: [],
}

const initialState = {
  list: [],
  pagination: {
    current_page: 1,
    total: 2,
    page_size: 25,
  },
  filters,
}


export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LINKS:
    return {
      ...state,
    };
    case `${types.GET_LINKS}_PENDING`:
    return {
      ...state,
      loading: true,
    }
    case `${types.GET_LINKS}_REJECTED`:
      return {
        ...state,
        error: "Couldn't fetch digs",
      }
    case `${types.GET_LINKS}_FULFILLED`:
      console.log(action)
      const { links, pagination } = action.payload;
      let list;
      if(pagination.current_page > 1){
        list = [...state.list, ...links];
      }
      else{
        list = links;
        window.scrollTo({ top: 0 })
      }
      return {
        ...state,
        error: undefined,
        list,
        pagination,
        loading: false
      }
    case `${types.SUBMIT_LINK}_SUCCESSFUL`:
      return {
        ...state,
        payload: action.payload
      }
    case types.FILTER_BY:
      const { key, value, isArray, displayName } = action.payload;
      ReactGA.event({
        category: 'FEED',
        action: 'filtered',
        label: key,
      });
      let newFilters = {...state.filters};
      newFilters[key] = isArray ? toggleInArray(newFilters[key], value) : value;
      localStorage.setItem('dd-filters', JSON.stringify(newFilters));
      return {
        ...state,
        filters: {
          displayName,
          ...newFilters
        }
      }
    case types.RESET_FILTERS:
      ReactGA.event({
        category: 'FEED',
        action: 'filtered',
        label: 'RESET',
      })
      return {
        ...state,
        filters: {
          ...action.payload
        }
      }
    // PLAYER RELATED
    case `${types.PLAY_TRACK}`:
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

function toggleInArray(arr = [], value) {
  const exists = arr.includes(value);
  if (exists) {
    return arr.filter((presentValue, i) => presentValue.id != value.id);
  }
  else {
    return arr.concat([value]);
  }
}