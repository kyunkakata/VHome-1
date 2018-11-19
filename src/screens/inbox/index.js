/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Navbar } from '../../components';
import RowInboxUser from './RowInboxUser';
import * as common from '../../configs/common';
import langs from '../../languages/common';

class Inbox extends PureComponent {
  enableLoadMore = false;

  componentDidMount() {
    const { notification } = this.props;
    if (notification.data.length == 0) {
      this.props.getAllNotification()
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <RowInboxUser item={item} language={this.props.language} />
    )
  }

  renderFooterComponent = () => {
    const { loadMore } = this.props.notification;

    if (!loadMore) return null;

    return (
      <View style={styles.viewLoadMore}>
        <ActivityIndicator
          size='small'
          color={common.COLOR_SPINNER}
        />
      </View>
    )
  }

  renderListEmptyComponent = () => {
    const { notification } = this.props;
    if (notification.loading || notification.loadMore) return null;

    return (
      <View style={styles.viewEmptyData}>
        <Text style={styles.txtNodata}>
          {langs.nodata}
        </Text>
      </View>
    )
  }

  render() {
    const { notification } = this.props;

    return (
      <View style={styles.container}>
        <Navbar
          title={langs.inbox}
          leftIcon
          back
        />
        <View style={styles.viewContent}>
          <FlatList
            data={notification.data}
            keyExtractor={(item, index) => String(item.id)}
            renderItem={this.renderItem}
            contentContainerStyle={styles.viewFlatlist}
            refreshControl={
              <RefreshControl
                refreshing={notification.loading}
                onRefresh={this.onRefresh}
                tintColor={common.COLOR_SPINNER}
              />
            }
            onEndReached={this.onEndReached}
            ListEmptyComponent={this.renderListEmptyComponent}
            ListFooterComponent={this.renderFooterComponent}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
          />
        </View>
      </View>
    );
  }

  onMomentumScrollBegin = () => {
    this.enableLoadMore = true
  }

  onRefresh = () => {
    this.props.getAllNotification()
  }

  onEndReached = () => {
    this.enableLoadMore && this.props.loadMoreAllNotification()
    this.enableLoadMore = false
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
  viewFlatlist: {
    paddingBottom: 20
  },
  viewLoadMore: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  viewEmptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  txtNodata: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_HEADER,
    color: common.TEXT_COLOR_BLACK
  }
});

export default Inbox;
