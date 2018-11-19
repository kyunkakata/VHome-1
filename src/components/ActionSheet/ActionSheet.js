import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import * as common from '../../configs/common';

const SCREEN = Dimensions.get('window');
const width = SCREEN.width;
const HeightActionSheet = 52;

const styles = StyleSheet.create({
  modal: {
    width: Math.min(400, width - 40),
    borderRadius: 12,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  viewTop: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    paddingBottom: 12
  },
  txtTitle: {
    color: common.ACTION_SHEET_COLOR_TEXT_ACTIVE,
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: '500',
    marginTop: 12,
  },
  txtMessage: {
    color: common.ACTION_SHEET_COLOR_TEXT,
    marginBottom: 10,
    marginTop: 4,
    fontSize: 13
  },
  containerMiddle: {

  },
  viewOption: {
    height: HeightActionSheet,
    // marginTop: StyleSheet.hairlineWidth,
  },
  btnOptions: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: common.ACTION_SHEET_BACKGROUND_COLOR
  },
  txtOptions: {
    color: common.ACTION_SHEET_COLOR_TEXT,
    fontSize: common.FONT_SIZE_TITLE,
  },
  viewSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: common.ACTION_SHEET_COLOR_SEPARATOR
  },
  btnBottom: {
    height: HeightActionSheet,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: common.ACTION_SHEET_BACKGROUND_COLOR,
    marginTop: 12,
    marginBottom: 24
  },
  txtBottom: {
    color: common.ACTION_SHEET_COLOR_TEXT_ACTIVE,
    fontSize: common.FONT_SIZE_TITLE,
    fontWeight: 'bold'
  },
  viewContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'flex-start'
  },
  iconLeft: {
    marginHorizontal: 16
  },
  iconCheck: {
    position: 'absolute',
    right: 12,
    alignSelf: 'center'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

class ActionSheet extends Component<Props> {
  constructor(props) {
    super(props)
    this.heightModal = null,
      this.state = {
        showModal: false
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        showModal: nextProps.isOpen
      })
    }
  }

  componentWillUnmount() {
    if (this.timoutPressButton) {
      clearTimeout(this.timoutPressButton)
    }
  }

  handlePressBottomButton() {
    this.hide()
  }

  _dismissModal() {
    this.hide()
  }

  show = () => {
    this.setState({
      showModal: true
    })
  }

  hide = () => {
    this.setState({
      showModal: false
    }, () => {
      this.props.onHide && this.props.onHide()
    })
  }

  renderItem = ({ item, index }) => {
    const { renderOption, options, renderCheckSelect, checkSelect, colorCheckSelect } = this.props;

    return (
      <View style={styles.viewOption}>
        <TouchableOpacity
          style={renderOption ? { flex: 1 } : styles.btnOptions}
          activeOpacity={0.8}
          onPress={() => {
            this._dismissModal();

            if (this.timoutPressButton) {
              clearTimeout(this.timoutPressButton)
            }

            this.timoutPressButton = setTimeout(() => {
              requestAnimationFrame(() => {
                item.onPress()
              })
            }, 350)
          }}
        >
          {
            renderOption ? renderOption(item) : item.leftIconName ? (
              <View style={styles.viewContentRow}>
                <Icon style={styles.iconLeft} name={item.leftIconName} size={24} color={common.ICON_COLOR_ACTIVE} />
                <Text numberOfLines={1} style={[styles.txtOptions, { ...item.style }]}>
                  {item.title}
                </Text>
              </View>
            ) : (
                <Text numberOfLines={1} style={[styles.txtOptions, item.style]}>
                  {item.title}
                </Text>
              )
          }

          {
            renderCheckSelect && (checkSelect === index) && (
              <Icon style={styles.iconCheck} name='done' size={20} color={colorCheckSelect} />
            )
          }
        </TouchableOpacity>
        {
          options.length > 1 && (
            <View style={styles.viewSeparator} />
          )
        }
      </View>
    )
  }

  render() {
    let {
      title,
      message,
      options,
      titleStyle,
      messageStyle,
      bottomTitle,
      bottomStyle,
      renderTitle,
      renderBottomButton,
      renderOption,
      isOpen,
      refActionSheet,
      renderCheckSelect,
      checkSelect,
      colorCheckSelect,
      widthActionSheet,
      defaultWidth,
      ...otherProps
    } = this.props

    const renderTitleTop = (
      <View style={styles.containerTitle}>
        <Text numberOfLines={1} style={[styles.txtTitle, titleStyle ? titleStyle : undefined]}>
          {title}
        </Text>
        {
          message ? (
            <Text numberOfLines={1} style={[styles.txtMessage, messageStyle ? messageStyle : undefined]}>
              {message}
            </Text>
          ) : null
        }
      </View>
    )

    const renderMiddle = (
      <ScrollView style={{ maxHeight: Math.min(500, SCREEN.height - 100), backgroundColor: common.ACTION_SHEET_BACKGROUND_COLOR }}>
        <FlatList
          data={options}
          keyExtractor={(item, index) => String(index)}
          renderItem={this.renderItem}
        />
      </ScrollView>
    )

    const renderBottomTitle = (
      <TouchableOpacity
        style={styles.btnBottom}
        activeOpacity={0.8}
        onPress={this.handlePressBottomButton.bind(this)}
      >
        <Text numberOfLines={1} style={[styles.txtBottom, bottomStyle ? bottomStyle : undefined]}>
          {bottomTitle}
        </Text>
      </TouchableOpacity>
    )

    return (
      <Modal
        style={[styles.modal, { height: this.heightModal }, defaultWidth ? { width: widthActionSheet } : undefined]}
        isVisible={this.state.showModal}
        hideModalContentWhileAnimating
        useNativeDriver
        onBackdropPress={this.hide}
        animationOutTiming={200}
        {...otherProps}
      >
        <View
          onLayout={(evt) => {
            this.heightModal = evt.nativeEvent.layout.height
          }}
        >
          <View style={styles.viewTop}>
            {
              renderTitle ? renderTitle : title ? renderTitleTop : null
            }

            {
              this.props.renderMiddle ? this.props.renderMiddle() : options ? renderMiddle : null
            }
          </View>
          {
            renderBottomButton ? renderBottomButton : bottomTitle ? renderBottomTitle : null
          }
        </View>
      </Modal>
    )
  }
}

