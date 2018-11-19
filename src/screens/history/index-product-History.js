/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Navbar } from '../../components';
import * as common from '../../configs/common';
import langs from '../../languages/common';
import RowHistoryProduct from './component/RowHistoryProduct';
import { providerServiceRequestHistory, providerLoadMoreServiceRequestHistory } from '../../redux/actions/provider_service';

class ProductHistory extends PureComponent {
  enableLoadMore = false;

  componentDidMount() {
    const { serviceRequestHistory } = this.props;
    if (serviceRequestHistory.data.length == 0) {
      this.props.providerServiceRequestHistory()
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <RowHistoryProduct {...this.props} services={this.props.services} item={item} />
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
      <View style={styles.container}>
        <Navbar
          title={langs.history}
          leftIcon
          back
        />
        <FlatList
          data={serviceRequestHistory.data}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={this.renderItem}
          contentContainerStyle={styles.viewContent}
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
      </View>
    );
  }

  onMomentumScrollBegin = () => {
    this.enableLoadMore = true
  }

  onRefresh = () => {
    this.props.providerServiceRequestHistory()
  }

  onEndReached = () => {
    this.enableLoadMore && this.props.providerLoadMoreServiceRequestHistory()
    this.enableLoadMore = false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR
  },
  viewContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
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
  providerServiceRequestHistory,
  providerLoadMoreServiceRequestHistory
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    serviceRequestHistory: state.providerSevice.serviceRequestHistory,
    services: state.service.allService.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductHistory);
