/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

export const changeLocation = (payload) => {
  return {
    type: types.CHANGE_LOCATION,
    payload
  }
}
