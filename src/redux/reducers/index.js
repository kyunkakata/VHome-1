/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

'use strick';

import { AsyncStorage } from 'react-native';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import Config from './config';
import Codepush from './codepush';
import Location from './location';
import Service from './service';
import Authen from './authen';
import ProviderService from './provider_service';
import UserService from './user_service';
import Coin from './coin';
import Notification from './notification';

const setupConfig = {
  key: 'configReducer',
  storage: AsyncStorage
}

export default combineReducers({
  config: persistReducer(setupConfig, Config),
  codepush: Codepush,
  location: Location,
  service: Service,
  service: Service,
  authen: Authen,
  providerSevice: ProviderService,
  userService: UserService,
  coin: Coin,
  notification: Notification,
});

