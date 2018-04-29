import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {LogIn} from './components/LogIn.js';
import {SignUp} from './components/SignUp.js';
import {styles} from './CSS/MainPage.js';

export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      // <Image
      //   style={styles.logo}
      //   source={require('./resources/wei_logo.png')}
      // />
      //   <Text style={styles.name}>
      //     CaffeineMated
      //   </Text>
      // </View>
       <SignUp />
    );
  }
}
