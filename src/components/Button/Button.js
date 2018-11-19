/**
* Created by nghinv on Thu Jun 14 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ViewPropTypes, Dimensions, Keyboard } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  title: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_HEADER,
  },
  disable: {
    opacity: 0.8
  }
});

class Button extends PureComponent<Props> {
  _onPress = () => {
    Keyboard.dismiss()
    if (this.props.onPress) {
      this.props.onPress()
    }
  }
  render() {
    let {
      title,
      backgroundColor,
      style,
      titleStyle,
      color,
      rounded,
      borderRadius,
      full,
      width,
      height,
      disable
    } = this.props;
    let widthButton = full ? SCREEN.width : Math.min(width, SCREEN.width - 24)
    const ComponentButton = disable ? View : MKButton;

    return (
      <ComponentButton
        style={[
          styles.container,
          {
            width: widthButton,
            height,
            backgroundColor
          },
          style,
          rounded ? { borderRadius: borderRadius } : undefined,
          disable ? style.disable : undefined
        ]}
        onPress={this._onPress}
      >
        <Text numberOfLines={1} style={[styles.title, { color }, titleStyle]}>
          {` ${title} `}
        </Text>
      </ComponentButton>
    );
  }
}

Button.defaultProps = {
  backgroundColor: common.BACKGROUND_COLOR_BUTTON,
  color: common.TEXT_COLOR_WHITE,
  rounded: false,
  borderRadius: 22,
  full: false,
  width: Math.min(270, SCREEN.width - 24),
  height: 44,
  disable: false
}

Button.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  style: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  color: PropTypes.string,
  rounded: PropTypes.bool,
  borderRadius: PropTypes.number,
  full: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  onPress: PropTypes.func,
  disable: PropTypes.bool
}

interface Props {
  backgroundColor?: string;
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  color?: string;
  rounded?: boolean;
  borderRadius?: number;
  /**
   * set width button = full Dimensions if full = true
   * default value false
   */
  full?: boolean;
  /**
   * default value Math.min(300, SCREEN.width - 24)
   */
  width?: number | string;
  /**
   * default value 40
   */
  height?: number;
  onPress?: () => void;
  disable?: boolean;
}

export default Button;
