/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RegisterComponent from '../../screens/register';
import { register } from '../../redux/actions/authen';
import { getAllService } from '../../redux/actions/service';

class Register extends PureComponent {
  componentDidMount() {
    // if (!this.props.isUser) {
    //   this.props.getAllService()
    // }
  }

  render() {
    return <RegisterComponent {...this.props} />
  }
}

const mapDispathToProps = {
  register,
  getAllService
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    isUser: state.config.isUser,
    allService: state.service.allService
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Register);
