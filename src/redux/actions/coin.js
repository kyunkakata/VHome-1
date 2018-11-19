/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

export const getCoin = (data) => {
  return {
    type: types.GET_COIN,
    payload: data
  }
}

export const getCoinSuccess = (data) => {
  return {
    type: types.GET_COIN_SUCCESS,
    payload: data
  }
}

export const getCoinFailed = () => {
  return {
    type: types.GET_COIN_FAILED
  }
}
