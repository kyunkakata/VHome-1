/**
* Created by nghinv on Wed Nov 14 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

// get danh danh sách service request có thể nhận
export const providerGetServiceRequest = (data) => {
  return {
    type: types.PROVIDER_SERVICE_REQUEST,
    payload: data
  }
}

export const providerLoadMoreServiceRequest = (data) => {
  return {
    type: types.PROVIDER_LOAD_MORE_SERVICE_REQUEST,
    payload: data
  }
}

export const providerGetServiceRequestSuccess = (data) => {
  return {
    type: types.PROVIDER_SERVICE_REQUEST_SUCCESS,
    payload: data
  }
}

export const providerGetServiceRequestFailed = () => {
  return {
    type: types.PROVIDER_SERVICE_REQUEST_FAILED
  }
}

// get rating service của mình
export const providerGetServiceRating = (data) => {
  return {
    type: types.PROVIDER_GET_SERVICE_RATING,
    payload: data
  }
}

export const providerGetServiceRatingSuccess = (data) => {
  return {
    type: types.PROVIDER_GET_SERVICE_RATING_SUCCESS,
    payload: data
  }
}

export const providerGetServiceRatingFailed = () => {
  return {
    type: types.PROVIDER_GET_SERVICE_RATING_FAILED
  }
}

// Nhận service request
export const providerReceiveServiceRequest = (data) => {
  return {
    type: types.PROVIDER_RECEIVE_SERVICE_REQUEST,
    payload: data
  }
}

export const providerReceiveServiceRequestSuccess = (data) => {
  return {
    type: types.PROVIDER_RECEIVE_SERVICE_REQUEST_SUCCESS,
    payload: data
  }
}

export const providerReceiveServiceRequestFailed = () => {
  return {
    type: types.PROVIDER_RECEIVE_SERVICE_REQUEST_FAILED
  }
}

// từ chối service request
export const providerRejectServiceRequest = (data) => {
  return {
    type: types.PROVIDER_REJECT_SERVICE_REQUEST,
    payload: data
  }
}

export const providerRejectServiceRequestSuccess = (data) => {
  return {
    type: types.PROVIDER_REJECT_SERVICE_REQUEST_SUCCESS,
    payload: data
  }
}

export const providerRejectServiceRequestFailed = () => {
  return {
    type: types.PROVIDER_REJECT_SERVICE_REQUEST_FAILED
  }
}

// get lich su cong viec
export const providerServiceRequestHistory = (data) => {
  return {
    type: types.PROVIDER_SERVICE_REQUEST_HISTORY,
    payload: data
  }
}

export const providerLoadMoreServiceRequestHistory = (data) => {
  return {
    type: types.PROVIDER_LOAD_MORE_SERVICE_REQUEST_HISTORY,
    payload: data
  }
}

export const providerServiceRequestHistorySuccess = (data) => {
  return {
    type: types.PROVIDER_SERVICE_REQUEST_HISTORY_SUCCESS,
    payload: data
  }
}

export const providerServiceRequestHistoryFailed = () => {
  return {
    type: types.PROVIDER_SERVICE_REQUEST_HISTORY_FAILED
  }
}
