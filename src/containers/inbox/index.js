/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import InboxComponent from '../../screens/inbox';
import { getAllNotification, loadMoreAllNotification } from '../../redux/actions/notification';

class Inbox extends PureComponent {
  render() {
    return <InboxComponent {...this.props} />
  }
}

const mapDispathToProps = {
  getAllNotification,
  loadMoreAllNotification
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    notification: state.notification.notification
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Inbox);
