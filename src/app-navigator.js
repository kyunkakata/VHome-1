/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import { Scene, Router, Actions, Stack, Drawer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { transitionConfig, getSceneStyle } from './common/transitionConfig';
import { getAllService, getAllCategory } from './redux/actions/service';

//import scene here
import LoadInitial from './containers/loadInitial';
import Start from './containers/start';
import Login from './containers/login';
import Register from './containers/register';
import ForgotPassword from './containers/forgot-password';
import DrawerMenu from './screens/home/DrawerMenu';
import Home from './containers/home';
import RewardPoints from './containers/reward-points';
import History from './containers/history';
import Inbox from './containers/inbox';
import DetailInbox from './containers/inbox/DetailInbox';
import Profile from './containers/profile';
import UserDetailService from './containers/home/user-DetailService';
import UserViewMoreService from './containers/home/user-ViewMoreService';
import UserDetailCallService from './containers/home/user-DetailCallService';
import ProductDetailService from './containers/home/product-DetailService';
import SelectAddress from './containers/profile/SelectAddress';

class AppNavigator extends PureComponent {
  componentDidMount() {
    this.props.getAllCategory()
    this.props.getAllService()

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    switch (Actions.currentScene) {
      case 'loadInitial':
      case 'start':
        return BackHandler.exitApp()
      case 'home':
        return true
      default:
        return false
    }
  }

  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Stack key='root' gesturesEnabled={true} transitionConfig={transitionConfig} >
          <Scene
            key='loadInitial'
            component={LoadInitial}
            swipeEnabled={false}
            panHandlers={null}
            hideNavBar
          />
          <Scene
            key='start'
            component={Start}
            swipeEnabled={false}
            panHandlers={null}
            direction='fade'
            hideNavBar
          />
          <Scene
            key='login'
            component={Login}
            hideNavBar
          />
          <Scene
            key='register'
            component={Register}
            hideNavBar
          />
          <Scene
            key='forgotPassword'
            component={ForgotPassword}
            hideNavBar
          />
          <Drawer
            hideNavBar
            key="drawer"
            panHandlers={null}
            contentComponent={DrawerMenu}
            drawerWidth={300}
            transitionConfig={transitionConfig}
          >
            <Scene key='dashboard' transitionConfig={transitionConfig} hideNavBar panHandlers={null}>
              <Scene
                key='home'
                component={Home}
                hideNavBar
                direction='fade'
              />
              <Scene
                key='userViewMoreService'
                component={UserViewMoreService}
                hideNavBar
                panHandlers
              />
              <Scene
                key='userDetailService'
                component={UserDetailService}
                hideNavBar
                panHandlers
              />
              <Scene
                key='userDetailCallService'
                component={UserDetailCallService}
                hideNavBar
                panHandlers
              />
              <Scene
                key='productDetailService'
                component={ProductDetailService}
                hideNavBar
                panHandlers
              />
              <Scene
                key='rewardPoints'
                component={RewardPoints}
                hideNavBar
                panHandlers
                navigationOptions={({ navigation }) => ({
                  drawerLockMode: "locked-closed",
                })}
              />
              <Scene
                key='history'
                component={History}
                hideNavBar
                panHandlers
              />
              <Scene
                key='inbox'
                component={Inbox}
                hideNavBar
                panHandlers
              />
              <Scene
                key='detailInbox'
                component={DetailInbox}
                hideNavBar
                panHandlers
              />
              <Scene
                key='profile'
                component={Profile}
                hideNavBar
                panHandlers
              />
              <Scene
                key='selectAddress'
                component={SelectAddress}
                hideNavBar
                panHandlers
              />
            </Scene>
          </Drawer>
        </Stack>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  getAllCategory,
  getAllService
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
