/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import * as types from '../types';

const initialState = {
  language: 'vi',
  barStyle: 'light-content',
  notify: true,
  vibrate: true,
  firstInstall: true,
  autoLogin: false,
  isUser: true,
  loginFb: false,
  facebook_id: null,
  providerStatusOnline: true,
  user: {
    username: '',
    phonenumber: '',
    password: '',
    isUser: true
  },
  token: undefined
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }
    case types.CHANGE_PROVIDER_STATUS:
      return {
        ...state,
        providerStatusOnline: action.payload
      }
    case types.CHANGE_TYPE_LOGIN:
      return {
        ...state,
        isUser: action.payload,
        firstInstall: false
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: {
          username: action.payload.data.full_name,
          phonenumber: action.payload.data.phone_number,
          password: action.payload.data.password,
          isUser: action.payload.isUser
        }
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        autoLogin: true,
        user: {
          ...state.user,
          ...action.payload.data
        },
        token: action.payload.token
      }
    case types.LOGIN_WITH_FACEBOOK_SUCCESS:
      return {
        ...state,
        autoLogin: true,
        user: {
          ...state.user,
          phonenumber: action.payload.account ? `+${action.payload.account.phoneNumber.countryCode}${action.payload.account.phoneNumber.number}` : state.user.phonenumber
        },
        loginFb: true,
        facebook_id: action.payload.account ? action.payload.account.id : state.facebook_id,
        token: action.payload.token
      }
    case types.LOGOUT:
      return {
        ...state,
        autoLogin: false,
        user: {
          username: '',
          phonenumber: '',
          password: '',
          isUser: true
        },
        loginFb: false,
        facebook_id: null,
        token: undefined
      }
    default:
      return state
  }
}
