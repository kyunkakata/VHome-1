/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put, select } from "redux-saga/effects";
import Toast from '@remobile/react-native-toast';
import * as types from '../types';
import { GET, POST, PUT } from './api';
import { URL_API } from '../../api/config';
import langs from '../../languages/common';
import {
  getServiceRequestHistorySuccess, getServiceRequestHistoryFailed,
  getServiceRequestingSuccess, getServiceRequestingFailed,
  userCancelServiceRequestSuccess, userCancelServiceRequestFailed,
  getAllProviderSuccess, getAllProviderFailed
} from '../actions/user_service';

const optionUserServiceRequestHistorySelect = state => state.userService.serviceRequestHistory.option;
const getOptionResUserServiceRequestHistoryRequest = state => state.userService.serviceRequestHistory.optionRes;
const optionUserServiceRequestingSelect = state => state.userService.serviceRequesting.option;
const getOptionResUserServiceRequestingRequest = state => state.userService.serviceRequesting.optionRes;

const optionProvidersSelect = state => state.userService.providers.option;
const getOptionResProviders = state => state.userService.providers.optionRes;

/**
* get service request history
*/
function* sagaUserServiceRequestHistory() {
  const option = yield select(optionUserServiceRequestHistorySelect);
  const optionRes = yield select(getOptionResUserServiceRequestHistoryRequest);

  try {
    if (optionRes.totalPages && optionRes.totalPages < option.page) {
      yield put(getServiceRequestHistoryFailed())
      return
    }

    const res = yield GET(URL_API.customer.search_service_request, option, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getServiceRequestHistorySuccess(res.data))
    } else {
      yield put(getServiceRequestHistoryFailed())
    }
  } catch (e) {
    console.log('Catche service request history', e)
    yield put(getServiceRequestHistoryFailed())
  }
}

export function* watchUserServiceRequestHistory() {
  yield takeLatest(types.USER_SERVICE_REQUEST_HISTORY, sagaUserServiceRequestHistory)
}

export function* watchUserLoadMoreServiceRequestHistory() {
  yield takeLatest(types.USER_LOAD_MORE_SERVICE_REQUEST_HISTORY, sagaUserServiceRequestHistory)
}

/**
* get service requesting
*/
function* sagaUserServiceRequesting() {
  const option = yield select(optionUserServiceRequestingSelect);
  const optionRes = yield select(getOptionResUserServiceRequestingRequest);

  try {
    if (optionRes.totalPages && optionRes.totalPages < option.page) {
      yield put(getServiceRequestingFailed())
      return
    }

    const res = yield GET(URL_API.customer.search_service_request, option, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getServiceRequestingSuccess(res.data))
    } else {
      yield put(getServiceRequestingFailed())
    }
  } catch (e) {
    console.log('Catche service requesting', e)
    yield put(getServiceRequestingFailed())
  }
}

export function* watchUserServiceRequesting() {
  yield takeLatest(types.USER_SERVER_REQUESTING, sagaUserServiceRequesting)
}

export function* watchUserLoadMoreServiceRequesting() {
  yield takeLatest(types.USER_LOAD_MORE_SERVER_REQUESTING, sagaUserServiceRequesting)
}

/**
* get all provider
*/
function* sagaUserGetAllProvider() {
  const option = yield select(optionProvidersSelect);
  const optionRes = yield select(getOptionResProviders);

  try {
    if (optionRes.totalPages && optionRes.totalPages < option.page) {
      yield put(getAllProviderFailed())
      return
    }

    const res = yield GET(URL_API.customer.get_all_provider, option, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getAllProviderSuccess(res.data))
    } else {
      yield put(getAllProviderFailed())
    }
  } catch (e) {
    console.log('Catche get all provider', e)
    yield put(getAllProviderFailed())
  }
}

export function* watchUserGetAllProvider() {
  yield takeLatest(types.USER_GET_ALL_DETAIL_PROVIDER, sagaUserGetAllProvider)
}

/**
* user cancel service request
*/
function* sagaUserCancelServiceRequest(action) {
  try {
    const dataUpdate = {
      id: action.payload.id,
      status: 0
    }
    const res = yield PUT(URL_API.customer.update_service_request, dataUpdate)
    if (res.success && res.statusCode == 200) {
      Toast.showShortCenter(langs.cancelRequestServiceSuccess);
      yield put(userCancelServiceRequestSuccess({ ...action.payload, status: 0 }))
    } else {
      yield put(userCancelServiceRequestFailed())
    }
  } catch (e) {
    console.log('Catche UserCancelServiceRequest', e)
    yield put(userCancelServiceRequestFailed())
  }
}

export function* watchUserCancelServiceRequest() {
  yield takeLatest(types.USER_CANCEL_SERVICE_REQUEST, sagaUserCancelServiceRequest)
}
