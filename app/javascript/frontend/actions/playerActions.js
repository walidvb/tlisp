import * as types from './actionTypes';
import { request, routes } from '../request';

export const playTrack = (track) => {
  return {
    type: types.PLAY_TRACK,
    payload: track,
  }; 
}

export const play = (payload) => ({
  type: types.PLAY,
  payload
})

export const pause = (payload) => ({
  type: types.PAUSE,
  payload
})

export const onProgress = (payload) => ({
  type: types.PROGRESS,
  payload
})

export const onEnded = (payload) => ({
  type: types.ENDED,
  payload
})

export const onSeek = (payload) => ({
  type: types.SEEK,
  payload
})

export const setTracklist = (payload) => ({
  type: types.SET_PLAYLIST,
  payload
})

export const addToTracklist = (payload) => ({
  type: types.ADD_TO_PLAYLIST,
  payload
})

export const next = (payload) => ({
  type: types.NEXT,
  payload
})

export const prev = (payload) => ({
  type: types.PREV,
  payload
})