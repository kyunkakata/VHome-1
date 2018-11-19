/**
* Created by nghinv on Wed Sep 26 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, TextInput, Dimensions, Platform, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: isAndroid ? 8 : 0
  },
  viewLeft: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewRightButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: common.FONT_SIZE_TITLE,
    color: common.TEXT_COLOR_BLACK,
    paddingHorizontal: 8,
    margin: 0,
    paddingVertical: 0
  }
});

class Search extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: props.value || '',
      clearIcon: props.value.length > 0 ? true : false
    }
  }

  onChangeText = (text) => {
    this.props.onChangeText && this.props.onChangeText(text.trim())
    if (text == '') {
      this.setState({
        text,
        clearIcon: false
      })
    } else {
      this.setState({
        text,
        clearIcon: true
      })
    }
  }

  onClearText = () => {
    this.props.onChangeText && this.props.onChangeText('')
    this.setState({
      text: '',
      clearIcon: false
    })
  }

  render() {
    const {
      colorIcon,
      height,
      backgroundColor,
      borderRadius,
      width
    } = this.props;
    const { text, clearIcon } = this.state;

    return (
      <View style={[styles.container, isAndroid ? { marginTop: 12 } : { marginVertical: 4 }, { height, width, backgroundColor, borderRadius }]}>
        <View style={[styles.viewLeft, { height }]}>
          <Icon name='search' size={24} color={colorIcon} />
        </View>
        <TextInput
          {...this.props}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          autoCorrect={false}
          numberOfLines={1}
          multiline={false}
          style={[styles.textInput]}
          value={text}
          onChangeText={this.onChangeText}
          selectionColor={common.TEXT_COLOR_BLACK}
          placeholderTextColor={common.TEXT_COLOR_INACTIVE}
        />
        {
          clearIcon && (
            <TouchableOpacity onPress={this.onClearText} style={[styles.viewRightButton, { height }]}>
              <Icon name='clear' size={24} color={colorIcon} />
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}

Search.defaultProps = {
  colorIcon: common.ICON_COLOR_ACTIVE,
  value: '',
  height: 36,
  width: Math.min(320, SCREEN.width - 100),
  backgroundColor: common.BACKGROUND_COLOR,
  borderRadius: 18
}

Search.propTypes = {
  colorIcon: PropTypes.string,
  value: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChangeText: PropTypes.func,
  borderRadius: PropTypes.number,
  backgroundColor: PropTypes.string
}

interface Props extends TextInputProps {
  colorIcon?: string;
  value?: string;
  height?: number;
  width?: number | string;
  onChangeText?: (text: string) => void;
  borderRadius?: number;
  backgroundColor?: string;
}

export default Search;
