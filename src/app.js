/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { View, AppState, Platform, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { RNNetworkStateEventEmitter } from "react-native-network-state";
import RNAndroidLocationService from 'react-native-android-location-service';
import AppNavigator from './app-navigator';
import Notifi from './notification';
import { Alert, Loading, CustomModal, ActionSheetCustom } from './components';
import { global } from './configs/global';
import { changeLocation } from './redux/actions/location';
import { calDelta } from './common/math';

const isIOS = Platform.OS == 'ios';

class App extends PureComponent {
  currentState = '';
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    RNNetworkStateEventEmitter.addListener('networkChanged', this._handleNetworkChange);

    console.log('getCurrentPosition', navigator)

    if (isIOS) {
      navigator.geolocation.requestAuthorization();
      navigator.geolocation.watchPosition((position) => {
        console.log('watchPosition', position)
        const dataPosition = calDelta(position.coords.latitude, position.coords.longitude, position.coords.accuracy)

        this.props.changeLocation && this.props.changeLocation(position.coords)
      })
    } else {
      // watch android location
      if (!this.watchPosition) {
        // Register Listener Callback - has to be removed later
        this.watchPosition = DeviceEventEmitter.addListener('updateLocation', this.onLocationChange.bind(this));
        // Initialize RNGLocation
        RNAndroidLocationService.getLocation();
      }
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    RNNetworkStateEventEmitter.removeListener('networkChanged', this._handleNetworkChange);
    this.watchPosition.remove();
  }

  onLocationChange(e) {
    const position = {
      coords: {
        latitude: e.Latitude,
        longitude: e.Longitude
      }
    }

    console.log('onLocationChange-------->', e)
    this.props.changeLocation && this.props.changeLocation(position.coords)
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.currentState !== nextAppState) {
      if (nextAppState === 'active') {
        console.log('AppState is active')
      } else if (nextAppState === 'background') {
        console.log('AppState is background')
      } else if (nextAppState === 'inactive') {
        console.log('AppState is inactive')
      }
    }

    this.currentState = nextAppState;
  }

  /**
   * type of data ==>
   * isConnected: boolean
   * type: string
   * isFast: boolean
   */
  _handleNetworkChange = (data) => {
    console.log('_handleNetworkChange', data)
    // global.Loading
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator />
        <Notifi />
        <Alert ref={ref => global.Alert2 = ref} />
        <Loading ref={ref => global.Loading = ref} loadingRef />
        <Alert ref={ref => global.Alert = ref} />
        <ActionSheetCustom ref={ref => global.ActionsheetCustom = ref} />
        <CustomModal ref={ref => global.CustomModal = ref} />
      </View>
    );
  }
}

const mapDispathToProps = {
  changeLocation
}

export default connect(undefined, mapDispathToProps)(App);
