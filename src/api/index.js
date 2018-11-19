/**
* Created by nghinv on Fri Nov 09 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

export const langs = {
  en: {
    timeout: 'Request timeout'
  },
  vi: {
    timeout: 'Hết thời gian yêu cầu'
  }
}

export const TIMEOUT_SECOND = 30000;
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export const consoleCustom = (type, url, data, token, apikey, language, timeout) => {
  if (isDebuggingInChrome) {
    console.groupCollapsed(`%cAPI::${type} ${url}`, 'color: green; font-weight: bold;')
    console.log('DATA::', JSON.stringify(data));
    console.groupCollapsed('TOKEN::')
    console.log(token)
    console.groupEnd();
    console.log('API_KEY::', apikey)
    console.log('LANGUAGE::', language)
    console.log('TIMEOUT::', timeout)
    console.groupEnd();
  }
}

export function POST(url, data, token, apikey, language = 'vi', timeout) {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Luci-Language': language == 'vi' ? 'vi-VN' : 'en-US',
    'X-Luci-Api-Key': apikey,
    Authorization: `Bearer ${token}`,
    token
  }
  if (!token) {
    delete headers.Authorization
  }
  consoleCustom('POST', url, data, token, apikey, language, timeout, headers);

  return new Promise((resolve, reject) => {
    Promise.race([new Promise((resl, rej) => {
      setTimeout(resl, timeout || TIMEOUT_SECOND, {
        _isTimeOut: true
      });
    }), fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then(res => res.json())])
      .then((json) => {
        console.log('API::POST ', url, json);

        if (!json._isTimeOut)
          resolve(json);
        else
          resolve({
            success: false,
            message: langs[language] ? langs[language].timeout : ''
          });
      }).catch(error => {
        console.log('error', error)

        reject(error);
      })

  });
}

export function PUT(url, data, token, apikey, language = 'vi', timeout) {
  consoleCustom('PUT', url, data, token, apikey, language, timeout);

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Luci-Language': language == 'vi' ? 'vi-VN' : 'en-US',
    'X-Luci-Api-Key': apikey,
    Authorization: `Bearer ${token}`,
    token
  }
  if (!token) {
    delete headers.Authorization
  }
  return new Promise((resolve, reject) => {
    Promise.race([new Promise((resl, rej) => {
      setTimeout(resl, timeout || TIMEOUT_SECOND, {
        _isTimeOut: true
      });
    }), fetch(url, {
      headers,
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then(res => res.json())])
      .then((json) => {
        console.log('value', json);

        if (!json._isTimeOut)
          resolve(json);
        else
          resolve({
            success: false,
            message: langs[language] ? langs[language].timeout : ''
          });
      }).catch(error => {
        console.log('error', error)

        reject(error);
      })

  });
}

export function GET(url, data, token, apikey, language = 'vi', timeout) {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Luci-Language': language == 'vi' ? 'vi-VN' : 'en-US',
    'X-Luci-Api-Key': apikey,
    Authorization: `Bearer ${token}`,
    token,
  }
  if (!token) {
    delete headers.Authorization
  }
  consoleCustom('GET', url, data, token, apikey, language, timeout, headers);

  return new Promise((resolve, reject) => {
    let params = url;
    if (data) {
      params += '?';
      let i = 0;
      for (const key in data) {
        if (data[key] !== undefined)
          if (i != 0) params += `&${key}=${data[key]}`;
          else params += `${key}=${data[key]}`;
        i++;
      }
    }
    Promise.race([new Promise((resl, rej) => {
      setTimeout(resl, timeout || TIMEOUT_SECOND, {
        _isTimeOut: true
      });
    }), fetch(params, {
      headers,
      method: 'GET',
    })
      .then(res => res.json())])
      .then((json) => {
        console.log('value', json);

        if (!json._isTimeOut)
          resolve(json);
        else
          resolve({
            success: false,
            message: langs[language] ? langs[language].timeout : ''
          });
      }).catch(error => {
        console.log('error', error)

        reject(error);
      })
  });
}
