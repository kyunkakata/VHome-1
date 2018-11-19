/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put, select } from "redux-saga/effects";
import * as types from '../types';
import { GET, POST } from './api';
import { URL_API } from '../../api/config';
import { getAllNotificationSuccess, getAllNotificationFailed } from '../actions/notification';

const isUserSelect = state => state.config.isUser;
const optionNotificationSelect = state => state.notification.notification.option;
const getOptionResNotificationSelect = state => state.notification.notification.optionRes;

/**
* get notification
*/
function* sagaGetAllNotification() {
  const isUser = yield select(isUserSelect);
  const option = yield select(optionNotificationSelect);
  const optionRes = yield select(getOptionResNotificationSelect);

  try {
    if (optionRes.totalPages && optionRes.totalPages < option.page) {
      yield put(getAllNotificationFailed())
      return
    }

    const url = isUser ? URL_API.customer.notification_search : URL_API.provider.notification_search;
    const res = yield GET(url, option, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getAllNotificationSuccess(res.data))
    } else {
      yield put(getAllNotificationFailed())
    }
  } catch (e) {
    console.log('Catche get notification', e)
    yield put(getAllNotificationFailed())
  }
}

export function* watchGetAllNotification() {
  yield takeLatest(types.GET_ALL_NOTIFICATION, sagaGetAllNotification)
}

export function* watchLoadMoreAllNotification() {
  yield takeLatest(types.LOAD_MORE_ALL_NOTIFICATION, sagaGetAllNotification)
}
