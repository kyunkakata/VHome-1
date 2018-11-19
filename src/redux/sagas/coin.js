/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put, select } from "redux-saga/effects";
import * as types from '../types';
import { GET, POST } from './api';
import { URL_API } from '../../api/config';
import { getCoinSuccess, getCoinFailed } from '../actions/coin';

const isUserSelect = state => state.config.isUser;

/**
* get coin
*/
function* sagaGetCoin() {
  const isUser = yield select(isUserSelect);
  const url = isUser ? URL_API.customer.detail_coin : URL_API.provider.detail_coin;
  try {
    const res = yield GET(url, {}, undefined, destroyLoading = true)
    if (res.success && res.statusCode == 200) {
      yield put(getCoinSuccess(res.data))
    } else {
      yield put(getCoinFailed())
    }
  } catch (e) {
    console.log('Catche GetCoin', e)
    yield put(getCoinFailed())
  }
}

export function* watchGetCoin() {
  yield takeLatest(types.GET_COIN, sagaGetCoin)
}
