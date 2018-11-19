/**
* Created by nghinv on Wed Nov 14 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const INITIAL_STATE = {
  serviceRequest: {
    data: [],
    option: {
      page: 1,
      size: 20,
      status: 0
    },
    optionRes: {},
    loading: false,
    loadMores: false
  },
  serviceRequestHistory: {
    data: [],
    option: {
      page: 1,
      size: 20,
      provider_id: ''
    },
    optionRes: {},
    loading: false,
    loadMores: false
  },
  serviceRating: {}
}

export default provider_service = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PROVIDER_SERVICE_REQUEST:
      return {
        ...state,
        serviceRequest: {
          ...state.serviceRequest,
          option: {
            ...state.serviceRequest.option,
            page: 1
          },
          loading: true,
          loadMore: false
        }
      }
    case types.PROVIDER_LOAD_MORE_SERVICE_REQUEST:
      return {
        ...state,
        serviceRequest: {
          ...state.serviceRequest,
          option: {
            ...state.serviceRequest.option,
            page: state.serviceRequest.option.page + 1
          },
          loading: false,
          loadMore: true
        }
      }
    case types.PROVIDER_SERVICE_REQUEST_SUCCESS:
      return {
        ...state,
        serviceRequest: {
          ...state.serviceRequest,
          data: state.serviceRequest.option.page == 1 ? action.payload.content : [...state.serviceRequest.data, ...action.payload.content],
          optionRes: {
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages
          },
          loading: false,
          loadMore: false
        }
      }
    case types.PROVIDER_SERVICE_REQUEST_FAILED:
      return {
        ...state,
        serviceRequest: {
          ...state.serviceRequest,
          option: {
            ...state.serviceRequest.option,
            page: state.serviceRequest.option.page > 1 ? state.serviceRequest.option.page - 1 : 1
          },
          loading: false,
          loadMore: false
        }
      }
    // get history service request
    case types.PROVIDER_SERVICE_REQUEST_HISTORY:
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
    case types.PROVIDER_LOAD_MORE_SERVICE_REQUEST_HISTORY:
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
    case types.PROVIDER_SERVICE_REQUEST_HISTORY_SUCCESS:
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
    case types.PROVIDER_SERVICE_REQUEST_HISTORY_FAILED:
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
    case types.PROVIDER_RECEIVE_SERVICE_REQUEST_SUCCESS:
    case types.PROVIDER_REJECT_SERVICE_REQUEST_SUCCESS:
      return {
        ...state,
        serviceRequest: {
          ...state.serviceRequest,
          data: state.serviceRequest.data.map(service => service.id == action.payload.service_request_id ? { ...service, needHide: true } : service)
        }
      }
    case types.PROVIDER_GET_SERVICE_RATING_SUCCESS: {
      return {
        ...state,
        serviceRating: action.payload
      }
    }
    case types.LOGOUT: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}