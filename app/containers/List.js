import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { styles as s } from 'react-native-style-tachyons';

import { ActionCreators } from '../actions';

class List extends Component {
  render() {
    return (
      <View>
        <Text>The List</Text>
      </View>
    );
  }
}

export default List;
