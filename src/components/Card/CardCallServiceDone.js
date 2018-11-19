/**
* Created by nghinv on Fri Nov 02 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import _ from 'lodash';
import { ButtonIcon } from '../Button';
import { Avatar } from '../Avatar';
import * as common from '../../configs/common';
import * as imgs from '../../configs/imgs';

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: common.ROW_BORDER_COLOR,
    shadowOffset: {
      width: 0.6,
      height: 0.6
    },
    shadowRadius: 1,
    shadowOpacity: 0.6,
    alignSelf: 'center'
  },
  viewHeader: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  viewBody: {
    flex: 1,
    flexDirection: 'row'
  },
  viewLeftBody: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: common.ACTION_SHEET_COLOR_SEPARATOR
  },
  viewRightBody: {
    flex: 1,
    padding: 8,
    marginTop: 20
  },
  viewFooter: {
    height: 44,
    backgroundColor: common.BACKGROUND_COLOR_BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  txtFooter: {
    color: common.TEXT_COLOR_WHITE,
    fontSize: 14,
    fontWeight: common.FONT_WEIGHT_HEADER
  },
  txtName: {
    color: common.TEXT_COLOR_BLACK,
    fontSize: 15,
    fontWeight: common.FONT_WEIGHT_HEADER,
    marginBottom: 4,
    marginTop: 12
  },
  txtPhone: {
    marginBottom: 8
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  imageStar: {
    width: 24,
    height: 24,
    marginRight: 6
  },
  txtVote: {
    marginBottom: 8,
    color: common.TEXT_COLOR_ACTIVE,
    // fontWeight: 'bold',
  },
  textInput: {
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    margin: 0,
    padding: 0,
    paddingHorizontal: 4
  }
});

class CardCallServiceDone extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      star: 0,
      comment: ''
    }
  }

  render() {
    const {
      avatar,
      name,
      phone,
      title,
      backgroundColor,
      borderRadius,
      width,
      height,
      onClose,
      onSendVote,
      titleVote,
      commentTitle,
      commentPlaceholder,
      titleButton
    } = this.props;
    const { star, comment } = this.state;

    return (
      <View
        style={[
          styles.container,
          {
            width, height,
            backgroundColor,
            borderRadius
          }
        ]}
      >
        <View style={styles.viewBody}>
          <View style={styles.viewLeftBody}>
            <Avatar
              imageSource={avatar}
              width={88}
            />
            <Text style={styles.txtName}>
              {name}
            </Text>
            <Text style={styles.txtPhone}>
              {phone}
            </Text>
          </View>
          <View style={styles.viewRightBody}>
            <Text style={styles.txtPhone}>
              {title}
            </Text>
            <Text style={styles.txtVote}>
              {titleVote}
            </Text>
            <View style={styles.viewStar}>
              {
                _.range(5).map(s => {
                  return (
                    <MKButton onPress={() => this.onChangeVote(s)} key={`key_${s}`}>
                      <Image source={star > s ? imgs.icon.vote : imgs.icon.voteBorder} style={styles.imageStar} resizeMode='contain' />
                    </MKButton>
                  )
                })
              }
            </View>
            <Text style={styles.txtVote}>
              {commentTitle}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={commentPlaceholder}
              underlineColorAndroid='transparent'
              selectionColor={common.TEXT_COLOR_BLACK}
              returnKeyType='done'
              autoCorrect={false}
              value={comment}
              onChangeText={this.onChangText}
            />
          </View>
        </View>
        <TouchableOpacity onPress={this.onVote} style={[styles.viewFooter, { borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }]}>
          <Text style={styles.txtFooter}>
            {titleButton}
          </Text>
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <ButtonIcon onPress={onClose} iconName='clear' iconColor={common.ICON_COLOR_ACTIVE} size={20} />
        </View>
      </View>
    );
  }

  onChangeVote = (star) => {
    this.setState({ star: star + 1 })
  }

  onChangText = (comment) => {
    this.setState({ comment })
  }

  onVote = () => {
    const { star, comment } = this.state;
    this.props.onSendVote && this.props.onSendVote({ star, comment })
  }
}

CardCallServiceDone.defaultProps = {
  backgroundColor: 'white',
  borderRadius: 8,
  width: Math.min(540, Dimensions.get('window').width - 32),
  height: 230
}

interface Props {
  avatar?: string | number;
  name?: string;
  phone?: string;
  title?: string;
  titleVote?: string;
  commentTitle?: string;
  commentPlaceholder?: string;
  titleButton?: string;
  backgroundColor?: string;
  borderRadius?: number;
  width?: number | string;
  height?: number;
  onClose?: () => void;
  onSendVote: () => void;
}

export default CardCallServiceDone;

