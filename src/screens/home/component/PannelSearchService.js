/**
* Created by nghinv on Thu Nov 15 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Text, Animated, ViewStyle } from 'react-native';
import * as common from '../../../configs/common';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: SCREEN.width,
    backgroundColor: common.BACKGROUND_COLOR
  }
});

class PannelSearchService extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      currentShow: false
    }

    this.anim = new Animated.Value(0)
    this.opacityAnim = new Animated.Value(0)
  }

  show = () => {
    this.setState({ currentShow: true })
    Animated.sequence([
      Animated.timing(this.anim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start()
  }

  hide = () => {
    this.setState({ currentShow: false })
    Animated.sequence([
      Animated.timing(this.opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.anim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true
      })
    ]).start()
  }

  isShowPannel = () => {
    return this.state.currentShow
  }

  render() {
    const {
      style
    } = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          style,
          {
            opacity: this.opacityAnim,
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
        {this.props.children}
      </Animated.View>
    );
  }
}

PannelSearchService.defaultProps = {

}

interface Props {
  style?: ViewStyle;
}

export default PannelSearchService;
