/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ForgotPasswordComponent from '../../screens/forgot-password';

class ForgotPassword extends PureComponent {
  render() {
    return <ForgotPasswordComponent {...this.props} />
  }
}

const mapDispathToProps = {

}

const mapStateToProps = (state) => {
  return {
    language: state.config.language
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ForgotPassword);
