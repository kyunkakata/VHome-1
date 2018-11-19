/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';
import * as imgs from '../../../configs/imgs';
import CustomCalloutView from './CustomCalloutView';
import CustomMarkerView from './CustomMarkerView';

const marker = {
  latitude: 20.97598113336549,
  longitude: 105.84446830548454,
}
const markers = [
  { title: 'Thi công xây dựng', description: 'Đỗ Bình: 0123456789', latlng: { latitude: 20.97598113336549, longitude: 105.84446830548454 } },
  { title: 'Cho thuê máy phát điện', description: 'Chuyên cho thuê máy phát điện', latlng: { latitude: 20.97698113336549, longitude: 105.84446830548454 } },
  { title: 'Thi công xây dựng', description: 'Đỗ Bình: 0123456789', latlng: { latitude: 20.97598113336549, longitude: 105.84546830548454 } },
  { title: 'Thi công xây dựng', description: 'Đỗ Bình: 0123456789', latlng: { latitude: 21.97698113336549, longitude: 106.84546830548454 } },
]

class MapComponent extends PureComponent {
  getMarkers = () => {
    const { providers } = this.props;

    return providers.map(provider => ({
      title: 'Thi công xây dựng',
      description: provider.full_name || provider.phone_number,
      latlng: {
        latitude: provider.lat ? parseFloat(provider.lat) : 20.97598113336549,
        longitude: provider.lng ? parseFloat(provider.lng) : 105.84446830548454
      }
    }))
  }

  render() {
    const { location } = this.props;

    return (
      <MapView
        style={styles.asolute}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta || 0,
          longitudeDelta: location.longitudeDelta || 0,
        }}
      >
        {
          this.getMarkers().map((marker, idx) => (
            <Marker flat={true} key={idx} coordinate={marker.latlng} image={imgs.icon.location}>
              <CustomMarkerView {...marker} />
              <Callout style={{ margin: 0, padding: 0 }}>
                <CustomCalloutView {...marker} />
              </Callout>
            </Marker>
          ))
        }
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  asolute: {
    ...StyleSheet.absoluteFillObject,
  }
});

const mapStateToProps = (state) => {
  return {
    location: state.location,
    providers: state.userService.providers.data
  }
}

export default connect(mapStateToProps)(MapComponent);
