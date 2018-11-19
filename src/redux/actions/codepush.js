/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

export function ChangeState(state) {
  return {
    type: types.CHANGE_STATE,
    payload: state
  };
}
