/**
* Created by nghinv on Sun Nov 11 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoadInitialComponent from '../../screens/loadInitial';
import { login, loginWithFacebook } from '../../redux/actions/authen';

class LoadInitial extends PureComponent {
  render() {
    return <LoadInitialComponent {...this.props} />
  }
}

const mapDispathToProps = {
  login,
  loginWithFacebook
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    user: state.config.user,
    autoLogin: state.config.autoLogin,
    loginFb: state.config.loginFb,
    facebook_id: state.config.facebook_id
  }
}

export default connect(mapStateToProps, mapDispathToProps)(LoadInitial);
