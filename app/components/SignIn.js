/* @flow */

import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { styles as s } from 'react-native-style-tachyons';
import firebase from 'firebase';

import { mapDispatchToProps as MDP } from '../utils';
import { ActionCreators } from '../actions';
import { Button } from './Buttons';

const route = {
  type: 'push',
  route: {
    key: 'list',
    title:  'List'
  }
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      validId: null,
    };
  }
  _validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.length > 4) {
      if (!re.test(email)) {
        this.setState({
          validId: false,
        });
      }
      if (re.test(email)) {
        this.setState({
          email,
          validId: true,
        });
      }
    }
  }
  _idStyle() {
    const noId = [s.flx_i, s.ba, s.br2, s.b__transparent];
    const badId = [s.flx_i, s.ba, s.b__red, s.br2];
    const goodId = [s.flx_i, s.ba, s.b__dark_green, s.br2];
    switch(this.state.validId) {
    case null:
      return noId;
    case false:
      return badId;
    case true:
      return goodId;
    }
  }
  _handleLogin() {
    if (!this.state.email || !this.state.validId || !this.state.pass) {
      console.log('Please check your login details.');
    } else {
      const promise = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then(this._logUserIn());
      promise.catch((error) => console.log('Error: ' + error.message));
    }
    //  If User logs in properly, advance to List page.
  }
  _handleSignUp() {
    if (!this.state.email || !this.state.validId || !this.state.pass) {
      console.log('Please check your sign up details.');
    } else {
      const promise = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(this._logUserIn());
      promise.catch((error) => console.log('Error: ' + error.message));
    }
    //  If User signs in properly, advance to List page.
  }
  _logUserIn() {
    this.props.onNavigate(route);
  }
  render() {
    return (
      <View style={[s.flx_i, s.jcc, s.bg_gunmetal]}>

        <View style={[s.flx_row, s.jcc, s.aic, s.mv1]}>
          <Text style={[s.b, s.f5, s.tc, s.ghost_white, s.ml2, s.mr2]}>
            E-mail:
          </Text>
          <View style={this._idStyle()}>
            <TextInput
              style={[s.flx_i, s.mh3, s.ghost_white, s.f5, s.b, s.pl2]}
              onChangeText={(email)=> this._validateEmail(email)}
              underlineColorAndroid='#F9FAFF'
            />
          </View>
        </View>

        <View style={[s.flx_row, s.aic, s.jcc, s.mv1]}>
          <Text style={[s.b, s.f5, s.tc, s.ghost_white, s.ml2]}>
            Password:
          </Text>
          <TextInput
            secureTextEntry={true}
            style={[s.flx_i, s.mh3, s.ghost_white, s.f5, s.b, s.pl2]}
            onChangeText={(pass)=> this.setState({ pass })}
            underlineColorAndroid='#F9FAFF'
          />
        </View>
        <Button
          containerStyle={[s.bg_blue, s.pa2, s.jcc, s.aic, s.br2, s.mh4, s.mt2]}
          onPress={this._handleLogin.bind(this)}
          buttonTextStyle={[s.b, s.f5, s.ghost_white]}
          label='Login'/>
        <Button
          containerStyle={[s.bg_gold, s.pa2, s.jcc, s.aic, s.br2, s.mh4, s.mt2]}
          onPress={this._handleSignUp.bind(this)}
          buttonTextStyle={[s.b, s.f5, s.gunmetal]}
          label='Sign Up'/>
      </View>
    );
  }
}

export default connect(() => { return {}; }, MDP)(SignIn);
