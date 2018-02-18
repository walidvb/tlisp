import * as types from '../actions/actionTypes';

const initialState = {
  list: [],
  pagination: {
    current_page: 1,
    total: 2
  },
  filters: {
  }
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
    case `${types.GET_LINKS}_FULFILLED`:
      const { links, pagination } = action.payload;
      let list;
      if(pagination.current_page > 1){
        list = [...state.list, ...links]
      }
      else{
        list = links
      }
      return {
        ...state,
        list,
        pagination: pagination,
        loading: false
      }
    case `${types.SUBMIT_LINK}_SUCCESSFUL`:
      console.log(action.payload);
      return {
        ...state,
        payload: action.payload
      }
    
    case `${types.FILTER_BY}`:
      const { type, value } = action.payload;
      let newFilters = {};
      newFilters[type] = toggleInArray(newFilters[type], value)
      return {
        ...state,
        filters: {
          ...state.filters,
          ...newFilters
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
  const exists = arr.find((presentValue) => value == presentValue);
  if (exists) {
    return arr.filter((presentValue, i) => presentValue != value);
  }
  else {
    return arr.concat([value]);
  }
}