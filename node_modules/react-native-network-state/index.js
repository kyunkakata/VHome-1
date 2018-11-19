//@flow

import React from "react";
import {
  NativeModules,
  NativeEventEmitter,
} from "react-native";

export const Settings = NativeModules.RNNetworkState
export const RNNetworkStateEventEmitter = new NativeEventEmitter(Settings)
