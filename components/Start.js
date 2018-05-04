import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import {styles} from '../CSS/Start.js';
import {StackNavigator} from 'react-navigation'

export class Start extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../resources/wei_logo.png')}
          />
          <Text style={styles.name}>
            CaffeineMated
          </Text>
        </View>

        <Container style={styles.bottom}>
          <Button style={styles.buttons} bordered light onPress={() => this.props.navigation.navigate('login')}><Text> Login </Text></Button>
          <Button style={styles.buttons} bordered light onPress={() => this.props.navigation.navigate('signup')}><Text> Signup </Text></Button>
        </Container>
      </View>
    );
  }
}
