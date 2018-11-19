/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import InteractionManager from '../../../common/interactionManager';
import * as common from '../../../configs/common';
import MapComponent from './MapComponent';

const SCREEN = Dimensions.get('window');
const springConfig = { tension: 30, friction: 7 };

class MapLoadInitial extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableRenderMapview: false
    }

    this.anim = new Animated.Value(0)
  }

  componentWillUnmount() {
    this.setState({ enableRenderMapview: false })
  }

  checkNeedRenderMap = () => {
    if (!this.state.enableRenderMapview) {
      InteractionManager.runAfterInteractions(() => {
        this.setState({ enableRenderMapview: true })
      })
    }
  }

  show = () => {
    this.checkNeedRenderMap()
    Animated.spring(this.anim, {
      toValue: 1,
      ...springConfig,
      useNativeDriver: true
    }).start()
  }

  hide = () => {
    Animated.spring(this.anim, {
      toValue: 0,
      ...springConfig,
      useNativeDriver: true
    }).start()
  }

  render() {
    const { enableRenderMapview } = this.state;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            right: 0,
            transform: [
              {
                translateX: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [SCREEN.width, 0]
                })
              }
            ]
          }
        ]}
      >
        {
          enableRenderMapview && <MapComponent />
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: SCREEN.width,
    backgroundColor: common.BACKGROUND_COLOR
  }
});

export default MapLoadInitial;
