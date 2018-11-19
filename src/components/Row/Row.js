/**
* Created by nghinv on Wed Jul 25 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ViewPropTypes, Image, Platform } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 16
  },
  viewLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  txtLeftTitle: {
    fontSize: common.FONT_SIZE_TITLE,
  },
  txtSubTitle: {
    fontSize: common.FONT_SIZE_SMALL,
    marginTop: 6
  },
  separator: {
    borderBottomWidth: Platform.OS == 'ios' ? 1 : 0.8,
    borderBottomColor: common.TEXT_COLOR_INACTIVE
  },
  image: {
    width: 22,
    height: 22
  },
  imageRight: {
    width: 18,
    height: 18
  }
});

class Row extends PureComponent<Props> {
  render() {
    const {
      leftTitle,
      leftIconName,
      rightTitle,
      rightIconName,
      leftTitleStyle,
      leftTitleColor,
      leftIconColor,
      rightTitleStyle,
      rightTitleColor,
      rightIconColor,
      style,
      width,
      height,
      backgroundColor,
      leftRightRatio,
      onPress,
      disable,
      materialButton,
      borderRadius,
      firstBorder,
      lastBorder,
      subTitle,
      subTitleStyle,
      subTitleColor,
      isActive,
      backgroundColorActive,
      colorTextActive,
      disableOpacity,
      separator,
      leftImage,
      rightImage,
      leftImageSource,
      rightImageSource,
      leftImageStyle
    } = this.props;
    let Component = onPress ? materialButton ? MKButton : TouchableOpacity : View;
    if (disable) {
      Component = View
    }

    renderLeft = (
      <View style={[styles.viewLeft, leftRightRatio ? { flex: leftRightRatio } : undefined]}>
        {
          leftImageSource && <Image style={[styles.image, leftImageStyle, { marginRight: 16 }]} source={leftImageSource} resizeMode='contain' />
        }
        {
          leftIconName && <Icon name={leftIconName} size={24} color={isActive ? colorTextActive : leftIconColor} />
        }
        <View style={leftIconName ? { marginLeft: 10 } : undefined}>
          {
            !!leftTitle && <Text numberOfLines={1} style={[styles.txtLeftTitle, leftTitleStyle, { color: isActive ? colorTextActive : leftTitleColor }]}>{leftTitle}</Text>
          }
          {
            !!subTitle && <Text numberOfLines={1} style={[styles.txtSubTitle, subTitleStyle, { color: isActive ? colorTextActive : subTitleColor }]}>{subTitle}</Text>
          }
        </View>
      </View>
    )

    renderRight = (
      <View style={[styles.viewRight, leftRightRatio ? { flex: 1 / leftRightRatio } : undefined]}>
        <View style={leftRightRatio ? { flex: 1, alignItems: 'flex-end' } : undefined}>
          {
            !!rightTitle && <Text numberOfLines={1} style={[styles.txtLeftTitle, rightTitleStyle, { color: isActive ? colorTextActive : rightTitleColor }]}>{rightTitle}</Text>
          }
        </View>
        {
          !disable && rightIconName && <Icon name={rightIconName} size={24} color={rightIconColor} />
        }
        {
          !disable && rightImageSource && <Image style={styles.imageRight} source={rightImageSource} resizeMode='contain' />
        }
      </View>
    )

    return (
      <View>
        <Component
          style={[
            styles.container,
            {
              width,
              height,
              backgroundColor
            },
            leftIconName ? { paddingLeft: 14 } : undefined,
            rightIconName ? { paddingRight: 10 } : undefined,
            borderRadius ? { borderRadius: 10 } : undefined,
            firstBorder ? { borderTopLeftRadius: 10, borderTopRightRadius: 10 } : undefined,
            lastBorder ? { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 } : undefined,
            isActive ? { backgroundColor: backgroundColorActive } : undefined,
            style,
            disable ? { opacity: disableOpacity } : undefined
          ]}
          onPress={onPress}
        >
          {
            (leftTitle || leftImage || leftIconName) && renderLeft
          }
          {
            (rightTitle || rightImage || rightIconName) && renderRight
          }
        </Component>
        {
          separator && <View style={styles.separator} />
        }
      </View>
    );
  }
}

Row.defaultProps = {
  leftTitleColor: common.TEXT_COLOR_BLACK,
  leftIconColor: common.ICON_COLOR_ACTIVE,
  backgroundColor: common.ROW_BACKGROUND_COLOR,
  rightTitleColor: common.TEXT_COLOR_BLACK,
  rightIconColor: common.ICON_COLOR_ACTIVE,
  subTitleColor: common.TEXT_COLOR_INACTIVE,
  height: 55,
  width: SCREEN.width - 32,
  disable: false,
  disableOpacity: 0.4,
  materialButton: true,
  borderRadius: false,
  firstBorder: false,
  lastBorder: false,
  isActive: false,
  backgroundColorActive: common.ROW_BACKGROUND_COLOR,
  colorTextActive: common.TEXT_COLOR_BLACK,
  separator: false,
  leftImage: false,
  rightImage: false,
}

Row.propTypes = {
  leftTitle: PropTypes.string,
  leftIconName: PropTypes.string,
  rightTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rightIconName: PropTypes.string,
  leftTitleStyle: Text.propTypes.style,
  leftTitleColor: PropTypes.string,
  leftIconColor: PropTypes.string,
  rightTitleStyle: Text.propTypes.style,
  rightTitleColor: PropTypes.string,
  rightIconColor: PropTypes.string,
  style: ViewPropTypes.style,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  leftRightRatio: PropTypes.number,
  disableOpacity: PropTypes.number,
  onPress: PropTypes.func,
  disable: PropTypes.bool,
  materialButton: PropTypes.bool,
  borderRadius: PropTypes.bool,
  firstBorder: PropTypes.bool,
  lastBorder: PropTypes.bool,
  subTitle: PropTypes.string,
  subTitleStyle: Text.propTypes.style,
  subTitleColor: PropTypes.string,
  isActive: PropTypes.bool
}

interface Props {
  leftTitle?: string;
  leftIconName?: string;
  rightTitle?: string | number;
  rightIconName?: string;
  leftTitleStyle?: StyleProp<TextStyle>;
  leftTitleColor?: string;
  leftIconColor?: string;
  rightTitleStyle?: StyleProp<TextStyle>;
  rightTitleColor?: string;
  rightIconColor?: string;
  style?: StyleProp<ViewStyle>;
  /**
   * default value SCREEN.width - 32
   */
  width?: number | string;
  /**
   * default value 55
   */
  height?: number;
  disableOpacity?: number;
  leftRightRatio?: number | string;
  backgroundColor?: string;
  /**
   * call when press row
   */
  onPress?: () => void;
  disable?: boolean;
  /**
   * use material button when true and TouchableOpacity when false
   */
  materialButton?: boolean;
  /**
   * default false. If true set borderRadius = 10
   */
  borderRadius?: boolean;
  /**
   * default false. If true set borderRadiusTopLeft and borderRadiusTopRight = 10
   */
  firstBorder?: boolean;
  /**
   * default false. If true set borderRadiusBottomLeft and borderRadiusBottomRight = 10
   */
  lastBorder?: boolean;
  /**
   * subtitle underline of title
   */
  subTitle?: string;
  subTitleStyle?: StyleProp<TextStyle>;
  subTitleColor?: string;
  isActive?: boolean;
  backgroundColorActive?: string;
  colorTextActive?: string;
  separator?: boolean;
  leftImage?: boolean;
  rightImage?: boolean;
  leftImageSource?: string | number;
  rightImageSource?: string | number;
  leftImageStyle?: object;
}

export default Row;
