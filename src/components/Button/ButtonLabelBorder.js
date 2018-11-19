/**
* Created by nghinv on Mon Jul 23 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import * as common from '../../configs/common';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 10,
    borderWidth: 0.7
  },
  title: {
    fontSize: common.FONT_SIZE_CONTENT,
    fontWeight: common.FONT_WEIGHT_TITLE
  }
});

class ButtonLabelBorder extends PureComponent<Props> {
  _onPress = () => {
    Keyboard.dismiss()
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    let {
      title,
      height,
      style,
      backgroundColor,
      titleColor,
      titleStyle,
      borderRadius,
      disable,
      borderColor,
      width
    } = this.props;
    const Component = disable ? View : MKButton;

    return (
      <Component
        style={[
          styles.container,
          { borderColor },
          backgroundColor ? { backgroundColor } : undefined,
          borderRadius ? { borderRadius: height / 2 } : undefined,
          { height, width },
          disable ? { opacity: 0.6 } : undefined,
          style
        ]}
        onPress={this._onPress}
      >
        <Text style={[styles.title, titleStyle, titleColor ? { color: titleColor } : undefined]}>
          {` ${title} `}
        </Text>
      </Component>
    );
  }
}

ButtonLabelBorder.defaultProps = {
  titleColor: common.TEXT_COLOR_ACTIVE,
  backgroundColor: 'transparent',
  borderRadius: true,
  height: 44,
  disable: false,
  borderColor: common.BACKGROUND_COLOR_BUTTON
}

interface Props {
  backgroundColor?: string;
  borderColor?: string;
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  titleColor?: string;
  borderRadius?: boolean;
  /**
   * default value 44
   */
  height?: number;
  width?: number | string;
  onPress?: () => void;
  disable?: boolean;
}

export default ButtonLabelBorder;
