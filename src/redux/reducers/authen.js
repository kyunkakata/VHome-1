/**
* Created by nghinv on Tue Nov 13 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const initialState = {
  userInfo: {

  }
};

export default function authen(state = initialState, action) {
  switch (action.type) {
    case types.GET_INFO_USER:
      return {
        ...state,
        userInfo: action.payload
      }
    case types.LOGOUT:
      return initialState
    case types.GET_INFO_USER_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload
        }
      }
    case types.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload
        }
      }
    default:
      return state
  }
}