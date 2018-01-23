import * as types from './actionTypes';
import { request, routes } from '../request';

export const getUserDetails = (payload) => ({
    type: types.GET_USER_DETAILS,
    payload: new Promise((resolve, reject) => {
        request(routes.api.users.me)
        .then(resolve)
        .catch(reject)
    })
})

export const signUpSuccess = (user) => ({
    type: types.SIGN_UP_SUCCESSFUL,
    payload: { user }
})