import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  Text,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const Button = (props) => (
  <TouchableNativeFeedback
    onPress={props.onPress}
    background={TouchableNativeFeedback.SelectableBackground()}>
    <View style={props.containerStyle}>
      <Text style={props.buttonTextStyle}>
        {props.label}
      </Text>
    </View>
  </TouchableNativeFeedback>
);

export const Icon = (props) => (
  <TouchableNativeFeedback
    onPress={props.onPress}
    background={TouchableNativeFeedback.SelectableBackground()}>
      <View>
        <FontAwesome
          size={props.iconSize}
          color={props.color}
          name={props.name}
        />
      </View>
    </TouchableNativeFeedback>
);
