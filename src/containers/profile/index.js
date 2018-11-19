/**
* Created by nghinv on Sun Oct 21 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProfileComponent from '../../screens/profile';
import { userInfoDecode } from '../../common/decode_jwt';
import { getInfoUser, updateUserInfo } from '../../redux/actions/authen';
import { listServiceSelector } from '../home/selector';

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    const userInfo = userInfoDecode(props.token);
    this.props.getInfoUser(userInfo)
  }

  render() {
    return <ProfileComponent {...this.props} />
  }
}

const mapDispathToProps = {
  getInfoUser,
  updateUserInfo
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    isUser: state.config.isUser,
    token: state.config.token,
    userInfo: state.authen.userInfo,
    services: listServiceSelector(state),
    loginFb: state.config.loginFb,
    providerServiceRating: state.providerSevice.serviceRating
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Profile);
