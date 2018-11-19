/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginComponent from '../../screens/login';
import { login, loginWithFacebook } from '../../redux/actions/authen';

class Login extends PureComponent {
  render() {
    return <LoginComponent {...this.props} />
  }
}

const mapDispathToProps = {
  login,
  loginWithFacebook
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    isUser: state.config.isUser,
    user: state.config.user
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Login);
