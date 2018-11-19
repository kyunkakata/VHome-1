/**
* Created by nghinv on Wed Jul 18 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated, Easing, Dimensions, Platform } from 'react-native';
import KeyboardScroll from '../KeyboardScroll/KeyBoardScroll';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');
const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN.width,
    height: SCREEN.height,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  viewButton: {
    height: 42,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: common.ALERT_COLOR_SEPARATOR
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtButton: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_HEADER,
    color: common.ALERT_COLOR_TEXT_ACTIVE,
    textAlign: 'center'
  },
  viewContent: {
    alignItems: 'center',
    padding: 16
  },
  content: {

  },
  txtTitle: {
    fontSize: common.FONT_SIZE_HEADER,
    fontWeight: common.FONT_WEIGHT_HEADER,
    color: common.ALERT_COLOR_TEXT,
    textAlign: 'center'
  },
  txtMessage: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_TITLE,
    color: common.ALERT_COLOR_TEXT,
    textAlign: 'center'
  }
});

class Alert extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      isOpen: this.props.isOpen || false,
      target: {
        x: 0,
        y: 0,
        opacity: 0.6,
      },
      openVal: new Animated.Value(0),
      scale: new Animated.Value(0)
    }

    this.dataAlert = null
  }

  alert = (props) => {
    this.dataAlert = {
      title: props.title ? props.title : null,
      message: props.message ? props.message : null,
      leftButton: props.leftButton ? props.leftButton : null,
      rightButton: props.rightButton ? props.rightButton : null,
      onClose: props.onClose ? props.onClose : null,
      renderContent: props.renderContent ? props.renderContent : null,
      width: props.width ? props.width : null,
      borderRadius: props.borderRadius ? props.borderRadius : null,
      hasTextInput: props.hasTextInput ? props.hasTextInput : null,
    }
    this.open()
  }

  update = () => {
    this.forceUpdate()
  }

  open = () => {
    this.setState({
      isAnimating: true,
      isOpen: true,
      target: {
        x: 0,
        y: 0,
        opacity: 0.6,
      }
    }, () => {
      Animated.parallel([
        Animated.spring(this.state.scale, {
          toValue: 1, ...this.props.springConfig
        }),
        Animated.timing(this.state.openVal, {
          toValue: 1,
          duration: 200,
          easing: Easing.quad
        })
      ]).start(() => {
        this.setState({ isAnimating: false });
        this.props.onOpen && this.props.onOpen()
      });
    });
  }

  close = (onClose) => {
    this.setState({
      isAnimating: true
    });
    Animated.parallel([
      Animated.timing(this.state.openVal, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear
      }),
      Animated.timing(this.state.scale, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      })
    ]).start(() => {
      this.setState({
        isAnimating: false,
        isOpen: false,
      });
      this.dataAlert && this.dataAlert.onClose && this.dataAlert.onClose()
      this.dataAlert = null;
      this.props.onClose && this.props.onClose()
      onClose && onClose()
    })
  }

  componentWillReceiveProps(props) {
    if (this.props.isOpen != props.isOpen && props.isOpen) {
      this.open();
    }
  }

  componentWillUnmount() {
    if (this.timeoutAlertLeftButton) {
      clearTimeout(this.timeoutAlertLeftButton)
    }

    if (this.timeoutAlertRightButton) {
      clearTimeout(this.timeoutAlertRightButton)
    }
  }

  renderButton = () => {
    let leftButton = null;
    let rightButton = null;
    let middleButton = null
    if (this.dataAlert) {
      leftButton = this.dataAlert.leftButton
      rightButton = this.dataAlert.rightButton
      middleButton = this.dataAlert.middleButton
    } else {
      leftButton = this.props.leftButton
      rightButton = this.props.rightButton
      middleButton = this.props.middleButton
    }

    if (!leftButton && !rightButton && !middleButton) return null

    return (
      <View style={[styles.viewButton, { width: Math.min(266, SCREEN.width - 16) }]}>
        {
          leftButton && leftButton.text && (
            <TouchableOpacity
              onPress={() => {
                this.close();
                if (this.timeoutAlertLeftButton) {
                  clearTimeout(this.timeoutAlertLeftButton)
                }

                this.timeoutAlertLeftButton = setTimeout(() => {
                  leftButton.onPress && leftButton.onPress()
                }, 220)
              }}
              style={styles.button}
            >
              <Text style={[styles.txtButton, leftButton.textStyle]}>
                {leftButton.text}
              </Text>
            </TouchableOpacity>
          )
        }
        {
          middleButton && middleButton.text && (
            <TouchableOpacity
              onPress={() => {
                this.close();
                if (this.timeoutAlertmiddleButton) {
                  clearTimeout(this.timeoutAlertmiddleButton)
                }

                this.timeoutAlertmiddleButton = setTimeout(() => {
                  middleButton.onPress && middleButton.onPress()
                }, 220)
              }}
              style={[
                styles.button,
                leftButton ? { borderLeftWidth: 1, borderLeftColor: common.ALERT_COLOR_SEPARATOR } : undefined
              ]}
            >
              <Text style={[styles.txtButton, middleButton.textStyle]}>
                {middleButton.text}
              </Text>
            </TouchableOpacity>
          )
        }
        {
          rightButton && rightButton.text && (
            <TouchableOpacity
              onPress={() => {
                if (!rightButton.dontClose) {
                  this.close();
                  if (this.timeoutAlertRightButton) {
                    clearTimeout(this.timeoutAlertRightButton)
                  }

                  this.timeoutAlertRightButton = setTimeout(() => {
                    rightButton.onPress && rightButton.onPress()
                  }, 220)
                } else {
                  rightButton.onPress && rightButton.onPress()
                }
              }}
              style={[
                styles.button,
                (leftButton || middleButton) ? { borderLeftWidth: 1, borderLeftColor: common.ALERT_COLOR_SEPARATOR } : undefined
              ]}
            >
              <Text style={[styles.txtButton, rightButton.textStyle]}>
                {rightButton.text}
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }

  renderContent = () => {
    let {
      renderContent
    } = this.props;
    let message = null
    let title = null

    if (this.dataAlert) {
      renderContent = this.dataAlert.renderContent
      message = this.dataAlert.message
      title = this.dataAlert.title
    } else {
      message = this.props.message
      title = this.props.title
    }


    if (renderContent) {
      return renderContent()
    }

    return (
      <View style={styles.viewContent}>
        {
          title && <Text style={styles.txtTitle}>{title}</Text>
        }
        {
          message && <Text style={[styles.txtMessage, title ? { marginTop: 4 } : undefined]}>{message}</Text>
        }
      </View>
    )
  }

  render() {
    const {
      origin,
      backgroundOverlay,
      style,
      modal
    } = this.props;
    let { width, borderRadius, hasTextInput } = this.props;
    if (this.dataAlert && this.dataAlert.width) {
      width = this.dataAlert.width
    }

    if (this.dataAlert && this.dataAlert.borderRadius) {
      borderRadius = this.dataAlert.borderRadius
    }

    if (this.dataAlert && this.dataAlert.hasTextInput) {
      hasTextInput = this.dataAlert.hasTextInput
    }

    const {
      isOpen,
      openVal,
      scale,
      target,
    } = this.state;

    const lightboxOpacityStyle = {
      opacity: openVal.interpolate({ inputRange: [0, 1], outputRange: [0.1, target.opacity] })
    }

    const contentOpacityStyle = {
      opacity: openVal.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
    }

    const openStyle = [styles.open, {
      left: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.x, target.x] }),
      top: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, target.y + STATUS_BAR_OFFSET] }),
      width: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.width, SCREEN.width] }),
      height: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.height, SCREEN.height] }),
      transform: [
        {
          scale: scale
        }
      ]
    }];

    const background = (
      <Animated.View
        style={[
          styles.background,
          { backgroundColor: backgroundOverlay },
          lightboxOpacityStyle
        ]}
      />
    );

    const content = (
      <Animated.View pointerEvents='box-none' style={[openStyle, contentOpacityStyle, styles.center]}>
        <View style={
          [
            styles.content,
            {
              width,
              borderRadius,
              overflow: 'hidden',
              backgroundColor: common.ALERT_BACKGROUND_COLOR,
            }, style
          ]}
        >
          {this.renderContent()}
          {this.renderButton()}
        </View>
      </Animated.View>
    )

    if (modal) {
      return (
        <Modal visible={isOpen} transparent={true} onRequestClose={() => this.close()} >
          {
            hasTextInput && (
              <KeyboardScroll scrollEnabled={false}>
                {background}
                {content}
              </KeyboardScroll>
            )
          }
          {!hasTextInput && background}
          {!hasTextInput && content}
        </Modal>
      );
    }

    if (isOpen) {
      return (
        <View style={styles.absolute}>
          {
            hasTextInput && (
              <KeyboardScroll scrollEnabled={false}>
                {background}
                {content}
              </KeyboardScroll>
            )
          }
          {!hasTextInput && background}
          {!hasTextInput && content}
        </View>
      )
    }

    return null
  }
}

Alert.defaultProps = {
  origin: {
    x: SCREEN.width / 2,
    y: SCREEN.height / 2,
    width: 0,
    height: 0
  },
  springConfig: { tension: 30, friction: 7 },
  isOpen: false,
  backgroundOverlay: 'rgba(0, 0, 0, 1)',
  width: Math.min(266, SCREEN.width - 16),
  hasTextInput: false,
  borderRadius: 12,
  modal: false
}

type OriginStatic = {
  x?: number;
  y?: number;
  width?: number | string;
  height?: number;
}

type SpringConfigStatic = {
  tension?: number;
  friction?: number;
}

type ButtonStatic = {
  text?: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

interface Props {
  origin?: OriginStatic;
  springConfig?: SpringConfigStatic;
  message?: string;
  borderRadius?: number;
  title?: string;
  leftButton?: ButtonStatic;
  rightButton?: ButtonStatic;
  isOpen?: boolean;
  backgroundOverlay?: string;
  width?: number | string;
  style?: StyleProp<ViewStyle>;
  renderContent?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  hasTextInput?: boolean;
  modal?: boolean;
}

export default Alert;
