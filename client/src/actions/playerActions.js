import * as types from './actionTypes';
import request from '../request';
import routes from '../routes';

export const play = (track) => {
  return {
    type: types.PLAY,
    payload: track,
  };
}

export const setTracklist = (payload) => ({
  type: types.SET_PLAYLIST,
  payload
})