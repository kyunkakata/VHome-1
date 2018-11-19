/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserHistoryComponent from '../../screens/history/index-user-History';
import ProductHistoryComponent from '../../screens/history/index-product-History';

class History extends PureComponent {
  render() {
    return this.props.isUser ? <UserHistoryComponent {...this.props} /> : <ProductHistoryComponent {...this.props} />
  }
}

const mapDispathToProps = {

}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    isUser: state.config.isUser
  }
}

export default connect(mapStateToProps, mapDispathToProps)(History);
