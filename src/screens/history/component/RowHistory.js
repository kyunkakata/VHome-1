/**
* Created by nghinv on Sat Nov 03 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Button } from '../../../components';
import * as common from '../../../configs/common';
import * as imgs from '../../../configs/imgs';
import langs from '../../../languages/common';

class RowHistory extends PureComponent {
  render() {
    const { item, services } = this.props;
    let titleService = '';
    const serviceFind = services ? services.find(sv => sv.id == item.service_id) : undefined
    if (!!serviceFind) {
      titleService = serviceFind.name
    }
    const time = moment(item.start_time).format('H:mm DD/MM/YYYY');

    return (
      <View style={[styles.container, { height: item.status == 1 ? 188 : 148 }]}>
        <TouchableOpacity onPress={this.onPressRow} style={styles.viewContent}>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>
              {titleService}
            </Text>
            <Image style={styles.imageNext} source={imgs.icon.next} resizeMode='contain' />
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
          <View style={styles.row}>
            <Image style={styles.image} source={imgs.icon.price} resizeMode='contain' />
            <Text style={styles.title}>
              {item.price || ''}
            </Text>
          </View>
          {
            item.status == 1 && (
              <View style={styles.viewButtonService}>
                <View>
                  <Image source={imgs.icon.cacel} style={styles.imageCancel} resizeMode='contain' />
                </View>
                <Button
                  title={langs.cancel}
                  rounded
                  width={120}
                  height={32}
                  backgroundColor='#E3E3E3'
                  color='#545454'
                  onPress={this.onCancelServiceRequest}
                />
              </View>
            )
          }
        </TouchableOpacity>
        <View style={styles.viewSeparator} />
      </View>
    );
  }

  onPressRow = () => {
    Actions.userDetailCallService({ data: this.props.item, fromScene: 'history' })
  }

  onCancelServiceRequest = () => {
    this.props.userCancelServiceRequest && this.props.userCancelServiceRequest(this.props.item)
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  viewContent: {
    flex: 1
  },
  viewSeparator: {
    borderBottomColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    borderBottomWidth: 1
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  imageNext: {
    width: 16,
    height: 16
  },
  textHeader: {
    color: common.TEXT_COLOR_ACTIVE
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 12
  },
  image: {
    height: 20,
    width: 20
  },
  title: {
    marginLeft: 16
  },
  viewButton: {
    alignItems: 'flex-end'
  },
  viewButtonService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imageCancel: {
    width: 18,
    height: 18
  }
});

export default RowHistory;
