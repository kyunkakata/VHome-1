/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class CustomMarkerView extends PureComponent {
  render() {
    const { title } = this.props;

    return <View />

    return (
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: -36
  }
});

export default CustomMarkerView;
