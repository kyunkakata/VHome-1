/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

export const getAllNotification = (data) => {
  return {
    type: types.GET_ALL_NOTIFICATION,
    payload: data
  }
}

export const loadMoreAllNotification = (data) => {
  return {
    type: types.LOAD_MORE_ALL_NOTIFICATION,
    payload: data
  }
}

export const getAllNotificationSuccess = (data) => {
  return {
    type: types.GET_ALL_NOTIFICATION_SUCCESS,
    payload: data
  }
}

export const getAllNotificationFailed = () => {
  return {
    type: types.GET_ALL_NOTIFICATION_FAILED
  }
}
