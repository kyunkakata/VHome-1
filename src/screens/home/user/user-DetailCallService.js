/**
* Created by nghinv on Fri Nov 02 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Navbar, Button, ButtonLabelBorder } from '../../../components';
import * as common from '../../../configs/common';
import * as imgs from '../../../configs/imgs';
import langs from '../../../languages/common';

class DetailCallService extends PureComponent {
  render() {
    const { data, fromScene, services } = this.props;
    let titleService = '';
    const serviceFind = services ? services.find(sv => sv.id == data.service_id) : undefined
    if (!!serviceFind) {
      titleService = serviceFind.name
    }

    return (
      <View style={styles.container}>
        <Navbar
          title={titleService}
          leftIcon
          back={fromScene == 'history'}
        />
        <ScrollView contentContainerStyle={styles.viewContent}>
          <View style={styles.viewTopContent}>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.calendar} resizeMode='contain' />
              <Text style={styles.title}>
                {`${data.start_time}`}
              </Text>
            </View>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.locationBorder} resizeMode='contain' />
              <Text style={styles.title}>
                {data.address}
              </Text>
            </View>
            <View style={styles.row}>
              <Image style={styles.image} source={imgs.icon.price} resizeMode='contain' />
              <Text style={styles.title}>
                {data.price || ` `}
              </Text>
            </View>
            <View style={styles.viewTitle}>
              <View style={styles.viewCircle} />
              <Text style={styles.title}>
                {langs.problemQuestion}
              </Text>
            </View>
            <ButtonLabelBorder
              title={titleService}
              titleColor={common.TEXT_COLOR_BLACK}
            />

            <View style={[styles.viewTitle, { marginTop: 20, marginBottom: 8 }]}>
              <View style={styles.viewCircle} />
              <Text style={styles.title}>
                {langs.detailContent}
              </Text>
            </View>
            <View style={[styles.viewTitle]}>
              <View style={styles.viewCircle2} />
              <Text style={styles.title}>
                {data.description}
              </Text>
            </View>
          </View>
          {
            !fromScene && (
              <View style={styles.viewStatusService}>
                <Text numberOfLines={2} style={styles.txtStatusService}>
                  {langs.statusProcessingService}
                </Text>
              </View>
            )
          }
          {
            !fromScene && (
              <Button
                title={langs.close}
                rounded
                width={140}
                style={{ alignSelf: 'center' }}
                onPress={this.onCloseDetailCallService}
              />
            )
          }
        </ScrollView>
      </View>
    );
  }

  onCloseDetailCallService = () => {
    Actions.pop()
    Actions.pop()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR
  },
  viewContent: {
    flex: 1,
    paddingVertical: 22,
    paddingHorizontal: 16
  },
  viewTopContent: {
    flex: 1
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
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12
  },
  viewCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: common.BACKGROUND_COLOR_BUTTON,
    marginLeft: 8,
    marginRight: 4
  },
  viewCircle2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 4
  },
  viewStatusService: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: common.BACKGROUND_COLOR_BUTTON,
    borderRadius: 5,
    marginTop: 16,
    marginBottom: 24,
    width: Dimensions.get('window').width - 32
  },
  txtStatusService: {
    color: common.TEXT_COLOR_WHITE,
    textAlign: 'center',
    fontSize: common.FONT_SIZE_TITLE
  }
});

const mapStateToProps = (state) => {
  return {
    language: state.config.language,
    services: state.service.allService.data
  }
}

export default connect(mapStateToProps)(DetailCallService);
