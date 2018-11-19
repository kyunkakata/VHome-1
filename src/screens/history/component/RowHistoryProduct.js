/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../../components';
import CardJob from '../../home/component/CardJob';
import * as common from '../../../configs/common';
import langs from '../../../languages/common';

class RowHistoryProduct extends PureComponent {
  render() {
    const { status } = this.props.item

    return (
      <View style={styles.container}>
        <CardJob isView isActive={status != 3} item={this.props.item} />
        <Button
          title={status == 3 ? langs.done : langs.doing}
          rounded
          width={120}
          height={32}
          backgroundColor={status == 3 ? common.BACKGROUND_COLOR_BUTTON_GREY : common.BACKGROUND_COLOR_BUTTON}
          titleStyle={{ fontSize: 14, fontWeight: '400' }}
          color={status == 3 ? common.TEXT_COLOR_BLACK : common.TEXT_COLOR_WHITE}
          style={{ alignSelf: 'flex-end', marginBottom: 12 }}
          onPress={status == 3 ? this.onDoneJob : this.onReceiveJob}
        />
      </View>
    );
  }

  onDoneJob = () => {

  }

  onReceiveJob = () => {

  }
}

const styles = StyleSheet.create({
  container: {

  }
});

export default RowHistoryProduct;
