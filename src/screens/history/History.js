/**
* Created by nghinv on Fri Nov 02 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import RowHistory from './component/RowHistory';
import { getServiceRequestHistory, loadMoreServiceRequestHistory } from '../../redux/actions/user_service';
import * as common from '../../configs/common';
import langs from '../../languages/common';

class History extends PureComponent {
  enableLoadMore = false;

  componentDidMount() {
    const { serviceRequestHistory } = this.props;
    if (serviceRequestHistory.data.length == 0) {
      this.props.getServiceRequestHistory()
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <RowHistory {...this.props} services={this.props.services} item={item} />
    )
  }

  renderFooterComponent = () => {
    const { loadMore } = this.props.serviceRequestHistory;

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
    const { serviceRequestHistory } = this.props;
    if (serviceRequestHistory.loading || serviceRequestHistory.loadMore) return null;

    return (
      <View style={styles.viewEmptyData}>
        <Text style={styles.txtNodata}>
          {langs.nodata}
        </Text>
      </View>
    )
  }

  render() {
    const { serviceRequestHistory } = this.props;

    return (
      <FlatList
        data={serviceRequestHistory.data}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={this.renderItem}
        contentContainerStyle={styles.viewFlatlist}
        refreshControl={
          <RefreshControl
            refreshing={serviceRequestHistory.loading}
            onRefresh={this.onRefresh}
            tintColor={common.COLOR_SPINNER}
          />
        }
        onEndReached={this.onEndReached}
        ListEmptyComponent={this.renderListEmptyComponent}
        ListFooterComponent={this.renderFooterComponent}
        onMomentumScrollBegin={this.onMomentumScrollBegin}
      />
    );
  }

  onMomentumScrollBegin = () => {
    this.enableLoadMore = true
  }

  onRefresh = () => {
    this.props.getServiceRequestHistory()
  }

  onEndReached = () => {
    this.enableLoadMore && this.props.loadMoreServiceRequestHistory()
    this.enableLoadMore = false
  }
}

const styles = StyleSheet.create({
  viewFlatlist: {
    paddingVertical: 20,
    marginTop: 2
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

const mapDispatchToProps = {
  getServiceRequestHistory,
  loadMoreServiceRequestHistory
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    serviceRequestHistory: state.userService.serviceRequestHistory,
    services: state.service.allService.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
