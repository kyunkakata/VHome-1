/**
* Created by nghinv on Tue Oct 30 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Navbar, CardService } from '../../../components';
import * as common from '../../../configs/common';

class ViewMoreService extends PureComponent {
  renderItem = ({ item, index }) => {
    return (
      <CardService
        image={item.image}
        title={item.name}
        width='100%'
        height={172}
        style={[styles.card]}
        onPress={() => this.onViewDetailService(item)}
        cacheImage
      />
    )
  }

  render() {
    const { service, category, loading } = this.props;

    return (
      <View style={styles.container}>
        <Navbar
          title={category.name}
          leftIcon
          back
        />
        <View style={styles.viewContent}>
          <FlatList
            data={service}
            keyExtractor={(item, index) => String(item.id)}
            contentContainerStyle={styles.viewFlatlist}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                tintColor={common.BACKGROUND_COLOR_BUTTON}
              />
            }
          />
        </View>
      </View>
    );
  }

  onRefresh = () => {
    const dataSearchService = {
      services_category_id: this.props.category.id,
      keyword: ''
    }

    this.props.getService && this.props.getService(dataSearchService)
  }

  onViewDetailService = (service) => {
    Actions.userDetailService({ service })
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
    paddingVertical: 22,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 16
  }
});

export default ViewMoreService;
