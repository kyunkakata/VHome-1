/**
* Created by nghinv on Mon Oct 22 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { Dimensions } from 'react-native';

const SCREEN = Dimensions.get('window');

export const global = {
  Alert: null,
  Alert2: null,
  Loading: null,
  CustomModal: null,
  ActionsheetCustom: null,
  width: SCREEN.width,
  height: SCREEN.height,
  connection: null
}
