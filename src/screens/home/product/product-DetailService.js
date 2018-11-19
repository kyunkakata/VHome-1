/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Navbar, ButtonLabelBorder, Button } from '../../../components';
import CardJob from '../component/CardJob';
import langs from '../../../languages/common';
import * as common from '../../../configs/common';

class ProductDetailService extends PureComponent {
  render() {
    const { serviceRequest, services } = this.props;
    let titleService = '';
    const serviceFind = services.find(sv => sv.id == serviceRequest.service_id)
    if (!!serviceFind) {
      titleService = serviceFind.name
    }

    return (
      <View style={styles.container}>
        <Navbar
          leftIcon
          back
          title={titleService}
        />
        <ScrollView style={styles.viewContent}>
          <CardJob
            item={serviceRequest}
            isView
          />
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
              {serviceRequest.description}
            </Text>
          </View>
        </ScrollView>
        {
          !serviceRequest.needHide && (
            <View style={styles.viewFooter}>
              <Button
                title={langs.reject}
                rounded
                width={140}
                height={38}
                style={{ alignSelf: 'center' }}
                onPress={this.onRejectJob}
              />
              <Button
                title={langs.receive}
                rounded
                width={140}
                height={38}
                backgroundColor={common.BACKGROUND_COLOR_BUTTON_GREEN}
                style={{ alignSelf: 'center' }}
                onPress={this.onReceiveJob}
              />
            </View>
          )
        }
      </View>
    );
  }

  onRejectJob = () => {
    const data = {
      service_request_id: this.props.serviceRequest.id
    }

    this.props.providerRejectServiceRequest(data)
  }

  onReceiveJob = () => {
    const data = {
      service_request_id: this.props.serviceRequest.id
    }

    this.props.providerReceiveServiceRequest(data)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR
  },
  viewContent: {
    paddingHorizontal: 16,
    paddingVertical: 20
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
  viewFooter: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  }
});

export default ProductDetailService;
