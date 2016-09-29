import React from 'react';
import {
  View,
  Text,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { styles as s } from 'react-native-style-tachyons';

import { ActionCreators } from '../actions';

const List = (props) => (
  <ListView
    dataSource={props.dataSource}
    renderRows={props.renderRows}
  />
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
