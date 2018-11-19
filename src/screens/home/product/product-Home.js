/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKSwitch } from 'react-native-material-kit';
import { Navbar } from '../../../components';
import * as common from '../../../configs/common';
import langs from '../../../languages/common';
import CardJob from '../component/CardJob';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.enableLoadMore = false;
  }

  renderItem = ({ item, index }) => {
    return (
      <CardJob
        item={item}
      />
    )
  }

  renderListEmptyComponent = () => {
    const { loadMore, loading } = this.props.serviceRequest;

    if (loading || loadMore) return <View />

    return (
      <View style={styles.viewEmptyData}>
        <Text style={styles.txtNodata}>
          {langs.nodata}
        </Text>
      </View>
    )
  }

  renderFooterComponent = () => {
    const { loadMore } = this.props.serviceRequest;

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

  render() {
    const { serviceRequest, providerStatusOnline } = this.props;
    const dataRender = serviceRequest.data.filter(d => (d.status == 0 && !d.needHide))

    return (
      <View style={styles.container}>
        <Navbar
          leftIcon
          leftIconName='menu'
          onLeft={this.onPressMoreMenu}
          title={langs.listJob}
        />
        <View style={styles.viewContent}>
          <View style={styles.viewHeader}>
            <Text style={styles.txtTitle}>{providerStatusOnline ? langs.online : langs.offline}</Text>
            <MKSwitch
              trackSize={16}
              trackLength={38}
              thumbRadius={11}
              onColor={common.BACKGROUND_COLOR_BUTTON2}
              thumbOnColor={common.BACKGROUND_COLOR_BUTTON}
              checked={providerStatusOnline}
              onCheckedChange={this.onChangeStatusOnline}
            />
          </View>
          <View style={styles.viewSeparator} />
          {
            providerStatusOnline && (
              <FlatList
                data={dataRender}
                keyExtractor={(item, index) => String(item.id)}
                renderItem={this.renderItem}
                contentContainerStyle={styles.viewFlatlist}
                refreshControl={
                  <RefreshControl
                    refreshing={serviceRequest.loading}
                    onRefresh={this.onRefresh}
                    tintColor={common.COLOR_SPINNER}
                  />
                }
                onEndReached={this.onEndReached}
                ListEmptyComponent={this.renderListEmptyComponent}
                ListFooterComponent={this.renderFooterComponent}
                onMomentumScrollBegin={this.onMomentumScrollBegin}
              />
            )
          }
        </View>
      </View>
    );
  }

  onChangeStatusOnline = ({ checked }) => {
    this.props.changeProviderStatus(checked)
  }

  onMomentumScrollBegin = () => {
    this.enableLoadMore = true
  }

  onRefresh = () => {
    this.props.providerGetServiceRequest()
  }

  onEndReached = () => {
    this.enableLoadMore && this.props.providerLoadMoreServiceRequest()
    this.enableLoadMore = false
  }

  onPressMoreMenu = () => {
    Actions.drawerOpen()
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingLeft: 12
  },
  viewSeparator: {
    borderBottomColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    borderBottomWidth: 1,
    marginHorizontal: 8
  },
  viewFlatlist: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  viewLoadMore: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  viewEmptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtNodata: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_HEADER,
    color: common.TEXT_COLOR_BLACK
  }
});

export default Home;
