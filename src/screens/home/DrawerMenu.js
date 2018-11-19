/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import RNAccountKit from 'react-native-facebook-account-kit';
import Communications from 'react-native-communications';
import { global } from '../../configs/global';
import { Avatar, Row, ButtonIcon } from '../../components';
import { CustomLayoutSpring } from '../../common/animation';
import { setLanguage } from '../../redux/actions/config';
import { openUrl } from '../../common/utils';
import * as common from '../../configs/common';
import * as imgs from '../../configs/imgs';
import langs from '../../languages/common';
import { logOut } from '../../redux/actions/authen';
import Version from './Version';

const SCREEN = Dimensions.get('window');
const POLICY_URL = 'https://google.com';
const POLICY_WEB = 'www.v-home.com/chinhsach';
const HOTLINE = '0123456789';
const HOTLINE_CALL = '+84123456789';

class DrawerMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      setLanguage: false
    }
  }

  renderAlertContent = () => {
    return (
      <View style={styles.viewContainerAlert}>
        <Text style={styles.titleNotifi}>{langs.viewPolicy}</Text>
        <Text style={styles.messageNotifi}>{POLICY_WEB}</Text>
      </View>
    )
  }

  renderAlertVHomeIntro = () => {
    return (
      <View style={styles.containerIntro}>
        <View style={styles.viewHeaderIntro}>
          <View style={{ width: 36 }} />
          <Text style={styles.txtHeaderIntro}>
            {langs.vhomeIntro}
          </Text>
          <ButtonIcon
            iconName='clear'
            iconColor={common.ICON_COLOR_ACTIVE}
            onPress={this.onDismissAlert}
          />
        </View>
        <ScrollView style={styles.viewContentIntro}>
          <Text style={styles.titleIntro}>
            {langs.titleIntro}
          </Text>
        </ScrollView>
      </View>
    )
  }

  render() {
    const { setLanguage } = this.state;
    const { language, isUser, userInfo, providerServiceRating, facebook_id, coin } = this.props;

    const name = (userInfo.full_name == null || userInfo.full_name == undefined) ? facebook_id ? facebook_id : ` ` : userInfo.full_name
    const avatar = userInfo.avatar
    const rewardPoints = isUser ? (coin.coin_period_current || 0) : (providerServiceRating.count_rating || 0)

    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <Avatar
            name={!avatar ? !!name ? name.slice(0, 2).toUpperCase() : '' : undefined}
            imageSource={avatar}
            onPress={this.onProfile}
            cacheImage
          />
          <Text style={styles.username}>{!!name ? name : ''}</Text>
          <TouchableOpacity onPress={this.onPressRewardPoints} style={styles.viewFooterNav}>
            <Image style={styles.image} source={imgs.icon.magiamgia} resizeMode='contain' />
            <View style={styles.viewRewardPoints}>
              <Text style={styles.txtRewardPoints}>{rewardPoints}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.viewContent}>
          <Row
            leftTitle={langs.notifycation}
            leftImage
            leftImageSource={imgs.icon.notification}
            rightIconName='chevron-right'
            width='100%'
            separator
            onPress={this.onOpenNotification}
          />
          <Row
            leftTitle={langs.history}
            leftImage
            leftImageSource={imgs.icon.history}
            rightIconName='chevron-right'
            width='100%'
            separator
            onPress={this.onHistory}
          />
          {
            isUser && (
              <Row
                leftTitle={langs.rewardPoints}
                leftImage
                leftImageSource={imgs.icon.rewardPoint}
                rightIconName='chevron-right'
                width='100%'
                separator
                onPress={this.rewardPoints}
              />
            )
          }
          {/* {
            !isUser && (
              <Row
                leftTitle={langs.evaluate}
                leftImage
                leftImageSource={imgs.icon.startBorder}
                rightIconName='chevron-right'
                width='100%'
                separator
                onPress={this.onOpenEvaluate}
              />
            )
          } */}
          <Row
            leftTitle={langs.policyTermsShort}
            leftImage
            leftImageSource={imgs.icon.policy}
            width='100%'
            separator
            onPress={this.onPolicyTerms}
          />
          <Row
            leftTitle={langs.vhomeIntro}
            leftImage
            leftImageSource={imgs.icon.logoIntroduce}
            width='100%'
            separator
            onPress={this.onVHomeIntro}
          />
          <Row
            leftTitle={`${langs.hotline} ${HOTLINE}`}
            leftImage
            leftImageSource={imgs.icon.cskh}
            width='100%'
            separator
            onPress={this.onCallHotline}
          />
          <Row
            leftTitle={langs.language}
            leftImage
            leftImageSource={imgs.icon.language}
            rightIconName={setLanguage ? 'expand-more' : 'chevron-right'}
            width='100%'
            separator
            onPress={this.onSettingLanguage}
          />
          {
            setLanguage && (
              <Row
                leftTitle={langs.vietnamese}
                rightIconName={language == 'vi' ? 'check' : undefined}
                width='100%'
                separator
                onPress={() => this.onChangeLanguage('vi')}
              />
            )
          }
          {
            setLanguage && (
              <Row
                leftTitle={langs.english}
                rightIconName={language == 'en' ? 'check' : undefined}
                width='100%'
                separator
                onPress={() => this.onChangeLanguage('en')}
              />
            )
          }
          <Row
            leftTitle={langs.logout}
            leftImage
            leftImageSource={imgs.icon.logOut}
            width='100%'
            separator
            onPress={this.confirmLogout}
          />
        </ScrollView>
        <Version />
      </View>
    );
  }

  onProfile = () => {
    if (Actions.currentScene !== 'home') {
      Actions.popTo('home')
    }
    Actions.profile()
  }

  onPressRewardPoints = () => {
    if (Actions.currentScene !== 'home') {
      Actions.popTo('home')
    }
    Actions.rewardPoints()
  }

  onOpenNotification = () => {
    if (Actions.currentScene !== 'home') {
      Actions.popTo('home')
    }
    Actions.inbox()
  }

  onHistory = () => {
    if (Actions.currentScene !== 'home') {
      Actions.popTo('home')
    }
    Actions.history()
  }

  rewardPoints = () => {
    if (Actions.currentScene !== 'home') {
      Actions.popTo('home')
    }
    Actions.rewardPoints()
  }

  onOpenEvaluate = () => {

  }

  onPolicyTerms = () => {
    global.Alert.alert({
      renderContent: this.renderAlertContent,
      leftButton: {
        text: langs.continute,
        textStyle: { color: common.TEXT_COLOR_BLACK },
        onPress: this.onOpenPolicyTerms
      },
      rightButton: {
        text: langs.cancel
      }
    })
  }

  onOpenPolicyTerms = () => {
    openUrl(POLICY_URL)
  }

  onVHomeIntro = () => {
    global.Alert.alert({
      renderContent: this.renderAlertVHomeIntro,
      width: SCREEN.width - 32
    })
  }

  onDismissAlert = () => {
    global.Alert.close()
  }

  onCallHotline = () => {
    Communications.phonecall(HOTLINE_CALL, true);
  }

  onSettingLanguage = () => {
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({ setLanguage: !this.state.setLanguage })
  }

  onChangeLanguage = (language) => {
    this.props.setLanguage(language)
  }

  confirmLogout = () => {
    global.Alert.alert({
      title: langs.notification,
      message: langs.confirmLogout,
      leftButton: {
        text: langs.cancel
      },
      rightButton: {
        text: langs.confirm,
        textStyle: { color: common.TEXT_COLOR_BLACK },
        onPress: this.onLogout
      }
    })
  }

  onLogout = () => {
    if (this.props.loginFb) {
      RNAccountKit.logout()
        .then(() => {
          console.log('Logged out')
        })
    }

    this.props.logOut()
    Actions.reset('start')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR
  },
  viewHeader: {
    height: 146,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: common.BACKGROUND_COLOR_NAV
  },
  viewFooterNav: {
    flexDirection: 'row',
    backgroundColor: common.BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 8
  },
  viewRewardPoints: {
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 4,
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: common.BACKGROUND_COLOR_BUTTON,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtRewardPoints: {
    color: common.TEXT_COLOR_ACTIVE,
    fontSize: common.FONT_SIZE_CONTENT,
    fontWeight: common.FONT_WEIGHT_TITLE,
  },
  username: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_HEADER,
    marginTop: 2
  },
  viewContent: {

  },
  viewContainerAlert: {
    paddingHorizontal: 8,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleNotifi: {
    textAlign: 'center',
    color: common.TEXT_COLOR_BLACK,
    fontSize: common.FONT_SIZE_TITLE
  },
  messageNotifi: {
    textAlign: 'center',
    color: 'blue',
    fontSize: common.FONT_SIZE_TITLE
  },
  containerIntro: {
    paddingBottom: 16,
    width: SCREEN.width - 32
  },
  viewHeaderIntro: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: common.ALERT_COLOR_SEPARATOR,
    marginBottom: 16,
    flexDirection: 'row'
  },
  txtHeaderIntro: {
    color: common.TEXT_COLOR_ACTIVE,
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: '500'
  },
  titleIntro: {
    color: common.TEXT_COLOR_BLACK,
    fontSize: 15,
    fontWeight: common.FONT_WEIGHT_TITLE,
    marginHorizontal: 16
  },
  image: {
    width: 18,
    height: 18
  }
});

const mapDispathToProps = {
  setLanguage,
  logOut
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    isUser: state.config.isUser,
    token: state.config.token,
    userInfo: state.authen.userInfo,
    loginFb: state.config.loginFb,
    facebook_id: state.config.facebook_id,
    providerServiceRating: state.providerSevice.serviceRating,
    coin: state.coin
  }
}

export default connect(mapStateToProps, mapDispathToProps)(DrawerMenu);
