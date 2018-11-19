/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductDetailServiceComponent from '../../screens/home/product/product-DetailService';
import { providerReceiveServiceRequest, providerRejectServiceRequest } from '../../redux/actions/provider_service';
import { getServiceRequestFromServiceId } from './selector';

class ProductDetailService extends PureComponent {
  render() {
    return <ProductDetailServiceComponent {...this.props} />
  }
}

const mapDispathToProps = {
  providerReceiveServiceRequest,
  providerRejectServiceRequest
}

const mapStateToProps = (state, props) => {
  return {
    language: state.config.language,
    serviceRequest: getServiceRequestFromServiceId(state, props)
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ProductDetailService);
