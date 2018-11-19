/**
* Created by nghinv on Sun Nov 04 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

/**
 * Func cal location user's
 */
export const calDelta = (lat, long, accuracy) => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
  const longDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  const region = {
    latitude: lat,
    longitude: long,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    accuracy: accuracy,
  }

  return region
}
