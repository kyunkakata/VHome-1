/**
* Created by nghinv on Thu May 31 2018
* Copyright (c) 2018 nghinv
*/

import { Animated, Easing } from 'react-native';

/**
 * @function define navigator transition
 */
export const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps

      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth


      // We can access our navigation params on the scene's 'route' property
      var thisSceneParams = scene.route.params || {}

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateXFromLeft = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, width, 2 * width]
      })

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      })

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const slideFromLeft = { transform: [{ translateX: translateXFromLeft }] }
      const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
      const slideInFromBottom = { transform: [{ translateY }] }

      if (scene.route.params) {
        if (scene.route.params.direction == 'slideFromRight')
          return slideFromRight
        if (scene.route.params.direction == 'slideInFromBottom')
          return slideInFromBottom
        if (scene.route.params.direction == 'fade')
          return scaleWithOpacity
        if (scene.route.params.direction == 'horizontalFromLeft')
          return slideFromLeft
        return slideFromRight
      }
    },
  }
}

/**
 * function get default style
 */
export const getSceneStyle = (props) => ({
  // backgroundColor: 'black',
  shadowColor: null,
  shadowOffset: null,
  shadowOpacity: null,
  shadowRadius: null,
});
