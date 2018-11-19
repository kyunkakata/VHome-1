/**
* Created by nghinv on Tue Oct 23 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Animated, Image, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Calendar } from 'react-native-calendars';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Button, ButtonIcon, Input, TimePicker, Row } from '../../../components';
import { global } from '../../../configs/global';
import * as common from '../../../configs/common';
import * as imgs from '../../../configs/imgs';
import langs from '../../../languages/common';
import { getDateString, getTimeString } from '../../../common/datetime';

const SCREEN = Dimensions.get('window');

class CardCallService extends PureComponent {
  constructor(props) {
    super(props);
    let currentTime = `${getTimeString().hour}:${getTimeString().minutes}`;

    this.state = {
      currentStep: 1,
      user: {
        phone: props.userInfo.phone_number || '',
        name: props.userInfo.full_name || '',
        address: props.userInfo.address || ''
      },
      timer: {
        time: currentTime,
        date: {
          day: getDateString().day,
          month: getDateString().month,
          year: getDateString().year
        }
      },
      problem: {
        type: props.allService[0],
        description: ''
      }
    }

    this.animStep = new Animated.Value(0)
    this.refTimePicker = React.createRef()
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  getToDay = () => {
    return `${getDateString().year}-${getDateString().month}-${getDateString().day}`
  }

  renderCalendar = () => {
    const { timer } = this.state;
    return (
      <Calendar
        current={timer.date.year + '-' + timer.date.month + '-' + timer.date.day}
        minDate={this.getToDay()}
        maxDate={'2030-01-01'}
        onDayPress={this.handleSelectDay}
        monthFormat={'MM/yyyy'}
        hideArrows={false}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={true}
      />
    )
  }

  renderStep1 = () => {
    const { widthAlert } = this.props;
    const { user } = this.state;

    return (
      <Animated.View
        style={[
          styles.containerStep1,
          {
            width: widthAlert,
            left: 0,
            transform: [
              {
                translateX: this.animStep.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -widthAlert]
                })
              }
            ]
          }
        ]}
      >
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{langs.customerInfo}</Text>
        </View>
        <Input
          placeholder={langs.fullname}
          rounded
          borderWidth={0.7}
          style={styles.inputStyle}
          leftImage
          leftImageSource={imgs.icon.user}
          textInputRef="fullname"
          ref="fullname"
          onSubmitEditing={() => this.focusNextField("phone")}
          maxLength={50}
          value={user.name}
          onChangeText={this.onChangeUsername}
        />
        <Input
          placeholder={langs.phonenumber}
          rounded
          keyboardType='numeric'
          borderWidth={0.7}
          style={[styles.inputStyle]}
          leftImage
          leftImageSource={imgs.icon.phone}
          textInputRef="phone"
          ref="phone"
          onSubmitEditing={() => this.focusNextField("location")}
          maxLength={15}
          value={user.phone}
          onChangeText={this.onChangePhonenumber}
        />
        <Input
          placeholder={langs.address}
          rounded
          borderWidth={0.7}
          style={styles.inputStyle}
          leftImage
          leftImageSource={imgs.icon.locationBorder}
          textInputRef="location"
          ref="location"
          maxLength={50}
          returnKeyType='done'
          value={user.address}
          onChangeText={this.onChangeAddress}
        />
      </Animated.View>
    )
  }

  renderStep2 = () => {
    const { widthAlert } = this.props;
    const { timer } = this.state;

    return (
      <Animated.View
        style={[
          styles.asolute,
          styles.containerStep1,
          {
            width: widthAlert,
            left: widthAlert,
            transform: [
              {
                translateX: this.animStep.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -widthAlert]
                })
              }
            ]
          }
        ]}
      >
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{langs.setDateTime}</Text>
        </View>
        <View style={styles.viewInputTime}>
          <Image source={imgs.icon.calendar} style={styles.iconDateTime} resizeMode='contain' />
          <TouchableOpacity onPress={this.onOpenTimePicker} style={styles.viewButton}>
            <Text style={styles.title}>
              {timer.time}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onOpenModalSelectDate} style={[{ paddingLeft: 0 }]}>
            <Text style={styles.title}>
              {`${timer.date.day}/${timer.date.month}/${timer.date.year}`}
            </Text>
          </TouchableOpacity>
        </View>
        <TimePicker
          hourTitle={langs.hour}
          minuteTitle={langs.minute}
          pickerConfirmBtnText={langs.confirm}
          pickerCancelBtnText={langs.cancel}
          pickerTitleText={langs.selectTimer}
          ref={this.refTimePicker}
        />
      </Animated.View>
    )
  }

  renderStep3 = () => {
    const { widthAlert } = this.props;
    const { problem } = this.state;

    return (
      <Animated.View
        style={[
          styles.asolute,
          styles.containerStep1,
          {
            width: widthAlert,
            left: widthAlert,
            transform: [
              {
                translateX: this.animStep.interpolate({
                  inputRange: [1, 2],
                  outputRange: [0, -widthAlert]
                })
              }
            ]
          }
        ]}
      >
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{langs.yourProblem}</Text>
        </View>
        <TouchableOpacity onPress={this.onChangeTypeProblem} style={styles.viewInputTime}>
          <View style={{ flex: 1 }}>
            <Text style={styles.txtContent}>
              {problem.type.name || ''}
            </Text>
          </View>
          <Image source={imgs.icon.listDown} style={styles.iconUpDown} resizeMode='contain' />
        </TouchableOpacity>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{langs.detailContent}</Text>
        </View>
        <AutoGrowingTextInput
          style={styles.textInput}
          placeholder={langs.contentInput}
          autoCorrect={false}
          selectionColor='black'
          spellCheck={false}
          underlineColorAndroid='transparent'
          value={problem.description}
          onChangeText={this.onChangeText}
        />
      </Animated.View>
    )
  }

  render() {
    const { currentStep } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <Button
            title={langs.stepOne}
            style={[styles.btnStep, currentStep == 1 ? styles.separator : undefined]}
            color={currentStep == 1 ? common.TEXT_COLOR_ACTIVE : undefined}
            backgroundColor={currentStep == 1 ? common.BACKGROUND_COLOR : undefined}
            onPress={currentStep > 1 ? () => this.onChangeStep(1) : undefined}
          />
          <Button
            title={langs.stepTwo}
            style={[styles.btnStep, currentStep == 2 ? styles.separator : undefined]}
            color={currentStep == 2 ? common.TEXT_COLOR_ACTIVE : undefined}
            backgroundColor={currentStep == 2 ? common.BACKGROUND_COLOR : undefined}
            onPress={currentStep > 2 ? () => this.onChangeStep(2) : undefined}
          />
          <Button
            title={langs.stepThree}
            style={[styles.btnStep, currentStep == 3 ? styles.separator : undefined]}
            color={currentStep == 3 ? common.TEXT_COLOR_ACTIVE : undefined}
            backgroundColor={currentStep == 3 ? common.BACKGROUND_COLOR : undefined}
          // onPress={() => this.onChangeStep(3)}
          />
          <ButtonIcon
            iconName='clear'
            iconColor={common.ICON_COLOR_WHITE}
            backgroundColor={common.BACKGROUND_COLOR_BUTTON}
            size={20}
            style={styles.btnCloseAlert}
            onPress={this.onDismissAlert}
          />
        </View>
        <View style={styles.viewContent}>
          {this.renderStep1()}
          {this.renderStep2()}
          {this.renderStep3()}
        </View>
        <View style={styles.viewFooter}>
          <Button
            title={langs.next}
            style={styles.btnContinute}
            width='100%'
            onPress={this.onNextStep}
          />
        </View>
      </View>
    );
  }

  onDismissAlert = () => {
    this.refTimePicker.current.hide()
    global.Alert2.close()
  }

  onChangeStep = (step) => {
    this.refTimePicker.current.hide()
    this.setState({ currentStep: step })
    Animated.spring(this.animStep, {
      toValue: step - 1,
      tension: 30,
      friction: 7,
      useNativeDriver: true
    }).start()
  }

  onNextStep = () => {
    this.refTimePicker.current.hide()
    const check = this.validateCallService();
    if (check) return;

    if (this.state.currentStep < 3) {
      this.setState(prewState => {
        let newStep = prewState.currentStep + 1

        Animated.spring(this.animStep, {
          toValue: newStep - 1,
          tension: 30,
          friction: 7,
          useNativeDriver: true
        }).start()

        return {
          currentStep: newStep
        }
      })
    } else if (this.state.currentStep == 3) {
      const { user, timer, problem } = this.state;
      const time = `${timer.time}:00`;
      const date = `${timer.date.year}-${timer.date.month}-${timer.date.day}`
      const start_time = `${date} ${time}`

      const dataRequestService = {
        name: user.name,
        description: problem.description,
        phone: user.phone,
        address: user.address,
        service_id: problem.type.id,
        start_time
      }

      this.props.createServiceRequest && this.props.createServiceRequest(dataRequestService)
    }
  }

  validateCallService = () => {
    const { currentStep, user, problem } = this.state;

    if (currentStep == 1) {
      if (user.name.trim().length == 0) {
        global.Alert.alert({
          title: langs.notifycation,
          message: langs.errorUsernameIsNull,
          leftButton: { text: langs.ok }
        })

        return true
      }

      if (user.phone.trim().length == 0) {
        global.Alert.alert({
          title: langs.notifycation,
          message: langs.errorPhonenumberIsNull,
          leftButton: { text: langs.ok }
        })

        return true
      }

      if (user.address.trim().length == 0) {
        global.Alert.alert({
          title: langs.notifycation,
          message: langs.errorSelectAddress,
          leftButton: { text: langs.ok }
        })

        return true
      }
    }

    if (currentStep == 3) {
      if (problem.description.trim().length == 0) {
        global.Alert.alert({
          title: langs.notifycation,
          message: langs.errorDescriptionIsNull,
          leftButton: { text: langs.ok }
        })

        return true
      }
    }
  }

  onChangeUsername = (name) => {
    this.setState({
      user: {
        ...this.state.user,
        name
      }
    })
  }

  onChangePhonenumber = (phone) => {
    this.setState({
      user: {
        ...this.state.user,
        phone
      }
    })
  }

  onChangeAddress = (address) => {
    this.setState({
      user: {
        ...this.state.user,
        address
      }
    })
  }

  onOpenTimePicker = () => {
    const time = this.state.timer.time.split(':')
    this.refTimePicker.current.show({
      currentHour: parseInt(time[0]),
      currentMinute: parseInt(time[1]),
      onConfirm: (data) => {
        this.setState({
          timer: {
            ...this.state.timer,
            time: `${data[1] < 10 ? '0' + data[1] : data[1]}:${data[3] < 10 ? '0' + data[3] : data[3]}`,
          }
        })
      }
    })
  }

  onOpenModalSelectDate = () => {
    this.refTimePicker.current.hide()
    global.CustomModal.show({
      renderContent: this.renderCalendar
    })
  }

  handleSelectDay = (date) => {
    global.CustomModal.hide()
    const day = date.day < 10 ? `0${date.day}` : `${date.day}`
    const month = date.month < 10 ? `0${date.month}` : `${date.month}`
    const year = `${date.year}`

    this.setState({
      timer: {
        ...this.state.timer,
        date: {
          day,
          month,
          year
        }
      }
    })
  }

  onChangeText = (description) => {
    this.setState({
      problem: {
        ...this.state.problem,
        description
      }
    })
  }

  onChangeTypeProblem = () => {
    const { allService } = this.props;
    const { type } = this.state.problem
    let SheetView = RNBottomActionSheet.SheetView;

    let options = [];
    let currentSelect = 0;

    allService.forEach((service, index) => {
      options.push({
        title: service.name,
        value: service
      })

      if (service.id == type.id) {
        currentSelect = index
      }
    })

    SheetView.Show({
      title: langs.chooseService,
      items: options,
      theme: "light",
      selection: currentSelect,
      onSelection: (index, value) => {
        // value is optional
        this.onChangeType(value)
      }
    });
  }

  onChangeType = (type) => {
    this.setState({
      problem: {
        ...this.state.problem,
        type
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  viewHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewContent: {
    width: '100%',
    height: 280
  },
  containerStep1: {
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: common.BACKGROUND_COLOR
  },
  btnStep: {
    flex: 1
  },
  separator: {
    borderBottomColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    borderBottomWidth: 0.7
  },
  asolute: {
    ...StyleSheet.absoluteFillObject
  },
  btnContinute: {

  },
  btnCloseAlert: {
    width: 28,
    borderRadius: 0,
    height: 44
  },
  viewTitle: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_HEADER
  },
  inputStyle: {
    marginBottom: 16
  },
  viewInputTime: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    width: Math.min(270, SCREEN.width - 24),
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  txtContent: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_TITLE
  },
  iconDateTime: {
    width: 22,
    height: 22
  },
  viewButton: {
    paddingHorizontal: 16
  },
  title: {
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: common.FONT_WEIGHT_TITLE
  },
  modal: {
    height: 340,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  iconUpDown: {
    width: 18,
    height: 18
  },
  textInput: {
    maxHeight: 120,
    minHeight: 120,
    width: Math.min(270, SCREEN.width - 24),
    borderWidth: 1,
    borderColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: common.FONT_SIZE_TITLE,
    textAlignVertical: "top"
  }
});

export default CardCallService;
