/**
* Created by nghinv on Tue Oct 30 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserViewMoreServiceComponent from '../../screens/home/user/user-ViewMoreService';
import { listServiceWithCategory } from './selector';
import { getService } from '../../redux/actions/service';

class UserViewMoreService extends PureComponent {
  render() {
    return <UserViewMoreServiceComponent {...this.props} />
  }
}

const mapDispathToProps = {
  getService
}

const mapStateToProps = (state, props) => {
  return {
    language: state.config.language,
    service: listServiceWithCategory(state, props),
    loading: state.service.allService.loading
  }
}

export default connect(mapStateToProps, mapDispathToProps)(UserViewMoreService);
