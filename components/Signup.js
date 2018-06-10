/*
  Filename: Signup.js
  Version: 0.1.0
  Description: This page contains a form that allows user to create a new account
  and access the app using this newly created account.
*/
import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {styles} from '../CSS/Signup.js';
import {userSignup, displayMenu, viewPendingOrders} from '../database.js'
import { Container, Header, Content, Button, Toast, Text, Form, Item, Input, Label } from 'native-base';

export class Signup extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      titleText: "CaffeineMated",
      //bodyText: 'This is not really a bird nest.',
      name: null,
      email: null,
      password: null,
      confirm: null,
      haveAccount: 'Already have an account? ',
      showToast: false,
    };
    this.signup = this.signup.bind(this);
    this.validityCheck = this.validityCheck.bind(this);
  }

  // Validity check function; whether is ucsd.edu email and if confirm password met
  // original password
  validityCheck(){
      Keyboard.dismiss();
      var thisPage = this;
      setTimeout(function() {
        if (!thisPage.state.password || !thisPage.state.confirm || !thisPage.state.email || !thisPage.state.name) {
          alert('Please fill out all blanks!');
        } else if( thisPage.state.password == thisPage.state.confirm ){
          // if there is 'ucsd.edu' occurance, valid email
          if (thisPage.state.email.indexOf('ucsd.edu') != -1) {
            thisPage.signup();
          } else {
            alert('Please enter a valid UCSD email!');
          }
        }
        else{
          alert('Password does not match!');
        }
      }, 1);

  }


  async signup (){
    var result = await userSignup(this.state.email, this.state.password, this.state.name);
    if(result === 0) {
      alert("Signup Successful!");
      this.props.navigation.navigate('main');
    } else {
      alert(result);
    }
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={styles.banner}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('start')}>
            <Image
              style={styles.logo}
              source={require('../resources/logo.png')}
            />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.textSection}>

            <Form >
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Name</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({name: text})}
              />
            </Item>
            </Form>

            <Form style = {{top: 8}}>
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Email</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({email: text})}
              keyboardType='email-address'
              />
            </Item>
            </Form>

            <Form style = {{top: 16}}>
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Password</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({password: text})}
              keyboardType='visible-password'
              secureTextEntry= {true}
              />
            </Item>
            </Form>

            <Form style = {{top: 24}}>
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Confirm</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({confirm: text})}
              keyboardType='visible-password'
              secureTextEntry= {true}
              />
            </Item>
            </Form>

            <Button
              style={styles.buttons}
              color="#ffffff"
              onPress={
                this.validityCheck}>
              <Text> Sign Up </Text>
            </Button>

            <View style={styles.textView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.subText}>{this.state.haveAccount}</Text>
                <Text
                  style={{fontSize:12}}
                  onPress={() => this.props.navigation.navigate('login')}
                >Log In</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Signup;
