import links from './linkReducers.js';
import player from './playerReducers.js';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  links, player
});

export default rootReducer;
