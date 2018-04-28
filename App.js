import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {LogIn} from './components/LogIn.js';
import {SignUp} from './components/SignUp.js';

export default class App extends React.Component {
  render() {
    return (
    //   <View style={styles.container}>
    //   <Image
    //     style={styles.logo}
    //     source={require('./resources/wei_logo.png')}
    //   />
    //     <Text style={styles.name}>
    //       CaffeineMated
    //     </Text>
    //   </View>
       <LogIn />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9052',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 40,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
});
