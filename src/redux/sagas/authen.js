/**
* Created by nghinv on Fri Nov 09 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put, select } from "redux-saga/effects";
import { Actions } from 'react-native-router-flux';
import Toast from '@remobile/react-native-toast';
import * as types from '../types';
import { global } from '../../configs/global';
import { POST, GET, PUT } from './api';
import { UPLOAD } from './fileServer';
import { URL_API } from '../../api/config';
import langs from '../../languages/common';
import { userInfoDecode } from '../../common/decode_jwt';
import {
  registerSuccess, registerFailed, loginSuccess, loginFailed, getInfoUser,
  getInfoUserSuccess, getInfoUserFailed, updateUserInfoSuccess, updateUserInfoFailed,
  loginWithFacebookSuccess, loginWithFacebookFailed
} from '../actions/authen';
import { providerGetServiceRating } from '../actions/provider_service';
import { getAllProvider } from '../actions/user_service';
import { getCoin } from '../actions/coin';

const isUserSelect = state => state.config.isUser;
const autoLoginSelect = state => state.config.autoLogin;

/**
* Register
*/
function* sagaRegister(action) {
  try {
    const isUser = yield select(isUserSelect);
    const url = isUser ? URL_API.customer.register : URL_API.provider.register;

    if (!isUser && action.payload.service) {
      try {
        const dataMapService = {
          // 1 add, 2 remove
          type: 1,
          service_id: action.payload.service.id
        }

        const resMapService = yield POST(URL_API.provider.user_map_service, dataMapService)
        if (resMapService.success && resMapService.statusCode == 200) {
          console.log('Map service success', resMapService)
        }
      } catch (e) {
        console.log('ERROR map service', e)
      }
    }

    let res = yield POST(url, action.payload.data)
    if (res.success && res.statusCode == 200) {
      yield put(registerSuccess(action.payload))
      yield Actions.pop()
    } else {
      yield put(registerFailed())
    }
  } catch (e) {
    console.log('Catche Register', e)
    yield put(registerFailed())
  }
}

export function* watchRegister() {
  yield takeLatest(types.REGISTER, sagaRegister)
}

/**
* Login
*/
function* sagaLogin(action) {
  try {
    const isUser = yield select(isUserSelect);
    const autoLogin = yield select(autoLoginSelect);

    const url = isUser ? URL_API.customer.login : URL_API.provider.login
    const dataLogin = {
      phone_number: action.payload.phonenumber,
      password: action.payload.password
    }

    let res = yield POST(url, dataLogin)
    if (res.success && res.statusCode == 200) {
      yield put(loginSuccess({ data: action.payload, token: res.data.access_token }))
      yield userInfo = userInfoDecode(res.data.access_token);
      yield put(getInfoUser(userInfo))

      // get service rating
      if (!isUser) {
        yield put(providerGetServiceRating(userInfo.id))
      } else {
        yield put(getCoin())
        yield put(getAllProvider())
      }

      Actions.dashboard()
    } else {
      yield put(loginFailed())
      if (autoLogin) {
        Actions.start()
        Actions.login()
      }
    }
  } catch (e) {
    console.log('Catche Login', e)
    yield put(loginFailed())
    if (autoLogin) {
      Actions.start()
      Actions.login()
    }
  }
}

export function* watchLogin() {
  yield takeLatest(types.LOGIN, sagaLogin)
}

/**
* login with facebook
*/
function* sagaLoginWithFacebook(action) {
  try {
    const isUser = yield select(isUserSelect);
    const url = isUser ? URL_API.customer.login_with_facebook : URL_API.provider.login_with_facebook

    let res = yield POST(url, action.payload.dataLogin)
    if (res.success && res.statusCode == 200) {
      yield put(loginWithFacebookSuccess({ token: res.data.access_token, account: action.payload.account }))
      yield userInfo = userInfoDecode(res.data.access_token);
      yield put(getInfoUser(userInfo))

      // get service rating
      if (!isUser) {
        yield put(providerGetServiceRating(userInfo.id))
      } else {
        yield put(getCoin())
        yield put(getAllProvider())
      }

      Actions.dashboard()
    } else {
      yield put(loginWithFacebookFailed())
    }

  } catch (e) {
    console.log('Catche LoginWithFacebook', e)
    yield put(loginWithFacebookFailed())
  }
}

export function* watchLoginWithFacebook() {
  yield takeLatest(types.LOGIN_WITH_FACEBOOK, sagaLoginWithFacebook)
}


/**
* get info user
*/
function* sagaGetInfoUser(action) {
  try {
    const isUser = yield select(isUserSelect);
    const url = isUser ? URL_API.customer.user_detail : URL_API.provider.user_detail
    let res = yield GET(url, { id: action.payload.id }, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getInfoUserSuccess(res.data))
    } else {
      yield put(getInfoUserFailed())
    }
  } catch (e) {
    console.log('Catche GetInfoUser', e)
    yield put(getInfoUserFailed())
  }
}

export function* watchGetInfoUser() {
  yield takeLatest(types.GET_INFO_USER, sagaGetInfoUser)
}

/**
* update user info
*/
function* sagaUpdateUserInfo(action) {
  try {
    const isUser = yield select(isUserSelect);
    const url = isUser ? URL_API.customer.update_user_infor : URL_API.provider.update_user_infor

    let data = JSON.parse(JSON.stringify(action.payload))
    if (data.avatar && data.avatar.sourceURL) {
      let avatar = {
        url: data.avatar.sourceURL,
        name: data.avatar.filename
      }

      // Upload avatar
      try {
        global.Loading.show()
        const res = yield UPLOAD(avatar)
        if (res.success && res.statusCode === 200) {
          data.avatar = res.data.files[0]
          global.Loading.hide()
        } else {
          global.Loading.hide()
          if (data.avatar) {
            delete data.avatar
          }
        }
      } catch (e) {
        console.log('catch UPLOAD', e)
        global.Loading.hide()
        if (data.avatar) {
          delete data.avatar
        }
      }
    }

    const res = yield PUT(url, data);
    if (res.success && res.statusCode == 200) {
      Toast.showShortCenter(langs.updateUserInfoSuccess);
      yield put(updateUserInfoSuccess(data))
    } else {
      yield put(updateUserInfoFailed())
    }
  } catch (e) {
    console.log('Catche UpdateUserInfo', e)
    yield put(updateUserInfoFailed())
  }
}

export function* watchUpdateUserInfo() {
  yield takeLatest(types.UPDATE_USER_INFO, sagaUpdateUserInfo)
}
