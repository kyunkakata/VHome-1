/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

const io = require('socket.io-client');
import { global } from '../configs/global';

const URL_SOCKET = 'ws://103.15.50.123';
const PORT_SOCKET = 1337;
const selectorToken = state => state.config.token;
const selectorLanguage = state => state.config.language;

export default class Connection {
  static init(store, onComplete) {
    let connect = new Connection(store)
    global.connection = connect;

    if (onComplete) {
      onComplete()
    }
  }

  constructor(store) {
    this._store = store;
    this._language = 'vi';
    this._currentToken = undefined
    this._baseUrlSocket = URL_SOCKET
    this._portSocket = PORT_SOCKET

    this._store.subscribe(this.listenerChange)
  }

  listenerChange = () => {
    // lắng nghe thay đổi token
    let token = selectorToken(this._store.getState())
    if (this._currentToken != token) {
      this._currentToken = token

      // huỷ kết nối và kết nối lại nếu token thay đổi
      this.disconnectSoket()
      if (this._currentToken) {
        this.connectSocket(token)
      }
    }

    // lắng nghe thay đổi ngôn ngữ
    let currentLanguage = selectorLanguage(this._store.getState())
    if (this._language !== currentLanguage) {
      this._language = currentLanguage
    }
  }

  connectSocket(token) {
    try {
      console.log('CONNECTING TO SOCKET:::', `${this._baseUrlSocket}:${this._portSocket}`)

      this._socket = io(`${this._baseUrlSocket}:${this._portSocket}`, {
        'transports': ['websocket']
      });

      this._socket.on('connected', (data) => {
        console.log('VHOME::connected', data)
      });

      this._socket.on('error', (data) => {
        console.log('VHOME::error', data)
      });

      this._socket.on('vhome_socket', (data) => {
        console.log('vhome_socket:::', data)
      });

      this._socket.on('timeout', (data) => {
        console.log('timeout---->', data)
      });

      this._socket.on('connect_error', (data) => {
        console.log('connect_error---->', data)
      });


    } catch (error) {
      console.log('VHOME::error', error)
    }
  }

  disconnectSoket() {
    if (this._socket) {
      this._socket.disconnect()
      this._socket = undefined
    }
  }

  sendData(data) {
    if (this._socket) {
      this._socket.emit('broadcast', data)
    }
  }
}