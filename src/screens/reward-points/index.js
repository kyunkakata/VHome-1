/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Navbar, CardRewardPoints } from '../../components';
import * as common from '../../configs/common';
import langs from '../../languages/common';

const DATA = [
  { title: 300, content: 'Thẻ cào điện thoại mệnh giá 10.000đ' },
  { title: 500, content: 'Thẻ cào điện thoại mệnh giá 20.000đ' },
  { title: 1200, content: 'Thẻ cào điện thoại mệnh giá 50.000đ' },
  { title: 2300, content: 'Thẻ cào điện thoại mệnh giá 100.000đ' }
]

class RewardPoints extends PureComponent {
  renderItem = ({ item, index }) => {
    const { coin } = this.props;
    const currenCoin = coin.coin_period_current || 0
    return (
      <CardRewardPoints
        title={`${item.title} ${langs.point}`}
        content={item.content}
        titleFooter={langs.redeemReward}
        style={{ marginBottom: 16, marginRight: index % 2 == 0 ? 16 : 0 }}
        showFooterButton={item.title <= currenCoin}
        onPressButtonFooter={this.onRedeemReward}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          title={langs.rewardPoints}
          leftIcon
          back
        />
        <View style={styles.viewContent}>
          <FlatList
            data={DATA}
            numColumns={2}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.renderItem}
            contentContainerStyle={styles.viewFlatlist}
          />
        </View>
      </View>
    );
  }

  onRedeemReward = () => {

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
    paddingHorizontal: 16,
    paddingTop: 16
  }
});

const mapStateToProps = (state) => {
  return {
    coin: state.coin
  }
}

export default connect(mapStateToProps)(RewardPoints);
