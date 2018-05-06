import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Login} from './components/Login.js';
import {Signup} from './components/Signup.js';
import {Start} from './components/Start.js';
import {Main} from './components/Main.js';
import {MenuView} from './components/MenuView.js';
import {SubMenuView} from './components/SubMenuView.js';

import {StackNavigator} from 'react-navigation';
import { Root } from "native-base";

export default class App extends React.Component {


  render() {
    return (
      // <Root>
      //   <RootStack />
      // </Root>
      <SubMenuView />
    );
  }
}

const RootStack = StackNavigator(
  {
    start:{
      screen: Start,
    },
    login: {
      screen: Login,
    },
    signup: {
      screen: Signup,
    },
    main: {
      screen: Main,
    }
  },
  {
    // TEMPERARY! Original: start; for development usage only
    initialRouteName: 'signup',
    headerMode: 'none',
  }
);
