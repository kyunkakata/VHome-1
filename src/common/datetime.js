/**
* Created by nghinv on Thu May 31 2018
* Copyright (c) 2018 nghinv
*/

'use strick';

/**
 * @returns current day, month, year
 */
export const getDate = () => {
  const date = new Date();

  const dateTime = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };

  return dateTime;
}

/**
 * @returns current hour, minutes, second
 */
export const getTime = () => {
  const date = new Date();

  const time = {
    hour: date.getHours(),
    minutes: date.getMinutes(),
    second: date.getSeconds()
  };

  return time;
}

/**
 * @returns current string day, month, year
 */
export const getDateString = () => {
  const date = new Date();

  const dateTime = {
    day: date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`,
    month: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`,
    year: `${date.getFullYear()}`,
  };

  return dateTime;
}

/**
 * @returns current string hour, minutes, second
 */
export const getTimeString = () => {
  const date = new Date();

  const time = {
    hour: date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`,
    minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`,
    second: date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
  };

  return time;
}

export const getFullDateTime = () => {
  let dateTime = '';
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes()

  dateTime = hour < 10 ? '0' + hour : hour;
  dateTime = dateTime + ':';
  dateTime = dateTime + minute < 10 ? '0' + minute : minute;
  dateTime = dateTime + ' ';
  dateTime = dateTime + day < 10 ? '0' + day : day;
  dateTime = dateTime + '/';
  dateTime = dateTime + month < 10 ? '0' + month : month;
  dateTime = dateTime + '/';
  dateTime = dateTime + year;

  return dateTime
}

export const parseTime = (time) => {
  let d = null
  if (time < 0) {
    time = 0 - time
    time = parseInt(time * 0.001)
    let h = parseInt(time / 3600)
    let m = parseInt((time - h * 3600) / 60)
    let s = time - h * 3600 - m * 60
    if (h > 0) {
      d = h < 10 ? "0" + h : h
      d += ":"
      d += m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    } else {
      d = m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    }
    d = "-" + d
  } else {
    time = parseInt(time * 0.001)
    let h = parseInt(time / 3600)
    let m = parseInt((time - h * 3600) / 60)
    let s = time - h * 3600 - m * 60
    if (h > 0) {
      d = h < 10 ? "0" + h : h
      d += ":"
      d += m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    } else {
      d = m < 10 ? "0" + m : m
      d += ":"
      d += s < 10 ? "0" + s : s
    }
  }
  return d;
}

export const getStringShortTime = (time) => {
  if (!time) return '';

  if (time == undefined) return ''

  return time//`${time[0]}${time[1]}:${time[2]}${time[3]}`
}