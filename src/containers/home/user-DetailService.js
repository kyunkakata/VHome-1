/**
* Created by nghinv on Tue Oct 23 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserDetailServiceComponent from '../../screens/home/user/user-DetailService';
import { createServiceRequest } from '../../redux/actions/service';

class UserDetailService extends PureComponent {
  render() {
    return <UserDetailServiceComponent {...this.props} />
  }
}

const mapDispathToProps = {
  createServiceRequest
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    userInfo: state.authen.userInfo,
    allService: state.service.allService.data
  }
}

export default connect(mapStateToProps, mapDispathToProps)(UserDetailService);
