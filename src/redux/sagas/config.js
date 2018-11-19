/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put } from "redux-saga/effects";
import { setLanguage } from '../actions/config';
import { DEFAULT_LANGUAGE } from '../../configs/config';

function* getInitial(action) {
  try {
    yield put(setLanguage(action.payload.language))
  } catch (e) {
    yield put(setLanguage(DEFAULT_LANGUAGE))
  }
}

export function* watchInitial() {
  yield takeLatest('persist/REHYDRATE', getInitial)
}
