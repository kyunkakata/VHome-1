/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

export const changeTypeLogin = (payload) => {
  return {
    type: types.CHANGE_TYPE_LOGIN,
    payload
  }
}

export const register = (data) => {
  return {
    type: types.REGISTER,
    payload: data
  }
}

export const registerSuccess = (data) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data
  }
}

export const registerFailed = () => {
  return {
    type: types.REGISTER_FAILED
  }
}

// Login
export const login = (data) => {
  return {
    type: types.LOGIN,
    payload: data
  }
}

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data
  }
}

export const loginFailed = () => {
  return {
    type: types.LOGIN_FAILED
  }
}

export const loginWithFacebook = (data) => {
  return {
    type: types.LOGIN_WITH_FACEBOOK,
    payload: data
  }
}

export const loginWithFacebookSuccess = (data) => {
  return {
    type: types.LOGIN_WITH_FACEBOOK_SUCCESS,
    payload: data
  }
}

export const loginWithFacebookFailed = () => {
  return {
    type: types.LOGIN_WITH_FACEBOOK_FAILED
  }
}


// Logout
export const logOut = () => {
  return {
    type: types.LOGOUT
  }
}

export const getInfoUser = (data) => {
  return {
    type: types.GET_INFO_USER,
    payload: data
  }
}

export const getInfoUserSuccess = (data) => {
  return {
    type: types.GET_INFO_USER_SUCCESS,
    payload: data
  }
}

export const getInfoUserFailed = () => {
  return {
    type: types.GET_INFO_USER_FAILED
  }
}

export const updateUserInfo = (data) => {
  return {
    type: types.UPDATE_USER_INFO,
    payload: data
  }
}

export const updateUserInfoSuccess = (data) => {
  return {
    type: types.UPDATE_USER_INFO_SUCCESS,
    payload: data
  }
}

export const updateUserInfoFailed = () => {
  return {
    type: types.UPDATE_USER_INFO_FAILED
  }
}
