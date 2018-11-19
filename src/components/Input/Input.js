import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  ViewPropTypes
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { MKButton } from 'react-native-material-kit';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  view: {
    backgroundColor: common.INPUT_BACKGROUND_COLOR
  },
  viewFocus: {
    backgroundColor: common.INPUT_BACKGROUND_FORCUS
  },
  viewError: {
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, .3)',
  },
  TextInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    paddingLeft: 8,
    color: common.INPUT_COLOR_TEXT,
    fontSize: common.FONT_SIZE_CONTENT,
    fontFamily: 'Quicksand'
  },
  rightButton: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4
  },
  icon: {
    width: 20,
    height: 20
  }
})

class Input extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      text: this.props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({ text: nextProps.value || '' })
    }
  }

  onRightButton = () => {
    this.props.onChangeText && this.props.onChangeText('');
    this.setState({
      isFocus: true,
      text: ''
    })
  }

  onFocus() {
    this.setState({
      isFocus: true
    })
  }

  focus() {
    this.refs[this.props.textInputRef].focus();
  }

  onBlur() {
    this.setState({
      isFocus: false
    });
  }

  onChangeText(text) {
    this.props.onChangeText && this.props.onChangeText(text);
    this.setState({
      isFocus: true,
      text: text
    })
  }

  render() {
    let {
      style,
      type,
      width,
      height,
      rounded,
      borderRadius,
      placeholder,
      placeholderTextColor,
      maxLength,
      editable,
      selectionColor,
      textInputRef,
      returnKeyType,
      error,
      errorStyle,
      rightIcon,
      rightIconName,
      leftIcon,
      leftIconName,
      textInputStyle,
      borderWidth,
      leftImage,
      rightImage,
      leftImageSource,
      rightImageSource,
      ...otherProps
    } = this.props

    let { text, isFocus } = this.state;

    return (
      <View
        style={[
          styles.container,
          {
            width,
            height
          },
          style,
          rounded ? { borderRadius } : undefined,
          error ? errorStyle || styles.viewError : '',
          isFocus ? styles.viewFocus : styles.view,
          borderWidth ? { borderWidth, borderColor: common.INPUT_BORDER_COLOR } : undefined
        ]}
      >
        {
          leftImage && (
            <View style={styles.leftIcon}>
              <Image style={styles.icon} source={leftImageSource} resizeMode='contain' />
            </View>
          )
        }
        {
          leftIcon && (
            <View style={styles.leftIcon}>
              <Icon name={leftIconName} size={24} color={common.INPUT_COLOR_ICON} />
            </View>
          )
        }
        <TextInput
          style={[styles.TextInput, textInputStyle ? textInputStyle : undefined, rightIcon ? { paddingRight: 8 } : undefined]}
          ref={textInputRef}
          underlineColorAndroid='transparent'
          returnKeyType={returnKeyType}
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={maxLength}
          editable={editable}
          numberOfLines={1}
          multiline={false}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          selectionColor={selectionColor}
          onChangeText={(text) => this.onChangeText(text)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          value={text}
          {...otherProps}
        />
        {
          (rightIcon && isFocus && text !== '') && (
            <MKButton
              onPress={this.onRightButton}
              style={styles.rightButton}
            >
              <Icon name={rightIconName} size={24} color={common.INPUT_COLOR_ICON} />
            </MKButton>
          )
        }
        {
          (rightImage && isFocus && text !== '') && (
            <MKButton
              onPress={this.onRightButton}
              style={styles.rightButton}
            >
              <Image style={styles.icon} source={rightImageSource} resizeMode='contain' />
            </MKButton>
          )
        }
      </View>
    )
  }
}

Input.defaultProps = {
  placeholder: '',
  placeholderTextColor: common.INPUT_COLOR_TEXT_PLACEHOLDER,
  maxLength: undefined,
  editable: true,
  selectionColor: common.INPUT_SELECTION_COLOR,
  error: false,
  returnKeyType: 'next',
  width: Math.min(270, SCREEN.width - 24),
  height: 40,
  rounded: false,
  borderRadius: 20,
  rightIcon: false,
  leftIcon: false,
  rightIconName: 'close',
  leftIconName: 'account-circle',
  leftImage: false,
  rightImage: false,
}

Input.propTypes = {
  style: ViewPropTypes.style,
  focusStyle: ViewPropTypes.style,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  maxLength: PropTypes.number,
  editable: PropTypes.bool,
  selectionColor: PropTypes.string,
  onChangeText: PropTypes.func,
  textInputRef: PropTypes.string,
  error: PropTypes.bool,
  errorStyle: ViewPropTypes.style,
  returnKeyType: PropTypes.string,
  focus: PropTypes.func,
  value: PropTypes.string,
  rightIcon: PropTypes.bool,
  rightIconName: PropTypes.string,
  leftIcon: PropTypes.bool,
  leftIconName: PropTypes.string,
  textInputStyle: PropTypes.any,
  rounded: PropTypes.bool,
  borderRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  borderWidth: PropTypes.number
}

interface Props {
  style?: object;
  focusStyle?: object;
  placeholder?: string;
  placeholderTextColor?: string;
  maxLength?: number;
  editable?: boolean;
  selectionColor?: string;
  onChangeText?: () => void;
  textInputRef?: string;
  error?: boolean;
  errorStyle?: object;
  returnKeyType: ?'next' | 'done';
  focus?: () => void;
  value?: string;
  rightIcon?: boolean;
  rightIconName?: string;
  leftIcon?: boolean;
  leftIconName?: string;
  textInputStyle?: object;
  rounded?: boolean;
  borderRadius?: number;
  width?: number | string;
  height?: number;
  borderWidth?: number;
  leftImage?: boolean;
  rightImage?: boolean;
  leftImageSource?: string | number;
  rightImageSource?: string | number;
}

export default Input