import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {LogIn} from './components/LogIn.js';
import {SignUp} from './components/SignUp.js';
import {Main} from './components/Main.js';

import {StackNavigator} from 'react-navigation';

export default class App extends React.Component {

  render() {
    return (
      // <View style={styles.container}>
      //   <Image
      //     style={styles.logo}
      //     source={require('./resources/wei_logo.png')}
      //   />
      //   <Text style={styles.name}>
      //     CaffeineMated
      //   </Text>
      // </View>
      <RootStack />
    );
  }
}

const RootStack = StackNavigator(
  {
    main:{
      screen: Main,
    },
    logIn: {
      screen: LogIn,
    },
    signUp: {
      screen: SignUp,
    },
  },
  {
    initialRouteName: 'main',
    headerMode: 'none',
  }
)
