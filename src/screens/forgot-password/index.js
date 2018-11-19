/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { global } from '../../configs/global';
import { Navbar, Button, Input, ButtonLabel } from '../../components';
import * as common from '../../configs/common';
import * as imgs from '../../configs/imgs';
import langs from '../../languages/common';
import { isPhonenumber } from '../../common/validate';
import { processPhonenumber } from '../../common/utils';

class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: ''
    }
  }

  renderAlertContent = () => {
    return (
      <View style={styles.containerAlert}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 1]}
          colors={[
            common.ALERT_BACKGROUND_COLOR_GRADIENT_1,
            common.ALERT_BACKGROUND_COLOR_GRADIENT_2
          ]}
          style={styles.viewHeaderNotify}
        >
          <Image source={imgs.logo_white} style={styles.logo} resizeMode='contain' />
        </LinearGradient>
        <View style={styles.viewContentNotify}>
          <Text style={styles.txtNotify}>
            {langs.notifyRequirePassword}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { phonenumber } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Navbar
            title={langs.forgotPassword}
            leftIcon
            back
          />
          <View style={styles.viewContent}>
            <Input
              placeholder={langs.phonenumber}
              keyboardType='numeric'
              rounded
              value={phonenumber}
              onChangeText={this.onChangePhonenumber}
              borderWidth={0.7}
              leftImage
              leftImageSource={imgs.icon.phone}
              textInputRef="user"
              ref="user"
              maxLength={15}
              returnKeyType='done'
            />
            <Button
              title={langs.requirePassword}
              rounded
              width={160}
              style={styles.buttonPassword}
              titleStyle={{ fontSize: common.FONT_SIZE_CONTENT }}
              onPress={this.handRequirePassword}
            />
            <Text style={styles.txtReceiverVerifyCode}>{langs.dontReceivedVerifyCode}</Text>
            <ButtonLabel
              title={langs.resendVerifyCode}
              style={styles.buttonResendVerifyCode}
              onPress={this.handResendVerifyCode}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onChangePhonenumber = (phonenumber) => {
    this.setState({ phonenumber })
  }

  handRequirePassword = () => {
    const { phonenumber } = this.state;
    if (phonenumber.trim().length == 0) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorPhonenumberIsNull,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (!isPhonenumber(phonenumber.trim())) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorPhonenumberIncorrect,
        leftButton: { text: langs.ok }
      })
      return;
    }

    global.Alert.alert({
      renderContent: this.renderAlertContent,
      leftButton: {
        text: langs.login,
        textStyle: styles.textAlertStyle,
        onPress: this.handleLogin
      },
      rightButton: {
        text: langs.callSupport,
        textStyle: styles.textAlertStyle,
        onPress: this.handleCallSupport
      }
    })
  }

  handleLogin = () => {
    Keyboard.dismiss()
    Actions.pop()
  }

  handleCallSupport = () => {

  }

  handResendVerifyCode = () => {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContent: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPassword: {
    marginBottom: 40,
    marginTop: 32
  },
  txtReceiverVerifyCode: {
    color: common.TEXT_COLOR_INACTIVE,
    fontSize: common.FONT_SIZE_CONTENT
  },
  buttonResendVerifyCode: {
    paddingVertical: 2
  },
  textAlertStyle: {
    color: common.TEXT_COLOR_BLACK,
    fontSize: common.FONT_SIZE_CONTENT,
    fontWeight: common.FONT_WEIGHT_TITLE
  },
  viewHeaderNotify: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: common.BACKGROUND_COLOR_BUTTON,
    flexDirection: 'row'
  },
  logo: {
    height: 32
  },
  viewContentNotify: {
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  txtHeaderNotify: {
    fontSize: common.FONT_SIZE_HEADER,
    fontWeight: common.FONT_WEIGHT_HEADER,
    color: common.TEXT_COLOR_WHITE
  },
  txtNotify: {
    textAlign: 'center'
  }
});

export default ForgotPassword;
