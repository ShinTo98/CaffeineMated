import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./resources/wei_logo.png')}
      />
        <Text style={styles.name}>
          CaffeineMated
        </Text>
      </View>
      // <SignUp />
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
