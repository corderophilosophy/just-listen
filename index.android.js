/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
//  Style Deps:
import NativeTachyons from 'react-native-style-tachyons';
//  Database Deps:
import * as firebase from 'firebase';
//  Local imports
import App from './app/components/App';
import config from './config/.api.js';
import configureStore from './app/store';


var { height, width } = Dimensions.get('window');

firebase.initializeApp(config);

NativeTachyons.build({
  colors: {
    palette: {
      transparent: 'rgba(0,0,0,0.0)',
      black: '#000',
      near_black: '#111',
      mid_gray: '#555',
      gray: '#777',
      silver: '#999',
      moon_gray: '#ccc',
      near_white: '#f4f4f4',
      white: '#fff',
      red: '#ff3223',
      orange: '#f3a801',
      gold: '#f2c800',
      yellow: '#ffde37',
      purple: '#7d5da9',
      hot_pink: '#d62288',
      pink: '#f49cc8',
      green: '#41D69F',
      navy: '#001b44',
      blue: '#357edd',
      washed_blue: '#f6fffe',
      washed_green: '#e8fdf5',
      washed_yellow: '#fff8d5',
      gunmetal: '#1D1E2C',
      black_coral: '#59656F',
      beau_blue: '#B8DBD9',
      berry: '#9C528B',
      ghost_white: '#F9FAFF'
    }
  },
  rem: width > 340 ? 22 : 20
}, StyleSheet);

const store = configureStore({});

class justListen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('justListen', () => justListen);
