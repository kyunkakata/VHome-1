/**
* Created by nghinv on Fri Nov 02 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import _ from 'lodash';
import { ButtonIcon } from '../Button';
import { Avatar } from '../Avatar';
import * as common from '../../configs/common';
import * as imgs from '../../configs/imgs';

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: common.ROW_BORDER_COLOR,
    shadowOffset: {
      width: 0.6,
      height: 0.6
    },
    shadowRadius: 1,
    shadowOpacity: 0.6,
    alignSelf: 'center'
  },
  viewHeader: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  viewBody: {
    flex: 1,
    flexDirection: 'row'
  },
  viewLeftBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewRightBody: {
    flex: 1,
    justifyContent: 'center'
  },
  viewFooter: {
    height: 48,
    backgroundColor: common.BACKGROUND_COLOR_BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  txtFooter: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: 14,
    fontWeight: common.FONT_WEIGHT_HEADER
  },
  txtName: {
    color: common.TEXT_COLOR_BLACK,
    fontSize: 15,
    fontWeight: common.FONT_WEIGHT_HEADER,
    marginBottom: 8
  },
  txtPhone: {
    marginBottom: 8
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageStar: {
    width: 16,
    height: 16,
    marginRight: 4
  }
});

class CardCallService extends PureComponent<Props> {
  render() {
    const {
      avatar,
      name,
      phone,
      star,
      title,
      backgroundColor,
      borderRadius,
      width,
      height,
      onClose
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            width, height,
            backgroundColor,
            borderRadius
          }
        ]}
      >
        <View style={styles.viewBody}>
          <View style={styles.viewLeftBody}>
            <Avatar
              imageSource={avatar}
              width={88}
            />
          </View>
          <View style={styles.viewRightBody}>
            <Text style={styles.txtName}>
              {name}
            </Text>
            <Text style={styles.txtPhone}>
              {phone}
            </Text>
            <View style={styles.viewStar}>
              {
                _.range(5).map(s => {
                  return (
                    <Image source={star > s ? imgs.icon.vote : imgs.icon.voteBorder} key={`key_${s}`} style={styles.imageStar} resizeMode='contain' />
                  )
                })
              }
            </View>
          </View>
        </View>
        <View style={[styles.viewFooter, { borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }]}>
          <Text style={styles.txtFooter}>
            {title}
          </Text>
        </View>
        <View style={styles.viewHeader}>
          <ButtonIcon onPress={onClose} iconName='clear' iconColor={common.ICON_COLOR_ACTIVE} size={20} />
        </View>
      </View>
    );
  }
}

CardCallService.defaultProps = {
  backgroundColor: 'white',
  borderRadius: 8,
  width: Math.min(540, Dimensions.get('window').width - 32),
  height: 230
}

interface Props {
  avatar?: string | number;
  name?: string;
  phone?: string;
  star?: number;
  title?: string;
  backgroundColor?: string;
  borderRadius?: number;
  width?: number | string;
  height?: number;
  onClose?: () => void;
}

export default CardCallService;

