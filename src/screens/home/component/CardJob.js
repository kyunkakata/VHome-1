/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { connect } from 'react-redux';
import * as common from '../../../configs/common';
import * as imgs from '../../../configs/imgs';
import langs from '../../../languages/common';
import { listServiceSelector } from '../../../containers/home/selector';

class CardJob extends PureComponent {
  render() {
    const { item, isView, isActive, services } = this.props;
    const ComponentView = isView ? View : TouchableOpacity;
    let titleService = '';
    const serviceFind = services.find(sv => sv.id == item.service_id)
    if (!!serviceFind) {
      titleService = serviceFind.name
    }

    const time = moment(item.start_time).format('H:mm DD/MM/YYYY');

    return (
      <ComponentView onPress={this.onPressRow} activeOpacity={0.8} style={styles.container}>
        <View style={[styles.viewHeader, !isActive ? { backgroundColor: common.BACKGROUND_COLOR_BUTTON_GREY } : undefined]}>
          <Text style={[styles.txtTitle, !isActive ? { color: common.BACKGROUND_COLOR_BUTTON } : undefined]}>
            {titleService}
          </Text>
        </View>
        <View style={styles.viewBody}>
          <View style={styles.viewLeftBody}>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.user} resizeMode='contain' />
              <Text style={styles.title}>
                {item.name}
              </Text>
            </View>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.calendar} resizeMode='contain' />
              <Text style={styles.title}>
                {time}
              </Text>
            </View>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.locationBorder} resizeMode='contain' />
              <Text style={styles.title}>
                {item.address}
              </Text>
            </View>
          </View>
          <View style={styles.viewRightBody}>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.phone} resizeMode='contain' />
              <View style={styles.viewRightTitle}>
                <Text style={styles.title}>
                  {item.phone}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.price} resizeMode='contain' />
              <View style={styles.viewRightTitle}>
                <Text style={styles.title}>
                  {item.price || langs.thuongLuong}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ height: 20 }} />
            </View>
          </View>
        </View>
      </ComponentView>
    );
  }

  onPressRow = () => {
    Actions.productDetailService({ job: this.props.item, services: this.props.services })
  }
}

const styles = StyleSheet.create({
  container: {
    height: 156,
    backgroundColor: common.BACKGROUND_COLOR
  },
  viewHeader: {
    height: 36,
    backgroundColor: common.BACKGROUND_COLOR_BUTTON2,
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  txtTitle: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: common.FONT_SIZE_TITLE
  },
  viewBody: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12
  },
  viewLeftBody: {
    flex: 2,
  },
  viewRightBody: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  image: {
    height: 20,
    width: 20
  },
  title: {
    marginLeft: 16
  },
  viewRightTitle: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

CardJob.defaultProps = {
  isActive: true
}

const mapStateToProps = (state) => {
  return {
    services: listServiceSelector(state)
  }
}

export default connect(mapStateToProps)(CardJob);
