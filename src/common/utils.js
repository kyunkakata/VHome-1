/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

'use strick';

import React from 'react';
import { StyleSheet, Text, Platform, Linking, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const WWW_URL_PATTERN = /^www\./i;

/*
* function detected device is iphoneX
* return true when device is iphoneX
*/
export const isX = (() => {
  return (
    Platform.OS === 'ios' && DeviceInfo.getModel() === 'iPhone X'
  );
})();

export const safeAreaInsetX = { top: 24, bottom: 34 };
export const paddingX = isX ? safeAreaInsetX.top : 0;

//iPhoneX SafeArea
export const safeArea = {
  portrait: {
    topInset: 24,
    leftInset: 0,
    rightInset: 0,
    bottomInset: 34
  },
  landscape: {
    topInset: 0,
    leftInset: 44,
    rightInset: 44,
    bottomInset: 21
  }
}

// The height of the navigation bar itself
export const navigationBarHeight = 44;
export const statusBarHeight = Platform.select({ ios: 20, android: StatusBar.currentHeight });
export const heightNavBar = navigationBarHeight + Platform.select({ ios: statusBarHeight + paddingX, android: 0 });

/***
* Function set font default
* @param font like: 'Quicksand'
* @requires font link to ios and android
*/
export const setFont = (font) => {
  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: font
    }
  });

  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultFontFamily, origin.props.style]
    });
  };
}

/*
* Function open url on web brower
*/
export const openUrl = (url) => {
  try {
    if (WWW_URL_PATTERN.test(url)) {
      this.onUrlPress(`http://${url}`);
    } else {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log('No handler for URL:', url);
        } else {
          Linking.openURL(url)
            .catch(e => {
              console.log('error', e)
            })
        }
      });
    }
  } catch (e) { }
}

/**
 * conver utf8 charactor
 */
export const converUtf8 = (str) => {
  var reg2 = /(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g
  var reg3 = /(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g
  var reg4 = /(ì|í|ị|ỉ|ĩ)/g
  var reg5 = /(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g
  var reg6 = /(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g
  var reg7 = /(ỳ|ý|ỵ|ỷ|ỹ)/g
  var reg8 = /(đ)/g
  var reg9 = /(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g
  var reg10 = /(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g
  var reg11 = /(Ì|Í|Ị|Ỉ|Ĩ)/g
  var reg12 = /(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g
  var reg13 = /(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g
  var reg14 = /(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g
  var reg15 = /(Đ|Ð)/g

  let strResult = str
  strResult = strResult.replace(reg2, 'a');
  strResult = strResult.replace(reg3, 'e');
  strResult = strResult.replace(reg4, 'i');
  strResult = strResult.replace(reg5, 'o');
  strResult = strResult.replace(reg6, 'u');
  strResult = strResult.replace(reg7, 'y');
  strResult = strResult.replace(reg8, 'd');
  strResult = strResult.replace(reg9, 'A');
  strResult = strResult.replace(reg10, 'E');
  strResult = strResult.replace(reg11, 'I');
  strResult = strResult.replace(reg12, 'O');
  strResult = strResult.replace(reg13, 'U');
  strResult = strResult.replace(reg14, 'Y');
  strResult = strResult.replace(reg15, 'D');

  return strResult;
}

/**
 * hàm trả về số điện thoại bắt đầu bằng số 0
 * @param {String} phone 
 * @returns {String} phonenumber (0 + phone)
 */
export const processPhonenumber = (phone) => {
  let phonenumber = ''

  if (phone[0] !== '0') {
    phonenumber = '0' + phone
  } else {
    phonenumber = phone
  }

  return phonenumber
}
