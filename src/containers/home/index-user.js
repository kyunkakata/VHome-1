/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HomeUserComponent from '../../screens/home/user/user-Home';
import { listCategorySelector, listServiceSelector } from './selector';
import { getService, getCatagory, getAllCategory } from '../../redux/actions/service';

class HomeUser extends PureComponent {
  render() {
    return <HomeUserComponent {...this.props} />
  }
}

const mapDispathToProps = {
  getService,
  getCatagory,
  getAllCategory
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    category: listCategorySelector(state),
    services: listServiceSelector(state),
    loading: state.service.allCategory.loading
  }
}

export default connect(mapStateToProps, mapDispathToProps)(HomeUser);
