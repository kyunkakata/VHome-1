/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Navbar } from '../../components';
import * as common from '../../configs/common';

class DetailInbox extends PureComponent {
  render() {
    const { item } = this.props;

    return (
      <View style={styles.container}>
        <Navbar
          title={item.title}
          leftIcon
          back
        />
        <View style={styles.viewContent}>
          <View style={styles.viewHeader}>
            <Text style={styles.title}>
              {item.title}
            </Text>
          </View>
          <ScrollView contentContainerStyle={styles.viewBody}>
            <Text style={styles.txtContent}>
              {item.content}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR
  },
  viewContent: {
    flex: 1
  },
  viewHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12
  },
  title: {
    fontSize: common.FONT_SIZE_HEADER,
    fontWeight: common.FONT_WEIGHT_TITLE
  },
  viewBody: {
    // flex: 1,
    borderWidth: 1,
    borderColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 5,
    marginBottom: 8
  },
  txtContent: {

  }
});

export default DetailInbox;
