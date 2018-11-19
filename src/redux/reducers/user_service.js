/**
* Created by nghinv on Wed Nov 14 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const INITIAL_STATE = {
  serviceRequestHistory: {
    data: [],
    option: {
      page: 1,
      size: 100,
      keyword: '',
      status: 0
    },
    optionRes: {},
    loading: false,
    loadMores: false
  },
  serviceRequesting: {
    data: [],
    option: {
      page: 1,
      size: 100,
      keyword: '',
      status: 1
    },
    optionRes: {},
    loading: false,
    loadMores: false
  },
  providers: {
    data: [],
    option: {
      page: 1,
      size: 100,
      keyword: ''
    },
    optionRes: {},
    loading: false,
    loadMores: false
  }
}

export default user_service = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_SERVICE_REQUEST_HISTORY:
      return {
        ...state,
        serviceRequestHistory: {
          ...state.serviceRequestHistory,
          option: {
            ...state.serviceRequestHistory.option,
            page: 1
          },
          loading: true,
          loadMore: false
        }
      }
    case types.USER_LOAD_MORE_SERVICE_REQUEST_HISTORY:
      return {
        ...state,
        serviceRequestHistory: {
          ...state.serviceRequestHistory,
          option: {
            ...state.serviceRequestHistory.option,
            page: state.serviceRequestHistory.option.page + 1
          },
          loading: false,
          loadMore: true
        }
      }
    case types.USER_SERVICE_REQUEST_HISTORY_SUCCESS:
      return {
        ...state,
        serviceRequestHistory: {
          ...state.serviceRequestHistory,
          data: state.serviceRequestHistory.option.page == 1 ? action.payload.content : [...state.serviceRequestHistory.data, ...action.payload.content],
          optionRes: {
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages
          },
          loading: false,
          loadMore: false
        }
      }
    case types.USER_SERVICE_REQUEST_HISTORY_FAILED:
      return {
        ...state,
        serviceRequestHistory: {
          ...state.serviceRequestHistory,
          option: {
            ...state.serviceRequestHistory.option,
            page: state.serviceRequestHistory.option.page > 1 ? state.serviceRequestHistory.option.page - 1 : 1
          },
          loading: false,
          loadMore: false
        }
      }
    // user service requesting
    case types.USER_SERVER_REQUESTING:
      return {
        ...state,
        serviceRequesting: {
          ...state.serviceRequesting,
          option: {
            ...state.serviceRequesting.option,
            page: 1
          },
          loading: true,
          loadMore: false
        }
      }
    case types.USER_LOAD_MORE_SERVER_REQUESTING:
      return {
        ...state,
        serviceRequesting: {
          ...state.serviceRequesting,
          option: {
            ...state.serviceRequesting.option,
            page: state.serviceRequesting.option.page + 1
          },
          loading: false,
          loadMore: true
        }
      }
    case types.USER_SERVER_REQUESTING_SUCCESS:
      return {
        ...state,
        serviceRequesting: {
          ...state.serviceRequesting,
          data: state.serviceRequesting.option.page == 1 ? action.payload.content : [...state.serviceRequesting.data, ...action.payload.content],
          optionRes: {
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages
          },
          loading: false,
          loadMore: false
        }
      }
    case types.USER_SERVER_REQUESTING_FAILED:
      return {
        ...state,
        serviceRequesting: {
          ...state.serviceRequesting,
          option: {
            ...state.serviceRequesting.option,
            page: state.serviceRequesting.option.page > 1 ? state.serviceRequesting.option.page - 1 : 1
          },
          loading: false,
          loadMore: false
        }
      }
    case types.USER_CANCEL_SERVICE_REQUEST_SUCCESS:
      return {
        ...state,
        serviceRequesting: {
          ...state.serviceRequesting,
          data: state.serviceRequesting.data.filter(dt => dt.id !== action.payload.id)
        },
        serviceRequestHistory: {
          ...state.serviceRequestHistory,
          data: [...state.serviceRequestHistory.data, action.payload]
        }
      }
    // get all provider
    case types.USER_GET_ALL_DETAIL_PROVIDER:
      return {
        ...state,
        providers: {
          ...state.providers,
          option: {
            ...state.providers.option,
            page: 1
          },
          loading: true,
          loadMore: false
        }
      }
    case types.USER_GET_ALL_DETAIL_PROVIDER_SUCCESS:
      return {
        ...state,
        providers: {
          ...state.providers,
          data: state.providers.option.page == 1 ? action.payload.content : [...state.providers.data, ...action.payload.content],
          optionRes: {
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages
          },
          loading: false,
          loadMore: false
        }
      }
    case types.USER_GET_ALL_DETAIL_PROVIDER_FAILED:
      return {
        ...state,
        providers: {
          ...state.providers,
          option: {
            ...state.providers.option,
            page: state.providers.option.page > 1 ? state.providers.option.page - 1 : 1
          },
          loading: false,
          loadMore: false
        }
      }
    default:
      return state
  }
}