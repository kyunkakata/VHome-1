/**
* Created by nghinv on Fri Nov 09 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { takeLatest, put, take, select } from "redux-saga/effects";
import { global } from '../../configs/global';
import * as API from '../../api';
import { API_KEY, BASE_URL } from '../../api/config';
import langs from '../../languages/common';

const tokenSelect = state => state.config.token;
const languageSelect = state => state.config.language;
const isUserSelect = state => state.config.isUser;

/**
 * func get
 * @param {String} url 
 * @param {Object} data 
 */
export function* GET(url, data, getService, destroyLoading) {
  const token = yield select(tokenSelect);
  const language = yield select(languageSelect);
  const isUser = yield select(isUserSelect);
  const isUrlCustomer = isUser && !getService

  !destroyLoading && global.Loading && global.Loading.show()
  try {
    const response = yield API.GET(`${(isUrlCustomer ? BASE_URL.customer : BASE_URL.provider) + url}`, data, token, API_KEY, language)
    !destroyLoading && global.Loading && global.Loading.hide();

    if (!response.success && response.message) {
      global.Alert.alert({
        title: langs.notification,
        message: response.message,
        leftButton: { text: langs.ok }
      });
    }
    return response
  } catch (e) {
    !destroyLoading && global.Loading && global.Loading.hide();

    global.Alert.alert({
      title: langs.notification,
      message: langs.errorInternet,
      leftButton: { text: langs.ok }
    });

    return new Error(e)
  }
}

/**
 * func post
 * @param {String} url 
 * @param {Object} data 
 */
export function* POST(url, data, getService, destroyLoading) {
  const token = yield select(tokenSelect);
  const language = yield select(languageSelect);
  const isUser = yield select(isUserSelect);

  !destroyLoading && global.Loading && global.Loading.show()
  try {
    const response = yield API.POST(`${(isUser ? BASE_URL.customer : BASE_URL.provider) + url}`, data, token, API_KEY, language)
    !destroyLoading && global.Loading && global.Loading.hide();

    if (!response.success && response.message) {
      global.Alert.alert({
        title: langs.notification,
        message: response.message,
        leftButton: { text: langs.ok }
      });
    }
    return response
  } catch (e) {
    !destroyLoading && global.Loading && global.Loading.hide();

    global.Alert.alert({
      title: langs.notification,
      message: langs.errorInternet,
      leftButton: { text: langs.ok }
    });

    return new Error(e)
  }
}

/**
 * func put
 * @param {String} url 
 * @param {Object} data 
 */
export function* PUT(url, data, getService, destroyLoading) {
  const token = yield select(tokenSelect);
  const language = yield select(languageSelect);
  const isUser = yield select(isUserSelect);

  !destroyLoading && global.Loading && global.Loading.show()
  try {
    const response = yield API.PUT(`${(isUser ? BASE_URL.customer : BASE_URL.provider) + url}`, data, token, API_KEY, language)
    !destroyLoading && global.Loading && global.Loading.hide();

    if (!response.success && response.message) {
      global.Alert.alert({
        title: langs.notification,
        message: response.message,
        leftButton: { text: langs.ok }
      });
    }
    return response
  } catch (e) {
    !destroyLoading && global.Loading && global.Loading.hide();

    global.Alert.alert({
      title: langs.notification,
      message: langs.errorInternet,
      leftButton: { text: langs.ok }
    });

    return new Error(e)
  }
}
