/**
* Created by nghinv on Mon Nov 12 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const initialState = {
  allCategory: {
    data: [],
    option: {
      page: 1,
      size: 40,
      keyword: ''
    },
    loading: false,
    loadMore: false
  },
  allService: {
    data: [],
    option: {
      page: 1,
      size: 160,
      keyword: ''
    },
    loading: false,
    loadMore: false
  }
};

export default function service(state = initialState, action) {
  switch (action.type) {
    // get all category
    case types.GET_ALL_CATEGORY:
      return {
        ...state,
        allCategory: {
          ...state.allCategory,
          option: {
            ...state.allCategory.option,
            ...action.payload
          },
          loading: true
        }
      }
    case types.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        allCategory: {
          ...state.allCategory,
          data: action.payload.content,
          loading: false,
          loadMore: false
        }
      }
    case types.GET_ALL_CATEGORY_FAILED:
      return {
        ...state,
        allCategory: {
          ...state.allCategory,
          loading: false,
          loadMore: false
        }
      }
    // get all service
    case types.GET_ALL_SERVICE:
      return {
        ...state,
        allService: {
          ...state.allService,
          option: {
            ...state.allService.option,
            ...action.payload
          },
          loading: true
        }
      }
    case types.GET_ALL_SERVICE_SUCCESS:
      return {
        ...state,
        allService: {
          ...state.allService,
          data: action.payload.content,
          loading: false,
          loadMore: false
        }
      }
    case types.GET_ALL_SERVICE_FAILED:
      return {
        ...state,
        allService: {
          ...state.allService,
          loading: false,
          loadMore: false
        }
      }
    default:
      return state
  }
}
