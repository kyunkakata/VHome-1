/**
* Created by nghinv on Mon Nov 12 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

// service request
export const createServiceRequest = (data) => {
  return {
    type: types.CREATE_SERVICE_REQUEST,
    payload: data
  }
}

export const createServiceRequestSuccess = (data) => {
  return {
    type: types.CREATE_SERVICE_REQUEST_SUCCESS,
    payload: data
  }
}

export const createServiceRequestFailed = () => {
  return {
    type: types.CREATE_SERVICE_REQUEST_FAILED
  }
}

export const getAllService = (data) => {
  return {
    type: types.GET_ALL_SERVICE,
    payload: data
  }
}

export const getAllServiceSuccess = (data) => {
  return {
    type: types.GET_ALL_SERVICE_SUCCESS,
    payload: data
  }
}

export const getAllServiceFailed = () => {
  return {
    type: types.GET_ALL_SERVICE_FAILED
  }
}

export const getAllCategory = (data) => {
  return {
    type: types.GET_ALL_CATEGORY,
    payload: data
  }
}

export const getAllCategorySuccess = (data) => {
  return {
    type: types.GET_ALL_CATEGORY_SUCCESS,
    payload: data
  }
}

export const getAllCategoryFailed = () => {
  return {
    type: types.GET_ALL_CATEGORY_FAILED
  }
}
