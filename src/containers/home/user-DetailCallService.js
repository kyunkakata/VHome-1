/**
* Created by nghinv on Fri Nov 02 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserDetailCallServiceComponent from '../../screens/home/user/user-DetailCallService';

class UserDetailCallService extends PureComponent {
  render() {
    return <UserDetailCallServiceComponent {...this.props} />
  }
}

const mapDispathToProps = {

}

const mapStateToProps = (state) => {
  return {
    language: state.config.language
  }
}

export default connect(mapStateToProps, mapDispathToProps)(UserDetailCallService);
