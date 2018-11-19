/**
* Created by nghinv on Sun Oct 21 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import * as imgs from '../../configs/imgs';
import * as common from '../../configs/common';

class RowInboxUser extends PureComponent {
  render() {
    const { item, language } = this.props;
    const createTime = item.time ? moment(item.time).locale(language, localization).fromNow() : ` `;

    return (
      <TouchableOpacity onPress={this.onDetailInbox} style={styles.container}>
        <View style={styles.viewRow}>
          <View style={styles.viewLogo}>
            <Image source={imgs.logo_inbox} style={styles.logo} resizeMode='contain' />
          </View>
          <View style={styles.viewRight}>
            <View style={styles.viewContent}>
              <Text numberOfLines={1} style={styles.txtTitle}>{item.name}</Text>
              <Text numberOfLines={2} style={styles.txtContent}>{item.content}</Text>
            </View>
            <View style={styles.viewTime}>
              <Image source={imgs.icon.time} style={styles.timeImage} resizeMode='contain' />
              <Text style={styles.txtTime}>{createTime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  }

  onDetailInbox = () => {
    Actions.detailInbox({ item: this.props.item })
  }
}

const styles = StyleSheet.create({
  container: {
    height: 98
  },
  viewRow: {
    flex: 1,
    flexDirection: 'row'
  },
  viewLogo: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 36,
    height: 36
  },
  viewRight: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 8,
    justifyContent: 'center'
  },
  separator: {
    height: 0.7,
    backgroundColor: common.ACTION_SHEET_COLOR_SEPARATOR
  },
  viewContent: {

  },
  viewTime: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4
  },
  txtTitle: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_TITLE,
    color: common.TEXT_COLOR_ACTIVE
  },
  txtContent: {
    fontSize: common.FONT_SIZE_CONTENT,
    fontWeight: common.FONT_WEIGHT_TITLE,
    color: common.TEXT_COLOR_INACTIVE,
    marginVertical: 3
  },
  txtTime: {
    fontSize: common.FONT_SIZE_SMALL,
    fontWeight: common.FONT_WEIGHT_TITLE,
    color: common.TEXT_COLOR_INACTIVE,
    marginLeft: 2
  },
  timeImage: {
    width: 16,
    height: 16,
    marginRight: 4
  }
});

export default RowInboxUser;
