/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ButtonLabelBorder, ButtonLabel } from '../../components';
import * as common from '../../configs/common';
import { Actions } from 'react-native-router-flux';
import langs from '../../languages/common';
import * as imgs from '../../configs/imgs';

class Start extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <Image source={imgs.logo} resizeMode='contain' style={styles.logo} />
        </View>
        <View style={styles.viewContent}>
          <View style={styles.viewLine}>
            <View style={styles.viewLineVertical} />
          </View>
          <View style={styles.viewButton}>
            <View />
            <ButtonLabelBorder
              title={langs.customer}
              width={156}
              titleColor={common.TEXT_COLOR_BLACK}
              backgroundColor={common.BACKGROUND_COLOR}
              onPress={this.onCustomerLogin}
            />

            <ButtonLabelBorder
              title={langs.employees}
              width={156}
              titleColor={common.TEXT_COLOR_BLACK}
              backgroundColor={common.BACKGROUND_COLOR}
              onPress={this.onEmployeesLogin}
            />
          </View>
        </View>
        <View style={styles.viewFooter}>
          <ButtonLabel
            title='V-Home V1.0'
            titleStyle={styles.versionTitle}
          />
        </View>
      </View>
    );
  }

  onCustomerLogin = () => {
    // changeTypeLogin true with user, false with employees
    this.props.changeTypeLogin(true);
    Actions.login();
  }

  onEmployeesLogin = () => {
    this.props.changeTypeLogin(false);
    Actions.login();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR
  },
  viewLogo: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  viewContent: {
    flex: 1,
  },
  logo: {
    width: 160
  },
  viewLine: {
    borderTopWidth: 0.7,
    borderTopColor: common.LINE_BORDER_COLOR,
    marginHorizontal: 48,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  viewLineVertical: {
    flex: 1,
    borderLeftWidth: 0.7,
    borderLeftColor: common.LINE_BORDER_COLOR,
  },
  viewButton: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewFooter: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 12
  },
  versionTitle: {
    fontSize: common.FONT_SIZE_SMALL
  }
});

export default Start;