ActionSheet.defaultProps = {
  options: [
    { title: 'title1' },
    { title: 'title2' },
    { title: 'title3' },
  ],
  renderOption: undefined,
  renderCheckSelect: false,
  checkSelect: 0,
  colorCheckSelect: common.ACTION_SHEET_COLOR_CHECK_ICON,
  defaultWidth: false,
  widthActionSheet: Math.min(400, width - 40)
}

ActionSheet.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: Text.propTypes.style,
  })),
  titleStyle: Text.propTypes.style,
  messageStyle: Text.propTypes.style,
  bottomTitle: PropTypes.string,
  bottomStyle: Text.propTypes.style,
  renderTitle: PropTypes.node,
  renderBottomButton: PropTypes.node,
  renderOption: PropTypes.func,
  isOpen: PropTypes.bool,
  renderCheckSelect: PropTypes.bool,
  checkSelect: PropTypes.number,
  colorCheckSelect: PropTypes.string,
  onHide: PropTypes.func,
  renderMiddle: PropTypes.func,
  defaultWidth: PropTypes.bool,
  widthActionSheet: PropTypes.number
}

type OptionStatic = Array<{
  title?: string;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}>

interface Props {
  title?: string;
  message?: string;
  options?: OptionStatic;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  bottomTitle?: string;
  bottomStyle?: StyleProp<TextStyle>;
  renderTitle?: any;
  renderBottomButton?: any;
  renderOption?: () => void;
  isOpen?: boolean;
  renderCheckSelect?: boolean;
  checkSelect?: number;
  colorCheckSelect?: string;
  onHide?: () => void;
  renderMiddle?: () => void;
  widthActionSheet?: number,
  defaultWidth?: boolean;
}

export default ActionSheet