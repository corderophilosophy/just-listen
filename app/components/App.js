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
import firebase from 'firebase';

import SignIn from '../components/SignIn';
import List from '../containers/List';
import TodoList from '../containers/TodoList';

import { push, pop } from '../actions/NavActions';

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
      dataSource: ds.cloneWithRows(['row1', 'row2']),
      loggedIn: false
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        console.log('Not logged in');
      }
    });
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
    if (this.state.loggedIn === false) {
      return (
        <SignIn
          onNavigate={this._handleNavigate.bind(this)}
        />
      );
    } else if (this.state.loggedIn === true) {
      if (route.key === 'signin') {
        return (
          <List />
        );
      }
      if (route.key === 'list') {
        return (
          <List />
        );
      }
      if (route.key === 'todolist') {
        return (
          <TodoList
          onNavigate={this._handleNavigate.bind(this)}
          goBack={this._handleBackAction}
          />
        );
      } else {
        return (
          <List />
        );
      }
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
    console.log(this);
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
  {
    pushRoute: (route) => push(route),
    popRoute: () => pop()
  }
)(App);
