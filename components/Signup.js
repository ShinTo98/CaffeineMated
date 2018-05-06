import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
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
      name: 'Name',
      email: 'Email',
      password: 'Password',
      comfirm: 'Comfirm Password',
      haveAccount: 'Already have an account? ',
      showToast: false,
    };
    this.signup = this.signup.bind(this);
    this.signup_cb = this.signup_cb.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

//TODO: function does not work, this.state.password returns undefined object
  checkPassword(){
      if( this.state.password == this.state.confirm ){
        this.signup;
      }
      else{
        Toast.show({
              text: 'Entered Password does not match!',
              buttonText: 'Okay'
        })
      }
  }

  signup (){
    userSignup(this.state.email, this.state.password, this.signup_cb);
  }

  signup_cb (msg) {
    if(msg === 0) {
      alert("Signup Successful! Now you can log in with your newly created account.");
      this.props.navigation.navigate('login');
    } else {
      alert(msg);
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
              <Input onChangeText={(text) => this.setState({name: text})}
              />
            </Item>
            </Form>

            <Form style = {{top: 10}}>
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Email</Label>
              <Input onChangeText={(text) => this.setState({email: text})}
              keyboardType='email-address'
              />
            </Item>
            </Form>

            <Form style = {{top: 20}}>
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Password</Label>
              <Input onChangeText={(text) => this.setState({password: text})}
              keyboardType='visible-password'
              secureTextEntry= {true}
              />
            </Item>
            </Form>

            <Form style = {{top: 30}}>
            <Item regular style={styles.textInput}>
              <Label style={styles.labelText}>Confirm</Label>
              <Input onChangeText={(text) => this.setState({confirm: text})}
              keyboardType='visible-password'
              secureTextEntry= {true}
              />
            </Item>
            </Form>

            <Button
              style={styles.buttons}
              color="#ffffff"
              onPress={
                this.checkPassword}
            > <Text> Sign Up </Text>
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
