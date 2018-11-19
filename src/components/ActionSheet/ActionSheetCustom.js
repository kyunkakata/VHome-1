/**
* Created by nghinv on Thu Nov 01 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Text, Animated, Dimensions, findNodeHandle, UIManager,
  TouchableWithoutFeedback, TouchableOpacity, ScrollView
} from 'react-native';
import Interactable from 'react-native-interactable';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: SCREEN.height,
    width: SCREEN.width,
    height: SCREEN.height,
    overflow: 'hidden',
    alignItems: 'center'
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  panel: {
    overflow: 'hidden'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black'
  },
  txtBottom: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  viewContentButton: {
    overflow: "hidden"
  },
  separator: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#D8D8D8'
  }
});

class ActionSheetCustom extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoading: true
    }

    this.data = null;
    this.height = 0;
    this.opacity = new Animated.Value(0)
    this._deltaY = new Animated.Value(0)
    this.refPannel = React.createRef();
  }

  show = (data) => {
    this.data = data;

    this.setState({ show: true }, () => {
      setTimeout(() => {
        this.getHeightActionSheet()
      })

      Animated.sequence([
        Animated.timing(this._deltaY, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true
        }),
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true
        })
      ]).start(() => {
        requestAnimationFrame(() => {
          this.refPannel.current.snapTo({ index: 0 })
        })
        data && data.onShow && data.onShow()
      })
    })
  }

  hide = () => {
    Animated.sequence([
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this._deltaY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true
      })
    ]).start(() => {
      this.setState({ show: false }, () => {
        this.data && this.data.onHide && this.data.onHide();
      })
    })

    this.refPannel.current.snapTo({ index: 1 })
  }

  getHeightActionSheet = () => {
    let node = findNodeHandle(this.refs.viewRef)
    if (node) {
      UIManager.measureInWindow(node, (x, y, width, height) => {
        if (this.height == height) return
        this.height = height;
        this.setState({
          isLoading: false
        }, () => {
          this.show(this.data)
        })
      })
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  getInitialPosition = () => {
    return { y: SCREEN.height + 100 }
  }

  getSnapPoints = () => {
    return [
      { y: SCREEN.height - this.height },
      { y: SCREEN.height + 100 },
    ]
  }

  onDismiss = () => {
    this.hide()
  }

  _onAlert = ({ nativeEvent }) => {
    if (nativeEvent.myArea == 'enter') {
      Animated.sequence([
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(this._deltaY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ]).start(() => {
        this.setState({ show: false }, () => {
          this.data && this.data.onHide && this.data.onHide();
        })
      })
    }
  }

  onPressItem = (item) => {
    this.hide()
    item.onPress && item.onPress()
  }

  renderBottomButton = () => {
    const data = {
      ...this.props,
      ...this.data
    }

    const { bottomButton } = data;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          { marginTop: 16 },
          bottomButton.style,
          { borderRadius: data.borderRadius },
          { height: bottomButton.height ? bottomButton.height : data.heightItem },
          { backgroundColor: bottomButton.backgroundColor ? bottomButton.backgroundColor : data.backgroundColorItem }
        ]}
        activeOpacity={1}
        onPress={() => this.onPressItem(bottomButton)}
      >
        <Text style={[styles.txtBottom,]}>
          {bottomButton.title}
        </Text>
      </TouchableOpacity>
    )
  }

  renderOptionButton = () => {
    const data = {
      ...this.props,
      ...this.data
    }
    const options = data.options

    return (
      <View style={[styles.viewContentButton, { borderRadius: data.borderRadius, backgroundColor: data.backgroundColorItem }]}>
        <ScrollView style={{ flex: 0, flexGrow: 0, maxHeight: SCREEN.height - 140, borderRadius: data.borderRadius }}>
          {
            options.map((item, idx) => {
              return (
                <View key={`item_${idx}`}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.onPressItem(item)}
                    style={[
                      styles.button,
                      item.style,
                      { height: item.height ? item.height : data.heightItem },
                      { backgroundColor: item.backgroundColor ? item.backgroundColor : data.backgroundColorItem }
                    ]}
                  >
                    <Text
                      style={[
                        styles.title,
                        item.titleStyle,
                        item.titleColor ? { color: item.titleColor } : undefined,
                      ]}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }

  render() {
    let data = {
      ...this.props,
      ...this.data
    }

    const renderBackground = (
      <TouchableWithoutFeedback onPress={this.onDismiss}>
        <Animated.View
          style={[
            styles.background,
            {
              backgroundColor: data.backgroundColor,
              opacity: this.opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6]
              })
            }
          ]}
        />
      </TouchableWithoutFeedback>
    )

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: this._deltaY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -SCREEN.height]
                })
              }
            ]
          }
        ]}
      >
        {renderBackground}
        <View pointerEvents='box-none' style={{ paddingBottom: data.marginBottom }} collapsable={false} ref={'viewRef'}>
          <Interactable.View
            ref={this.refPannel}
            style={[
              styles.panel,
              {
                width: data.width
              }
            ]}
            verticalOnly
            animatedNativeDriver
            dragEnabled={false}
            dragWithSpring={{ tension: 2000, damping: 0.5 }}
            snapPoints={this.getSnapPoints()}
            initialPosition={this.getInitialPosition()}
            alertAreas={[{ id: 'myArea', influenceArea: { top: SCREEN.height } }]}
            onAlert={this._onAlert}
          >
            {
              data.renderContent ? data.renderContent() : (
                <View>
                  {data && data.options && data.options.length > 0 && this.renderOptionButton()}
                  {data && data.bottomButton && this.renderBottomButton()}
                </View>
              )
            }
          </Interactable.View>
        </View>
      </Animated.View>
    );
  }
}

ActionSheetCustom.defaultProps = {
  backgroundColor: 'black',
  width: Math.min((SCREEN.width - 32), 360),
  heightItem: 54,
  backgroundColorItem: 'white',
  marginBottom: 20,
  borderRadius: 8
}

interface Props {
  backgroundColor?: string;
  width?: string | number;
  heightItem?: number;
  backgroundColorItem?: string;
  marginBottom?: number;
  borderRadius?: number;
}

export default ActionSheetCustom;
