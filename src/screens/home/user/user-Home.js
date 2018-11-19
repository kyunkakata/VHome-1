/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { Navbar, CardService, Search, CardCallService, CardCallServiceDone } from '../../../components';
import MapLoadInitial from '../component/MapLoadInitial';
import PannelSearchService from '../component/PannelSearchService';
import * as common from '../../../configs/common';
import * as imgs from '../../../configs/imgs';
import langs from '../../../languages/common';
import { global } from '../../../configs/global';
import { converUtf8 } from '../../../common/utils';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
      showPannelSearchService: false,
      services: []
    }

    this.mapView = React.createRef();
    this.pannelSearchService = React.createRef();

    this._debouceSearch = _.debounce((text) => {
      this._onChangeText(text)
    }, 200)
  }

  renderItem = ({ item, index }) => {
    return (
      <CardService
        image={item.image}
        title={item.name}
        cacheImage
        style={[styles.card, index % 2 == 0 ? { marginRight: 16 } : undefined]}
        onPress={() => this.onViewDetailCatagory(item)}
      />
    )
  }

  renderItemServiceSearch = ({ item, index }) => {
    return (
      <CardService
        image={item.image}
        title={item.name}
        cacheImage
        style={[styles.card, index % 2 == 0 ? { marginRight: 16 } : undefined]}
        onPress={() => this.onViewItemServiceSearch(item)}
      />
    )
  }

  render() {
    const { category, loading } = this.props;
    const { services } = this.state;

    const renderSearch = (
      <Search
        onTitle
        placeholder={langs.searchService}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onChangeText={this._debouceSearch}
      />
    )

    return (
      <View style={styles.container}>
        <Navbar
          leftIcon
          leftIconName='menu'
          onLeft={this.onPressMoreMenu}
          rightIcon
          rightImage={imgs.mapNav}
          onRight={this.onOpenMap}
          middleComponent={renderSearch}
        />
        <View style={styles.viewContent}>
          <FlatList
            data={category}
            keyExtractor={(item, index) => String(item.id)}
            numColumns={2}
            contentContainerStyle={styles.viewFlatlist}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this.onRefresh}
                tintColor={common.BACKGROUND_COLOR_BUTTON}
              />
            }
          />
          <MapLoadInitial ref={this.mapView} />
          <PannelSearchService ref={this.pannelSearchService}>
            <FlatList
              data={services}
              keyExtractor={(item, index) => String(item.id)}
              numColumns={2}
              contentContainerStyle={styles.viewFlatlist}
              renderItem={this.renderItemServiceSearch}
            />
          </PannelSearchService>
        </View>
      </View>
    );
  }

  onRefresh = () => {
    this.props.getAllCategory && this.props.getAllCategory()
  }

  _onFocus = () => {
    console.log('_onFocus')
  }

  _onBlur = () => {
    console.log('_onBlur')
  }

  _onChangeText = (text) => {
    const isShow = this.pannelSearchService.current.isShowPannel();

    if (text.trim().length > 0 && !isShow) {
      this.pannelSearchService.current.show()
    }

    if (text.trim().length == 0 && isShow) {
      this.pannelSearchService.current.hide()
    }

    if (text.trim().length > 0) {
      const matchFilter = new RegExp(converUtf8(text), "i")

      this.setState({
        services: this.props.services.filter(service => matchFilter.test(converUtf8(service.name)))
      })
    } else {
      this.setState({ services: [] })
    }
  }

  onViewDetailCatagory = (category) => {
    Actions.userViewMoreService({ category })
  }

  onViewItemServiceSearch = (service) => {
    Actions.userDetailService({ service })
  }

  onPressMoreMenu = () => {
    global.connection.sendData('Hello')
    // global.Alert.alert({
    //   renderContent: this.renderCardCallService,
    //   width: Math.min(540, Dimensions.get('window').width - 32),
    //   borderRadius: 8
    // })

    // global.Alert.alert({
    //   renderContent: this.renderCardCallServiceDone,
    //   width: Math.min(540, Dimensions.get('window').width - 32),
    //   borderRadius: 8
    // })

    Actions.drawerOpen()
  }

  renderCardCallService = () => {
    return (
      <CardCallService
        title='Nguyễn Tuấn Anh đã nhận dịch vụ của bạn!'
        avatar={imgs.service.thongTacBonCau}
        name='Nguyễn Tuấn Anh'
        phone='0974796648'
        star={3}
        onClose={() => global.Alert.close()}
      />
    )
  }

  renderCardCallServiceDone = () => {
    return (
      <CardCallServiceDone
        title='Nguyễn Tuấn Anh đã hoàn thành công việc!'
        titleButton='Gửi đánh giá'
        titleVote='Đánh giá'
        commentTitle='Nhận xét'
        commentPlaceholder='Nhận xét'
        avatar={imgs.service.thongTacBonCau}
        name='Nguyễn Tuấn Anh'
        phone='0974796648'
        star={3}
        onClose={() => global.Alert.close()}
      />
    )
  }

  onOpenMap = () => {
    this.setState(prewState => {
      const newState = !prewState.showMap

      if (newState) {
        this.mapView.current.show()
      } else {
        this.mapView.current.hide()
      }

      return { showMap: newState }
    })
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

export default Home;
