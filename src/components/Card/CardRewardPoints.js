/**
* Created by nghinv on Sun Oct 21 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ViewProps } from 'react-native';
import * as common from '../../configs/common';

const SPACE_MARGIN = 16;
const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: common.ROW_BORDER_COLOR,
    shadowOffset: {
      width: 0.6,
      height: 0.6
    },
    shadowRadius: 1,
    shadowOpacity: 0.6
  },
  viewHeader: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: common.ACTION_SHEET_COLOR_SEPARATOR,
    borderBottomWidth: 0.7
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  buttonFooter: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    fontSize: 15,
    fontWeight: common.FONT_WEIGHT_HEADER
  },
  txtContent: {
    fontSize: common.FONT_SIZE_SMALL,
    fontWeight: common.FONT_WEIGHT_CONTENT,
    textAlign: 'center'
  },
  titleFooter: {
    fontSize: 15,
    fontWeight: common.FONT_WEIGHT_HEADER
  }
});

class CardRewardPoints extends PureComponent<Props> {
  render() {
    const {
      style,
      width,
      height,
      title,
      content,
      titleFooter,
      borderRadius,
      titleColor,
      contentColor,
      titleFooterColor,
      onPressButtonFooter,
      backgroundButtonFooter,
      showFooterButton,
      backgroundColor
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          { width, height, backgroundColor },
          borderRadius ? { borderRadius: 8 } : undefined,
          style
        ]}
      >
        {
          title && (
            <View style={styles.viewHeader}>
              <Text style={[styles.txtTitle, { color: titleColor }]}>{title}</Text>
            </View>
          )
        }
        {
          content && (
            <View style={[styles.viewContent, { color: contentColor }]}>
              <Text style={styles.txtContent}>{content}</Text>
            </View>
          )
        }
        {
          showFooterButton ? (
            <TouchableOpacity
              style={[
                styles.buttonFooter,
                { backgroundColor: backgroundButtonFooter },
                borderRadius ? { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 } : undefined
              ]}
              onPress={onPressButtonFooter}
            >
              {
                titleFooter && <Text style={[styles.titleFooter, { color: titleFooterColor }]}>{titleFooter}</Text>
              }
            </TouchableOpacity>
          ) : <View style={{ height: 38 }} />
        }
      </View>
    );
  }
}

CardRewardPoints.defaultProps = {
  width: (SCREEN.width - SPACE_MARGIN * 3) / 2,
  height: 160,
  borderRadius: true,
  titleColor: common.TEXT_COLOR_ACTIVE,
  contentColor: common.TEXT_COLOR_INACTIVE,
  titleFooterColor: common.TEXT_COLOR_WHITE,
  backgroundButtonFooter: common.BACKGROUND_COLOR_BUTTON,
  showFooterButton: true,
  backgroundColor: common.BACKGROUND_COLOR
}

interface Props {
  style?: StyleProps<ViewProps>;
  width?: number | string;
  height?: number;
  title?: string;
  content?: string;
  titleFooter?: string;
  borderRadius?: boolean;
  titleColor?: string;
  contentColor?: string;
  titleFooterColor?: string;
  onPressButtonFooter?: () => void;
  backgroundButtonFooter?: string;
  showFooterButton?: boolean;
  backgroundColor?: string;
}

export default CardRewardPoints;
