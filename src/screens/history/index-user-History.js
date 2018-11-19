/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import { TabView, TabBar, SceneMap, PagerPan, PagerAndroid } from 'react-native-tab-view';
import { Navbar } from '../../components';
import HistoryComponent from './History';
import RequireService from './RequireService';
import * as common from '../../configs/common';
import langs from '../../languages/common';

class History extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: langs.historyTab },
        { key: 'second', title: langs.requireServiceTab },
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          title={langs.history}
          leftIcon
          back
        />
        <View style={styles.viewContent}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              first: HistoryComponent,
              second: RequireService,
            })}
            renderTabBar={props => {
              let index = 0;
              return (
                <TabBar
                  {...props}
                  useNativeDriver
                  renderIndicator={() => null}
                  style={styles.tabbar}
                  tabStyle={styles.tabStyle}
                  labelStyle={{ margin: 0 }}
                  renderLabel={({ route }) => {
                    const focused = index === props.navigationState.index;
                    index += 1;

                    return (
                      <View style={[styles.viewLabel, { backgroundColor: focused ? common.BACKGROUND_COLOR_BUTTON : 'white' }]}>
                        <Text
                          style={[
                            styles.labelStyle,
                            { color: focused ? common.TEXT_COLOR_WHITE : common.TEXT_COLOR_ACTIVE }
                          ]}
                        >
                          {route.title}
                        </Text>
                      </View>
                    );
                  }}
                />
              )
            }
            }
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width, height: 0 }}
            renderPager={(props) => {
              return (Platform.OS === 'ios') ? <PagerPan {...props} /> : <PagerAndroid {...props} />
            }}
          />
        </View>
      </View>
    );
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
  header: {
    height: 44
  },
  tabbar: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    overflow: 'hidden'
  },
  tabStyle: {
    justifyContent: undefined,
    alignItems: undefined,
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent'
  },
  viewLabel: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default History;
