/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
// import { CachedImage } from 'react-native-cached-image';
import FastImage from 'react-native-fast-image';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.6,
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  image: {
    ...StyleSheet.absoluteFillObject
  },
  viewTitle: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_TITLE
  }
});

class CardService extends PureComponent<Props> {
  render() {
    const {
      image,
      title,
      style,
      titleStyle,
      titleColor,
      width,
      height,
      borderRadius,
      backgroundTitle,
      onPress,
      cacheImage
    } = this.props;
    const ComponentImage = cacheImage ? FastImage : Image

    return (
      <TouchableOpacity
        style={[
          styles.container,
          { width, height },
          borderRadius ? { borderRadius: 8 } : undefined,
          style
        ]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {
          image && (
            <ComponentImage
              // defaultSource={cacheImage ? imgs : undefined}
              style={[styles.image, { width, height }]}
              source={typeof (image) === 'number' ? image : { uri: image }}
              resizeMode='cover'
              autoResize
            />
          )
        }
        {
          title && (
            <View style={[styles.viewTitle, { backgroundColor: backgroundTitle }]}>
              <Text style={[styles.title, titleStyle, { color: titleColor }]}>{title}</Text>
            </View>
          )
        }
      </TouchableOpacity>
    );
  }
}

CardService.defaultProps = {
  titleColor: common.TEXT_COLOR_WHITE,
  width: (SCREEN.width - 16 - 16) / 2,
  height: 140,
  borderRadius: true,
  backgroundTitle: 'rgba(0, 0, 0, 0.8)',
  cacheImage: false
}

interface Props {
  image: string | number;
  title?: string;
  style?: object;
  titleStyle?: object;
  titleColor?: string;
  width?: number;
  height?: number;
  borderRadius?: boolean;
  backgroundTitle?: string;
  onPress?: () => void;
  cacheImage?: boolean
}

export default CardService;
