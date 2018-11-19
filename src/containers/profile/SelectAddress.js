/**
* Created by nghinv on Mon Nov 12 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SelectAddressComponent from '../../screens/profile/SelectAddress';

class SelectAddress extends PureComponent {
  render() {
    return <SelectAddressComponent {...this.props} />
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

export default connect(mapStateToProps, mapDispathToProps)(SelectAddress);