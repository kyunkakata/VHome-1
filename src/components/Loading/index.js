import React, { PureComponent } from 'react';
import { StyleSheet, View, ActivityIndicator, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as common from '../../configs/common';

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    this.animate = new Animated.Value(0);
  }

  show = () => {
    Animated.spring(this.animate, {
      toValue: 1, ...this.props.springConfig
    }).start()
    this.setState({
      isLoading: true
    })
  }

  hide = () => {
    Animated.spring(this.animate, {
      toValue: 0, ...this.props.springConfig
    }).start(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  render() {
    const { backgroundColor, colorIndicator, loadingRef, transparent } = this.props;
    const { isLoading } = this.state;

    if (loadingRef) {
      if (!isLoading) {
        return null
      }

      return (
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor,
              opacity: this.animate.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 1]}
            colors={[
              'rgba(0, 0, 0, 0.4)',
              'rgba(0, 0, 0, 0.6)'
            ]}
            style={styles.viewContent}
          >
            <ActivityIndicator
              color={colorIndicator}
              size="large"
            />
          </LinearGradient>
        </Animated.View>
      );
    } else {
      return (
        <View
          style={[
            styles.container,
            {
              backgroundColor
            }
          ]}
        >
          {
            transparent ? (
              <View style={styles.viewContent}>
                <ActivityIndicator
                  color={colorIndicator}
                  size="large"
                />
              </View>
            ) : (
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  locations={[0, 1]}
                  colors={[
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.6)'
                  ]}
                  style={styles.viewContent}
                >
                  <ActivityIndicator
                    color={colorIndicator}
                    size="large"
                  />
                </LinearGradient>
              )
          }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

Loading.defaultProps = {
  backgroundColor: common.LOADING_BACKGROUND_COLOR,
  colorIndicator: common.LOADING_COLOR_ACTIVITY,
  springConfig: { tension: 30, friction: 7 },
  loadingRef: false,
  transparent: false
}

export default Loading;
