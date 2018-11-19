/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import * as common from '../../../configs/common';
import * as imgs from '../../../configs/imgs';

class CustomCalloutView extends PureComponent {
  render() {
    const { title, description } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.viewLeft}>
          <Image source={imgs.logo} style={styles.image} resizeMode='contain' />
        </View>
        <View style={styles.viewRight}>
          <Text style={styles.txtTitle}>
            {title}
          </Text>
          <Text style={styles.txtContent}>
            {description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    width: 32,
    height: 32
  },
  viewRight: {
    marginLeft: 4
  },
  txtTitle: {
    fontSize: common.FONT_SIZE_SMALL,
    marginBottom: 2
  },
  txtContent: {
    fontSize: common.FONT_SIZE_SMALL
  }
});

export default CustomCalloutView;
