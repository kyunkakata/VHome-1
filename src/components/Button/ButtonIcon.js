/**
* Created by nghinv on Mon Jul 23 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { MKButton } from 'react-native-material-kit';
import * as common from '../../configs/common';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
});

class ButtonIcon extends PureComponent<Props> {
  _onPress = () => {
    Keyboard.dismiss()
    if (this.props.onPress) {
      this.props.onPress()
    }
  }
  render() {
    let {
      iconName,
      onPress,
      style,
      backgroundColor,
      iconColor,
      size,
      materialButton
    } = this.props;
    const Component = onPress ? materialButton ? MKButton : TouchableOpacity : View

    return (
      <Component
        style={[
          styles.container,
          backgroundColor ? { backgroundColor } : undefined,
          { width: size + 16, height: size + 16, borderRadius: (size + 16) / 2 },
          style
        ]}
        // hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        onPress={this._onPress}
      >
        <Icon name={iconName} size={size} color={iconColor} />
      </Component>
    );
  }
}

ButtonIcon.defaultProps = {
  size: 26,
  iconColor: common.ICON_COLOR_BLACK,
  backgroundColor: 'transparent',
  materialButton: true
}

interface Props {
  /**
   * material icon name
   */
  iconName: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  iconColor?: string;
  /**
   * default icon size = 26
   */
  size?: number;
  /**
   * use material button when true and TouchableOpacity when false
   */
  materialButton?: boolean
}

export default ButtonIcon;
