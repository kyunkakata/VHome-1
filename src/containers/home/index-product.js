/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HomeProductComponent from '../../screens/home/product/product-Home';
import { providerGetServiceRequest, providerLoadMoreServiceRequest } from '../../redux/actions/provider_service';
import { changeProviderStatus } from '../../redux/actions/config';

class HomeProduct extends PureComponent {
  componentDidMount() {
    const { serviceRequest } = this.props;
    if (serviceRequest.data.length == 0) {
      this.props.providerGetServiceRequest()
    }
  }

  render() {
    return <HomeProductComponent {...this.props} />
  }
}

const mapDispathToProps = {
  providerGetServiceRequest,
  providerLoadMoreServiceRequest,
  changeProviderStatus
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    serviceRequest: state.providerSevice.serviceRequest,
    providerStatusOnline: state.config.providerStatusOnline
  }
}

export default connect(mapStateToProps, mapDispathToProps)(HomeProduct);
