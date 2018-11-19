/**
* Created by nghinv on Sun Nov 11 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import RNAccountKit from 'react-native-facebook-account-kit';
import { Loading } from '../../components';
import * as common from '../../configs/common';

class LoadInitial extends PureComponent {
  componentDidMount() {
    const { login, user, autoLogin, loginFb, facebook_id, loginWithFacebook } = this.props;

    if (autoLogin && user.phonenumber != '' && user.password != '') {
      login(user)
    } else if (autoLogin && loginFb && facebook_id) {
      const dataLogin = {
        facebook_id
      }

      loginWithFacebook({ dataLogin })
    } else {
      requestAnimationFrame(() => {
        Actions.start()
      })
    }
  }

  render() {
    return (
      <Loading transparent backgroundColor={common.BACKGROUND_COLOR_BUTTON} />
    );
  }
}

export default LoadInitial;
