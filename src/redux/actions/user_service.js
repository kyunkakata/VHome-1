/**
* Created by nghinv on Wed Nov 14 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

// get service request history
export const getServiceRequestHistory = (data) => {
  return {
    type: types.USER_SERVICE_REQUEST_HISTORY,
    payload: data
  }
}

export const loadMoreServiceRequestHistory = (data) => {
  return {
    type: types.USER_LOAD_MORE_SERVICE_REQUEST_HISTORY,
    payload: data
  }
}

export const getServiceRequestHistorySuccess = (data) => {
  return {
    type: types.USER_SERVICE_REQUEST_HISTORY_SUCCESS,
    payload: data
  }
}

export const getServiceRequestHistoryFailed = () => {
  return {
    type: types.USER_SERVICE_REQUEST_HISTORY_FAILED
  }
}

// get service requesting
export const getServiceRequesting = (data) => {
  return {
    type: types.USER_SERVER_REQUESTING,
    payload: data
  }
}

export const loadMoreServiceRequesting = (data) => {
  return {
    type: types.USER_LOAD_MORE_SERVER_REQUESTING,
    payload: data
  }
}

export const getServiceRequestingSuccess = (data) => {
  return {
    type: types.USER_SERVER_REQUESTING_SUCCESS,
    payload: data
  }
}

export const getServiceRequestingFailed = () => {
  return {
    type: types.USER_SERVER_REQUESTING_FAILED
  }
}

// cancel service request
export const userCancelServiceRequest = (data) => {
  return {
    type: types.USER_CANCEL_SERVICE_REQUEST,
    payload: data
  }
}

export const userCancelServiceRequestSuccess = (data) => {
  return {
    type: types.USER_CANCEL_SERVICE_REQUEST_SUCCESS,
    payload: data
  }
}

export const userCancelServiceRequestFailed = () => {
  return {
    type: types.USER_CANCEL_SERVICE_REQUEST_FAILED
  }
}

// get all provider
export const getAllProvider = (data) => {
  return {
    type: types.USER_GET_ALL_DETAIL_PROVIDER,
    payload: data
  }
}

export const getAllProviderSuccess = (data) => {
  return {
    type: types.USER_GET_ALL_DETAIL_PROVIDER_SUCCESS,
    payload: data
  }
}

export const getAllProviderFailed = () => {
  return {
    type: types.USER_GET_ALL_DETAIL_PROVIDER_FAILED
  }
}
