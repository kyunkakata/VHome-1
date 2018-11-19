/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

const initialState = {
  status: -1,
  progress: 0
};

import * as types from '../types';

export default function (state = initialState, action) {
  if (action.type == types.CHANGE_STATE) {
    return action.payload
  }

  return state;
}
