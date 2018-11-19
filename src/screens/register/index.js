/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Navbar, Button, Input, InputPassword,
  KeyboardScroll, Checkbox, ButtonLabel, Row, ActionSheet
} from '../../components';
import { global } from '../../configs/global';
import * as common from '../../configs/common';
import * as imgs from '../../configs/imgs';
import langs from '../../languages/common';
import { isPhonenumber } from '../../common/validate';
import { processPhonenumber } from '../../common/utils';

const SCREEN = Dimensions.get('window');

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      registerInfo: {
        phonenumber: '',
        user: '',
        pass: '',
        retypePass: '',
        giftCode: '',
        policy: false
      },
      service: undefined
    }

    this.actionsheet = React.createRef()
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    const { isUser } = this.props;
    const { registerInfo, service } = this.state;

    return (
      <View style={styles.container}>
        <Navbar
          title={langs.register}
          leftIcon
          back
        />
        <KeyboardScroll contentContainerStyle={styles.viewContent}>
          <View style={styles.viewInput}>
            <Input
              placeholder={langs.phonenumber}
              rounded
              keyboardType='numeric'
              borderWidth={0.7}
              style={[styles.inputStyle]}
              leftImage
              leftImageSource={imgs.icon.phone}
              textInputRef="user"
              ref="user"
              onSubmitEditing={() => this.focusNextField("fullname")}
              maxLength={11}
              value={registerInfo.phonenumber}
              onChangeText={this.onChangePhonenumber}
            />
            <Input
              placeholder={langs.fullname}
              rounded
              borderWidth={0.7}
              style={styles.inputStyle}
              leftImage
              leftImageSource={imgs.icon.user}
              textInputRef="fullname"
              ref="fullname"
              onSubmitEditing={() => this.focusNextField("pass")}
              maxLength={50}
              value={registerInfo.user}
              onChangeText={this.onChangeUsername}
            />
            <InputPassword
              placeholder={langs.newPassword}
              rounded
              borderWidth={0.7}
              style={styles.inputStyle}
              leftImage
              leftImageSource={imgs.icon.pass}
              textInputRef="pass"
              ref="pass"
              onSubmitEditing={() => this.focusNextField("rePass")}
              maxLength={32}
              value={registerInfo.pass}
              onChangeText={this.onChangeTextPassword}
            />
            <InputPassword
              placeholder={langs.retypePassword}
              rounded
              borderWidth={0.7}
              style={styles.inputStyle}
              leftImage
              leftImageSource={imgs.icon.repass}
              textInputRef="rePass"
              ref="rePass"
              onSubmitEditing={() => this.focusNextField("giftCode")}
              maxLength={32}
              value={registerInfo.retypePass}
              onChangeText={this.onRetypePassword}
            />
            {
              !isUser && (
                <Row
                  leftImage
                  leftImageSource={imgs.icon.supplies}
                  leftImageStyle={styles.leftImageStyle}
                  leftTitle={service ? service.name : langs.chooseService}
                  rightIconName='arrow-drop-down'
                  rightIconColor={common.ICON_COLOR_BLACK}
                  style={styles.rowButton}
                  leftTitleStyle={{ marginLeft: -4 }}
                  onPress={this.onOpenActionSheetChangeService}
                  leftRightRatio={2}
                />
              )
            }
            <Input
              placeholder={langs.giftCode}
              rounded
              borderWidth={0.7}
              style={styles.inputStyle}
              leftImage
              leftImageSource={imgs.icon.magiamgia}
              textInputRef="giftCode"
              ref="giftCode"
              maxLength={15}
              returnKeyType="done"
              value={registerInfo.giftCode}
              onChangeText={this.onChangeGiftCode}
            />
          </View>
          <View style={styles.viewBottom}>
            <View style={styles.viewCheckbox}>
              <Checkbox
                title={langs.policyTerms}
                style={{ width: 270 }}
                isCheck={registerInfo.policy}
                onChange={this.onChangePolicy}
              />
            </View>
            <Button
              title={langs.register}
              rounded
              width={140}
              style={styles.buttonRegister}
              onPress={this.handRegister}
            />
            <ButtonLabel
              title={langs.backToLogin}
              firstTitle={langs.haveAccount}
              onPress={this.handBackToLogin}
            />
          </View>
        </KeyboardScroll>
        <ActionSheet
          options={this.getOptions()}
          bottomTitle={langs.cancel}
          ref={this.actionsheet}
        />
      </View>
    );
  }

  getOptions = () => {
    const { data } = this.props.allService
    let option = [];
    data.forEach(s => {
      let item = {
        title: s.name,
        onPress: () => this.onChangeTypeService(s)
      }

      option.push(item)
    })

    return option
  }

  onChangePhonenumber = (phonenumber) => {
    this.setState({ registerInfo: { ...this.state.registerInfo, phonenumber } })
  }

  onChangeUsername = (user) => {
    this.setState({ registerInfo: { ...this.state.registerInfo, user } })
  }

  onChangeTextPassword = (pass) => {
    this.setState({ registerInfo: { ...this.state.registerInfo, pass } })
  }

  onRetypePassword = (retypePass) => {
    this.setState({ registerInfo: { ...this.state.registerInfo, retypePass } })
  }

  onChangeGiftCode = (giftCode) => {
    this.setState({ registerInfo: { ...this.state.registerInfo, giftCode } })
  }

  onChangePolicy = ({ checked }) => {
    this.setState({ registerInfo: { ...this.state.registerInfo, policy: checked } })
  }

  onOpenActionSheetChangeService = () => {
    this.actionsheet.current.show()
  }

  onChangeTypeService = (service) => {
    this.setState({
      service
    })
  }

  handRegister = () => {
    const { isUser } = this.props;
    const { registerInfo, service } = this.state;

    if (registerInfo.phonenumber.trim().length == 0) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorPhonenumberIsNull,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (!isPhonenumber(registerInfo.phonenumber.trim())) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorPhonenumberIncorrect,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (registerInfo.user.trim().length == 0) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorUsernameIsNull,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (registerInfo.pass.trim().length == 0) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorPassIsNull,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (registerInfo.retypePass.trim().length == 0) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorRetypePassIsNull,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (registerInfo.pass !== registerInfo.retypePass) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorRetypePasswordWrong,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (!isUser && !service) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorNotSelectService,
        leftButton: { text: langs.ok }
      })
      return;
    }

    if (!registerInfo.policy) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorPolicy,
        leftButton: { text: langs.ok }
      })
      return;
    }

    // Request server to register
    let dataRegister = {
      phone_number: processPhonenumber(registerInfo.phonenumber),
      full_name: registerInfo.user,
      password: registerInfo.pass,
      password_confirm: registerInfo.retypePass
    }

    if (registerInfo.giftCode && registerInfo.giftCode.length > 0) {
      dataRegister.referral_code = registerInfo.giftCode
    }

    this.props.register && this.props.register({ data: dataRegister, isUser, service })
  }

  handBackToLogin = () => {
    Actions.pop()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR,
  },
  viewContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  inputStyle: {
    marginBottom: 16
  },
  viewBottom: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 4
  },
  viewCheckbox: {
    flex: 1
  },
  buttonRegister: {
    marginBottom: 12
  },
  rowButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: common.INPUT_BORDER_COLOR,
    height: 44,
    width: Math.min(270, SCREEN.width - 24),
    borderRadius: 22,
    marginBottom: 16
  },
  leftImageStyle: {
    width: 18,
    height: 18
  }
});

export default Register;
