import * as types from '../actions/actionTypes';

const initialState = {
    authenticated: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `${types.GET_USER_DETAILS}_REJECTED`:
        return {
            ...initialState
        }
        case `${types.GET_USER_DETAILS}_FULFILLED`:
            return {
                ...state,
                ...action.payload.user,
                authenticated: true,
            }
        default:
            return state;
    }
};
