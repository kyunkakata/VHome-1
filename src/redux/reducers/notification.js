/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const INITIAL_STATE = {
  notification: {
    data: [],
    option: {
      page: 1,
      size: 100,
      keyword: ''
    },
    optionRes: {},
    loading: false,
    loadMore: false
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return INITIAL_STATE
    case types.GET_ALL_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          option: {
            ...state.notification.option,
            page: 1
          },
          loading: true,
          loadMore: false
        }
      }
    case types.LOAD_MORE_ALL_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          option: {
            ...state.notification.option,
            page: state.notification.option.page + 1
          },
          loading: false,
          loadMore: true
        }
      }
    case types.GET_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: {
          ...state.notification,
          data: state.notification.option.page == 1 ? action.payload.content : [...state.notification.data, ...action.payload.content],
          optionRes: {
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages
          },
          loading: false,
          loadMore: false
        }
      }
    case types.GET_ALL_NOTIFICATION_FAILED:
      return {
        ...state,
        notification: {
          ...state.notification,
          option: {
            ...state.notification.option,
            page: state.notification.option.page > 1 ? state.notification.option.page - 1 : 1
          },
          loading: false,
          loadMore: false
        }
      }
    default:
      return state
  }
}
