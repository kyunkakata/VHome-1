/**
* Created by nghinv on Fri Nov 02 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import RowHistory from './component/RowHistory';
import { getServiceRequesting, loadMoreServiceRequesting, userCancelServiceRequest } from '../../redux/actions/user_service';
import * as common from '../../configs/common';
import langs from '../../languages/common';

class RequireService extends PureComponent {
  enableLoadMore = false;

  componentDidMount() {
    const { serviceRequesting } = this.props;
    if (serviceRequesting.data.length == 0) {
      this.props.getServiceRequesting()
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <RowHistory {...this.props} services={this.props.services} item={item} />
    )
  }

  renderFooterComponent = () => {
    const { loadMore } = this.props.serviceRequesting;

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
    const { serviceRequesting } = this.props;
    if (serviceRequesting.loading || serviceRequesting.loadMore) return null;

    return (
      <View style={styles.viewEmptyData}>
        <Text style={styles.txtNodata}>
          {langs.nodata}
        </Text>
      </View>
    )
  }

  render() {
    const { serviceRequesting } = this.props;

    return (
      <FlatList
        data={serviceRequesting.data}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={this.renderItem}
        contentContainerStyle={styles.viewFlatlist}
        refreshControl={
          <RefreshControl
            refreshing={serviceRequesting.loading}
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
    this.props.getServiceRequesting()
  }

  onEndReached = () => {
    this.enableLoadMore && this.props.loadMoreServiceRequesting()
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
  getServiceRequesting,
  loadMoreServiceRequesting,
  userCancelServiceRequest
}

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    serviceRequesting: state.userService.serviceRequesting,
    services: state.service.allService.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireService);
