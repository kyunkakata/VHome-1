/**
* Created by nghinv on Sun Oct 21 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Platform, TouchableWithoutFeedback, Image } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import localization from 'moment/locale/vi';
import _ from 'lodash';
import {
  Button, ButtonLabel, Input, Avatar, Navbar,
  Row, ButtonLabelBorder, KeyboardScroll, ActionSheet
} from '../../components';
import { global } from '../../configs/global';
import * as common from '../../configs/common';
import * as imgs from '../../configs/imgs';
import langs from '../../languages/common';
import { getDateString } from '../../common/datetime';

const SCREEN = Dimensions.get('window');

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        full_name: props.userInfo.full_name || '',
        birthday: props.userInfo.birthday || `${getDateString().year}-${getDateString().month}-${getDateString().day}`,
        gender: props.userInfo.gender || 1,
        phone_number: props.userInfo.phone_number || '',
        address: props.userInfo.address || '',
        avatar: props.userInfo.avatar,
        lat: props.userInfo.lat,
        lng: props.userInfo.lng
      },
      service: this.getInitialService(),
      optionsActionSheet: []
    }

    this.actionsheet = React.createRef()
  }

  getInitialService = () => {
    const { userInfo, services } = this.props;
    try {
      return services.find(sv => sv.id == userInfo.services[0].service_id)
    } catch (e) {
      return undefined
    }
  }

  getProviderStar = () => {
    const { providerServiceRating } = this.props;
    let star = 0;
    if (providerServiceRating.start_1 && providerServiceRating.start_1 == 1) {
      star = 1
    }
    if (providerServiceRating.start_2 && providerServiceRating.start_2 == 1) {
      star = 2
    }
    if (providerServiceRating.start_3 && providerServiceRating.start_3 == 1) {
      star = 3
    }
    if (providerServiceRating.start_4 && providerServiceRating.start_4 == 1) {
      star = 5
    }
    if (providerServiceRating.start_5 && providerServiceRating.start_5 == 1) {
      star = 5
    }

    return star
  }

  render() {
    const { isUser, loginFb } = this.props;
    const { userInfo, optionsActionSheet, service } = this.state;
    const avatar = userInfo.avatar;
    let dateBirthday = langs.unknow
    if (userInfo.birthday) {
      let arr = userInfo.birthday.split('-')
      dateBirthday = `${arr[2]}-${arr[1]}-${arr[0]}`
    }

    // Pass props to here
    const star = this.getProviderStar()

    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Navbar
            title={langs.userInfo}
            leftIcon
            back
          />
          <View style={styles.avatar}>
            <View style={{ marginBottom: 12 }}>
              <Avatar
                name={` `}
                imageSource={avatar && avatar.sourceURL ? avatar.sourceURL : avatar}
                cacheImage={avatar && !avatar.sourceURL}
                onPress={this.addAvatar}
                width={92}
              />
              <TouchableWithoutFeedback onPress={this.addAvatar}>
                <Image source={imgs.icon.camera} style={styles.viewTakePhoto} resizeMode='contain' />
              </TouchableWithoutFeedback>
            </View>
          </View>
          {
            !isUser && (
              <View style={styles.viewStar}>
                {
                  _.range(5).map(s => {
                    return (
                      <Image source={star > s ? imgs.icon.startVote : imgs.icon.startNoVote} key={`key_${s}`} style={styles.imageStar} resizeMode='contain' />
                    )
                  })
                }
              </View>
            )
          }
        </View>
        <KeyboardScroll contentContainerStyle={styles.viewContent}>
          <Input
            placeholder={langs.fullname}
            rounded
            borderWidth={0.7}
            style={styles.inputStyle}
            leftImage
            leftImageSource={imgs.icon.user}
            returnKeyType='done'
            maxLength={50}
            value={userInfo.full_name}
            onChangeText={this.onChangeUsername}
          />
          <DatePicker
            showIcon={false}
            style={styles.viewCalendar}
            date={dateBirthday ? dateBirthday : moment().locale('vi', localization).format('DD-MM-YYYY')}
            mode="date"
            placeholder={langs.selectDate}
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2050"
            confirmBtnText={langs.confirm}
            cancelBtnText={langs.cancel}
            locale={this.props.language}
            leftImageSource={imgs.icon.birthday}
            leftIconColor={common.ICON_COLOR_ACTIVE}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-start',
                marginLeft: 8,
                marginTop: 4
              },
              dateText: {
                fontSize: common.FONT_SIZE_TITLE,
                color: common.TEXT_COLOR_BLACK,
              },
              btnTextCancel: {
                position: 'absolute',
                color: common.TEXT_COLOR_BLACK,
                left: 12
              },
              btnTextConfirm: {
                position: 'absolute',
                right: 12,
                color: common.TEXT_COLOR_ACTIVE
              }
            }}
            onDateChange={this.handleSelectDay.bind(this)}
          />
          <Row
            leftImage
            leftImageSource={imgs.icon.gender}
            leftTitle={userInfo.gender == 2 ? langs.female : langs.male}
            rightIconName='arrow-drop-down'
            rightIconColor={common.ICON_COLOR_BLACK}
            style={styles.rowButton}
            leftTitleStyle={{ marginLeft: -4 }}
            onPress={this.onPressGender}
          />
          <Row
            leftImage
            leftImageSource={imgs.icon.phone}
            leftTitle={userInfo.phone_number}
            style={styles.rowButton}
            leftTitleStyle={{ marginLeft: -4 }}
          />
          {/* <Input
            placeholder={langs.phonenumber}
            rounded
            keyboardType='numeric'
            borderWidth={0.7}
            style={[styles.inputStyle]}
            leftImage
            leftImageSource={imgs.icon.phone}
            textInputRef="phone"
            ref="phone"
            maxLength={15}
            value={userInfo.phone_number}
            onChangeText={this.onChangePhonenumber}
          /> */}
          <Row
            leftImage
            leftImageSource={imgs.icon.locationBorder}
            leftTitle={userInfo.address != '' ? userInfo.address : langs.selectAddress}
            rightIconName='arrow-drop-down'
            rightIconColor={common.ICON_COLOR_BLACK}
            style={styles.rowButton}
            leftTitleStyle={{ marginLeft: -4 }}
            onPress={this.onSelectAddress}
            leftRightRatio={3 / 2}
          />
          {
            !isUser && (
              <Row
                leftImage
                leftImageSource={imgs.icon.supplies}
                leftImageStyle={styles.leftImageStyle}
                leftTitle={service ? service.name : langs.chooseService}
                rightIconName='arrow-drop-down'
                rightIconColor={common.ICON_COLOR_BLACK}
                style={styles.rowButton}
                leftTitleStyle={{ marginLeft: -4 }}
                onPress={this.onOpenActionSheetChangeService}
                leftRightRatio={1.8}
              />
            )
          }
          {
            isUser ? (
              <View>
                <Button
                  title={langs.updateInfo}
                  rounded
                  width={160}
                  style={styles.buttonStyle}
                  titleStyle={styles.titleButtonStyle}
                  onPress={this.handUpdateUserInfo}
                />
                {
                  !loginFb && (
                    <ButtonLabel
                      title={langs.changePassword}
                      onPress={this.handChangePassword}
                      titleStyle={styles.titleButtonStyle}
                    />
                  )
                }
              </View>
            ) : (
                <View style={styles.viewButtonProduct}>
                  {
                    !loginFb && (
                      <ButtonLabel
                        title={langs.changePassword}
                        onPress={this.handChangePassword}
                        titleStyle={styles.titleButtonStyle}
                        style={{ paddingRight: 16 }}
                      />
                    )
                  }
                  <Button
                    title={langs.updateInfo}
                    rounded
                    width={160}
                    style={styles.buttonStyle}
                    titleStyle={styles.titleButtonStyle}
                    onPress={this.handUpdateUserInfo}
                  />
                </View>
              )
          }

          {
            loginFb && (
              <ButtonLabelBorder
                title={langs.syncFacebook}
                rounded
                width={Math.min(270, SCREEN.width - 24)}
                style={{ marginTop: 8 }}
                onPress={this.handSyncFacebook}
              />
            )
          }
        </KeyboardScroll>
        <ActionSheet
          ref={this.actionsheet}
          bottomTitle={langs.cancel}
          options={optionsActionSheet}
        />
      </View>
    );
  }

  addAvatar = () => {
    this.setState({
      optionsActionSheet: [
        { title: langs.fromLibrary, leftIconName: 'photo', onPress: this.onChooseLibrary },
        { title: langs.camera, leftIconName: 'photo-camera', onPress: this.onTakePhoto }
      ]
    }, () => {
      this.actionsheet.current.show()
    })
  }

  onChooseLibrary = () => {
    ImagePicker.openPicker({
      width: SCREEN.width,
      height: SCREEN.width,
      multiple: false,
      minFiles: 1,
      maxFiles: 1,
      mediaType: 'photo',
      compressImageQuality: 1,
      cropping: true
    }).then(images => {
      console.log(images);
      if (Platform.OS === 'android') {
        images.sourceURL = images.path
        if (!images.filename) {
          images.filename = `${(new Date()).getTime()}.JPG`
        }
        if (!images.mime) {
          images.mime = 'image/jpeg'
        }
      } else {
        images.sourceURL = images.path
        if (!images.filename) {
          images.filename = `${(new Date()).getTime()}.JPG`
        }
        if (!images.mime) {
          images.mime = 'image/jpeg'
        }
      }

      this.setState({
        userInfo: {
          ...this.state.userInfo,
          avatar: images
        }
      })
    }).catch(e => console.log(e));
  }

  onTakePhoto = () => {
    ImagePicker.openCamera({
      width: SCREEN.width,
      height: SCREEN.width,
      cropping: true
    }).then(image => {
      console.log(image);
      if (Platform.OS === 'android') {
        image.sourceURL = image.path
        if (!image.filename) {
          image.filename = `${(new Date()).getTime()}.JPG`
        }
        if (!image.mime) {
          image.mime = 'image/jpeg'
        }
      } else {
        image.sourceURL = image.path
        if (!image.filename) {
          image.filename = `${(new Date()).getTime()}.JPG`
        }
        if (!image.mime) {
          image.mime = 'image/jpeg'
        }
      }

      this.setState({
        userInfo: {
          ...this.state.userInfo,
          avatar: image
        }
      })
    }).catch(e => console.log(e));
  }

  onChangeUsername = (full_name) => {
    this.setState({ userInfo: { ...this.state.userInfo, full_name } })
  }

  onChangePhonenumber = (phone_number) => {
    this.setState({ userInfo: { ...this.state.userInfo, phone_number } })
  }

  onSelectAddress = () => {
    Actions.selectAddress({ address: this.state.userInfo.address, onDone: this.onDoneSelectAddress })
  }

  onDoneSelectAddress = (address) => {
    console.log('address----->', address)
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        address: address[0].formattedAddress,
        lat: String(address[0].position.lat),
        lng: String(address[0].position.lng)
      }
    })
  }

  handleSelectDay(date) {
    let arr = date.split('-')
    let dateBirthday = `${arr[2]}-${arr[1]}-${arr[0]}`
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        birthday: dateBirthday
      }
    })
  }

  onPressGender = () => {
    this.setState({
      optionsActionSheet: [
        { title: langs.male, onPress: this.onChooseMale },
        { title: langs.female, onPress: this.onChooseFemale }
      ]
    }, () => {
      this.actionsheet.current.show()
    })
  }

  onChooseMale = () => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        gender: 1
      }
    })
  }

  onChooseFemale = () => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        gender: 2
      }
    })
  }

  onOpenActionSheetChangeService = () => {
    this.setState({
      optionsActionSheet: this.getOptions()
    }, () => {
      this.actionsheet.current.show()
    })
  }

  getOptions = () => {
    let option = [];
    this.props.services.forEach(s => {
      let item = {
        title: s.name,
        onPress: () => this.onChangeTypeService(s)
      }

      option.push(item)
    })

    return option
  }

  onChangeTypeService = (service) => {
    this.setState({
      service
    })
  }

  handUpdateUserInfo = () => {
    const { userInfo } = this.state;

    if (userInfo.full_name.trim().length == 0) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorUsernameIsNull,
        leftButton: { text: langs.ok }
      })
      return;
    }

    // if (userInfo.phone_number.trim().length == 0) {
    //   global.Alert.alert({
    //     title: langs.notifycation,
    //     message: langs.errorPhonenumberIsNull,
    //     leftButton: { text: langs.ok }
    //   })
    //   return;
    // }

    // if (!isPhonenumber(userInfo.phone_number.trim())) {
    //   global.Alert.alert({
    //     title: langs.notifycation,
    //     message: langs.errorPhonenumberIncorrect,
    //     leftButton: { text: langs.ok }
    //   })
    //   return;
    // }

    if (userInfo.address.trim().length == 0) {
      global.Alert.alert({
        title: langs.notifycation,
        message: langs.errorSelectAddress,
        leftButton: { text: langs.ok }
      })
      return;
    }

    console.log('userInfo--->', userInfo)
    const dataUpdate = {
      id: this.props.userInfo.id,
      full_name: userInfo.full_name,
      avatar: userInfo.avatar,
      gender: userInfo.gender,
      birthday: userInfo.birthday,
      address: userInfo.address,
      lat: userInfo.lat,
      lng: userInfo.lng
    }

    this.props.updateUserInfo && this.props.updateUserInfo(dataUpdate)
  }

  handChangePassword = () => {

  }

  handSyncFacebook = () => {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.BACKGROUND_COLOR
  },
  navbar: {
    height: 188,
    backgroundColor: common.BACKGROUND_COLOR_NAV
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewTakePhoto: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    borderRadius: 17
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  imageStar: {
    width: 20,
    height: 20,
    marginRight: 4
  },
  viewContent: {
    alignItems: 'center',
    paddingVertical: 20
  },
  inputStyle: {
    marginBottom: 16
  },
  rowButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: common.INPUT_BORDER_COLOR,
    height: 44,
    width: Math.min(270, SCREEN.width - 24),
    borderRadius: 22,
    marginBottom: 16
  },
  buttonStyle: {
    marginBottom: 8
  },
  titleButtonStyle: {
    fontSize: common.FONT_SIZE_CONTENT
  },
  viewCalendar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: common.INPUT_BORDER_COLOR,
    height: 44,
    width: Math.min(270, SCREEN.width - 24),
    borderRadius: 22,
    marginBottom: 16
  },
  viewButtonProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16
  }
});

export default Profile;
