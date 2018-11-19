/**
* Created by nghinv on Thu Oct 18 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

'use strick';
import React, { PureComponent } from 'react';

type SpringConfigStatic = {
  tension?: number;
  friction?: number;
}

interface LoadingProps {
  backgroundColor?: string;
  colorIndicator?: string;
  springConfig?: SpringConfigStatic;
  loadingRef?: boolean;
  transparent?: boolean;
}

export default class Loading extends PureComponent<LoadingProps> {
  static show(): void {

  }

  static hide(): void {

  }
}
