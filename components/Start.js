import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Header, Content, Button, Text} from 'native-base';
import {styles} from '../CSS/Start.js';
import {StackNavigator} from 'react-navigation'

export class Start extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>

        <Container style={styles.container}>
        <Button
            style={styles.buttons}
            light
            onPress={() => this.props.navigation.navigate('testPage')}>
            <Text style = {{color: '#FF9052', fontSize: 20}}>
              testPage
            </Text>
        </Button>

          <Image style={styles.logo} source={require('../resources/logo.png')}/>
          <Text style={styles.name}>
            CaffeineMated
          </Text>
        </Container>

        <Container style={styles.bottom}>
          <Button
            style={styles.buttons}
            light
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style = {{color: '#FF9052', fontSize: 20}}>
              Log In
            </Text>
          </Button>
          <Button
            style={styles.buttons}
            light
            onPress={() => this.props.navigation.navigate('signup')}>
            <Text style = {{color: '#FF9052', fontSize: 20}}>
              Sign Up
            </Text>
          </Button>
        </Container>
      </Container>
    );
  }
}
