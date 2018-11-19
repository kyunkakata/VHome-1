/**
* Created by nghinv on Wed Nov 14 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put, select } from "redux-saga/effects";
import Toast from '@remobile/react-native-toast';
import * as types from '../types';
import { GET, POST, PUT } from './api';
import { URL_API } from '../../api/config';
import langs from '../../languages/common';
import {
  providerGetServiceRequestFailed, providerGetServiceRequestSuccess,
  providerServiceRequestHistorySuccess, providerServiceRequestHistoryFailed,
  providerGetServiceRatingSuccess, providerGetServiceRatingFailed,
  providerReceiveServiceRequestSuccess, providerReceiveServiceRequestFailed,
  providerRejectServiceRequestSuccess, providerRejectServiceRequestFailed,
} from '../actions/provider_service';

const providerInfoSelect = state => state.authen.userInfo;
const optionProviderServiceRequestSelect = state => state.providerSevice.serviceRequest.option;
const getOptionResProviderServiceRequest = state => state.providerSevice.serviceRequest.optionRes;
const optionProviderServiceRequestHistorySelect = state => state.providerSevice.serviceRequestHistory.option;
const getOptionResProviderServiceRequestHistory = state => state.providerSevice.serviceRequestHistory.optionRes;

/**
* get ProviderServiceRequest
*/
function* sagaProviderServiceRequest() {
  const option = yield select(optionProviderServiceRequestSelect);
  const optionRes = yield select(getOptionResProviderServiceRequest);

  try {
    if (optionRes.totalPages && optionRes.totalPages < option.page) {
      yield put(providerGetServiceRequestFailed())
      return
    }

    const res = yield GET(URL_API.provider.service_request_search, option, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(providerGetServiceRequestSuccess(res.data))
    } else {
      yield put(providerGetServiceRequestFailed())
    }
  } catch (e) {
    console.log('Catche providerServiceRequest', e)
    yield put(providerGetServiceRequestFailed())
  }
}

export function* watchProviderServiceRequest() {
  yield takeLatest(types.PROVIDER_SERVICE_REQUEST, sagaProviderServiceRequest)
}

export function* watchProviderLoadMoreServiceRequest() {
  yield takeLatest(types.PROVIDER_LOAD_MORE_SERVICE_REQUEST, sagaProviderServiceRequest)
}

/**
* get ProviderServiceRequestHistory
*/
function* sagaProviderServiceRequestHistory() {
  const providerInfo = yield select(providerInfoSelect);
  const option = yield select(optionProviderServiceRequestHistorySelect);
  const optionRes = yield select(getOptionResProviderServiceRequestHistory);

  try {
    if (optionRes.totalPages && optionRes.totalPages < option.page) {
      yield put(providerServiceRequestHistoryFailed())
      return
    }

    const res = yield GET(URL_API.provider.service_request_search, { ...option, provider_id: providerInfo.id }, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(providerServiceRequestHistorySuccess(res.data))
    } else {
      yield put(providerServiceRequestHistoryFailed())
    }
  } catch (e) {
    console.log('Catche providerServiceRequestHistory', e)
    yield put(providerServiceRequestHistoryFailed())
  }
}

export function* watchProviderServiceRequestHistory() {
  yield takeLatest(types.PROVIDER_SERVICE_REQUEST_HISTORY, sagaProviderServiceRequestHistory)
}

export function* watchProviderLoadMoreServiceRequestHistory() {
  yield takeLatest(types.PROVIDER_LOAD_MORE_SERVICE_REQUEST_HISTORY, sagaProviderServiceRequestHistory)
}

/**
* get service rating 
*/
function* sagaProviderGetServiceRating(action) {
  try {
    const dataGetRatingProvider = {
      provider_id: action.payload
    }

    const res = yield GET(URL_API.provider.service_rating_of_provider, dataGetRatingProvider, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(providerGetServiceRatingSuccess(res.data))
    } else {
      yield put(providerGetServiceRatingFailed())
    }
  } catch (e) {
    console.log('Catche ProviderGetServiceRating', e)
    yield put(providerGetServiceRatingFailed())
  }
}

export function* watchProviderGetServiceRating() {
  yield takeLatest(types.PROVIDER_GET_SERVICE_RATING, sagaProviderGetServiceRating)
}

/**
* get receive service request 
*/
function* sagaProviderReceiveServiceRequest(action) {
  try {
    const res = yield PUT(URL_API.provider.service_request_receive, action.payload)
    if (res.success && res.statusCode == 200) {
      yield put(providerReceiveServiceRequestSuccess(action.payload))
      Toast.showShortCenter(langs.receiveServiceRequestSuccess);
    } else {
      yield put(providerReceiveServiceRequestFailed())
    }
  } catch (e) {
    console.log('Catche receive service request', e)
    yield put(providerReceiveServiceRequestFailed())
  }
}

export function* watchProviderReceiveServiceRequest() {
  yield takeLatest(types.PROVIDER_RECEIVE_SERVICE_REQUEST, sagaProviderReceiveServiceRequest)
}

/**
* reject service request
*/
function* sagaProviderRejectServiceRequest(action) {
  try {
    const res = yield PUT(URL_API.provider.service_request_reject, action.payload)
    if (res.success && res.statusCode == 200) {
      yield put(providerRejectServiceRequestSuccess(action.payload))
      Toast.showShortCenter(langs.rejectServiceRequestSuccess);
    } else {
      yield put(providerRejectServiceRequestFailed())
    }
  } catch (e) {
    console.log('Catche ProviderRejectServiceRequest', e)
    yield put(providerRejectServiceRequestFailed())
  }
}

export function* watchProviderRejectServiceRequest() {
  yield takeLatest(types.PROVIDER_REJECT_SERVICE_REQUEST, sagaProviderRejectServiceRequest)
}

