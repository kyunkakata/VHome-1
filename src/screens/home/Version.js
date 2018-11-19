/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import codePush from 'react-native-code-push';
import DeviceConfig from 'react-native-device-info';
import { connect } from 'react-redux';
import { CURRENT_VERSION } from '../../configs/config';
import langs from '../../languages/common';
import * as common from '../../configs/common';

class Version extends PureComponent {
  render() {
    let { codepush } = this.props;
    let titleVersion = `v${DeviceConfig.getVersion()} / ${CURRENT_VERSION}`;

    if (codepush) {
      switch (codepush.status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          titleVersion = `${langs.Updating} : ${parseInt(codepush.progress)}%`
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          titleVersion = `${langs.Installing}... `
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          titleVersion = langs.Need_to_restart
          break;
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.version} >
          {titleVersion}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  version: {
    alignSelf: 'center',
    marginBottom: 12,
    color: common.TEXT_COLOR_BLACK,
    fontSize: 13
  }
});

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    codepush: state.codepush
  }
}

export default connect(mapStateToProps)(Version);
