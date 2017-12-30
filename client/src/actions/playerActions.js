import * as types from './actionTypes';
import request from '../request';
import routes from '../routes';

export const play = (track) => {
  console.log(types.PLAY)
  return {
    type: types.PLAY,
    payload: track,
  };
}
