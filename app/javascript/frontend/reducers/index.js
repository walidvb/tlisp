import links from './linkReducers.js';
import player from './playerReducers.js';
import user from './userReducers.js';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  links, player, user
});

export default rootReducer;
