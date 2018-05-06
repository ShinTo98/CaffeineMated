import React, {Component} from 'react';
//import {
//  Button,
//  StyleSheet,
//  View,
//  Text,
//  Image,
//  TextInput,
//  KeyboardAvoidingView,
//  TouchableWithoutFeedback
//} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text } from 'native-base';
import {styles} from '../CSS/Main.js';

export class Main extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      //titleText: "CaffeineMated",
      //bodyText: 'This is not really a bird nest.',
      //name: 'Name',
      //email: 'Email',
      //password: 'Password',
      //comfirm: 'Comfirm Password',
      //haveAccount: 'Already have an account? ',
    };
  }

  render() {
    return (
       <Container>
        <Header style={styles.color_theme}>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Segment style={styles.color_theme}>
              <Button first><Text>Buyer</Text></Button>
              <Button last active><Text>Carrier</Text></Button>
            </Segment>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder style={styles.color_theme}>
          <Text>Awesome segment</Text>
        </Content>
      </Container>
    );
  }
}

export default Main;
