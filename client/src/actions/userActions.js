import * as types from './actionTypes';
import request from '../request';
import routes from '../routes';

export const getUserDetails = (payload) => ({
    type: types.GET_USER_DETAILS,
    payload: new Promise((resolve, reject) => {
        request(routes.api.users.me)
        .then(resolve)
    })
})