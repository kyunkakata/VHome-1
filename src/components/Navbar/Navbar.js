/**
* Created by nghinv on Sun Jun 03 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform, ViewStyle, TextStyle } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { navigationBarHeight, statusBarHeight, paddingX } from '../../common/utils';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  viewContainer: {

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewLeft: {
    height: 44
  },
  viewMiddle: {
    flex: 1,
    height: navigationBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewRight: {
    height: 44
  },
  leftIcon: {
    flex: 1,
    justifyContent: 'center'
  },
  titleLeftStyle: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 12
  },
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  titleRightStyle: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: 17,
    fontWeight: '500',
    marginRight: 12
  },
  icon: {
    width: 18,
    height: 18
  },
  navBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  titleStyle: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: 18,
    fontWeight: '500',
  },
  subTitle: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: 13,
    fontWeight: '400',
    alignSelf: 'center',
    marginBottom: 4
  },
  absolutMiddle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },
  rightImage: {
    width: 24,
    height: 24,
    marginRight: 12
  }
});

class Navbar extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      orientation: 'portrait'
    }
  }

  _onLayout = (event) => {
    const maxWidthDevice = Math.max(SCREEN.width, SCREEN.height);

    if (event.width >= maxWidthDevice) {
      this.setState({ orientation: 'landscape' })
    } else {
      this.setState({ orientation: 'portrait' })
    }
  }

  getHeight = () => {
    const { orientation } = this.state;
    let heightNav = 0
    if (orientation === 'portrait') {
      heightNav = navigationBarHeight + Platform.select({ ios: statusBarHeight + paddingX, android: 0 });
    } else {
      heightNav = navigationBarHeight + Platform.select({ ios: statusBarHeight, android: 0 });
    }

    return heightNav
  }

  getPaddingTop = () => {
    const { orientation } = this.state;
    let paddingTop = 0
    if (orientation === 'portrait') {
      paddingTop = Platform.select({ ios: paddingX + statusBarHeight, android: 0 });
    } else {
      paddingTop = Platform.select({ ios: statusBarHeight, android: 0 });
    }

    return paddingTop
  }

  handleLeft = () => {
    this.props.onLeft && this.props.onLeft()
  }

  handleRight = () => {
    this.props.onRight && this.props.onRight()
  }

  render() {
    let {
      style,
      backgroundColor,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      leftIcon,
      leftImage,
      leftTitle,
      leftStyle,
      leftTitleStyle,
      rightIcon,
      rightImage,
      rightTitle,
      rightStyle,
      rightTitleStyle,
      onLeft,
      onRight,
      onTitle,
      middleComponent,
      back,
      leftIconName,
      rightIconName,
      colorIconLeft,
      colorIconRight,
      separator,
      separatorColor,
      renderRight,
      renderLeft,
      absolutMiddle,
      pointerEvents,
    } = this.props;

    const renderMiddle = (
      <View style={styles.navBarItem}>
        {
          onTitle ? (
            <TouchableOpacity onPress={onTitle}>
              <Text numberOfLines={1} style={[styles.titleStyle, titleStyle]}>
                {
                  (typeof title === "function") ? title = title() : ` ${title} `
                }
              </Text>
              {
                subTitle && (
                  <Text numberOfLines={1} style={[styles.subTitle, subTitleStyle]}>
                    {
                      (typeof subTitle === "function") ? subTitle = subTitle() : ` ${subTitle} `
                    }
                  </Text>
                )
              }
            </TouchableOpacity>
          ) : (
              <View>
                <Text numberOfLines={1} style={[styles.titleStyle, titleStyle]}>
                  {
                    (typeof title === "function") ? title = title() : ` ${title} `
                  }
                </Text>
                {
                  subTitle && (
                    <Text numberOfLines={1} style={[styles.subTitle, subTitleStyle]}>
                      {
                        (typeof subTitle === "function") ? subTitle = subTitle() : ` ${subTitle} `
                      }
                    </Text>
                  )
                }
              </View>
            )
        }
      </View>
    )

    const renderLeftIcon = (
      <TouchableOpacity
        onPress={back ? Actions.pop : this.handleLeft}
        style={[styles.leftIcon, leftImage ? {} : { paddingLeft: 0 }]}>
        {
          leftImage ? (
            <Image
              style={[styles.icon, leftStyle]}
              resizeMode="contain"
              source={leftImage}
            />
          ) : leftIconName ?
              <Icon style={[{ paddingLeft: 10 }, leftStyle]} name={leftIconName} size={26} color={colorIconLeft} /> : <Icon style={[{ paddingLeft: 0 }, leftStyle]} name={'chevron-left'} size={36} color={colorIconLeft} />
        }
      </TouchableOpacity>
    )

    const renderLeftTitle = (
      <TouchableOpacity
        onPress={back ? Actions.pop : this.handleLeft}
        style={styles.leftIcon}>
        <Text numberOfLines={1} style={[styles.titleLeftStyle, leftTitleStyle]}>
          {leftTitle}
        </Text>
      </TouchableOpacity>
    )

    const renderRightIcon = (
      <TouchableOpacity
        onPress={this.handleRight}
        style={[styles.rightIcon, rightImage ? {} : { paddingRight: 2 }]}>
        {
          rightImage ? (
            <Image
              style={[styles.rightImage, rightStyle]}
              resizeMode="contain"
              source={rightImage}
            />
          ) : rightIconName ?
              <Icon style={[{ paddingRight: 10 }, rightStyle]} name={rightIconName} size={26} color={colorIconRight} /> : <Icon style={[{ paddingRight: 10 }, rightStyle]} name={'menu'} size={36} color={colorIconRight} />
        }
      </TouchableOpacity>
    )

    const renderRightTitle = (
      <TouchableOpacity
        onPress={this.handleRight}
        style={[styles.rightIcon, rightStyle]}>
        <Text numberOfLines={1} style={[styles.titleRightStyle, rightTitleStyle]}>
          {rightTitle}
        </Text>
      </TouchableOpacity>
    )

    return (
      <View onLayout={e => this._onLayout(e.nativeEvent.layout)}>
        <View style={[
          styles.viewContainer,
          { backgroundColor },
          separator ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : undefined,
          style,
          {
            height: this.getHeight(),
            paddingTop: this.getPaddingTop()
          }
        ]}>
          <View style={[styles.container]}>
            {
              renderLeft ? renderLeft() : (
                <View style={[styles.viewLeft, { width: (leftTitle || rightTitle) ? 64 : 44 }]}>
                  {
                    leftIcon ? renderLeftIcon : leftTitle ? renderLeftTitle : null
                  }
                </View>
              )
            }

            <View pointerEvents={pointerEvents} style={[styles.viewMiddle, absolutMiddle ? styles.absolutMiddle : undefined]}>
              {
                title ? renderMiddle : middleComponent ? middleComponent : null
              }
            </View>
            {
              absolutMiddle && <View pointerEvents='none' style={{ flex: 1, zIndex: 0 }} />
            }
            {
              renderRight ? renderRight() : (
                <View style={[styles.viewRight, { width: (leftTitle || rightTitle) ? 64 : 44 }]}>
                  {
                    rightIcon ? renderRightIcon : rightTitle ? renderRightTitle : null
                  }
                </View>
              )
            }

          </View>
        </View>
      </View>
    );
  }
}

Navbar.defaultProps = {
  backgroundColor: common.BACKGROUND_COLOR_NAV,
  colorIconLeft: common.TEXT_COLOR_WHITE,
  colorIconRight: common.TEXT_COLOR_WHITE,
  separator: false,
  separatorColor: 'rgba(0, 0, 0, 0.2)',
  absolutMiddle: false
}

interface Props {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  title?: string | Function;
  titleStyle?: StyleProp<TextStyle>;
  subTitle?: string | Function;
  subTitleStyle?: StyleProp<TextStyle>;
  leftIcon?: boolean;
  leftImage?: string | number;
  leftTitle?: string;
  leftStyle?: StyleProp<ViewStyle>;
  leftTitleStyle?: StyleProp<TextStyle>;
  rightIcon?: boolean;
  rightImage?: string | number;
  rightTitle?: string;
  rightStyle?: StyleProp<ViewStyle>;
  rightTitleStyle?: StyleProp<TextStyle>;
  onLeft?: () => void;
  onRight?: () => void;
  onTitle?: () => void;
  middleComponent?: any;
  absolutMiddle?: boolean;
  back?: boolean;
  // name icon vector icon
  leftIconName?: string;
  rightIconName?: string;
  colorIconLeft?: string;
  colorIconRight?: string;
  separator?: boolean;
  separatorColor?: string;
  renderRight?: () => void;
  renderLeft?: () => void;
  pointerEvents?: 'box-only' | 'none' | 'box-all';
}

export default Navbar;
