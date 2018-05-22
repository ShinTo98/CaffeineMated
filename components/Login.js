import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import {styles} from '../CSS/Login.js';
import {StackNavigator} from 'react-navigation'
import {userLogin} from '../database.js'

export class Login extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      titleText: "CaffeineMated",
      //bodyText: 'This is not really a bird nest.',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      signup: 'Don\'t have an account? '
    };

    // Bind login related functions
    this.login = this.login.bind(this);
  }

  // Function called when user clicked the login button
  async login() {
    var result = await userLogin(this.state.email, this.state.password);
    if(result === 0) {
      alert("Login Successful!");
      this.props.navigation.navigate('main');
    } else {
      alert(result);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Container style={styles.container}>
          <Container style={styles.banner}>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('start')}>
            <Image
              style={styles.logo}
              source={require('../resources/logo.png')}
            />
            </TouchableWithoutFeedback>
          </Container>
          <Container style={styles.textSection}>

            <Form >
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Email</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({email: text})}
              keyboardType='email-address'
              />
            </Item>
            </Form>

            <Form style = {{top: 8}}>
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Password</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({password: text})}
              keyboardType='visible-password'
              secureTextEntry= {true}
              />
            </Item>
            </Form>


            <Button
              style={styles.buttons}
              color="#ffffff"
              onPress={this.login}
            > <Text> Log In </Text>
            </Button>

            <View style={styles.textView}>
              <Text style={styles.subText}>{this.state.forgotPassword}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.subText}>{this.state.signup}</Text>
                <Text
                  style={{fontSize:12}}
                  onPress={() => this.props.navigation.navigate('signup')}
                >Sign Up</Text>
              </View>
            </View>
          </Container>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
