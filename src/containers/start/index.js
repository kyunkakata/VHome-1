/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import StartComponent from '../../screens/start';
import { changeTypeLogin, autoLogin } from '../../redux/actions/authen';

class Start extends PureComponent {
  static onEnter() {
    StatusBar.setHidden(true);
  }

  render() {
    return <StartComponent {...this.props} />
  }
}

const mapDispathToProps = {
  changeTypeLogin,
  autoLogin
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    isUser: state.config.isUser,
    user: state.config.user
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Start);
