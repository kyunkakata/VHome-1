/**
* Created by nghinv on Thu Jul 26 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Image, Text } from 'react-native';
import { MKButton } from 'react-native-material-kit';
// import { CachedImage } from 'react-native-cached-image';
import FastImage from 'react-native-fast-image';
import * as imgs from '../../configs/imgs';
import * as common from '../../configs/common';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: common.BACKGROUND_COLOR
  },
  image: {
    flex: 1
  },
  viewName: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: common.AVATAR_BACKGROUND_COLOR
  },
  txtTitle: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: common.FONT_SIZE_HEADER,
    fontWeight: common.FONT_WEIGHT_HEADER
  }
});

class Avatar extends PureComponent<Props> {
  render() {
    const {
      width,
      round,
      imageSource,
      style,
      onPress,
      cacheImage,
      name
    } = this.props;
    const Component = onPress ? MKButton : View
    const ImageComponent = cacheImage ? FastImage : Image

    return (
      <Component
        style={[
          styles.container,
          {
            width,
            height: width
          },
          name ? styles.viewName : undefined,
          style,
          round ? { borderRadius: width / 2 } : undefined
        ]}
        onPress={onPress}
      >
        {
          imageSource ? (
            <ImageComponent
              defaultSource={imgs.noAvartar}
              style={[styles.image, { width, height: width }]}
              source={typeof (imageSource) === 'number' ? imageSource : { uri: imageSource }}
              resizeMode='cover'
            />
          ) : (
              <Text style={styles.txtTitle}>
                {name}
              </Text>
            )
        }
      </Component>
    );
  }
}

Avatar.defaultProps = {
  width: 64,
  round: true,
  cacheImage: false
}

Avatar.propTypes = {
  width: PropTypes.number,
  round: PropTypes.bool,
  imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  cacheImage: PropTypes.bool,
  name: PropTypes.string,
}

interface Props {
  width?: number;
  round?: boolean;
  imageSource?: number | string;
  style?: object;
  onPress?: () => void;
  cacheImage?: boolean;
  name?: string;
}

export default Avatar;
