/**
* Created by nghinv on Mon Nov 12 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { Input, Navbar, Search } from '../../components';
import * as common from '../../configs/common';
import * as imgs from '../../configs/imgs';
import langs from '../../languages/common';

class SelectAddress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      address_search: [],
      selectID: -1
    }

    this.debouceSearch = _.debounce((text) => {
      this.onChangeSearchAddress(text)
    }, 300)
  }

  _renderItem = ({ item, index }) => {
    const { selectID } = this.state;

    return (
      <TouchableOpacity style={styles.rowAddress} onPress={() => this.onCheckAddress(index)}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtAddress}>
            {item.formattedAddress}
          </Text>
        </View>
        {
          selectID == index && <Icon name='check' size={24} color={common.ICON_COLOR_ACTIVE} />
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { address, address_search, selectID } = this.state;

    const MiddleNavbar = (
      <Search
        onTitle
        placeholder={langs.address}
        value={address}
        onChangeText={this.debouceSearch}
        maxLength={50}
        width={'98%'}
      />
    )

    return (
      <View style={styles.container}>
        <Navbar
          middleComponent={MiddleNavbar}
          leftIcon
          back
          rightTitle={selectID != -1 ? langs.doneSelect : undefined}
          onRight={this.onSelectAddress}
        />
        <View style={styles.viewContent}>
          <FlatList
            data={address_search}
            keyExtractor={(item, index) => String(index)}
            renderItem={this._renderItem}
            contentContainerStyle={styles.viewFlatlist}
            extraData={selectID}
          />
        </View>
      </View>
    );
  }

  onChangeSearchAddress = (address) => {
    this.setState({
      address
    })

    if (address.trim().length == 0) return;

    Geocoder.geocodeAddress(address).then(res => {
      console.log('onChangeUsername:::', res)
      this.setState({ address_search: res, selectID: -1 })
    })
      .catch(err => {
        // Geocoder.fallbackToGoogle(`AIzaSyBl3QlCYlY78yuO9yScnmFnO7rJmfIiyCs`);
        console.log(err)
      })
  }

  onCheckAddress = (selectID) => {
    this.setState({
      selectID
    })
  }

  onSelectAddress = () => {
    this.props.onDone && this.props.onDone(this.state.address_search)
    Actions.pop()
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
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  rowAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingLeft: 12,
    paddingRight: 4,
    backgroundColor: common.BACKGROUND_COLOR_BUTTON_GREY,
    borderBottomColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    borderBottomWidth: 0.7
  },
  viewTitle: {
    flex: 1,
    justifyContent: 'center',
  },
  txtAddress: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_TITLE,
    color: common.TEXT_COLOR_BLACK
  }
});

export default SelectAddress;
