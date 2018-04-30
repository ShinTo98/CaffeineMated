import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {LogIn} from './components/LogIn.js';
import {SignUp} from './components/SignUp.js';
import {Main} from './components/Main.js';
import firebase from 'firebase'

import {StackNavigator} from 'react-navigation';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAQSNocuGrjIBtwErRJeHV7nUsfQGZC_uE",
      authDomain: "cmdatabase-c3084.firebaseapp.com",
      databaseURL: "https://cmdatabase-c3084.firebaseio.com",
      projectId: "cmdatabase-c3084",
      storageBucket: "cmdatabase-c3084.appspot.com",
      messagingSenderId: "964208744011"
    };
    firebase.initializeApp(config);

  }

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
