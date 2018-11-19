/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return INITIAL_STATE
    case types.GET_COIN_SUCCESS:
      return action.payload
    default:
      return state
  }
}
