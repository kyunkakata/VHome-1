/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HomeProductComponent from './index-product';
import HomeUserComponent from './index-user';

class Home extends PureComponent {
  render() {
    const { isUser } = this.props;

    return isUser ? <HomeUserComponent {...this.props} /> : <HomeProductComponent {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    isUser: state.config.isUser
  }
}

export default connect(mapStateToProps)(Home);
