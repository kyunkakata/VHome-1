/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

'use strick';

import React, { PureComponent } from 'react';
import { LayoutAnimation, UIManager, Text, YellowBox, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-smart-splash-screen';
import codePush from "react-native-code-push";
import { CustomLayoutSpring } from './common/animation';
import App from './app';
import Connection from './connection';
import configureStore from './redux/configureStore';
import { setFont } from './common/utils';
import { Loading } from './components';
import * as common from './configs/common';
import { ChangeState } from './redux/actions/codepush';

// Disable ignored remote debugger
YellowBox.ignoreWarnings([
  'Remote debugger',
  'Require cycle',
  'Warning: isMounted(...) is deprecated in plain JavaScript React classes',
  'Required dispatch_sync to load constants for RNDeviceInfo',
  'Module RNFetchBlob requires main queue setup since it overrides `constantsToExport` but doesn\'t implement `requiresMainQueueSetup`'
]);
Text.allowFontScaling = false;

// Set font family default
setFont('Quicksand');

class Setup extends PureComponent {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    this.state = {
      isLoading: true,
      store: configureStore(() => {
        this.closeSplashScreen();

        Connection.init(this.state.store, () => {
          LayoutAnimation.configureNext(CustomLayoutSpring);
          this.setState({ isLoading: false });
        });
      })
    }

    this.CodePushState = {
      status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
      progress: 0
    }
  }

  closeSplashScreen = () => {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 400,
      delay: 400,
    });
  }

  codePushStatusDidChange(status) {
    this.CodePushState = {
      ...this.CodePushState,
      status: status,
    }

    if (this.state.store) {
      this.state.store.dispatch(ChangeState(this.CodePushState))
    }
  }

  codePushDownloadDidProgress(progress) {
    this.CodePushState = {
      ...this.CodePushState,
      progress: progress && progress.receivedBytes && progress.totalBytes && progress.totalBytes != 0 ? (progress.receivedBytes * 100 / progress.totalBytes) : 0
    }
    if (this.state.store) {
      this.state.store.dispatch(ChangeState(this.CodePushState))
    }
    console.log('codePush::', progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }

  render() {
    const { store, isLoading } = this.state;

    if (isLoading) {
      return <Loading colorIndicator={common.ICON_COLOR_BLACK} />
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={common.BACKGROUND_COLOR_NAV} animated barStyle='light-content' />
        <Provider store={store}>
          <App />
        </Provider>
      </View>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART
})(Setup);
