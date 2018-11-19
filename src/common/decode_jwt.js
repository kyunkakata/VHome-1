/**
* Created by nghinv on Mon Nov 12 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import jwt_decode from 'jwt-decode';

/**
 * function decode token
 * @param {String} token 
 * return decode of token
 */
export const userInfoDecode = (token) => {
  try {
    let tokenDecode = jwt_decode(token)
    return tokenDecode.user_info
  } catch (error) {
    return {}
  }
}
