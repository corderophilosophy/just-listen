/* @flow */

import React, { Component } from 'react';
import {
  View,
  NavigationExperimental,
  ListView,
  BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';

import { styles as s } from 'react-native-style-tachyons';

import SignIn from '../components/SignIn';
import List from '../containers/List';
import TodoList from '../containers/TodoList';

import { mapDispatchToProps as MDP } from '../utils';

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;

class App extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(['row1', 'row2'])
    };
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }
  _renderRows(data) {
    return (
      <Text>{data}</Text>
    );
  }
  _renderScene(props) {
    const { route } = props.scene;
    if (route.key === 'signin') {
      return (
        <SignIn
          onNavigate={this._handleNavigate.bind(this)}
        />
      );
    }
    if (route.key === 'list') {
      return (
        <List
          onNavigate={this._handleNavigate.bind(this)}
          dataSource={this.state.dataSource}
          renderRows={(rowData) => this._renderRows(rowData)}
        />
      );
    }
    if (route.key === 'todolist') {
      return (
        <TodoList
          onNavigate={this._handleNavigate.bind(this)}
          goBack={this._handleBackAction}
        />
      );
    }
  }
  _handleBackAction() {
    if (this.props.navigation.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
  }
  _handleNavigate(action) {
    switch (action && action.type) {
    case 'push':
      this.props.pushRoute(action.route);
      return true;
    case 'back':
    case 'pop':
      return this._handleBackAction();
    default:
      return false;
    }
  }
  render() {
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.NavReducer
  };
}

export default connect(
  mapStateToProps,
  MDP
)(App);
