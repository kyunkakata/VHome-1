/**
* Created by nghinv on Mon Nov 12 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put, select } from "redux-saga/effects";
import { Actions } from 'react-native-router-flux';
import * as types from '../types';
import { GET, POST } from './api';
import { URL_API } from '../../api/config';
import { global } from '../../configs/global';
import {
  createServiceRequestSuccess, createServiceRequestFailed,
  getAllCategorySuccess, getAllCategoryFailed,
  getAllServiceSuccess, getAllServiceFailed
} from '../actions/service';

const optionAllCategorySelect = state => state.service.allCategory.option;
const optionAllServiceSelect = state => state.service.allService.option;

/**
* get all category
*/
function* sagaGetAllCategory() {
  const option = yield select(optionAllCategorySelect);
  try {
    const res = yield GET(URL_API.provider.search_catagory, option, getService = true, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getAllCategorySuccess(res.data))
    } else {
      yield put(getAllCategoryFailed())
    }
  } catch (e) {
    console.log('Catche GetAllService', e)
    yield put(getAllCategoryFailed())
  }
}

export function* watchGetAllCategory() {
  yield takeLatest(types.GET_ALL_CATEGORY, sagaGetAllCategory)
}

/**
* get all services
*/
function* sagaGetAllService() {
  const option = yield select(optionAllServiceSelect);
  try {
    const res = yield GET(URL_API.provider.search_service, option, getService = true, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getAllServiceSuccess(res.data))
    } else {
      yield put(getAllServiceFailed())
    }
  } catch (e) {
    console.log('Catche GetAllService', e)
    yield put(getAllServiceFailed())
  }
}

export function* watchGetAllService() {
  yield takeLatest(types.GET_ALL_SERVICE, sagaGetAllService)
}

/**
* create service request 
*/
function* sagaCreateServiceRequest(action) {
  try {
    const res = yield POST(URL_API.customer.create_service_request, action.payload)
    if (res.success && res.statusCode == 200) {
      yield put(createServiceRequestSuccess(action.payload))
      // push to detail call service
      global.Alert2.close(() => {
        Actions.userDetailCallService({ data: action.payload })
      })
    } else {
      yield put(createServiceRequestFailed())
    }
  } catch (e) {
    console.log('Catche CreateServiceRequest', e)
    yield put(createServiceRequestFailed())
  }
}

export function* watchCreateServiceRequest() {
  yield takeLatest(types.CREATE_SERVICE_REQUEST, sagaCreateServiceRequest)
}
