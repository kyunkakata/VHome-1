/**
* Created by nghinv on Thu Aug 09 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform } from 'react-native';
import Picker from 'react-native-picker'

const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class TimePicker extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.picker = [[], [], [], [], [], []]

    if (props.fulltime) {
      for (let i = 0; i < 60; i++) {
        if (i < 24) {
          this.picker[0].push(i)
        }
        this.picker[2].push(i)
        this.picker[4].push(i)
      }

      this.picker[1].push(props.hourTitle)
      this.picker[3].push(props.minuteTitle)
      this.picker[5].push(props.secondTitle)
    } else {
      this.picker[0].push(' ')
      for (let i = 0; i < 60; i++) {
        if (i < 24) {
          this.picker[1].push(i)
        }
        this.picker[3].push(i)
      }

      this.picker[2].push(props.hourTitle)
      this.picker[4].push(props.minuteTitle)
      this.picker[5].push(' ')
    }
  }

  show = ({ currentHour, currentMinute, currentSecond, onConfirm }) => {
    const {
      hourTitle,
      minuteTitle,
      secondTitle,
      pickerConfirmBtnText,
      pickerCancelBtnText,
      pickerTitleText,
      pickerBg,
      pickerFontColor,
      pickerToolBarBg,
      pickerFontSize,
      pickerTitleColor,
      fulltime
    } = this.props;
    let select = [
      ' ',
      currentHour,
      hourTitle,
      currentMinute,
      minuteTitle,
      ' '
    ]
    if (fulltime) {
      select = [
        currentHour,
        hourTitle,
        currentMinute,
        minuteTitle,
        currentSecond,
        secondTitle
      ]
    }

    Picker.init({
      pickerData: this.picker,
      pickerTextEllipsisLen: 8,
      selectedValue: select,
      pickerConfirmBtnText: pickerConfirmBtnText,
      pickerConfirmBtnColor: [0, 0, 0, 1],
      pickerCancelBtnText: pickerCancelBtnText,
      pickerCancelBtnColor: [0, 0, 0, 1],
      pickerTitleText: pickerTitleText,
      pickerBg: pickerBg,
      pickerFontColor: pickerFontColor,
      pickerToolBarBg: pickerToolBarBg,
      pickerFontSize: pickerFontSize,
      pickerTitleColor: pickerTitleColor,
      isLoop: isIOS,
      wheelFlex: isIOS ? [1, 0.5, 1] : undefined,
      onPickerConfirm: onConfirm
    })

    Picker.show()
  }

  hide = () => {
    Picker.hide()
  }

  render() {
    return null
  }
}

TimePicker.defaultProps = {
  hourTitle: 'hours',
  minuteTitle: 'minutes',
  secondTitle: 'Second',
  pickerConfirmBtnText: 'Confirm',
  pickerCancelBtnText: 'Cancel',
  pickerTitleText: 'Select time',
  pickerBg: [255, 255, 255, 1],
  pickerFontColor: [0, 0, 0, 0.9],
  pickerToolBarBg: [255, 255, 255, 1],
  pickerFontSize: isIOS ? 24 : 16,
  pickerTitleColor: [0, 0, 0, 0.9],
  fulltime: false
}

TimePicker.propTypes = {
  hourTitle: PropTypes.string,
  minuteTitle: PropTypes.string,
  secondTitle: PropTypes.string,
  pickerConfirmBtnText: PropTypes.string,
  pickerCancelBtnText: PropTypes.string,
  pickerTitleText: PropTypes.string
}

interface Props {
  hourTitle?: string;
  minuteTitle?: string;
  secondTitle?: string;
  pickerConfirmBtnText?: string;
  pickerCancelBtnText?: string;
  pickerTitleText?: string;
  fulltime?: boolean;
}

export default TimePicker;
