/**
* Created by nghinv on Tue Oct 30 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Easing } from 'react-native';
import Modal from 'react-native-modalbox';

const styles = StyleSheet.create({
  modal: {
    height: 300
  }
});

class CustomModal extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }

    this.data = null
  }

  show = (data) => {
    this.data = data;
    this.setState({ show: true }, () => {
      this.refs.modal.open()
      data.onOpen && data.onOpen()
    })
  }

  hide = () => {
    this.setState({ show: false })
    this.refs.modal.close()
    this.data = null
  }

  render() {
    let {
      style,
      renderContent
    } = this.props;

    let data = {
      ...this.props,
      ...this.data
    }

    return (
      <Modal
        ref={'modal'}
        position="bottom"
        coverScreen={false}
        style={[styles.modal, data.style]}
        animationDuration={200}
        easing={Easing.linear}
        transparent={false}
      >
        {
          data.renderContent && data.renderContent()
        }
      </Modal>
    );
  }
}

CustomModal.defaultProps = {

}

interface Props {

}

export default CustomModal;
