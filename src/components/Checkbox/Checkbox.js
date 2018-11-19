/**
* Created by nghinv on Thu Jul 26 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ViewPropTypes } from 'react-native';
import { MKCheckbox } from 'react-native-material-kit';
import * as common from '../../configs/common';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkbox: {
    borderRadius: 3,
    borderWidth: 1.2
  },
  title: {
    marginLeft: 2,
    marginTop: 8,
    fontSize: 12,
    fontWeight: common.FONT_WEIGHT_TITLE
  }
});

class Checkbox extends PureComponent<Props> {
  render() {
    const {
      width,
      checkboxStyle,
      activeColor,
      inActiveColor,
      title,
      titleStyle,
      titleColor,
      isCheck,
      style,
      fillColor,
      onChange
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <MKCheckbox
          style={[
            styles.checkbox,
            checkboxStyle,
            {
              width,
              height: width,
              backgroundColor: common.CHECKBOX_BACKGROUND_COLOR
            }
          ]}
          checked={isCheck}
          onCheckedChange={onChange}
          borderOnColor={activeColor}
          borderOffColor={inActiveColor}
          fillColor={fillColor}
        />
        {
          title && (
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.title,
                  titleStyle,
                  {
                    color: titleColor
                  }
                ]}
              >
                {title}
              </Text>
            </View>
          )
        }
      </View>
    );
  }
}

Checkbox.defaultProps = {
  width: 16,
  activeColor: common.CHECKBOX_ACTIVE_COLOR,
  inActiveColor: common.CHECKBOX_INACTIVE_COLOR,
  titleColor: common.COLOR_TEXT_NORMAL,
  fillColor: common.CHECKBOX_FILL_COLOR
}

Checkbox.propTypes = {
  width: PropTypes.number,
  checkboxStyle: ViewPropTypes.style,
  activeColor: PropTypes.string,
  inActiveColor: PropTypes.string,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  titleColor: PropTypes.string,
  isCheck: PropTypes.bool,
  style: ViewPropTypes.style,
  onChange: PropTypes.func,
  fillColor: PropTypes.string
}

interface Props {
  width?: number;
  checkboxStyle?: StyleProp<ViewStyle>;
  activeColor?: string;
  inActiveColor?: string;
  fillColor?: string;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleColor?: string;
  isCheck?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * call when change check value
   */
  onChange?: () => void;
}

export default Checkbox;
