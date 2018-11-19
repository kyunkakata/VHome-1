/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

'use strick';

import { all, fork } from 'redux-saga/effects';
import * as configs from './config';
import * as authen from './authen';
import * as service from './service';
import * as providerSevice from './provider_service';
import * as userSevice from './user_service';
import * as coin from './coin';
import * as notification from './notification';

export default function* rootSaga() {
  yield all([
    ...Object.values(configs),
    ...Object.values(authen),
    ...Object.values(service),
    ...Object.values(providerSevice),
    ...Object.values(userSevice),
    ...Object.values(coin),
    ...Object.values(notification),
  ].map(fork));
}
