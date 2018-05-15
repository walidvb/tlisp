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
        case `${types.GET_USER_DETAILS}_REJECTED`:
        return {
            ...initialState
        }
        case `${types.GET_USER_DETAILS}_FULFILLED`:
        case `${types.SIGN_UP_SUCCESSFUL}`:
            const user = action.payload.user
            addTawk(user);
            return {
                ...state,
                ...user,
                authenticated: true,
            }
        default:
            return state;
    }
};
let tawkIs = false;
function addTawk(user){
    if(!tawkIs){
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        Tawk_API.visitor = user;
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5afaebeb5f7cdf4f05343e6e/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
            tawkIs = true;
        }
    }