/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const initialState = {
  latitude: 20.97597248693012,
  longitude: 105.8444758342732,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121
};

export default function location(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_LOCATION:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
